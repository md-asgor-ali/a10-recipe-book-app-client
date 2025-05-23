import React from "react";

const ExtraSection1 = () => {
  return (
    <div>
      <section className="bg-orange-50 w-11/12 mx-auto rounded-lg py-16 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-rose-600 mb-6">
            Why Choose Recipe<span className="text-orange-500">Book</span>?
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-12">
            Whether you're a beginner or a seasoned chef, RecipeBook helps you
            discover, save, and share amazing recipes from around the world.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-rose-500 mb-2">
                👨‍🍳 Easy to Use
              </h3>
              <p className="text-gray-600 text-sm">
                User-friendly interface makes browsing and adding recipes quick
                and seamless.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-orange-500 mb-2">
                🌍 Global Cuisine
              </h3>
              <p className="text-gray-600 text-sm">
                Explore thousands of recipes from different cultures and
                traditions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-lime-600 mb-2">
                💾 Save & Share
              </h3>
              <p className="text-gray-600 text-sm">
                Save your favorites, share with friends, or publish your own
                recipe collection.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExtraSection1;
