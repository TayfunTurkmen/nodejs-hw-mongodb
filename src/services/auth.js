import createError from 'http-errors';
import bcrypt from 'bcryptjs';
import { User } from '../db/models/User.js';
import { Session } from '../db/models/Session.js';
import { signAccessToken, signRefreshToken, verifyRefresh } from '../utils/tokens.js';

const ACCESS_MIN = Number(process.env.ACCESS_TOKEN_TTL_MIN || 15);
const REFRESH_DAYS = Number(process.env.REFRESH_TOKEN_TTL_DAYS || 30);

export const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw createError(409, 'Email in use');

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });

  const safe = user.toObject();
  delete safe.password;
  return safe;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw createError(401, 'Email or password is wrong');

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw createError(401, 'Email or password is wrong');

  // Eski oturum(lar)ı sil
  await Session.deleteMany({ userId: user._id });

  // Yeni oturum & tokenlar
  const payload = { userId: user._id.toString() };
  const a = signAccessToken(payload, ACCESS_MIN);
  const r = signRefreshToken(payload, REFRESH_DAYS);

  const session = await Session.create({
    userId: user._id,
    accessToken: a.token,
    refreshToken: r.token,
    accessTokenValidUntil: a.validUntil,
    refreshTokenValidUntil: r.validUntil,
  });

  return {
    accessToken: a.token,
    refreshToken: r.token,
    sessionId: session._id.toString(),
    accessTokenValidUntil: a.validUntil,
    refreshTokenValidUntil: r.validUntil,
    userId: user._id.toString(),
  };
};

export const refreshSession = async ({ refreshToken }) => {
  if (!refreshToken) throw createError(401, 'No refresh token');

  // JWT geçerli mi?
  const decoded = verifyRefresh(refreshToken);
  // DB’deki oturumu bul
  const session = await Session.findOne({ refreshToken });
  if (!session) throw createError(401, 'Invalid session');

  // Süresi dolmuş mu?
  if (session.refreshTokenValidUntil.getTime() < Date.now()) {
    await Session.deleteOne({ _id: session._id });
    throw createError(401, 'Refresh token expired');
  }

  // Eski oturumu sil ve yenisini oluştur (rotate)
  await Session.deleteOne({ _id: session._id });

  const payload = { userId: decoded.userId };
  const a = signAccessToken(payload, ACCESS_MIN);
  const r = signRefreshToken(payload, REFRESH_DAYS);

  const newSession = await Session.create({
    userId: decoded.userId,
    accessToken: a.token,
    refreshToken: r.token,
    accessTokenValidUntil: a.validUntil,
    refreshTokenValidUntil: r.validUntil,
  });

  return {
    accessToken: a.token,
    refreshToken: r.token,
    sessionId: newSession._id.toString(),
    accessTokenValidUntil: a.validUntil,
    refreshTokenValidUntil: r.validUntil,
    userId: decoded.userId,
  };
};

export const logoutSession = async ({ refreshToken }) => {
  if (!refreshToken) return; // idempotent
  await Session.deleteOne({ refreshToken });
};
