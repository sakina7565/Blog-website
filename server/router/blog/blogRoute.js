import express from "express";
import {
  deleteBlog,
  getAllBlogs,
  getAllBlogsById,
  insertBlog,
  updateBlog,
} from "../../controller/blog/blogController.js";
import upload from "../../middleware/upload.js";
import { verifyToken } from "../../middleware/verifyToken.js";
const router = express.Router();

router.post("/insertblogs", upload.single("blogImage"), verifyToken, insertBlog);

router.get("/fetchallblog", getAllBlogs);

router.get(
  "/fetchallblogByid/:id",getAllBlogsById
);

router.put("/blogupdate/:id", upload.single("blogImage"), updateBlog);

router.delete("/blogdelete/:id", deleteBlog);

export default router;
