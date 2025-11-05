import mongoose from "mongoose";

const userByAdminScheme = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    confirmedPassword: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    isMfaActive: {
      type: Boolean,
      require: false,
    },
    toFactorSecret: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const userByAdmin = mongoose.model("userByAdmin", userByAdminScheme);
