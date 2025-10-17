import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import { Session } from '../db/models/Session.js';
import { User } from '../db/models/User.js';

export const authenticate = async (req, res, next) => {
  const header = req.headers.authorization || '';
  const [type, token] = header.split(' ');
  if (type !== 'Bearer' || !token) return next(createError(401, 'No access token'));

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      return next(createError(401, 'Access token expired'));
    }
    return next(createError(401, 'Invalid access token'));
  }

  const session = await Session.findOne({ userId: decoded.userId, accessToken: token });
  if (!session) return next(createError(401, 'Invalid session'));

  if (session.accessTokenValidUntil.getTime() < Date.now()) {
    await Session.deleteOne({ _id: session._id });
    return next(createError(401, 'Access token expired'));
  }

  const user = await User.findById(decoded.userId).select('-password');
  if (!user) return next(createError(401, 'User not found'));

  req.user = user;
  next();
};
