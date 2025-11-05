import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlogs } from "../../../context/BlogDataContext";
import { useCategory } from "../../../context/CategoryDataContext";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function SingleBlogPage() {
  const { blog, fetchAllBlogs } = useBlogs();
  const { categories } = useCategory();
  const { id } = useParams();
  const navigate = useNavigate();
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  if (blog.length === 0) {
    return <p className="text-center text-gray-500 py-10">Loading blog...</p>;
  }

  const filteredBlog = blog.find((b) => b._id === id);
  if (!filteredBlog) {
    return <p className="text-center text-gray-500 py-10">Blog not found.</p>;
  }

  const handleToggleContent = () => setShowFullContent(!showFullContent);

  const findCategory = categories.find((cat) => cat.current === true);
  const categoryId = findCategory?._id;
  const relatedBlogs = blog
    .filter((b) => b.categoryId?._id === categoryId && b._id !== id)
    .slice(0, 6); // show up to 6 suggestions

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Main Blog Section */}
      <section className="max-w-6xl mx-auto p-6 sm:p-10 bg-white rounded-2xl shadow-lg mt-10">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 text-center">
          {filteredBlog.title}
        </h1>

        {/* Image + Content */}
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={`http://localhost:7000/images/${filteredBlog.blogImage}`}
              alt={filteredBlog.title}
              className="w-full max-w-md h-auto md:h-[400px] object-contain rounded-xl shadow-md bg-gray-100 p-2 hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="w-full md:w-1/2 text-gray-700 leading-relaxed">
            <p
              className={`text-lg transition-all duration-500 ${
                showFullContent ? "line-clamp-none" : "line-clamp-4"
              }`}
            >
              {filteredBlog.content}
            </p>

            <div className="flex justify-center mt-4">
              <button
                onClick={handleToggleContent}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
              >
                {showFullContent ? (
                  <>
                    Show Less <ChevronUp className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Read More <ChevronDown className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Blogs Section */}
      {relatedBlogs.length > 0 && (
        <section className="max-w-6xl mx-auto mt-12 px-6 sm:px-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center border-b pb-3">
            You Might Also Like
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedBlogs.map((b) => (
              <div
                key={b._id}
                onClick={() => navigate(`/user/singleblog/${b._id}`)}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden flex flex-col"
              >
                <img
                  src={`http://localhost:7000/images/${b.blogImage}`}
                  alt={b.title}
                  className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
                />

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {b.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {b.content}
                  </p>

                  <button className="mt-auto text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
