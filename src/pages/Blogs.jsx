import React from "react";
import { FaUserCircle } from "react-icons/fa";


const blogPosts = [
  {
    id: 1,
    title: "Top 5 Healthy Recipes for Busy Weeknights",
    date: "May 20, 2025",
    author: "Chef Liza",
    content:
      "Discover simple and healthy recipes that can be made in under 30 minutes. Perfect for busy schedules!",
    image: "https://images.unsplash.com/photo-1625536059909-84924b9899ea?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    title: "The Art of Plating: Make Your Meals Instagram-Worthy",
    date: "May 18, 2025",
    author: "Foodie Jay",
    content:
      "Learn tips and tricks to make your food not only delicious but also beautiful on the plate.",
    image: "https://images.unsplash.com/photo-1512104894-6f61b18c1ff5?q=80&w=1292&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    title: "10 Essential Spices Every Kitchen Should Have",
    date: "May 15, 2025",
    author: "Spice Guru",
    content:
      "Build a powerful spice rack with these essential spices that will level up your cooking game.",
    image: "https://images.unsplash.com/photo-1599536884823-1bc4fb5f9dea?q=80&w=1088&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const Blogs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
     
      <h2 className="text-3xl font-bold text-center mb-10 text-lime-600">
        Latest Blog Posts
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2 text-lime-700">
                {post.title}
              </h3>
              <div className="flex items-center text-sm text-gray-500 mb-3 gap-2">
                <FaUserCircle className="text-gray-400" />
                <span>{post.author}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
              <p className="text-gray-700 mb-4">{post.content}</p>
              <button className="btn btn-sm bg-lime-600 text-white hover:bg-lime-500">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
