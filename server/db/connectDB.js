import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/DB_BlogWebsite");
    console.log("DB Connect Successfully");
  } catch (error) {
    console.log(`DB Not Connected ${error}`);
  }
};

export default connectDB;
