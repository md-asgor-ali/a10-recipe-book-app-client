import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const AddRecipe = () => {
  const { user } = useContext(AuthContext);

  const handleAddRecipe = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newRecipe = Object.fromEntries(formData.entries());

    // ✅ Get all checked categories
    newRecipe.categories = formData.getAll("categories");

    // ✅ Convert numeric fields
    newRecipe.prepTime = parseInt(newRecipe.prepTime);
    newRecipe.likeCount = parseInt(newRecipe.likeCount) || 0;

    // ✅ Add createdBy from Firebase Auth user
    newRecipe.createdBy = user?.email || "anonymous";

    console.log("Submitting recipe:", newRecipe);

    // ✅ Send to backend
    fetch("https://a10-recipe-book-app-server.vercel.app/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message || "Failed to add recipe");
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data.insertedId || data.acknowledged) {
          Swal.fire({
            icon: "success",
            title: "Recipe added successfully!",
          });
          form.reset();
        }
      })
      .catch((err) => {
        console.error("Error adding recipe:", err.message);
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: err.message,
        });
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
          <Helmet>
              <title>Add Recipe || Recipe Book</title>
            </Helmet>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Add a New Recipe
      </h2>
      <form onSubmit={handleAddRecipe} className="space-y-5">
        {/* Image URL */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Image URL
          </label>
          <input
            type="url"
            name="image"
            placeholder="https://example.com/image.jpg"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Ingredients
          </label>
          <textarea
            name="ingredients"
            rows="3"
            placeholder="List ingredients separated by commas"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Instructions
          </label>
          <textarea
            name="instructions"
            rows="4"
            placeholder="Step-by-step instructions"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Cuisine Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Cuisine Type
          </label>
          <select
            name="cuisine"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Cuisine</option>
            <option>Italian</option>
            <option>Mexican</option>
            <option>Indian</option>
            <option>Chinese</option>
            <option>Others</option>
          </select>
        </div>

        {/* Preparation Time */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Preparation Time (minutes)
          </label>
          <input
            type="number"
            name="prepTime"
            min="1"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categories */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Categories
          </label>
          <div className="flex flex-wrap gap-4 mt-2">
            {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"].map(
              (category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <input
                    type="checkbox"
                    name="categories"
                    value={category}
                    className="accent-blue-500"
                  />
                  {category}
                </label>
              )
            )}
          </div>
        </div>

        {/* Like Count */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Like Count
          </label>
          <input
            type="number"
            name="likeCount"
            value="0"
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
          >
            Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
