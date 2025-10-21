
import { Router } from "express";
import {ctrlWrapper} from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { validateId } from "../middlewares/validateId.js";

import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
  putContactController,
  } from "../controllers/contact.js";
import {
  createContactSchema,
  updateContactSchema
  } from "../validators/contact.js";


const contactRouter = Router();

contactRouter.get("/", ctrlWrapper(getAllContactsController));

contactRouter.get("/:contactId", 
  validateId,
  ctrlWrapper(getContactByIdController));

contactRouter.post("/", 
  validateBody(createContactSchema),
  ctrlWrapper(createContactController));

contactRouter.put("/:contactId",
  validateId,
  validateBody(updateContactSchema),
  ctrlWrapper(putContactController));

contactRouter.patch("/:contactId", 
  validateId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController));

contactRouter.delete("/:contactId",
  validateId,
  ctrlWrapper(deleteContactController));

export default contactRouter;
