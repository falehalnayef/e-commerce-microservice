import { Router } from 'express';
import { createUserController, sendOtpController, verifyUserController } from '../controllers/userController';

const router = Router();

router.post('/', createUserController);
router.post('/verify', verifyUserController);
router.post('/send-otp', sendOtpController);

export default router;