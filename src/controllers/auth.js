import {
  registerUser,
  loginUser,
  refreshSession,
  logoutUser,
} from "../services/auth.js";

export const registerController = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      status: 201,
      message: "User registered successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await loginUser({ email, password });
    res.status(200).json({
      status: 200,
      message: "Login successful",
      data: { accessToken, refreshToken },
    });
  } catch (err) {
    next(err);
  }
};

export const refreshController = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const { accessToken } = await refreshSession(refreshToken);
    res.status(200).json({
      status: 200,
      message: "Token refreshed successfully",
      data: { accessToken },
    });
  } catch (err) {
    next(err);
  }
};

export const logoutController = async (req, res, next) => {
  try {
    await logoutUser();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const getCurrentUserController = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({
      status: 200,
      message: "Current user fetched successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};
