import express from "express";
import {
  deleteCategories,
  deleteSubCategories,
  getAllCategories,
  getAllCategoryById,
  getAllSubCategoriesByCategoryId,
  getAllSubCategoryById,
  insertcategory,
  insertSubcategory,
  updateCategories,
  updateSubCategories,
} from "../../controller/blog/categoryController.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const router = express.Router();

router.post("/insertcategory", verifyToken, insertcategory);

router.get("/getAllCategories", getAllCategories);

router.get("/getAllCategoryById/:id", getAllCategoryById);

router.put("/updateCategories/:id", updateCategories);

router.delete("/deleteCategories/:id", deleteCategories);

router.post("/insertSubCategory",verifyToken, insertSubcategory);

router.get("/getAllSubCategories/:id", getAllSubCategoriesByCategoryId);

router.get("/getSubCategoryById/:id", getAllSubCategoryById);

router.put("/updateSubCategory/:id", updateSubCategories);

router.delete("/deleteSubCategory/:id", deleteSubCategories);

export default router;
