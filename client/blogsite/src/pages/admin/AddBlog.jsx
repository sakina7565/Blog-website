import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogs } from "../../context/BlogDataContext";
import { useCategory, useSubCategory } from "../../context/CategoryDataContext";
import { userData } from "../../context/UserDataContext";
import { useNotifications } from "../../context/NotificationContext";

export default function AddBlog() {
  const { user } = userData();
  const { insertBlogs, updateBlog, fetchAllBlogsById } = useBlogs();
  const { categories, fetchAllCategories } = useCategory();
  const { getAllSubcategoryData, subCategories } = useSubCategory();
  const [form, setForm] = useState({
    title: "",
    content: "",
    authorId: "",
    categoryId: "",
    subCategoryId: "",
    tags: "",
    blogImage: null,
    featured: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (user?.id) {
      setForm((prev) => ({
        ...prev,
        authorId: user.id,
      }));
    }
    console.log(user)
  }, [user]);

  useEffect(() => {
    const loadBlog = async () => {
      if (id) {
        const blog = await fetchAllBlogsById(id); // backend se data
        if (blog) {
          setForm({
            ...blog,
            tags: blog.tags.join(", "),
            categoryId: blog.categoryId,
            subCategoryId: blog.subCategoryId,
          });

          // Subcategories bhi load karo
          if (blog.categoryId) {
            getAllSubcategoryData(blog.categoryId);
          }
        }
      }
    };
    loadBlog();
  }, [id]);

  // ✅ Fetch all categories from backend
  useEffect(() => {
    fetchAllCategories();
  }, []);

  // ✅ Fetch subcategories when category changes
  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setForm({ ...form, categoryId });

    getAllSubcategoryData(categoryId);
  };

  const getBasePath = () => {
    const path = location.pathname;
    if (path.startsWith("/admin")) return "/admin";
    if (path.startsWith("/moderator")) return "/moderator";
    return "/admin";
  };

  const basePath = getBasePath();

  // ✅ Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const blogData = {
      ...form,
      authorId: user?.id,
      tags: form.tags.split(",").map((tag) => tag.trim()),
    };

    console.log("🧾 Blog Data Sending to Backend:", blogData);

    if (id) {
      updateBlog(id, blogData);
    } else {
      insertBlogs(blogData);
    }
    navigate(`${basePath}/blogs`);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "✏️ Edit Blog" : "➕ Add Blog"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Blog Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <textarea
          placeholder="Blog Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          rows="4"
          required
        />

        <input
          type="text"
          placeholder="Author ID"
          value={user ?  user.role || user.name : "Unknown"}
          //onChange={(e) => setForm({ ...form, authorId: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
          readOnly
        />

        {/* Category Dropdown */}
        <select
          value={form.categoryId}
          onChange={handleCategoryChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* SubCategory Dropdown (sirf tab dikhe jab category select ho) */}
        {form.categoryId && (
          <select
            value={form.subCategoryId}
            onChange={(e) =>
              setForm({ ...form, subCategoryId: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select SubCategory</option>
            {subCategories.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>
        )}

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="file"
          name="blogImage"
          onChange={(e) => setForm({ ...form, blogImage: e.target.files[0] })}
          className="w-full border px-3 py-2 rounded"
        />

        {/* {form.blogImage && (
          <p className="text-sm text-gray-500 mt-1">
            Selected file: {form.blogImage.name}
          </p>
        )} */}

        {/* featured Dropdown */}
        <select
          value={form.featured}
          onChange={(e) => setForm({ ...form, featured: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Features</option>
          <option value="true">Featured</option>
          <option value="false">Non Featured</option>
        </select>

        {/* Show existing or newly selected image */}
        {form.blogImage ? (
          typeof form.blogImage === "string" ? (
            // Existing image from backend
            <div className="mt-2">
              <img
                src={`http://localhost:7000/images/${form.blogImage}`}
                alt="Existing blog"
                className="w-32 h-32 object-cover rounded"
              />
              <p className="text-sm text-gray-500 mt-1">(Current image)</p>
            </div>
          ) : (
            // Newly uploaded image
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Selected file: {form.blogImage.name}
              </p>
              <img
                src={URL.createObjectURL(form.blogImage)}
                alt="Preview"
                className="w-32 h-32 object-cover rounded mt-1"
              />
            </div>
          )
        ) : null}

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {id ? "Update Blog ✅" : "Save Blog ✅"}
        </button>
      </form>
    </div>
  );
}
