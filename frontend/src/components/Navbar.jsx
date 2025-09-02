import { NavLink } from "react-router";
import AIVALogo from "../assets/aiva-logo2.png";
import { LayoutDashboard, TrendingUp, Target, Settings } from "lucide-react";

const Navbar = () => (
  <nav className="flex items-center justify-between px-8 py-3 border-b border-gray-400 h-16 w-full">
    {/* Logo spot on the left */}
    <div className="flex items-center">
      {/* <div className="text-[rgb(82,151,218)] text-3xl font-bold mr-8">AIVA</div> */}
      <img src={AIVALogo} alt="AIVA Logo" className="h-20 w-auto mr-4" />
    </div>

    {/* Navigation links */}
    <ul className="flex flex-1 justify-around space-x-8 list-none m-0 p-0 ">
      <li>
				<NavLink
					to="/dashboard"
					className={({ isActive }) =>
						isActive ? "text-[rgb(82,151,218)] font-bold" : "text-gray-800"
					}><div className="flex items-center"><div className="mr-2"><LayoutDashboard size={18}/></div>Dashboard</div></NavLink>
      </li>
      <li>
				<NavLink
					to="/insights"
					className={({ isActive }) =>
						isActive ? "text-[rgb(82,151,218)] font-bold" : "text-gray-800"
					}><div className="flex items-center"><div className="mr-2"><TrendingUp size={18}/></div>Insights</div></NavLink>
      </li>
      <li>
				<NavLink
					to="/goals"
					className={({ isActive }) =>
						isActive ? "text-[rgb(82,151,218)] font-bold" : "text-gray-800"
					}><div className="flex items-center"><div className="mr-2"><Target size={18}/></div>Goals</div></NavLink>
      </li>
      <li>
				<NavLink
					to="/settings"
					className={({ isActive }) =>
						isActive ? "text-[rgb(82,151,218)] font-bold" : "text-gray-800"
					}><div className="flex items-center"><div className="mr-2"><Settings size={18}/></div>Settings</div></NavLink>
      </li>
    </ul>

    {/* User info on the right
    <div className="flex items-center space-x-4">
      {user && (
        <>
          <span className="font-extrabold">Welcome: {user.name}</span>
          {user.image && (
            <img
              src={user.image}
              alt={user.name}
              className="w-10 h-10 rounded-full font-extrabold"
            />
          )}
        </>
      )}
    </div> */}
  </nav>
);

export default Navbar;