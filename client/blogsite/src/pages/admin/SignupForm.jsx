import React, { useEffect, useState } from "react";
import { userData } from "../../context/UserDataContext";
import blogsiteLogo from "../../assets/Images/blogsiteLogo.png";
import { replace, useNavigate } from "react-router-dom";
import { useNotifications } from "../../context/NotificationContext";

export default function SignupForm({ id, onClose, isAdminMode = false }) {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const { insertUser, fetchAllUserById, updateUser } = userData();
  console.log(id);

  const [formData, setFormData] = useState({
    fullName: "",
    role: isAdminMode ? "" : "User",
    email: "",
    password: "",
    confirmedPassword: "",
    phone: "",
    address: "",
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      if (id) {
        const user = await fetchAllUserById(id);
        console.log(user);
        if (user) {
          setFormData({
            fullName: user.fullName,
            role: user.role,
            email: user.email,
            phone: user.phone,
            address: user.address,
          });
        }
      }
    };
    loadUser();
  }, [id]);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!formData) {
        setStatus("❌ Something went wrong");
        return;
      }

      if (formData.password !== formData.confirmedPassword) {
        setError("Passwords do not match!");
        return;
      }

      if (!formData.fullName || !formData.role) {
        setError("Name and Role are required!");
        return;
      }

      setError("");

      const dataToSend = {
        fullName: formData.fullName,
        role: formData.role,
        email: formData.email,
        confirmedPassword: formData.confirmedPassword,
        phone: formData.phone,
        address: formData.address,
      };

      if (id) {
        await updateUser(id, dataToSend);
        onClose();
      } else {
        const result = await insertUser(dataToSend);
        if (result?.success) {
          setStatus("✅ User registered successfully!");
          addNotification("🆕 New user registered successfully!", "success");
          // if (!isAdminMode) {
          //   navigate("/", { replace: true });
          // }
          onClose();
        } else {
          setStatus("❌ Please fix the errors and try again.");
        }
      }
      onClose();
    } catch (error) {
      console.error(error);
      setStatus("❌ Network error. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50 bg-no-repeat bg-center bg-contain"
      style={{
        backgroundImage: `url(${blogsiteLogo})`,
        backgroundColor: "rgba(255,255,255,0.7)",
        backgroundBlendMode: "lighten",
      }}
    >
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold text-center mb-4">
          {id ? "Edit User" : "Registration form"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {isAdminMode && (
            <div>
              <label className="block text-sm font-semibold">Role</label>
              <select
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">-- Select Role --</option>
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {!id && (
            <>
              <div>
                <label className="block text-sm font-semibold">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmedPassword"
                  value={formData.confirmedPassword}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-semibold">Phone</label>
            <input
              type="number"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold">Address</label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {id ? "Update User" : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
}
