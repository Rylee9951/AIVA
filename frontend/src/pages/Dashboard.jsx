import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import AIAssistant from "../components/AIAssistant";
import SpendingDoughnutChart from "../components/SpendingChart";
import CashFlowChart from "../components/CashFlowChart";
import AlertsAndNotifications from "../components/AlertsAndNotications";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot, faPaperPlane, faWandMagicSparkles, faLightbulb, faMoneyBillTrendUp, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'




const Home = () => {
  const location = useLocation();
  const user = location.state?.user;
	const [text, setText] = useState('');

	const handleChange = (event) => {
		setText(event.target.value);
	};

  return (
    <div className="w-full min-h-screen">
			<Navbar/>
			{/* <div className="w-full h-32 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 mb-6">
				<div className="m-auto w-100 text-white text-center pt-4">
					<h1 className="text-3xl">AIVA</h1>
					<p>Your inteligent personal finance companion, powered by advanced AI insights</p>
				</div>
			</div> */}
			{user ? (<h1 className="text-[rgb(82,151,218)] text-3xl mt-4">Welcome back, {user?.name}!</h1>) : (
				<h1 className="text-[rgb(82,151,218)] text-3xl mt-4">Welcome to AIVA!</h1>
			)}
			<div className="flex justify-between items-center mt-4">
				<div className="w-1/4 p-4 bg-[rgb(233,244,250)] rounded-lg shadow-md flex flex-col">
					<p className="text-sm">Current Balance</p>
					<span className="font-bold">$7,254.94</span>
					<span className="text-[rgb(66,147,109)] text-xs mt-2 font-semibold">+2.5%</span>
				</div>
				<div className="w-1/4 p-4 bg-[rgb(248,235,241)] rounded-lg shadow-md flex flex-col">
					<p className="text-sm">Spent This Month</p>
					<span className="font-bold">$3,567</span>
					<span className="text-[rgb(66,147,109)] text-xs mt-2 font-semibold">-15.2%</span>
				</div>
				<div className="w-1/4 p-4 bg-[rgb(234,246,241)] rounded-lg shadow-md flex flex-col">
					<p className="text-sm">Primary Goal</p>
					<span className="font-bold">45% Complete</span>
					<span className="text-[rgb(105,118,138)] text-xs mt-2 font-medium">$4,500.00 / $10,000.00</span>
				</div>
			</div>
			<AIAssistant/>
			{/* Insights Section */}
			<div className="w-full p-4 bg-[rgb(251,252,253)] rounded-lg shadow-md mt-6">
				<div className="flex items-center mb-4">
					<FontAwesomeIcon icon={faLightbulb} />
					<h1 className="text-left font-bold ml-2">Smart Insights</h1>
				</div>
				<div className="flex mr-4 mt-4 p-4 bg-[rgb(244,250,253)] rounded-lg">
					<div><FontAwesomeIcon icon={faMoneyBillTrendUp} /></div>
					<div className="ml-2">
						<div className="flex">
							<h2 className="font-bold">Top Spending Category</h2>
							<div className="ml-3 font-semibold text-[rgb(148,108,60)] border border-[rgb(252,239,152)] bg-[rgb(254,248,201)] rounded-full px-3">medium</div>
						</div>
						<p>You've spent $300 on Eating Out this month.</p>
					</div>
				</div>
				<div className="flex mr-4 mt-4 p-4 bg-[rgb(253,248,245)] rounded-lg">
					<div><FontAwesomeIcon icon={faTriangleExclamation} /></div>
					<div className="ml-2">
						<div className="flex">
							<h2 className="font-bold">Large Transaction Detected</h2>
							<div className="ml-3 font-semibold text-[rgb(141,40,34)] border border-[rgb(246,204,203)] bg-[rgb(250,227,227)] rounded-full px-3">high</div>
						</div>
						<p>You have 7 unusually large transaction(s) recently.</p>
					</div>
				</div>
			</div>
			<SpendingDoughnutChart/>
			<CashFlowChart/>
			<AlertsAndNotifications/>
    </div>
  );
};

export default Home;

