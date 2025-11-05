import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../context/UserDataContext";
import blogsiteLogo from "../../assets/Images/blogsiteLogo.png";
import SignupForm from "./SignupForm";

export default function Login() {
  const [showSignup, setShowSignup] = useState(false);
  const { login } = userData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    confrimPassword: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.email && formData.confrimPassword) {
      const loginData = {
        email: formData.email.trim(),
        confirmedPassword: formData.confrimPassword.trim(),
      };
      login(loginData);
    } else {
      alert("Please fill in both email and password.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          <span className=" flex flex-col justify-center items-center">
            Welcome to
            <img src={blogsiteLogo} alt="Blogsite Logo" className="w-32 mt-2" />
          </span>
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={formData.confrimPassword}
          onChange={(e) =>
            setFormData({ ...formData, confrimPassword: e.target.value })
          }
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        {/* Forgot Password */}
        <div className="text-center mt-3">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {/* Register Now */}
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <button
            type="button"
            onClick={() => setShowSignup(true)}
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            Register Now
          </button>
        </div>
      </form>

      {showSignup && <SignupForm onClose={() => setShowSignup(false)} />}
    </div>
  );
}
