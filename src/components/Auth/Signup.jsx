import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/authSlice";
import { useSelector } from "react-redux";

const Signup = () => {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const bgColor = isDark ? "bg-[#0e0e3d]" : "bg-[#f2f2f2]";
  const cardColor = isDark ? "bg-[#1f1f4a]" : "bg-white";
  const textColor = isDark ? "text-white" : "text-black";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    if (email && password && name) {
      dispatch(loginSuccess({ email }));
      navigate("/");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgColor} transition duration-300`}>
      <div className={`w-full max-w-md p-8 rounded-2xl shadow-lg ${cardColor}`}>
        <h2 className={`text-3xl font-bold mb-6 text-center ${textColor}`}>
          Join <span className="text-blue-500">Game Verse</span>
        </h2>
        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className={`block mb-2 text-sm font-medium ${textColor}`}>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className={`block mb-2 text-sm font-medium ${textColor}`}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className={`block mb-2 text-sm font-medium ${textColor}`}>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2.5 rounded-lg hover:from-purple-700 hover:to-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
        <p className={`mt-6 text-center text-sm ${isDark ? "text-white/60" : "text-black/60"}`}>
          Already have an account?
          <button
            onClick={() => navigate("/login")}
            className="ml-1 text-blue-500 hover:underline"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
