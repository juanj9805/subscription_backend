import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error("Please define the db");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("connection ok");
  } catch (error) {
    console.log("errot connecting to database" + error);
  }
};

export default connectToDatabase;
