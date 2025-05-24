import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { createUser, setUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    console.log({ name, photo, email, password });

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordPattern.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be at least 6 characters, include uppercase, lowercase, and a number.",
      });
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: `Welcome, ${name}!`,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
        });
      });
  };

  const handleGoogleSignIn = () => {
    googleLogin()
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Google Sign-In Successful",
          text: `Welcome, ${result.user.displayName || "User"}!`,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Sign-In Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="card bg-base-100 mx-auto mt-16 w-full max-w-sm shadow-xl border border-gray-200">
      <Helmet>
        <title>Register || Recipe Book</title>
      </Helmet>
      <h1 className="text-4xl text-center font-bold pt-8 pb-2 text-gray-700">
        Register
      </h1>
      <div className="card-body">
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label className="label font-medium text-sm text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              placeholder="Your name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="label font-medium text-sm text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="label font-medium text-sm text-gray-700">
              Photo URL
            </label>
            <input
              type="text"
              name="photo"
              className="input input-bordered w-full"
              placeholder="Your photo URL"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="label font-medium text-sm text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full"
              placeholder="Create a strong password"
              required
            />
          </div>

          {/* Register Button */}
          <button type="submit" className="btn btn-neutral w-full">
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-sm">OR</div>

        {/* Google Login */}
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border border-gray-300 w-full"
        >
          <svg
            aria-label="Google logo"
            width="20"
            height="20"
            viewBox="0 0 512 512"
            className="mr-2"
          >
            <path
              fill="#EA4335"
              d="M113 309l-15 58-57 1c-22-40-35-86-35-135s13-95 35-135l51 1 22 51c-9 26-13 54-13 83 0 29 4 57 12 83z"
            />
            <path
              fill="#34A853"
              d="M256 112c35 0 66 12 91 32l68-67C372 33 318 8 256 8c-94 0-174 54-214 133l61 48c26-74 97-127 179-127z"
            />
            <path
              fill="#4A90E2"
              d="M256 504c62 0 117-24 157-64l-67-54c-25 19-56 30-90 30-82 0-153-53-179-126l-61 48c39 79 120 133 214 133z"
            />
            <path
              fill="#FBBC05"
              d="M413 219H256v81h89c-12 33-37 58-89 58-53 0-98-36-114-85l-61 48c28 57 88 97 160 97 93 0 168-75 168-168 0-11-1-22-3-32z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Login Link */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
