import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { createUserSchema, loginUserSchema } from "../validators/user.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  loginUserController,
  logoutUserController,
  refreshUserController,
  registerUserController,
} from "../controllers/auth.js";

const authRouter = Router();

// Starts with '/auth' endpoint

authRouter.post(
  "/register",
  validateBody(createUserSchema),
  ctrlWrapper(registerUserController)
);

authRouter.post(
  "/login",
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController)
);

authRouter.post("/refresh", ctrlWrapper(refreshUserController));

authRouter.post("/logout", ctrlWrapper(logoutUserController));

export default authRouter;
