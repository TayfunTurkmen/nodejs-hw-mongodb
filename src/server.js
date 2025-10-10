import express from 'express';
import { env } from './utils/env.js';
import cors from 'cors';

import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
} from './controllers/contacts.js';

import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

import {
  createContactSchema,
  patchContactSchema,
} from './validation/contact.js';
import { validateBody } from './middleware/validateBody.js';
import { isValidId } from './middleware/isValidId.js';

const PORT = env('PORT') || 3000;

export const setupServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Contacts API' });
  });

  app.get('/contacts', getAllContactsController);

  app.get('/contacts/:contactId', isValidId, getContactByIdController);

  app.post(
    '/contacts',
    validateBody(createContactSchema),
    createContactController
  );

  app.delete('/contacts/:contactId', isValidId, deleteContactController);

  app.patch(
    '/contacts/:contactId',
    isValidId,
    validateBody(patchContactSchema),
    updateContactController
  );

  // Error Handling Middleware
  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`✅ | Server is running on port ${PORT}`);
  });
};
