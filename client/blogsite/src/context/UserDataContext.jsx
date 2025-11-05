import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:7000";

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [allUser, setAllUser] = useState([]);
  const navigate = useNavigate();

  const getBaseURL = () => {
    const role = localStorage.getItem("role")?.toLowerCase() || "admin";
    return `https://blog-backend.onrender.com/${role}/user`;
  };

  const fetchAllUser = async () => {
    try {
      const res = await axios.get(`${getBaseURL()}/getalluser`, {
        withCredentials: true,
      });
      setAllUser(res.data.User || []);
      return res.data.User;
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users!");
    }
  };

  const insertUser = async (userData) => {
    try {
      const res = await axios.post(`${getBaseURL()}/insertUser`, userData);
      if (res.data.success) {
        toast.success("✅ User registered successfully!");
        fetchAllUser();
        return { success: true };
      }
      return res.data;
    } catch (error) {
      console.log("Error from backend:", error.response?.data);

      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const messages = errors.map((err) =>
          typeof err === "string" ? err : err.msg
        );

        messages.forEach((msg) => toast.error(`❌ ${msg}`));
        return { success: false, errors: messages };
      } else {
        toast.error("❌ Network error!");
        return { success: false };
      }
    }
  };

  const updateUser = async (id, userData) => {
    try {
      const res = await axios.put(`${getBaseURL()}/updateUser/${id}`, userData);
      if (res.data.success) {
        toast.success("✅ User updated successfully!");
        fetchAllUser();
      }
    } catch (error) {
      toast.error("❌ Failed to update user!");
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`${getBaseURL()}/deleteUser/${id}`);
      if (res.data.success) {
        toast.success("🗑️ User deleted successfully!");
        fetchAllUser();
      }
    } catch (error) {
      toast.error("❌ Failed to delete user!");
    }
  };

  const fetchAllUserById = async (id) => {
    try {
      const res = await axios.get(`${getBaseURL()}/getalluserbyid/${id}`);
      return res.data.User;
    } catch (error) {
      toast.error("❌ Could not fetch user!");
    }
  };

  useEffect(() => {
    fetchAllUser();
    authenticateUser();
  }, []);

  const login = async (data) => {
    try {
      const res = await axios.post(`${getBaseURL()}/login`, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.data);

      if (res.data.success) {
        await authenticateUser();
      } else {
        toast.error("Invalid login credentials");
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  const authenticateUser = async () => {
    try {
      const role = localStorage.getItem("role")?.toLowerCase() || "admin";
      const res = await axios.get(
        `http://localhost:7000/${role}/user/checkauth`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success && res.data.user) {
        const loggedUser = res.data.user;

        setUser(loggedUser);
        setRole(loggedUser.role);

        localStorage.setItem("user", JSON.stringify(loggedUser));
        localStorage.setItem("role", loggedUser.role);

        // Redirect based on role
        if (loggedUser.role.toLowerCase() === "admin") {
          navigate("/admin/dashboard");
        } else if (loggedUser.role.toLowerCase() === "moderator") {
          navigate("/moderator/dashboard");
        } else {
          navigate("/user");
        }

        return true;
      } else {
        setUser(null);
        setRole(null);
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        return false;
      }
    } catch (error) {
      setUser(null);
      setRole("user");

      if (error.response && error.response.status === 401) {
        // Token expired or invalid — clear localStorage and cookie
        console.log("Session expired. Logging out...");
        localStorage.clear();

        await axios.post(
          `${getBaseURL()}/logout`,
          {},
          { withCredentials: true }
        );

      }
      return false;
    }
  };

  const logout = async () => {
    try {
      const res = await axios.post(`${getBaseURL()}/logout`);
      if (res.data.success) {
        toast.success("👋 Logout successfully!");
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <UserDataContext.Provider
      value={{
        user,
        role,
        allUser,
        insertUser,
        fetchAllUser,
        fetchAllUserById,
        updateUser,
        deleteUser,
        login,
        authenticateUser,
        logout,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const userData = () => useContext(UserDataContext);
