import React, { useContext } from "react";
import { Link } from "react-router"; 
import { FaBars } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        alert("You logged out successfully");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const navItems = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/all/all-recipes">All Recipes</Link></li>
      {user && (
        <>
          <li><Link to="/add-recipes">Add Recipe</Link></li>
          <li><Link to="/my-recipes">My Recipes</Link></li>
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

        {/* Right: Auth Buttons or Avatar */}
        <div className="navbar-end flex items-center gap-2">
          {user ? (
            <>
              {/* Avatar with Display Name on Hover */}
              <div className="relative group">
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full border-2 border-green-600 cursor-pointer"
                />
                <div className="absolute bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                  {user.displayName}
                </div>
              </div>
              {/* Logout Button */}
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
