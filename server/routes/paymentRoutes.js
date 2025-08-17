import express from 'express';
const router = express.Router();
import { createOrder, verifyPayment } from '../controllers/paymentController.js';
import { protect } from '../middlewares/authMiddleware.js';

// These routes should only be accessible by logged-in users (students)
router.post('/orders', protect, createOrder);
router.post('/verify', protect, verifyPayment);

export default router;