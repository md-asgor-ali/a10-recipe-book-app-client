import React from "react";
import { useLoaderData, useNavigate } from "react-router";

const AllRecipes = () => {
  const recipes = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">All Recipes</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {recipes?.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300"
          >
            <img
              src={recipe.image || "https://via.placeholder.com/400x250?text=No+Image"}
              alt={recipe.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{recipe.title}</h3>
              <p className="text-sm text-gray-600 mb-1">Cuisine: <span className="font-medium">{recipe.cuisine}</span></p>
              <p className="text-sm text-gray-600 mb-1">Prep Time: <span className="font-medium">{recipe.preparationTime} mins</span></p>
              <p className="text-sm text-gray-600 mb-3">Likes: <span className="font-bold text-blue-600">{recipe.likeCount}</span></p>

              <button
                onClick={() => navigate(`/recipes/${recipe._id}`)}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;
