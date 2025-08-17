import express from 'express';
const router = express.Router();
import { getMyStudentBookings,getMyFacultyBookings } from '../controllers/bookingController.js';
import { protect } from '../middlewares/authMiddleware.js';

router.get('/my-bookings', protect, getMyStudentBookings);
router.get('/my-faculty-bookings', protect, getMyFacultyBookings);
export default router;