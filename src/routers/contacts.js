import express from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { upload } from "../middlewares/upload.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../validation/contactSchemas.js";
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from "../controllers/contacts.js";

const router = express.Router();

// Tüm contact işlemleri için kullanıcı doğrulaması zorunlu
router.use(authenticate);

// ROUTES
router.get("/", ctrlWrapper(getContactsController));

router.get("/:contactId", isValidId, ctrlWrapper(getContactByIdController));

router.post(
  "/",                          
  upload.single("photo"),       
  validateBody(createContactSchema),
  ctrlWrapper(createContactController)
);

router.patch(
  "/:contactId",
  isValidId,
  upload.single("photo"),
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController)
);

router.delete("/:contactId", isValidId, ctrlWrapper(deleteContactController));

export default router;
