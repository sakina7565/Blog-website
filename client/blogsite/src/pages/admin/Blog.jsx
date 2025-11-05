import { useEffect, useState } from "react";
import { useBlogs } from "../../context/BlogDataContext";
import { useNavigate } from "react-router-dom";
import { userData } from "../../context/UserDataContext";

export default function Blog() {
  const { blog, deleteBlog } = useBlogs();
  const [search, setSearch] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();
  const { fetchAllUser } = userData();

  useEffect(() => {
    console.log("blog page", blog);
  }, [blog]);

  // ✅ fetch all users once
  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchAllUser();
      setAllUsers(data || []);
    };
    loadUsers();
  }, [fetchAllUser]);

  const getBasePath = () => {
    const path = location.pathname;
    if (path.startsWith("/admin")) return "/admin";
    if (path.startsWith("/moderator")) return "/moderator";
    return "/admin";
  };

  const basePath = getBasePath();

  const addBlog = () => navigate(`${basePath}/addblog`);

  const deleteBlogById = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteBlog(id);
    }
  };

  const editBlog = (id) => navigate(`${basePath}/addblog/${id}`);

  const filteredBlogs = blog.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Helper: find author name
  const getAuthorName = (authorId) => {
    const author = allUsers.find((u) => u._id === authorId);
    return author ? author.role : "Unknown Author";
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h1 className="text-xl font-bold">Manage Blogs</h1>
        <button
          onClick={addBlog}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ➕ Add Blog
        </button>
      </div>

      {/* Search & Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-1/2"
        />
        <p className="text-gray-600">Total Blogs: {blog.length}</p>
      </div>

      {/* Blog List */}
      {filteredBlogs.length === 0 ? (
        <p className="text-gray-500">No blogs found</p>
      ) : (
        filteredBlogs.map((b, i) => (
          <div
            key={i}
            className=" border p-4 rounded mb-4 bg-white shadow flex flex-col sm:flex-row sm:items-center sm:justify-between "
          >
            <div>
              <div className=" w-full flex justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{b.title}</h3>
                  <p className="text-gray-600">{b.content}</p>
                </div>
                <img
                  className=" w-50 h-full object-fit-cover rounded-2xl"
                  src={`http://localhost:7000/images/${b.blogImage}`}
                />
              </div>
              <div className="flex justify-between mt-2">
                <p>✍️ {b.authorId.role}</p>
                <div className=" flex gap-1.5">
                  <p>{new Date(b.createdAt).toLocaleDateString()}</p>{" "}
                  {/* 📅 Date only */}
                  <p>{new Date(b.createdAt).toLocaleTimeString()}</p>{" "}
                  {/* ⏰ Time only */}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-3 sm:mt-0 flex-wrap ml-1.5">
              <button
                onClick={() => editBlog(b._id)}
                className="px-3 py-1 bg-yellow-500 w-full text-white rounded hover:bg-yellow-600 whitespace-nowrap"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => deleteBlogById(b._id)}
                className="px-3 py-1 bg-red-600 w-full text-white rounded hover:bg-red-700 whitespace-nowrap"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
