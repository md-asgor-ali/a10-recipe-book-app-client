import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import logo2 from "../assets/logo2.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out!",
          text: "You have successfully logged out.",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.error("Logout error:", error);
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Logout failed. Please try again.",
        });
      });
  };

  // ✅ Custom link class with animated underline and active styles
  const navLinkClass = ({ isActive }) =>
    `relative px-3 py-1 text-lime-600 font-medium transition-all duration-300 ease-in-out
     hover:text-lime-700 
     before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2
     before:w-0 before:h-[2px] before:bg-lime-600 before:transition-all before:duration-300
     hover:before:w-full
     ${isActive ? "text-lime-800 before:w-full" : ""}`;

  const navItems = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all/all-recipes" className={navLinkClass}>
          All Recipes
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/add-recipes" className={navLinkClass}>
              Add Recipe
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-recipes" className={navLinkClass}>
              My Recipes
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/blogs" className={navLinkClass}>
          Blogs
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-999 bg-gradient-to-r from-orange-100 via-pink-100 to-lime-100 shadow-md">
      <div className="navbar max-w-7xl mx-auto px-4 py-3">
        {/* Left: Logo and Mobile Dropdown */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label
              tabIndex={0}
              className="btn btn-ghost text-xl text-orange-500"
            >
              <FaBars />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-lg bg-white rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>

          <NavLink to="/" className="flex items-center gap-1">
            <img
              src={logo2}
              alt="Recipe book logo"
              className="w-10 h-10 object-contain"
            />
            <span className="hidden sm:inline text-3xl font-extrabold text-orange-500">
              Recipe<span className="text-lime-600">Book</span>
            </span>
          </NavLink>
        </div>

        {/* Center: Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2 font-semibold">
            {navItems}
          </ul>
        </div>

        {/* Right: Auth Buttons and Theme Toggle */}
        <div className="navbar-end flex items-center gap-2">
          <label className="toggle text-base-content cursor-pointer">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={() => setTheme(theme === "light" ? "dark" : "light")}
            />

            <svg
              aria-label="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </g>
            </svg>

            <svg
              aria-label="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </g>
            </svg>
          </label>

          {user ? (
            <>
              <div className="relative group">
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full border-2 border-green-600 cursor-pointer"
                  data-tooltip-id="user-tooltip"
                  data-tooltip-content={`${user.displayName || "User"}\n${
                    user.email
                  }`}
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
              <NavLink
                to="/auth/login"
                className="btn btn-sm rounded-full bg-lime-600 text-white hover:bg-gray-800"
              >
                Login
              </NavLink>
              <NavLink
                to="/auth/register"
                className="btn btn-sm bg-lime-600 text-white hover:bg-lime-500 rounded-full px-4"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
