import { Router } from 'express';
import { createUserController, getUserController, loginUserController, resetPasswordController, sendOtpController, updateUserController, verifyUserController } from '../controllers/userController';
import { authenticateToken } from '../middlewares/authenticationMiddleware';
import { resetPasswordValidator, updateUserValidator } from '../validators/userValidator';

const router = Router();

router.post('/', createUserController);
router.post('/verify', verifyUserController);
router.post('/send-otp', sendOtpController);
router.post('/login', loginUserController);
router.get('/', authenticateToken, getUserController);
router.put('/', authenticateToken, updateUserValidator, updateUserController);
router.put('/reset-password', authenticateToken, resetPasswordValidator, resetPasswordController);
export default router;
