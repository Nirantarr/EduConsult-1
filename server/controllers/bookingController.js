import Booking from '../models/Booking.js';

// @desc    Get bookings for the logged-in student
export const getMyStudentBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ student: req.user._id })
            .populate({ path: 'service', select: 'title' })
            .populate({ path: 'faculty', select: 'fullName' });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getMyFacultyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ faculty: req.user._id })
            // We now populate the STUDENT's name and the SERVICE's title
            .populate({ path: 'service', select: 'title' })
            .populate({ path: 'student', select: 'fullName' });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};