import { userByAdmin } from "../../model/blog/userByAdminModel.js";
import NotificationModel from "../../model/blog/NotificationModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";

export const insertUser = async (req, res) => {
  try {
    const { fullName, role, email, confirmedPassword, phone, address } =
      req.body;
    const hasedPassword = await bcrypt.hash(confirmedPassword, 10);

    const newUser = new userByAdmin({
      fullName,
      role,
      email,
      confirmedPassword: hasedPassword,
      phone,
      address,
      isMfaActive: false,
    });

    const user = await newUser.save();
    await NotificationModel.create({
      message: `📁New user "${user.name}" added`,
      type: "success",
      createdBy: req.user._id,
      relatedModel: "userByAdmin",
      relatedId: user._id,
    });
    res
      .status(201)
      .json({ success: true, message: "User Registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user ", message: error });
  }
};

export const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res
        .status(400)
        .json({ message: info?.message || "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email, name: user.fullName },
      "CLIENT_SECRET_KEY",
      { expiresIn: "1h" }
    );
    //console.log("token :", token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    // console.log("JWT token sent in cookie:", token);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
    });
  })(req, res, next);
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token").json({
      Success: true,
      message: "Logged out successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error registering user" });
  }
};

export const authStatus = async (req, res) => {
  //console.log(req.cookie.token)

  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    console.log("Check auth token", token);
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    // verify token
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    console.log("decoded token ", decoded);
    res.status(200).json({ success: true, user: decoded });
  } catch (error) {
    //console.error("Auth check failed:", error);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export const getAlluser = async (req, res) => {
  try {
    const getAllUser = await userByAdmin.find(
      {},
      {
        fullName: 1,
        role: 1,
        email: 1,
        phone: 1,
        address: 1,
      }
    );
    getAllUser
      ? res.status(200).json({ User: getAllUser })
      : res.status(404).json({ Message: "no User found" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllUserById = async (req, res) => {
  try {
    const getAllUser = await userByAdmin.findById(req.params.id, {
      fullName: 1,
      role: 1,
      email: 1,
      phone: 1,
      address: 1,
    });
    getAllUser
      ? res.status(200).json({ User: getAllUser })
      : res.status(404).json({ Message: "no User found" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updateUser = await userByAdmin.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (updateUser) {
      res.status(200).json({ success: "User data updated", User: updateUser });
    }
    res.status(404).json("User not found");
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleteUser = await userByAdmin.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
      res.status(404).json("User not found");
    }

    res.status(200).json({ success: "User deleted", User: deleteUser });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
