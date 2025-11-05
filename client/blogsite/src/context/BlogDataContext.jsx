import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const BlogDataContext = createContext();

export const BlogDataProvider = ({ children }) => {
  const [blog, setBlog] = useState([]);

  const getBaseURL = () => {
    const role = localStorage.getItem("role")?.toLowerCase() || "admin";
    return `https://blog-backend.onrender.com/${role}/blog`;
  };

  const insertBlogs = async (blogData) => {
    try {
      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("content", blogData.content);
      formData.append("authorId", blogData.authorId);
      formData.append("categoryId", blogData.categoryId);
      formData.append("subCategoryId", blogData.subCategoryId);
      formData.append("tags", JSON.stringify(blogData.tags));
      if (blogData.blogImage) formData.append("blogImage", blogData.blogImage);
      formData.append("featured", JSON.stringify(blogData.featured));

      await axios.post(
        `${getBaseURL()}/insertblogs`,
        formData

        //form data is a built in method which create hearders itself for us, so we don't have need to create hearders manually
        // {
        // headers: { "Content-Type": "application/json" },
        // headers: { "Content-Type": "multipart/form-data" },
        // }
      );
      fetchAllBlogs();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllBlogs = async () => {
    try {
      const res = await axios.get(`${getBaseURL()}/fetchallblog`);
      setBlog(res.data.Blogs ? [...res.data.Blogs].reverse() : []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllBlogsById = async (id) => {
    try {
      const res = await axios.get(`${getBaseURL()}/fetchallblogByid/${id}`);
      return res.data.Blogs || null;
    } catch (error) {
      console.error(error);
    }
  };

  const updateBlog = async (id, blogData) => {
    try {
      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("content", blogData.content);
      formData.append("authorId", blogData.authorId);
      formData.append("categoryId", blogData.categoryId);
      formData.append("subCategoryId", blogData.subCategoryId);
      formData.append("tags", JSON.stringify(blogData.tags));

      // If user selected a new image file
      if (blogData.blogImage instanceof File) {
        formData.append("blogImage", blogData.blogImage);
      } else if (typeof blogData.blogImage === "string") {
        // keep existing image name if no new file is chosen
        formData.append("blogImage", blogData.blogImage);
      }

      await axios.put(`${getBaseURL()}/blogupdate/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchAllBlogs();
    } catch (error) {
      console.error("Update Blog Error:", error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${getBaseURL()}/blogdelete/${id}`);
      fetchAllBlogs();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  return (
    <BlogDataContext.Provider
      value={{
        blog,
        setBlog,
        insertBlogs,
        fetchAllBlogs,
        fetchAllBlogsById,
        updateBlog,
        deleteBlog,
      }}
    >
      {children}
    </BlogDataContext.Provider>
  );
};

export const useBlogs = () => useContext(BlogDataContext);
