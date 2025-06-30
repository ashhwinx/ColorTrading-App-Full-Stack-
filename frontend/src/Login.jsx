import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ prevent default form reload
    setLoading(true);
    try {
      const userData = {
        email: email,
        password: password,
      };

      const response = await axios.post("https://colortrading-app-full-stack.onrender.com/users/login", userData);

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#1e293b] p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>

        <div className="space-y-5">
          <div>
            <label className="text-white text-sm">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 bg-[#334155] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
            />
          </div>

          <div>
            <label className="text-white text-sm">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 bg-[#334155] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-200 flex items-center justify-center"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            ) : (
              "Log In"
            )}
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-orange-400 hover:underline cursor-pointer">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
