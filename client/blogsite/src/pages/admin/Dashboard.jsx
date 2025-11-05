import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogs } from "../../context/BlogDataContext";
import { userData } from "../../context/UserDataContext";
import { useCategory } from "../../context/CategoryDataContext";
import { useNotifications } from "../../context/NotificationContext";

export default function Dashboard() {
  const { notifications } = useNotifications();
  const navigate = useNavigate();
  const { blog, fetchAllBlogs } = useBlogs();
  const { allUser, fetchAllUser } = userData();
  const { categories, fetchAllCategories } = useCategory();

  useEffect(() => {
    // ✅ Only fetch if empty to avoid duplicate calls
    if (blog.length === 0) fetchAllBlogs();
    if (categories.length === 0) fetchAllCategories();
    if (allUser.length === 0) fetchAllUser();
  }, []);

  const handleClick = (text) => {
    if (text === "Add New Blog") navigate(`/admin/addblog`);
    if (text === "Manage Categories") navigate(`/admin/categories`);
    if (text === "View Users") navigate(`/admin/users`);
  };

  return (
    <div className="p-4 sm:p-6 ">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded-lg shadow text-center">
          <p className="text-lg font-semibold">Total Blogs</p>
          <p className="text-2xl font-bold">{blog.length}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg shadow text-center">
          <p className="text-lg font-semibold">Categories</p>
          <p className="text-2xl font-bold">{categories.length}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg shadow text-center">
          <p className="text-lg font-semibold">Users</p>
          <p className="text-2xl font-bold">{allUser.length}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button
          onClick={() => handleClick("Add New Blog")}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add New Blog
        </button>
        <button
          onClick={() => handleClick("Manage Categories")}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          Manage Categories
        </button>
        <button
          onClick={() => handleClick("View Users")}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          View Users
        </button>
      </div>

      {/* Two Column Layout (Recent Blogs + Notifications) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Blogs */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Recent Blogs</h2>
          <ul className="space-y-2">
            {blog.slice(0, 3).map((b, i) => {
              const preview =
                b.content.split(" ").slice(0, 20).join(" ") + "...";
              return (
                <li key={i} className="border-b pb-2">
                  <div className="font-semibold">📌 {b.title}</div>
                  <div className="text-gray-600">{preview}</div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Notifications */}
        {/* <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Notifications</h2>
          <ul className="space-y-2">
            <li className="text-sm text-gray-700">✅ New user registered</li>
            <li className="text-sm text-gray-700">
              ✍️ Blog post “React Hooks Guide” updated
            </li>
            <li className="text-sm text-gray-700">
              ⚡ System maintenance scheduled
            </li>
          </ul>
        </div> */}

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Notifications</h2>
          {notifications.length === 0 ? (
            <p className="text-gray-500">No new notifications</p>
          ) : (
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {notifications.map((note) => (
                <li
                  key={note.id}
                  className={`text-sm p-2 rounded ${
                    note.type === "success"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {note.message}{" "}
                  <span className="text-xs text-gray-500">({note.time})</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Stats / Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">Blog Stats</h2>
        <div className="h-48 flex items-center justify-center text-gray-500">
          📊 Chart Placeholder
        </div>
      </div>
    </div>
  );
}
