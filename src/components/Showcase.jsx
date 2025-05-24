import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { Fade, Slide } from "react-awesome-reveal";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Showcase = () => {
  return (
    <div className=" w-11/12 mx-auto rounded-xl flex flex-col justify-center items-center text-center bg-gradient-to-br from-yellow-100 via-pink-100 to-lime-100 p-8">
      <Fade direction="down" cascade>
        <h1 className="text-5xl font-extrabold text-lime-600 mb-4">
          Welcome to <span className="text-orange-500">RecipeBook</span>
        </h1>
      </Fade>

      <Slide direction="up">
        <h2 className="text-2xl font-semibold text-gray-700">
          Discover{" "}
          <span className="text-rose-500">
            <Typewriter
              words={["Delicious Meals", "Top Recipes", "Healthy Ideas", "Your Favorites"]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </h2>
      </Slide>

      <Fade delay={300} direction="up" triggerOnce>
        <p
          className="text-gray-600 mt-6 text-lg max-w-xl"
          data-tooltip-id="hero-tip"
          data-tooltip-content="Browse or add your own amazing recipes!"
        >
          Your one-stop recipe book to browse, like, and share your favorite dishes.
        </p>
        <Tooltip id="hero-tip" place="top" />
      </Fade>

      <Slide direction="up" delay={500} triggerOnce>
        <button className="mt-10 px-6 py-3 bg-lime-600 text-white font-semibold rounded-full shadow-lg hover:bg-lime-700 transition duration-300">
          Get Started
        </button>
      </Slide>
    </div>
  );
};

export default Showcase;
