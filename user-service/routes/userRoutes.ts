import { Router } from 'express';
import { createUserController, loginUserController, sendOtpController, verifyUserController } from '../controllers/userController';

const router = Router();

router.post('/', createUserController);
router.post('/verify', verifyUserController);
router.post('/send-otp', sendOtpController);
router.post('/login', loginUserController);

export default router;