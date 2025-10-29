import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { sendResetEmailSchema, resetPasswordSchema } from '../validation/passwordSchemas.js';
import { sendResetEmailController, resetPasswordController } from '../controllers/password.js';

const router = Router();

router.post('/send-reset-email', validateBody(sendResetEmailSchema), ctrlWrapper(sendResetEmailController));
router.post('/reset-pwd', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));

export default router;