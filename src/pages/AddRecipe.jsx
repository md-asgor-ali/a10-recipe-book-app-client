import Swal from "sweetalert2";

const AddRecipe = () => {
  const handleAddRecipe = (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);
    const newRecipe = Object.fromEntries(formData.entries());

    // ✅ Fix: Collect all selected categories
    newRecipe.categories = formData.getAll("categories");

    // ✅ Optional: Ensure numeric values are stored correctly
    newRecipe.prepTime = parseInt(newRecipe.prepTime);
    newRecipe.likeCount = parseInt(newRecipe.likeCount);

    console.log("Submitting recipe:", newRecipe);

    // ✅ POST to backend
    fetch("http://localhost:5000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId || data.acknowledged) {
          Swal.fire({
            icon: "success",
            title: "Recipe added successfully!",
          });
          form.reset();
        }
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Add a New Recipe
      </h2>
      <form onSubmit={handleAddRecipe} className="space-y-5">
        {/* Image URL */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Image URL</label>
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
          <label className="block text-gray-700 font-medium mb-1">Ingredients</label>
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
          <label className="block text-gray-700 font-medium mb-1">Instructions</label>
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
          <label className="block text-gray-700 font-medium mb-1">Cuisine Type</label>
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
          <label className="block text-gray-700 font-medium mb-1">Categories</label>
          <div className="flex flex-wrap gap-4 mt-2">
            {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"].map((category) => (
              <label key={category} className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  name="categories"
                  value={category}
                  className="accent-blue-500"
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        {/* Like Count (read-only) */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Like Count</label>
          <input
            type="number"
            name="likeCount"
            value="0"
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
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
