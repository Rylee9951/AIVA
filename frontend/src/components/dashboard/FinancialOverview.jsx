import React, { useState, useEffect } from "react";
import { fetchAccessTokenTest, fetchBalance, fetchSpending } from "../../api/api";


const FinancialOverview = () => {
	const [balance, setBalance] = useState(0);
	const [spentThisMonth, setSpentThisMonth] = useState(0);
	
	useEffect(() => {
		const getTokenAndBalances = async () => {
			const token = await fetchAccessTokenTest();
			const account = await fetchBalance(token);
			const spending = await fetchSpending(token);
			console.log("Account balance:", account.balances.current);
			console.log("Spent this month:", spending.amountSpent);
			setBalance(account.balances.current);
			setSpentThisMonth(spending.amountSpent.toString());
		};
		getTokenAndBalances();
	}, []);


	return (
		<div className="flex justify-between items-center mt-4">
			<div className="w-1/4 p-4 bg-[rgb(233,244,250)] rounded-lg shadow-md flex flex-col">
				<p className="text-sm">Current Balance</p>
				<span className="font-bold">${balance ? Number(balance).toFixed(2) : 0.00}</span>
				{/* <span className="text-[rgb(66,147,109)] text-xs mt-2 font-semibold">+2.5%</span> */}
			</div>
			<div className="w-1/4 p-4 bg-[rgb(248,235,241)] rounded-lg shadow-md flex flex-col">
				<p className="text-sm">Spent This Month</p>
				<span className="font-bold">${spentThisMonth ? Number(spentThisMonth).toFixed(2) : 0.00}</span>
				{/* <span className="text-[rgb(66,147,109)] text-xs mt-2 font-semibold">-15.2%</span> */}
			</div>
			<div className="w-1/4 p-4 bg-[rgb(234,246,241)] rounded-lg shadow-md flex flex-col">
				<p className="text-sm">Primary Goal</p>
				<span className="font-bold">45% Complete</span>
				{/* <span className="text-[rgb(105,118,138)] text-xs mt-2 font-medium">$4,500.00 / $10,000.00</span> */}
			</div>
		</div>
	);
};

export default FinancialOverview;
