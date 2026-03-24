import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "user mail is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 8,
      maxLength: 50,
    },
    password: {
      type: String,
      required: [true, "user password is required"],
      trim: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
