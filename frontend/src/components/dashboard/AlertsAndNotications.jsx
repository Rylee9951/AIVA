import { Bell, AlertTriangle, CheckCircle, Info, Trophy, X } from 'lucide-react';

const AlertsAndNotifications = () => {
  return (
			<div className="w-full p-4 bg-[rgb(251,252,253)] rounded-lg shadow-md mt-6">
				<div className="flex justify-between items-center mb-4">
					<div className="flex items-center mb-4">
						<Bell className="w-5 h-5 text-blue-600" />
						<h1 className="text-left font-bold ml-2">Alerts & Notifications</h1>
					</div>
					<div className="ml-3 font-semibold text-[rgb(141,40,34)] border border-[rgb(246,204,203)] bg-[rgb(250,227,227)] rounded-full px-3">4 new</div>
				</div>
				<div id="alerts-list" className="max-h-100 overflow-y-scroll">
					<div className="flex mr-4 mt-4 p-4 bg-[rgb(253,245,245)] border border-[rgb(225,230,239)] rounded-lg">
						<div><AlertTriangle className="w-5 h-5 text-red-600" /></div>
						<div>
							<div className="ml-2">
								<div className="flex">
									<h2 className="font-bold">Spending Alert</h2>
									<div className="ml-3 font-semibold text-[rgb(148,108,60)] border border-[rgb(252,239,152)] bg-[rgb(254,248,201)] rounded-full px-3 mb-2">medium</div>
								</div>
								<p>You've exceeded your dining budget this month by $45. Consider cooking more meals at home.</p>
							</div>
							<div className='text-left text-blue-600 ml-4 mt-4 text-xs font-bold'><p>Mark as read</p></div>
						</div>
					</div>

					<div className="flex mr-4 mt-4 p-4 bg-[rgb(246,251,247)] border border-[rgb(225,230,239)] rounded-lg">
						<div><Trophy className="w-5 h-5 text-green-600" /></div>
						<div>
							<div className="ml-2">
								<div className="flex">
									<h2 className="font-bold">Goal Progress</h2>
									<div className="ml-3 font-semibold border bg-red-100 text-red-800 border-red-200 rounded-full px-3 mb-2">high</div>
								</div>
								<p>Great job! You're 45% towards your Emergency Fund goal. Keep up the momentum.</p>
							</div>
							<div className='text-left text-blue-600 ml-4 mt-4 text-xs font-bold'><p>Mark as read</p></div>
						</div>
					</div>

					<div className="flex mr-4 mt-4 p-4 bg-[rgb(245,248,254)] border border-[rgb(225,230,239)] rounded-lg">
						<div><Bell className="w-5 h-5 text-blue-600" /></div>
						<div>
							<div className="ml-2">
								<div className="flex">
									<h2 className="font-bold">Bill Reminder</h2>
									<div className="ml-3 font-semibold border bg-yellow-100 text-yellow-800 border-yellow-200 rounded-full px-3 mb-2">medium</div>
								</div>
								<p>Your internet bill ($79.99) is due in 3 days.Would you like to set up autopay?</p>
							</div>
							<div className='text-left text-blue-600 ml-4 mt-4 text-xs font-bold'><p>Mark as read</p></div>
						</div>
					</div>

					<div className="flex mr-4 mt-4 p-4 bg-[rgb(251,248,244)] border border-[rgb(225,230,239)] rounded-lg">
						<div><AlertTriangle className="w-5 h-5 text-red-600" /></div>
						<div>
							<div className="ml-2">
								<div className="flex">
									<h2 className="font-bold">Unusual Transaction</h2>
									<div className="ml-3 font-semibold border bg-green-100 text-green-800 border-green-200 rounded-full px-3 mb-2">low</div>
								</div>
								<p>We noticed a large transaction at Target ($145.80). Was this expected?</p>
							</div>
							{/* <div className='text-left text-blue-600 ml-4 mt-4 text-xs font-bold'><p>Mark as read</p></div> */}
						</div>
					</div>

					<div className="flex mr-4 mt-4 p-4 bg-[rgb(245,247,253)] border border-[rgb(225,230,239)] rounded-lg">
						<div><Bell className="w-5 h-5 text-blue-600" /></div>
						<div>
							<div className="ml-2">
								<div className="flex">
									<h2 className="font-bold">Investment Opportunity</h2>
									<div className="ml-3 font-semibold border bg-green-100 text-green-800 border-green-200 rounded-full px-3 mb-2">low</div>
								</div>
								<p>Based on your savings pattern, consider investing $200/month in a diversified index fund.</p>
							</div>
							<div className='text-left text-blue-600 ml-4 mt-4 text-xs font-bold'><p>Mark as read</p></div>
						</div>
					</div>

				</div>
			</div>
  );
};

export default AlertsAndNotifications;
