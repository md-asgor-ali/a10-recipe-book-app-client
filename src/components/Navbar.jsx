import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router"; // use react-router-dom, not react-router
import { FaBars, FaSun, FaMoon } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleLogOut = () => {
    logOut()
      .then(() => {
        alert("You logged out successfully");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const navItems = (
    <>
      <li className="text-lime-600"><Link to="/">Home</Link></li>
      <li className="text-lime-600"><Link to="/all/all-recipes">All Recipes</Link></li>
      {user && (
        <>
          <li className="text-lime-600"><Link to="/add-recipes">Add Recipe</Link></li>
          <li className="text-lime-600"><Link to="/my-recipes">My Recipes</Link></li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-gradient-to-r from-orange-100 via-pink-100 to-lime-100 shadow-md sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4 py-3">
        {/* Left: Logo and Mobile Dropdown */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost text-xl text-orange-500">
              <FaBars />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-lg bg-white rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>

          <Link to="/" className="text-3xl font-extrabold text-orange-500">
            🍽️ <span className="text-rose-500">Recipe</span>
            <span className="text-lime-600">Book</span>
          </Link>
        </div>

        {/* Center: Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2 font-semibold">
            {navItems}
          </ul>
        </div>

        {/* Right: Auth Buttons and Theme Toggle */}
        <div className="navbar-end flex items-center gap-2">
          <button
            className="btn btn-sm btn-circle bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
            onClick={handleThemeToggle}
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          {user ? (
            <>
              <div className="relative group">
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full border-2 border-green-600 cursor-pointer"
                  data-tooltip-id="user-tooltip"
                  data-tooltip-content={`${user.displayName || "User"}\n${user.email}`}
                />
                <Tooltip id="user-tooltip" place="bottom" multiline />
              </div>

              <button
                onClick={handleLogOut}
                className="btn btn-sm bg-lime-600 text-white hover:bg-lime-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="btn btn-sm rounded-full bg-lime-600 text-white hover:bg-gray-800"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="btn btn-sm bg-lime-600 text-white hover:bg-lime-500 rounded-full px-4"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
