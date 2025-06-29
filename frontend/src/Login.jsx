import React, { useState } from "react";
import axios from "axios"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async  ()=>{
    try{

      const userData= {
        email:email,
        password:password
      }
      console.log(userData)

      const response =  await axios.post("http://localhost:4000/users/login",userData)

      console.log(response)




    }catch(error){
      console.error("error agya",error)
    }
  }

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div className="w-full max-w-md bg-[#1e293b] p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h2>

        <div className="space-y-5">
          <div>
            <label className="text-white text-sm">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 bg-[#334155] text-white rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-orange-400 
                         transition duration-200"
            />
          </div>

          <div>
            <label className="text-white text-sm">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 bg-[#334155] text-white rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-orange-400 
                         transition duration-200"
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-2 bg-orange-500 text-white font-semibold rounded-md 
                       hover:bg-orange-600 transition duration-200"
          >
            Log In
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{" "}
          <span className="text-orange-400 hover:underline cursor-pointer">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
