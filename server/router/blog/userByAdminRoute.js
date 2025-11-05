import express from "express";
const router = express.Router();
import {
  authStatus,
  deleteUser,
  getAlluser,
  getAllUserById,
  insertUser,
  login,
  logOut,
  updateUser,
} from "../../controller/blog/userByAdminController.js";


router.post("/insertUser", insertUser);

router.post("/login", login);

router.post("/logout", logOut);

router.get('/checkauth', authStatus)

router.get("/getalluser", getAlluser);

router.get("/getalluserbyid/:id", getAllUserById);

router.put("/updateUser/:id", updateUser);

router.delete("/deleteUser/:id", deleteUser);

export default router;
