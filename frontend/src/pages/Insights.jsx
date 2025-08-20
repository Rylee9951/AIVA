import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const Insights = () => {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div className="w-full min-h-screen">
			<Navbar user={user} />
			<h1>Welcome to Insights</h1>
    </div>
  );
};

export default Insights;
