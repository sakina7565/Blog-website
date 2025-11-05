import React, { useEffect } from "react";
import {
  useSubCategory,
  useCategory,
} from "../../../context/CategoryDataContext";
import { useBlogs } from "../../../context/BlogDataContext";
import { useNavigate } from "react-router-dom";

export default function CategroiesPage() {
  const { subCategories, getAllSubcategoryData } = useSubCategory();
  const { categories, fetchAllCategories } = useCategory();
  const { blog } = useBlogs();
  const navigate = useNavigate();

  const findCurrentCategory = categories.find((cat) => cat.current === true);
  if (!findCurrentCategory) return null;

  const id = findCurrentCategory._id;

  useEffect(() => {
    fetchAllCategories();
    getAllSubcategoryData(id);
  }, []);

  const filteredcurrentSubcategory = subCategories.filter(
    (sub) => sub.category === id
  );

  const findrelatedBlog = blog.filter((blog) => blog.categoryId?._id == id);

  const sendTosubcategory = (id) => navigate(`/user/subcategory/${id}`);

  return (
    <>
      <section className="w-full px-6 sm:px-12 py-10 bg-gradient-to-b from-white to-gray-50 min-h-screen">
        {/* Category Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2 capitalize">
            {findCurrentCategory.name}
          </h1>
          <p className="text-gray-500 text-lg">
            Explore subcategories related to this topic
          </p>
        </div>

        {/* Subcategories Grid */}
        <div className="flex justify-center">
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl w-full place-items-center ">
            {filteredcurrentSubcategory.length > 0 ? (
              filteredcurrentSubcategory.map((cat, idx) => (
                <div
                  key={idx}
                  className="w-72 h-[22rem] sm:w-64 md:w-72 flex flex-col justify-between items-center text-center p-6 rounded-2xl shadow-md border border-gray-200 bg-white hover:bg-blue-50 hover:shadow-lg transition-all duration-300 "
                >
                  {/* Icon Circle */}
                  <div className="flex items-center justify-center w-16 h-16 mb-3 rounded-full bg-blue-100 text-blue-600 text-2xl font-bold">
                    {cat.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold text-gray-800 mb-1 capitalize">
                    {cat.name}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-500 text-sm flex-1 line-clamp-3">
                    {cat.description ||
                      "Click to explore more about this subcategory."}
                  </p>

                  {/* Button */}
                  <button
                    onClick={() => sendTosubcategory(cat._id)}
                    className="mt-4 inline-block px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                  >
                    Explore
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">
                No subcategories found for this category.
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="w-full px-6 sm:px-12 pb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Blogs Related to {findCurrentCategory.name}
        </h2>

        {findrelatedBlog.length > 0 ? (
          <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                  >
                    Category
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {findrelatedBlog.map((blog, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-blue-50 transition duration-200 ease-in-out"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                      {idx + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">
                      <button
                        onClick={() =>
                          sendTosubcategory(blog.subCategoryId._id)
                        }
                      >
                        {blog.title}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 capitalize">
                      {blog.subCategoryId?.name || findCurrentCategory.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-5">
            No blogs found for this category.
          </p>
        )}
      </div>
    </>
  );
}
