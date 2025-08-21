import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const Insights = () => {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div className="w-full min-h-screen">
			<Navbar user={user} />
			<h1>Welcome to Insights</h1>
			<div>
				<div>
					<p>Eating Out</p>
					<p>Spent: $XXX</p>
				</div>
				<div>
					<p>Groceries</p>
					<p>Spent: $XXX</p>
				</div>
				<div>
					<p>Entertainment</p>
					<p>Spent: $XXX</p>
				</div>
				<div>
					<p>Utilities</p>
					<p>Spent: $XXX</p>
				</div>
				<div>
					<p>Transportation</p>
					<p>Spent: $XXX</p>
				</div>
				<div>
					<p>Other</p>
					<p>Spent: $XXX</p>
				</div>
			</div>
    </div>
  );
};

export default Insights;
