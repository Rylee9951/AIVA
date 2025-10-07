import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Transactions from "../components/insights/Transactions";


const Insights = () => {
  const location = useLocation();
  const user = location.state?.user;
  return (
    <div className="w-full min-h-screen">
			<Navbar user={user} />
			<Transactions />

    </div>
  );
};

export default Insights;
