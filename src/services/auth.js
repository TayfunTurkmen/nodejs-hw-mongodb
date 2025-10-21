import createHttpError from "http-errors";
import UsersCollection from "../db/models/user.js";
import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import { SessionsCollection } from "../db/models/Sessions.js";
import { FIFTEEN_MINUITES, ONE_DAY } from "../constant/constantContact.js";

export const registerUser = async (userData) => {
  const { email, password } = userData;
  const user = await UsersCollection.findOne({ email });

  if (user) {
    throw createHttpError(409, "Email in use");
  }

  const hasedPassword = await bcrypt.hash(password, 10);

  return await UsersCollection.create({
    ...userData,
    password: hasedPassword,
  });
};

export const loginUser = async (userData) => {
  const { email, password } = userData;
  const user = await UsersCollection.findOne({ email });

  if (!user) {
    throw createHttpError(404, "User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw createHttpError(401, "Invalid password");
  }
  await SessionsCollection.deleteMany({ userId: user._id });

  const accessToken = randomBytes(30).toString("base64");
  const refreshToken = randomBytes(30).toString("base64");
  const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUITES); // 15 minutes
  const refreshTokenValidUntil = new Date(Date.now() + ONE_DAY); // 7 days

  const session = await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return session;
};

export const refreshUser = async ({ refreshToken, sessionId }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(404, "Session not found");
  }

  if (session.refreshTokenValidUntil < new Date()) {
    throw createHttpError(401, "Refresh token expired");
  }

  // Eski oturumu sil
  await SessionsCollection.findByIdAndDelete(sessionId);

  // Yeni tokenlar oluştur
  const accessTokenNew = randomBytes(30).toString("base64");
  const refreshTokenNew = randomBytes(30).toString("base64");
  const accessTokenValidUntilNew = new Date(Date.now() + FIFTEEN_MINUITES); // 15 minutes
  const refreshTokenValidUntilNew = new Date(Date.now() + ONE_DAY); // 7 days

  // Yeni oturumu oluştur
  const sessionNew = await SessionsCollection.create({
    userId: session.userId,
    accessToken: accessTokenNew,
    refreshToken: refreshTokenNew,
    accessTokenValidUntil: accessTokenValidUntilNew,
    refreshTokenValidUntil: refreshTokenValidUntilNew,
  });

  return sessionNew;
};

export const logoutUser = async (sessionId) => {
  await SessionsCollection.findByIdAndDelete(sessionId);
};
