import { Router } from 'express';
import { createUserController, getUserController, loginUserController, sendOtpController, updateUserController, verifyUserController } from '../controllers/userController';
import { authenticateToken } from '../middlewares/authenticationMiddleware';
import { updateUserValidator } from '../validators/userValidator';

const router = Router();

router.post('/', createUserController);
router.post('/verify', verifyUserController);
router.post('/send-otp', sendOtpController);
router.post('/login', loginUserController);
router.get('/', authenticateToken, getUserController);
router.put('/', authenticateToken, updateUserValidator, updateUserController);

export default router;
