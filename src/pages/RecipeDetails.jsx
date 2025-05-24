import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../provider/AuthProvider";

const RecipeDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [recipe, setRecipe] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    fetch(`a10-recipe-book-app-server.vercel.app/:5000/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        setLikeCount(Number(data.likeCount));
      });
  }, [id]);

  const handleLike = () => {
    if (user?.email === recipe?.createdBy) {
      alert("You can't like your own recipe.");
      return;
    }

    setIsLiking(true);

    fetch(`a10-recipe-book-app-server.vercel.app/:5000/recipes/${id}/like`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then(() => {
        setLikeCount((prev) => prev + 1);
        setIsLiking(false);

        // ✅ Dispatch event to notify TopRecipes
        window.dispatchEvent(
          new CustomEvent("recipeLiked", { detail: { recipeId: id } })
        );
      })
      .catch(() => setIsLiking(false));
  };

  if (!recipe) {
    return <p className="text-center py-6">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h2 className="text-3xl font-bold mt-4">{recipe.title}</h2>
      <p className="text-gray-600 text-lg mt-1">
        {likeCount} people interested in this recipe
      </p>

      <button
        onClick={handleLike}
        disabled={isLiking || user?.email === recipe?.createdBy}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {isLiking ? "Liking..." : "Like ❤️"}
      </button>

      <div className="mt-6 space-y-2">
        <p>
          <strong>Cuisine:</strong> {recipe.cuisine}
        </p>
        <p>
          <strong>Prep Time:</strong> {recipe.prepTime} minutes
        </p>
        <p>
          <strong>Category:</strong> {recipe.categories}
        </p>

        <div>
          <h3 className="text-xl font-semibold mt-4">Ingredients:</h3>
          <ul className="list-disc ml-6">
            {recipe.ingredients.split(",").map((item, i) => (
              <li key={i}>{item.trim()}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mt-4">Instructions:</h3>
          <ol className="list-decimal ml-6 whitespace-pre-line">
            {recipe.instructions.split("\n").map((step, i) => (
              <li key={i}>{step.trim()}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
