import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../db/models/User.js";

const { JWT_SECRET } = process.env;

export const resetPasswordController = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      throw createHttpError(401, "Token is expired or invalid.");
    }

    const user = await User.findOne({ email: decoded.email });
    if (!user) throw createHttpError(404, "User not found!");

    const hash = await bcrypt.hash(password, 10);
    user.password = hash;

    if (user.refreshToken) user.refreshToken = null;
    await user.save();

    res.status(200).json({
      status: 200,
      message: "Password has been successfully reset.",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
