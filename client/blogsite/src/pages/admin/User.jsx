import React, { useState } from "react";
import SignupForm from "./SignupForm";
import { userData } from "../../context/UserDataContext";

export default function User() {
  const { allUser, deleteUser } = userData();
  const [search, setSearch] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [editId, setEditId] = useState(null);

  const deleteUsers = (index) => {
    if (window.confirm("Delete this user?")) {
      deleteUser(index);
    }
  };

  const filteredUsers = allUser.filter((u) =>
    (u?.role?.toLowerCase() || "").includes(search?.toLowerCase() || "")
  );

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h1 className="text-xl font-bold">User Management</h1>
        <button
          onClick={() => {
            setEditId(null);
            setShowSignup(true);
          }}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          ➕ Add User
        </button>
      </div>

      {/* Search & Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-1/2"
        />
        <p className="text-gray-600">Total Users: {allUser.length}</p>
      </div>

      {/* User List */}
      {filteredUsers.length === 0 ? (
        <p className="text-gray-500">No users found</p>
      ) : (
        filteredUsers.map((u, i) => (
          <div
            key={i}
            className="border p-4 rounded mb-4 bg-white shadow flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg">{u.name}</h3>
              <p className="text-gray-600">Role: {u.role}</p>
            </div>
            <div className="flex gap-2 mt-3 sm:mt-0">
              <button
                onClick={() => {
                  setEditId(u._id);
                  setShowSignup(true);
                }}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => deleteUsers(u._id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))
      )}

      {/* Signup Form Modal */}
      {showSignup && (
        <SignupForm
          id={editId}
          onClose={() => setShowSignup(false)}
          isAdminMode
        />
      )}
    </div>
  );
}
