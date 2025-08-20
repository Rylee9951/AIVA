import React from "react";
import { NavLink } from "react-router";

const Navbar = () => (
  <nav className="flex items-center justify-between px-8 py-3 border-b border-gray-400 h-16 w-full">
    {/* Logo spot on the left */}
    <div className="flex items-center">
      <div className="text-blue-600 text-3xl font-bold mr-8">AIVA</div>
    </div>

    {/* Navigation links */}
    <ul className="flex flex-1 justify-around space-x-8 list-none m-0 p-0 ">
      <li>
				<NavLink
					to="/home"
					className={({ isActive }) =>
						isActive ? "text-blue-600 font-bold" : "text-gray-800"
					}>Home</NavLink>
      </li>
      <li>
				<NavLink
					to="/insights"
					className={({ isActive }) =>
						isActive ? "text-blue-600 font-bold" : "text-gray-800"
					}>Insights</NavLink>
      </li>
      <li>
				<NavLink
					to="/goals"
					className={({ isActive }) =>
						isActive ? "text-blue-600 font-bold" : "text-gray-800"
					}>Goals</NavLink>
      </li>
      <li>
				<NavLink
					to="/settings"
					className={({ isActive }) =>
						isActive ? "text-blue-600 font-bold" : "text-gray-800"
					}>Settings</NavLink>
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