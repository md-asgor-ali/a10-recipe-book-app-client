import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

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

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

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

          <NavLink to="/" className="text-3xl font-extrabold text-orange-500">
            🍽️
            <span className="hidden sm:inline">
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
