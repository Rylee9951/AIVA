import React, { useState, useEffect } from "react";
import { fetchAccessTokenTest, fetchBalance, fetchSpending } from "../../api/api";

const Skeleton = () => (
	<span
		className="inline-block h-6 min-w-[7rem] rounded bg-gray-300/70 animate-pulse align-baseline"
		aria-hidden
	/>
);

const FinancialOverview = () => {
	const [balance, setBalance] = useState(null);
	const [spentThisMonth, setSpentThisMonth] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let cancelled = false;
		const load = async () => {
			try {
				const token = await fetchAccessTokenTest();
				if (cancelled) return;
				const [account, spending] = await Promise.all([
					fetchBalance(token),
					fetchSpending(token),
				]);
				if (cancelled) return;
				setBalance(account.balances.current);
				setSpentThisMonth(spending.amountSpent.toString());
			} catch (err) {
				if (!cancelled) {
					setBalance(0);
					setSpentThisMonth("0");
				}
			} finally {
				if (!cancelled) setLoading(false);
			}
		};
		load();
		return () => { cancelled = true; };
	}, []);


	return (
		<div className="flex justify-between items-center mt-4">
			<div className="w-1/4 p-4 bg-[rgb(233,244,250)] rounded-lg shadow-md flex flex-col">
				<p className="text-sm">Current Balance</p>
				{loading ? <Skeleton /> : <span className="font-bold">${Number(balance).toFixed(2)}</span>}
			</div>
			<div className="w-1/4 p-4 bg-[rgb(248,235,241)] rounded-lg shadow-md flex flex-col">
				<p className="text-sm">Spent This Month</p>
				{loading ? <Skeleton /> : <span className="font-bold">${Number(spentThisMonth).toFixed(2)}</span>}
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
