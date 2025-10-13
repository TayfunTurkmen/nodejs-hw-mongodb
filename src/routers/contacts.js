const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/contacts');
const validateBody = require('../middlewares/validateBody');
const isValidId = require('../middlewares/isValidId');
const {
  contactAddSchema,
  contactUpdateSchema,
} = require('../validation/contactValidation');

router.get('/', ctrl.getContacts);
router.get('/:contactId', isValidId, ctrl.getContactById);
router.post('/', validateBody(contactAddSchema), ctrl.addContact);
router.patch(
  '/:contactId',
  isValidId,
  validateBody(contactUpdateSchema),
  ctrl.patchContact
);
router.delete('/:contactId', isValidId, ctrl.removeContact);

module.exports = router;
