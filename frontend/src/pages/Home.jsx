import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";


const Home = () => {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div className="w-full min-h-screen">
			<Navbar/>
			<h1 className="text-3xl">Welcome back, {user?.name}!</h1>
			<div className="flex justify-between items-center mt-4">
				<h2>Balance: <span>$XXX,XXX</span></h2>
				<h2>Spent This Month: <span>$X,XXX</span></h2>
				<h2>Goal: <span>X%</span></h2>
			</div>
    </div>
  );
};

export default Home;

