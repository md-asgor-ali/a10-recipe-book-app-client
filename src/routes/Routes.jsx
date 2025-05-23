import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import ErrorPage from "../pages/ErrorPage";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AllRecipeLayout from "../layouts/AllRecipeLayout";
import RecipeDetails from "../pages/RecipeDetails";
import Home from "../components/Home";
import PrivateRoute from "../pages/PrivateRoute";
import AddRecipe from './../pages/AddRecipe';
import AllRecipes from './../pages/AllRecipes';
import MyRecipes from "../pages/MyRecipes";
import Loading from "../components/Loading";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        path: "/",
        loader: () => fetch("http://localhost:5000/recipes"),
        Component: Home,
        hydrateFallbackElement:<Loading></Loading>
      },
      {
        path: "add-recipes",
        element:<PrivateRoute><AddRecipe></AddRecipe></PrivateRoute>
      },
        {
      path: "recipe/:id",
      loader: ({ params }) =>
        fetch(`http://localhost:5000/recipes/${params.id}`),
      Component: RecipeDetails,
      hydrateFallbackElement:<Loading></Loading>
    },
    {
      path:'my-recipes',
      Component:MyRecipes,
    }
    ],
  },
  {
    path: "/all",
    Component: AllRecipeLayout,
    children: [
      {
        path: "/all/all-recipes",
        loader: () => fetch("http://localhost:5000/recipes"),
        Component: AllRecipes,
        hydrateFallbackElement:<Loading></Loading>
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/*",
    Component: ErrorPage,
  },
]);

export default router;
