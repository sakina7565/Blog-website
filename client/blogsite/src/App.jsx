import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/user/Home";
import Dashboard from "./pages/admin/Dashboard";
import Blog from "./pages/admin/Blog";
import Login from "./pages/admin/Login";
import Categories from "./pages/admin/Categories";
import User from "./pages/admin/User";
import Setting from "./pages/admin/Setting";
import Sidebar from "./components/adminComponent/Sidebar";
import SubCategories from "./pages/admin/SubCategories";
import AddBlog from "./pages/admin/AddBlog";
import ProtectedRoute from "./context/ProtectedRoute";
import SignupForm from "./pages/admin/SignupForm";
import UserCategories from "./pages/user/Categories";
import SubCategory from "./pages/user/SubCategory";
import UserLayout from "./pages/user/UserLayout";
import SingleBlog from "./pages/user/SingleBlog";
// ✅ Shared Admin Layout
const AdminLayout = ({ userRole }) => (
  <div className="flex">
    <Sidebar userRole={userRole} />
    <main className="flex-1 p-6">
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="blogs" element={<Blog />} />
        <Route path="addblog" element={<AddBlog />} />
        <Route path="addblog/:id" element={<AddBlog />} />
        <Route path="categories" element={<Categories />} />
        <Route path="subcategories/:id" element={<SubCategories />} />
        {/* Only show Users page for Admin */}
        {userRole?.toLowerCase() === "admin" && (
          <>
            <Route path="users" element={<User />} />
            <Route path="signupform" element={<SignupForm />} />
            <Route path="signupform/:id" element={<SignupForm />} />
          </>
        )}
        <Route path="settings" element={<Setting />} />
      </Routes>
    </main>
  </div>
);

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<Login />} />

      {/* Admin routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout userRole="admin" />
          </ProtectedRoute>
        }
      />

      {/* Moderator routes */}
      <Route
        path="/moderator/*"
        element={
          <ProtectedRoute allowedRoles={["moderator", "admin"]}>
            <AdminLayout userRole="moderator" />
          </ProtectedRoute>
        }
      />

      {/* Public user */}

      <Route path="/user" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="category" element={<UserCategories />} />
        <Route path="subcategory/:id" element={<SubCategory />} />
        <Route path="singleblog/:id" element={<SingleBlog />} />
      </Route>
    </Routes>
  );
}

export default App;
