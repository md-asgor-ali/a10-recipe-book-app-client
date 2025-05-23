import React from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { Fade } from 'react-awesome-reveal';

const AllRecipes = () => {
  const navigate = useNavigate();
  const recipes = useLoaderData();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-lime-600">
        All Recipes
      </h2>

      <Fade cascade damping={0.1} triggerOnce>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {recipes?.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              <img
                src={recipe.image || "https://via.placeholder.com/400x250?text=No+Image"}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{recipe.title}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Cuisine:</span> {recipe.cuisine}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Prep Time:</span> {recipe.prepTime} mins
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-semibold">Likes:</span>{" "}
                  <span className="text-blue-600 font-bold">{recipe.likeCount}</span>
                </p>

                <button
                  onClick={() => navigate(`/recipe/${recipe._id}`)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  See Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </Fade>
    </div>
  );
};

export default AllRecipes;
