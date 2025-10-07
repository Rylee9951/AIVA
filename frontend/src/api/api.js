import axios from 'axios';

export const fetchAccessToken = async () => {
	const res = await axios.get("http://localhost:3000/create_sandbox_token");
	const res2 = await axios.post("http://localhost:3000/exchange_public_token", {
		publicToken: res.data.publicToken
	});
	return res2.data.accessToken;
}

export const fetchAccessTokenTest = async () => {
	// For testing purposes, return a hardcoded access token
	const res = await axios.get("http://localhost:3000/access_token");
	return res.data.accessToken;
};


export const fetchBalance = async (accessToken) => {
  const res = await axios.get("http://localhost:3000/current_balances", {
    params: { accessToken }
  });
  return res.data.accounts[0];
};

export const fetchBalances = async (accessToken) => {
  const res = await axios.get("http://localhost:3000/current_balances", {
    params: { accessToken }
  });
  return res.data.accounts;
};

export const fetchSpending = async (accessToken) => {
  const res = await axios.get("http://localhost:3000/amount_spent_this_month", {
    params: { accessToken }
  });
  return res.data;
};

export const fetchTransactions = async (accessToken, dateStart,dateEnd) => {
	const res = await axios.get("http://localhost:3000/transactions", {
		params: { accessToken, dateStart, dateEnd }
	});
	return res.data.transactions;
}
