import express from "express";
import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateStatusContact,
  updateContact,
} from "../controllers/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import {
  createContactSchema,
  updateStatusSchema,
} from "../schemas/contactSchemas.js";

const router = express.Router();

router.get("/", getAllContacts);
router.get("/:contactId", isValidId, getContactById);
router.post("/", validateBody(createContactSchema), createContact);
router.patch(
  "/:contactId/isFavourite",
  isValidId,
  validateBody(updateStatusSchema),
  updateStatusContact
);
router.delete("/:contactId", isValidId, deleteContact);
router.patch("/:contactId", isValidId, validateBody(createContactSchema), updateContact);

export default router;
