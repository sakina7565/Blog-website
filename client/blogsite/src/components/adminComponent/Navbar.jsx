import React from "react";
import { useNavigate } from "react-router-dom";

export default function NAvbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <header className="bg-gray-100 p-4 flex justify-between items-center shadow">
      <h1 className="text-lg font-bold">Blog Admin Dashboard</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Logout
      </button>
    </header>
  );
}
