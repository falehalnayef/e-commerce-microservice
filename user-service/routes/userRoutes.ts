import { Router } from 'express';
import { createUserController, forgotPasswordController, getUserController, loginUserController, resetPasswordController, sendOtpController, updateUserController, verifyUserController } from '../controllers/userController';
import { createUserValidator, forgotPasswordValidator, resetPasswordValidator, updateUserValidator } from '../validators/userValidator';

const router = Router();

router.post('/', createUserValidator, createUserController);
router.post('/verify', verifyUserController);
router.post('/send-otp', sendOtpController);
router.post('/login', loginUserController);
router.get('/', getUserController);
router.put('/', updateUserValidator, updateUserController);
router.put('/reset-password', resetPasswordValidator, resetPasswordController);
router.put('/forgot-password', forgotPasswordValidator, forgotPasswordController);
export default router;
