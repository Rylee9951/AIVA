require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const app = express();
app.use(bodyParser.json());

const USER = process.env.POSTGRES_USER
const PASSWORD = process.env.POSTGRES_PASSWORD

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const client = new PlaidApi(configuration);
let sandboxToken = null;
let accessToken = null;

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: 'http://localhost:5173',   // React app origin
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,                  // If you use cookies or auth headers
}));


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  // Store/find user in PostgreSQL here
  // Example: User.upsert({ googleId: profile.id, name: profile.displayName, email: profile.emails.value })
  done(null, profile);
}));

passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((user, done) => { done(null, user); });

const pool = new Pool({
  user: USER,
  host: 'localhost',
  database: 'aivadb',
  password: PASSWORD,
  port: 5432,
});

async function initTokens() {
  try {
    // Create sandbox public token
    sandboxToken = await createSandboxPublicToken();

    // Exchange for access token
    accessToken = await exchangePublicToken(sandboxToken);

    console.log("Sandbox & Access tokens ready:", { sandboxToken, accessToken });
  } catch (err) {
    console.error("Error initializing tokens:", err);
  }
}

// Initialize tokens on server start
initTokens();

async function createSandboxPublicToken() {
  const response = await client.sandboxPublicTokenCreate({
    institution_id: 'ins_43',
    initial_products: ['auth', 'transactions'],
    options: {},
  });
  return response.data.public_token;
}
async function exchangePublicToken(publicToken) {
  const response = await client.itemPublicTokenExchange({ public_token: publicToken });
  return response.data.access_token;
}
async function getTransactions(accessToken) {
  const response = await client.transactionsGet({
    access_token: accessToken,
    start_date: '2024-01-01',
    end_date: '2025-12-31',
  });
  return response.data.transactions;
}

// Get real-time balances for linked accounts
async function getAccountBalances(accessToken) {
  const response = await client.accountsBalanceGet({ access_token: accessToken });
  return response.data.accounts; // returns array of accounts with balances fields
}

// Get all transactions in a date range (e.g., this month)
async function getMonthlyTransactions(accessToken, startDate, endDate) {
  const response = await client.transactionsGet({
    access_token: accessToken,
    start_date: startDate,
    end_date: endDate,
  });
  return response.data.transactions; // array of transactions
}

// Calculate total amount spent this month from transaction list
function calculateAmountSpent(transactions) {
  return transactions
    .filter(txn => txn.amount > 0 && txn.category_type === 'expense') // filter for expenses
    .reduce((sum, txn) => sum + txn.amount, 0); // sum amounts
}


app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/dashboard');
  }
);

// Express endpoint to create sandbox public token
app.get('/create_sandbox_token', async (req, res) => {
  const publicToken = await createSandboxPublicToken();
  res.json({ publicToken });
});

// Exchange public token for access token
app.post('/exchange_public_token', async (req, res) => {
  const accessToken = await exchangePublicToken(req.body.publicToken);
  res.json({ accessToken });
});

//get access token for testing purposes
app.get("/access_token", (req, res) => {
  res.json({ accessToken });
});

// Fetch transactions using access token
app.get('/transactions', async (req, res) => {
  try {
    const accessToken = req.query.accessToken;
    const transactions = await getTransactions(accessToken);
    res.json({transactions});
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get current balances
app.get('/current_balances', async (req, res) => {
  try {
    const accessToken = req.query.accessToken;
    const accounts = await getAccountBalances(accessToken);
    res.json({ accounts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get amount spent this month
app.get('/amount_spent_this_month', async (req, res) => {
  try {
    const accessToken = req.query.accessToken;

    // Get start and end dates for this month
    const now = new Date();
    const startDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
    const endDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const transactions = await getMonthlyTransactions(accessToken, startDate, endDate);
    const amountSpent = calculateAmountSpent(transactions);

    res.json({ amountSpent, transactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM test');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('App running on port 3000.');
});
