import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const Goals = () => {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div className="w-full min-h-screen">
			<Navbar user={user} />
			<h1>Welcome to Goals</h1>
			<div>
				<div>
					<p>Goal 1</p>
					<p>Target: $XXX</p>
					<p>Progress: $XXX</p>
				</div>
				<div>
					<p>Goal 2</p>
					<p>Target: $XXX</p>
					<p>Progress: $XXX</p>
				</div>
				<div>
					<p>Goal 3</p>
					<p>Target: $XXX</p>
					<p>Progress: $XXX</p>
				</div>
				<div>
					<p>Goal 4</p>
					<p>Target: $XXX</p>
					<p>Progress: $XXX</p>
				</div>
			</div>
    </div>
  );
};

export default Goals;
