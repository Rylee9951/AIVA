import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import FinancialOverview from "../components/dashboard/FinancialOverview";
import AIAssistant from "../components/dashboard/AIAssistant";
import SmartInsights from "../components/dashboard/SmartInsights";
import SpendingDoughnutChart from "../components/dashboard/SpendingChart";
import CashFlowChart from "../components/dashboard/CashFlowChart";
import AlertsAndNotifications from "../components/dashboard/AlertsAndNotications";


const Dashboard = () => {
  const location = useLocation();
  const user = location.state?.user;

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
			<FinancialOverview/>
			<AIAssistant/>
			{/* Insights Section */}
			<SmartInsights/>
			{/* Charts Section */}	
			<SpendingDoughnutChart/>
			<CashFlowChart/>
			<AlertsAndNotifications/>
    </div>
  );
};

export default Dashboard;

