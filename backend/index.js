require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
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

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

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
    start_date: '2023-01-01',
    end_date: '2023-12-31',
  });
  return response.data.transactions;
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

// Fetch transactions using access token
app.get('/transactions', async (req, res) => {
  const transactions = await getTransactions(req.query.accessToken);
  res.json(transactions);
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
