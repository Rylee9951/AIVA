import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import React, { useEffect, useState } from "react";
import { fetchAccessTokenTest, fetchTransactions } from "../api/api";


const Insights = () => {
  const location = useLocation();
  const user = location.state?.user;
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
			const getTokenAndTransactions = async () => {
			const token = await fetchAccessTokenTest();
			const transactions = await fetchTransactions(token);
			console.log("Transactions:", transactions);
			setTransactions(transactions);
			}
			getTokenAndTransactions();
		}, []);

  return (
    <div className="w-full min-h-screen">
			<Navbar user={user} />
			{transactions.map	((txn, index) => (
				<div key={index}>
					<p>{txn.name} - ${txn.amount} on {new Date(txn.date).toLocaleDateString()}</p>
				</div>
			))}
    </div>
  );
};

export default Insights;
