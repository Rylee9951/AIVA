import { TrendingUp, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';


const SmartInsights = () => {

	return (
		<div className="w-full p-4 bg-[rgb(251,252,253)] rounded-lg shadow-md mt-6">
			<div className="flex items-center mb-4">
				<Lightbulb className="w-5 h-5 text-amber-500" />
				<h1 className="text-left font-bold ml-2">Smart Insights</h1>
			</div>
			<div className="flex items-start mr-4 mt-4 p-4 overflow-hidden rounded-xl p-4 bg-white/80 backdrop-blur-sm border border-slate-100 hover:shadow-md transition-all duration-200">
				<div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white"><TrendingUp className="w-4 h-4" /></div>
				<div className="ml-2">
					<div className="flex">
						<h2 className="font-bold">Top Spending Category</h2>
						<div className="ml-3 font-semibold text-[rgb(148,108,60)] border border-[rgb(252,239,152)] bg-[rgb(254,248,201)] rounded-full px-3">medium</div>
					</div>
					<p>You've spent $300 on Eating Out this month.</p>
				</div>
			</div>
			<div className="flex items-start mr-4 mt-4 p-4 overflow-hidden rounded-xl p-4 bg-white/80 backdrop-blur-sm border border-slate-100 hover:shadow-md transition-all duration-200">
				<div className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white"><AlertTriangle className="w-4 h-4" /></div>
				<div className="ml-2">
					<div className="flex">
						<h2 className="font-bold">Large Transaction Detected</h2>
						<div className="ml-3 font-semibold text-[rgb(141,40,34)] border border-[rgb(246,204,203)] bg-[rgb(250,227,227)] rounded-full px-3">high</div>
					</div>
					<p>You have 7 unusually large transaction(s) recently.</p>
				</div>
			</div>
		</div>
	);
};

export default SmartInsights;
