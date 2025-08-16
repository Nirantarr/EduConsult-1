import { Router } from 'express';
const router = Router();
import { registerFaculty, loginFaculty,registerStudent,loginStudent } from '../controllers/authController.js';

// Faculty authentication routes
router.post('/faculty/signup', registerFaculty);
router.post('/faculty/login', loginFaculty);

router.post('/student/signup', registerStudent);
router.post('/student/login', loginStudent);

export default router;