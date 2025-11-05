import React from "react";
import { useParams } from "react-router-dom";
import { useBlogs } from "../../../context/BlogDataContext";
import { useNavigate } from "react-router-dom";

export default function SubCategoryPage() {
  const { blog } = useBlogs();
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id)
    return (
      <p className="text-center text-gray-600 mt-10">Sorry, no blog found.</p>
    );

  const filteredBlogs = blog.filter((b) => b.subCategoryId?._id === id);

  if (filteredBlogs.length === 0) {
    return (
      <p className="text-center text-gray-600 mt-10">
        No blogs available for this subcategory.
      </p>
    );
  }

  const singleBlog = (id) => navigate(`/user/singleblog/${id}`);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Subcategory Blogs
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Discover insightful posts from this subcategory.
        </p>
      </div>

      <div
        className="
          grid gap-8
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          justify-items-center
        "
      >
        {filteredBlogs.map((b, idx) => (
          <div
            key={idx}
            className="
              bg-white rounded-2xl shadow-md hover:shadow-xl
              transition-shadow duration-300
              overflow-hidden flex flex-col
              w-full sm:w-[90%] md:w-[85%] lg:w-[80%]
            "
          >
            {/* Blog Image */}
            <img
              src={`http://localhost:7000/images/${b.blogImage}`}
              alt={b.title}
              className="w-full h-48 object-cover"
            />

            {/* Blog Content */}
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                {b.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                {b.content}
              </p>

              <button
                onClick={() => singleBlog(b._id)}
                className="
                  mt-auto inline-block bg-blue-600 text-white
                  py-2 px-5 rounded-lg text-sm font-medium
                  hover:bg-blue-700 transition
                "
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
