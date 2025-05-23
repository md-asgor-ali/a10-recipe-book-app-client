import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-yellow-50 via-pink-50 to-orange-100 px-6 text-center">
      <h1 className="text-6xl font-extrabold text-orange-500 mb-4">404 🍳</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
        Oops! That recipe is missing!
      </h2>
      <p className="text-gray-600 text-sm md:text-base mb-6 max-w-md">
        The page you're looking for doesn’t exist or has been taken off the
        menu. Try going back to the home page!
      </p>
      <Link
        to="/"
        className="btn bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full shadow-lg transition"
      >
        🍽 Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
