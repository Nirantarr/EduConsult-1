import { Router } from 'express';
const router = Router();
import { registerFaculty, loginFaculty,registerStudent,loginStudent,forgotPassword,resetPassword,verifyOtp } from '../controllers/authController.js';

// Faculty authentication routes
router.post('/faculty/signup', registerFaculty);
router.post('/faculty/login', loginFaculty);

router.post('/student/signup', registerStudent);
router.post('/student/login', loginStudent);

router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword); 

router.post('/verify-otp', verifyOtp);

export default router;