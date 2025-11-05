import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userData } from "../../context/UserDataContext";

export default function Sidebar({ userRole = "admin" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = userData();

  // Get the base path based on current route
  const getBasePath = () => {
    const path = location.pathname;
    if (path.startsWith("/admin")) return "/admin";
    if (path.startsWith("/moderator")) return "/moderator";
    return "/admin";
  };

  const basePath = getBasePath();

  // ✅ Logout handler
  const handleLogout = () => {
    logout();
    // Redirect to login page
    navigate("/");
  };

  return (
    <aside className="w-64 bg-white shadow-lg h-screen p-4">
      <div>
        <h2 className="font-bold text-xl mb-6">
          {userRole === "admin" ? "Admin" : "Moderator"} Panel
        </h2>
        <nav className="space-y-3">
          <Link
            to={`${basePath}/dashboard`}
            className="block p-2 hover:bg-gray-100 rounded"
          >
            🏠 Dashboard
          </Link>
          <Link
            to={`${basePath}/blogs`}
            className="block p-2 hover:bg-gray-100 rounded"
          >
            📝 Blogs
          </Link>
          <Link
            to={`${basePath}/categories`}
            className="block p-2 hover:bg-gray-100 rounded"
          >
            📂 Categories
          </Link>
          {/* Only show Users link for Admin */}
          {userRole?.toLowerCase() === "admin" && (
            <Link
              to={`${basePath}/users`}
              className="block p-2 hover:bg-gray-100 rounded"
            >
              👥 Users
            </Link>
          )}
          <Link
            to={`${basePath}/settings`}
            className="block p-2 hover:bg-gray-100 rounded"
          >
            ⚙️ Settings
          </Link>
        </nav>
      </div>

      {/* ✅ Logout Button at Bottom */}
      <button
        onClick={handleLogout}
        className="mt-6 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
      >
        🚪 Logout
      </button>
    </aside>
  );
}
