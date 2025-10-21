import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import {
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
  postContactController,
} from '../controllers/contact';
import { isValidId } from '../middlewares/isValidId';
import { validateBody } from '../middlewares/validatorBody';
import {
  createContactSchema,
  updateContactSchema,
} from '../validators/contact';
import { authorize } from '../middlewares/authenticate';
import { upload } from '../middlewares/upload.js';

const contactRouter = Router();
// contactRouter.use(authorize); // Middleware to protect all routes in this router

//Contact routes endpoints
contactRouter.get('/', ctrlWrapper(getContactsController));
contactRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);
contactRouter.post(
  '/',
  upload.single('photo'),
  // validateBody(createContactSchema),
  ctrlWrapper(postContactController),
);
contactRouter.patch(
  '/:contactId',
  upload.single('photo'),
  isValidId,
  // validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);
contactRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default contactRouter;
