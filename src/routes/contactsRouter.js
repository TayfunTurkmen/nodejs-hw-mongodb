import express from "express";
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
} from "../controllers/contactsControllers.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { createContactSchema, updateContactSchema, updateStatusSchema } from "../schemas/contactSchemas.js";

const router = express.Router();

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get("/", asyncHandler(getContactsController));
router.post("/", validateBody(createContactSchema), asyncHandler(createContactController));
router.get("/:id", asyncHandler(getContactByIdController));
router.patch("/:id", isValidId, validateBody(updateContactSchema), asyncHandler(updateContactController));
router.patch("/:id/isFavorite", isValidId, validateBody(updateStatusSchema), asyncHandler(updateContactController));

export default router;
