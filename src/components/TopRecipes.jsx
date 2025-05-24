import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const TopRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchTopRecipes = () => {
    fetch("https://a10-recipe-book-app-server.vercel.app/top-recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));
  };

  useEffect(() => {
    fetchTopRecipes();
  }, []);

  useEffect(() => {
    const handleRecipeLiked = () => {
      fetchTopRecipes();
    };

    window.addEventListener("recipeLiked", handleRecipeLiked);
    return () => window.removeEventListener("recipeLiked", handleRecipeLiked);
  }, []);

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-lime-600">
        Top Recipes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={recipe.image || "https://via.placeholder.com/300x200"}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {recipe.title}
              </h3>
              <p className="text-gray-600 mb-1">
                Cuisine: <span className="font-medium">{recipe.cuisine}</span>
              </p>
              <p className="text-gray-600 mb-3">
                Likes: <span className="font-medium">{recipe.likeCount}</span>
              </p>
              <Link to={`/recipe/${recipe._id}`}>
                <button className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded-md w-full">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link to="/all/all-recipes">
          <button className="bg-lime-600 hover:bg-lime-700 text-white px-6 py-3 rounded-md text-lg">
            See All Recipes
          </button>
        </Link>
      </div>
    </section>
  );
};

export default TopRecipes;
