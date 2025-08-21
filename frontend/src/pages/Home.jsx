import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
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
			{!user ? (<h1 className="text-3xl">Welcome back, {user?.name}!</h1>) : (
				<h1 className="text-3xl">Welcome to AIVA</h1>
			)}
			<div className="flex justify-between items-center mt-4">
				<div className="w-1/4 p-4 bg-[rgb(233,244,250)] rounded-lg shadow-md">
					<h2>Current Balance:</h2>
					<span>$XXX,XXX</span>
				</div>
				<div className="w-1/4 p-4 bg-[rgb(248,235,241)] rounded-lg shadow-md">
					<h2>Spent This Month:</h2>
					<span>$X,XXX</span>
				</div>
				<div className="w-1/4 p-4 bg-[rgb(234,246,241)] rounded-lg shadow-md">
					<h2>Goal:</h2>
					<span>X%</span>
				</div>
			</div>
			<div className="w-full p-4 bg-[rgb(251,252,253)] rounded-lg shadow-md mt-6">
				<div className="flex items-center mb-4">
					<FontAwesomeIcon icon={faRobot} />
					<h1 className="text-left font-bold ml-2">AI Financial Assistant</h1>
				</div>
				<textarea
					className="w-full p-2 rounded-lg mt-4 bg-[rgb(254,254,255)]"
					id="my-textarea"
					value={text}
					onChange={handleChange}
					placeholder="Ask me anything about your finances..."
					rows="5" // Optional: specify the number of visible text lines
					cols="50" // Optional: specify the visible width of the text area
				/>
				<button id="ask-ai-button" className="w-full mt-2 p-2 bg-blue-500 text-white rounded-lg mt-4 font-bold">
					<FontAwesomeIcon icon={faPaperPlane} /> Ask AI
				</button>
				<div className="grid grid-flow-col grid-rows-2 gap-4 mt-4">
					<button	className="mt-2 ml-2 p-2 border border-gray-200 text-gray-800 rounded-md text-left"><FontAwesomeIcon icon={faWandMagicSparkles} /> How can I reduce my spending this month?</button>
					<button	className="mt-2 ml-2 p-2 border border-gray-200 text-gray-800 rounded-md text-left"><FontAwesomeIcon icon={faWandMagicSparkles} /> What's the best way to reach my savings goal?</button>
					<button	className="mt-2 ml-2 p-2 border border-gray-200 text-gray-800 rounded-md text-left"><FontAwesomeIcon icon={faWandMagicSparkles} /> Should I be worried about my spending patterns?</button>
					<button	className="mt-2 ml-2 p-2 border border-gray-200 text-gray-800 rounded-md text-left"><FontAwesomeIcon icon={faWandMagicSparkles} /> How much should I budget for emergencies?</button>
				</div>
			</div>
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
						<p>You've spen $300 on Eating Out this month.</p>
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
				<div>

				</div>
			</div>
    </div>
  );
};

export default Home;

