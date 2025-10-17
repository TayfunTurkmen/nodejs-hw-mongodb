import createError from 'http-errors';
import { registerUser, loginUser, refreshSession, logoutSession } from '../services/auth.js';

const cookieName = process.env.COOKIE_NAME || 'refreshToken';

const cookieOpts = {
  httpOnly: true,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
};

export const registerController = async (req, res) => {
  const user = await registerUser(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginController = async (req, res) => {
  const result = await loginUser(req.body);

  // refreshToken cookie'ye yazılıyor
  res.cookie(cookieName, result.refreshToken, {
    ...cookieOpts,
    // 30 gün
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: { accessToken: result.accessToken },
  });
};

export const refreshController = async (req, res) => {
  const refreshToken = req.cookies?.[cookieName];
  const result = await refreshSession({ refreshToken });

  // yeni refresh cookie
  res.cookie(cookieName, result.refreshToken, {
    ...cookieOpts,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: result.accessToken },
  });
};

export const logoutController = async (req, res) => {
  const refreshToken = req.cookies?.[cookieName];
  await logoutSession({ refreshToken });

  // cookie temizle
  res.clearCookie(cookieName, { ...cookieOpts });
  res.status(204).send();
};
