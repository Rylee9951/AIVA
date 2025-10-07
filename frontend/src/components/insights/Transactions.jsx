import React, { useEffect, useState } from "react";
import { fetchAccessTokenTest, fetchTransactions } from "../../api/api";
import { TrendingDown, Receipt, Calendar } from 'lucide-react';

const Transactions = () => {
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
		<div className="w-full p-4 bg-[rgb(251,252,253)] rounded-lg shadow-md mt-6">
			<div className="flex items-center mb-4">
				{/* <Lightbulb className="w-5 h-5 text-amber-500" /> */}
				<h1 className="text-left font-bold ml-2">Smart Insights</h1>
			</div>
			{transactions.map	((txn, index) => (
				<div key={index} className="flex justify-between items-start mr-4 mt-4 p-4 overflow-hidden rounded-xl p-4 bg-white/80 backdrop-blur-sm border border-slate-100 hover:shadow-md transition-all duration-200">
					<div className="text-left">
						<div className="font-bold">{txn.name}</div>
						<div className="flex items-center text-gray-500 mt-2">
							<Calendar className="w-3 h-3 mr-1" />
							<div className="text-sm">{new Date(txn.date).toLocaleDateString()}</div>
							<div className="ml-3 text-xs font-semibold text-black border border-gray-200 rounded-full py-1 px-3 lowercase">{txn.personal_finance_category.primary.replace(/_/g, " ")}</div>
						</div>
					</div>
					<div>
						<div className="font-bold text-xl">${Number(txn.amount).toFixed(2)}</div>
					</div>
					
				</div>
			))}
		</div>
	);
};

export default Transactions;