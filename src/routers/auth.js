import express from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";

import {
  registerSchema,
  loginSchema,
  sendResetEmailSchema,
  resetPasswordSchema,
} from "../validation/authSchemas.js";

import {
  registerController,
  loginController,
  refreshController,
  logoutController,
  getCurrentUserController,
} from "../controllers/auth.js";

import { sendResetEmailController } from "../controllers/sendResetEmailController.js";
import { resetPasswordController } from "../controllers/resetPasswordController.js";

const router = express.Router();

// Auth routes
router.post("/register", validateBody(registerSchema), ctrlWrapper(registerController));
router.post("/login", validateBody(loginSchema), ctrlWrapper(loginController));
router.post("/refresh", ctrlWrapper(refreshController));
router.get("/current", authenticate, ctrlWrapper(getCurrentUserController));
router.post("/logout", authenticate, ctrlWrapper(logoutController));

// Password reset routes
router.post(
  "/send-reset-email",
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmailController)
);
router.post(
  "/reset-pwd",
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController)
);

export default router;
