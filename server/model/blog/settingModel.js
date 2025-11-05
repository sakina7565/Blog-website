import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  siteTitle: { type: String, default: "MID SESSION SALE" },
  logo: { type: String, default: "../../assets/Images/blogsiteLogo.png" },   // store image URL or filename
  theme: { type: String, enum: ["light", "dark"], default: "light" },
  footerText: { type: String, default: "© 2025 My Blog. All rights reserved." },
  socialLinks: {
    facebook: String,
    twitter: String,
    instagram: String
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
},{
    timestamps:true
});

const Settings = mongoose.model("Settings", settingsSchema);
export default Settings;
