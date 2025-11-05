import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const CategoryDataContext = createContext();

export const CategoryDataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  //   Insert category from API
  const insertCategory = async (category) => {
    try {
      const res = await axios.post(
        "http://localhost:7000/admin/categories/insertcategory",
        category
      );
      fetchAllCategories();
     // console.log(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  //   Insert blogs from API
  const fetchAllCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:7000/admin/categories/getAllCategories"
      );
      setCategories(res.data.Categories || []);
    } catch (error) {
      console.log(error);
    }
  };

 // categories.forEach(c => console.log(c));

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategoriesById = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:7000/admin/categories/getAllCategoryById/${id}`
      );
      //console.log(res.data);
      return res.data.Categories || null;
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategories = async (id, updateCategory) => {
    try {
      const res = await axios.put(
        `http://localhost:7000/admin/categories/updateCategories/${id}`,
        updateCategory
      );
     // console.log(res.data);
      fetchAllCategories();
      return res.data.Categories || null;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategories = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:7000/admin/categories/deleteCategories/${id}`
      );
      fetchAllCategories();
      return res.data.success || null;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CategoryDataContext.Provider
      value={{
        categories,
        setCategories,
        insertCategory,
        fetchAllCategories,
        fetchAllCategoriesById,
        updateCategories,
        deleteCategories,
      }}
    >
      {children}
    </CategoryDataContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryDataContext);



// SubCategory  context
export const SubCategoryContext = createContext();

export const SubCategoriesDataProvider = ({ children }) => {
  const [subCategories, setSubCategories] = useState([]);

  const insertSubCategory = async (subcategory) => {
    try {
      await axios.post(
        "http://localhost:7000/admin/categories/insertSubCategory",
        subcategory
      );
      getAllSubcategoryData(subcategory.category);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSubcategoryData = async (categoryId) => {
    try {
      const res = await axios.get(
        `http://localhost:7000/admin/categories/getAllSubCategories/${categoryId}`
      );
      // console.log(res.data)
      setSubCategories(res.data.Categories || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSubCategoryById = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:7000/admin/categories/getAllSubCategories/${id}`
      );
      return res.data.Categories || null;
    } catch (error) {
      console.log(error);
    }
  };

  const updateSubCategory = async (data, id) => {
    try {
      const res = await axios.put(
        `http://localhost:7000/admin/categories/updateSubCategory/${id}`,
        data
      );
      getAllSubcategoryData(res.data.Category.category);
      return res.data.Categories || null;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSubCategory = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:7000/admin/categories/deleteSubCategory/${id}`
      );
      getAllSubcategoryData(res.data.Category.category);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getAllSubcategoryData();
  // }, []);

  return (
    <SubCategoryContext.Provider
      value={{
        subCategories,
        insertSubCategory,
        getAllSubcategoryData,
        getAllSubCategoryById,
        updateSubCategory,
        deleteSubCategory,
      }}
    >
      {children}
    </SubCategoryContext.Provider>
  );
};

export const useSubCategory = () => useContext(SubCategoryContext);
