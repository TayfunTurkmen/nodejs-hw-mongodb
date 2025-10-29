import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { User } from "../db/models/User.js";

const SECRET = process.env.JWT_SECRET || "supersecretjwtkey";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw createHttpError(401, "Authorization header missing");

    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token)
      throw createHttpError(401, "Invalid authorization format");

    //  Token'ı doğrula
    const decoded = jwt.verify(token, SECRET);

    //  Kullanıcıyı bul
    const user = await User.findById(decoded.id);
    if (!user) throw createHttpError(401, "User not found");

    // Request'e ekle
    req.user = user;
    console.log("Authenticated user:", user.email);
    next();
  } catch (error) {
    // Token süresi dolmuş veya bozuksa burada yakala
    if (error.name === "TokenExpiredError") {
      next(createHttpError(401, "Access token expired"));
    } else if (error.name === "JsonWebTokenError") {
      next(createHttpError(401, "Invalid token"));
    } else {
      next(createHttpError(401, error.message));
    }
  }
};
