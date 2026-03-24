import mongoose from "mongoose";
import User from "./../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// what is a req Body (req.body): is an object that contains data sent by the client to the server in an HTTP request. It is typically used in POST, PUT, and PATCH requests to send data to the server for processing. The req Body can contain various types of data, such as JSON, form data, or even files, depending on the content type specified in the request headers. In Express.js, you can access the req Body using middleware like express.json() or express.urlencoded().
export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("user already exists");
    }

    // Hash the password before saving to the database (you can use bcrypt or any other hashing library)
    // salt is a random string that is added to the password before hashing to make it more secure. It helps to prevent attacks such as rainbow table attacks, where attackers precompute hashes for common passwords.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session },
    );

    const token = jwt.sign(
      { userId: newUsers[0]._id },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "user created successfully",
      data: { token, user: newUsers[0] },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("invalid credentials");
    }

    // bycrypt compare both hashed password and the password that the user is trying to log in with, if they match it returns true, otherwise it returns false.
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "user signed in successfully",
      data: { token, user },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {};
