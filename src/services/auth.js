import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../db/models/User.js";
import { Session } from '../db/models/Session.js';
import { signAccessToken, signRefreshToken, verifyRefresh } from '../utils/tokens.js';

const ACCESS_TOKEN_TTL = "15m"; // 15 dakika
const REFRESH_TOKEN_TTL = "30d"; // 30 gün
const SECRET = process.env.JWT_SECRET || "supersecretjwtkey";

export async function registerUser({ name, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) throw createHttpError(409, "Email in use");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  const safeUser = user.toObject();
  delete safeUser.password;
  return safeUser;
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw createHttpError(401, "Invalid email or password");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw createHttpError(401, "Invalid email or password");

   await Session.deleteMany({ userId: user._id });

  const accessToken = jwt.sign({ id: user._id }, SECRET, {
    expiresIn: ACCESS_TOKEN_TTL,
  });
  const refreshToken = jwt.sign({ id: user._id }, SECRET, {
    expiresIn: REFRESH_TOKEN_TTL,
  });

  return { accessToken, refreshToken };
}

export async function refreshSession(refreshToken) {
  if (!refreshToken) throw createHttpError(401, "No refresh token provided");

  try {
    const decoded = jwt.verify(refreshToken, SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw createHttpError(401, "User not found");

    const newAccessToken = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: ACCESS_TOKEN_TTL,
    });

    return { accessToken: newAccessToken };
  } catch (err) {
    throw createHttpError(401, "Invalid or expired refresh token");
  }
}

export async function logoutUser() {
  // JWT'de server tarafında logout işlemi yapılmaz,
  // sadece client tarafında token silinir.
  return;
}
