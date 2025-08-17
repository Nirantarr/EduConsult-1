import express from 'express';
const router = express.Router();
import { getFacultyDetails, updateFacultyDetails,getAllFacultyProfiles,getFacultyProfileById } from '../controllers/facultyController.js';
import { protect } from '../middlewares/authMiddleware.js';

// All routes here are protected and specific to the logged-in faculty

router.get('/profiles', getAllFacultyProfiles);
router.get('/profiles/:id', getFacultyProfileById);
router.route('/me/details')
    .get(protect, getFacultyDetails)
    .put(protect, updateFacultyDetails);

export default router;