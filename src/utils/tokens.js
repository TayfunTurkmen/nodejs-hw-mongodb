import jwt from 'jsonwebtoken';

export const signAccessToken = (payload, minutes) => {
  const exp = new Date(Date.now() + minutes * 60_000);
  const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: `${minutes}m` });
  return { token, validUntil: exp };
};

export const signRefreshToken = (payload, days) => {
  const exp = new Date(Date.now() + days * 24 * 60 * 60_000);
  const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: `${days}d` });
  return { token, validUntil: exp };
};

export const verifyAccess = (token) => jwt.verify(token, process.env.JWT_ACCESS_SECRET);
export const verifyRefresh = (token) => jwt.verify(token, process.env.JWT_REFRESH_SECRET);