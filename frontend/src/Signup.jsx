import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [money, setMoney] = useState(1000);
  const [loading, setLoading] = useState(false); // ✅ loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ prevent default form reload
    setLoading(true);
    try {
      const userData = {
        fullName,
        email,
        password,
        money,
      };

      const response = await axios.post(`https://colortrading-app-full-stack.onrender.com/users/register`, userData);

      if (response.status === 201) {
        alert("SignUp Successfully");
        navigate("/");
      }

      setEmail("");
      setFullName("");
      setPassword("");
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <form
        onSubmit={handleSubmit} // ✅ form handles Enter key
        className="w-full max-w-md bg-[#1e293b] p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">Create Account</h2>

        <div className="space-y-5">
          <div>
            <label className="text-white text-sm">Name</label>
            <input
              type="text"
              name="fullName"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your name"
              className="w-full mt-1 px-4 py-2 bg-[#334155] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
            />
          </div>

          <div>
            <label className="text-white text-sm">Email</label>
            <input
              type="email"
              name="email"
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
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
              placeholder="Create a password"
              className="w-full mt-1 px-4 py-2 bg-[#334155] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
            />
          </div>

          {/* Submit Button */}
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
              "Sign Up"
            )}
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-orange-400 hover:underline cursor-pointer">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

