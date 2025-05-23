import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const MyRecipes = () => {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user?.email) return; // Guard clause to avoid error

    fetch(`http://localhost:5000/recipes?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/recipes/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setRecipes(recipes.filter((recipe) => recipe._id !== id));
            Swal.fire("Deleted!", "Your recipe has been deleted.", "success");
          });
      }
    });
  };

  const openUpdateModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedRecipe = {
      title: form.title.value,
      image: form.image.value,
      ingredients: form.ingredients.value,
      instructions: form.instructions.value,
      cuisine: form.cuisine.value,
      prepTime: form.prepTime.value,
      categories: Array.from(form.categories)
        .filter((input) => input.checked)
        .map((input) => input.value),
    };

    fetch(`http://localhost:5000/recipes/${selectedRecipe._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRecipe),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Updated!", "Your recipe has been updated.", "success");
        setIsModalOpen(false);
        setSelectedRecipe(null);
        // Refresh UI
        fetch(`http://localhost:5000/recipes?email=${user.email}`)
          .then((res) => res.json())
          .then((data) => setRecipes(data));
      });
  };

  if (!user) {
    return (
      <p className="text-center mt-10 text-lg font-semibold">
        Please log in to view your recipes.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">My Recipes</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="bg-white shadow rounded-lg p-4">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="text-xl font-semibold">{recipe.title}</h3>
            <p>
              <strong>Ingredients:</strong> {recipe.ingredients}
            </p>
            <p>
              <strong>Instructions:</strong> {recipe.instructions}
            </p>
            <p>
              <strong>Cuisine:</strong> {recipe.cuisine}
            </p>
            <p>
              <strong>Preparation Time:</strong> {recipe.prepTime} mins
            </p>
            <p>
              <strong>Categories:</strong> {recipe.categories?.join(", ")}
            </p>
            <p>
              <strong>Likes:</strong> {recipe.likeCount}
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => openUpdateModal(recipe)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(recipe._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {isModalOpen && selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-lg max-w-lg w-full"
          >
            <h3 className="text-2xl font-bold mb-4">Update Recipe</h3>
            <input
              defaultValue={selectedRecipe.title}
              name="title"
              placeholder="Title"
              className="input input-bordered w-full mb-2"
              required
            />
            <input
              defaultValue={selectedRecipe.image}
              name="image"
              placeholder="Image URL"
              className="input input-bordered w-full mb-2"
              required
            />
            <textarea
              defaultValue={selectedRecipe.ingredients}
              name="ingredients"
              placeholder="Ingredients"
              className="textarea textarea-bordered w-full mb-2"
              required
            />
            <textarea
              defaultValue={selectedRecipe.instructions}
              name="instructions"
              placeholder="Instructions"
              className="textarea textarea-bordered w-full mb-2"
              required
            />
            <select
              name="cuisine"
              defaultValue={selectedRecipe.cuisine}
              className="select select-bordered w-full mb-2"
              required
            >
              <option>Italian</option>
              <option>Mexican</option>
              <option>Indian</option>
              <option>Chinese</option>
              <option>Others</option>
            </select>
            <input
              defaultValue={selectedRecipe.prepTime}
              name="prepTime"
              type="number"
              placeholder="Preparation Time"
              className="input input-bordered w-full mb-2"
              required
            />

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Categories:</label>
              {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"].map(
                (cat) => (
                  <label key={cat} className="mr-3">
                    <input
                      type="checkbox"
                      name="categories"
                      value={cat}
                      defaultChecked={selectedRecipe.categories?.includes(cat)}
                      className="mr-1"
                    />
                    {cat}
                  </label>
                )
              )}
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
