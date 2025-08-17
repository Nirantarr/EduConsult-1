import Faculty from '../models/Faculty.js';
import FacultyDetail from '../models/FacultyDetail.js';
import Booking from '../models/Booking.js'; 

// @desc    Get the logged-in faculty's profile details
// @route   GET /api/faculty/me/details
export const getFacultyDetails = async (req, res) => {
    try {
        const details = await FacultyDetail.findOne({ faculty: req.user._id });
        
        // Combine the non-sensitive main faculty info (name) with the details
        const profile = {
            fullName: req.user.fullName,
            email: req.user.email,
            ...(details?._doc || {}), // Spread the details document if it exists
        };

        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create or update faculty profile details
// @route   PUT /api/faculty/me/details
export const updateFacultyDetails = async (req, res) => {
    try {
        const { fullName, ...detailsData } = req.body;
        
        // 1. Update the core Faculty model if fullName has changed
        if (fullName && fullName !== req.user.fullName) {
            await Faculty.findByIdAndUpdate(req.user._id, { fullName });
        }

        // 2. Use findOneAndUpdate with upsert to create or update the details
        // upsert: true will create a new document if one doesn't match the query
        const updatedDetails = await FacultyDetail.findOneAndUpdate(
            { faculty: req.user._id }, // Find by the faculty ID link
            { $set: detailsData }, // Set the new data
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        // Combine and send back the full, updated profile
        const profile = {
            fullName: fullName || req.user.fullName,
            email: req.user.email,
            ...updatedDetails._doc,
        };

        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

export const getAllFacultyProfiles = async (req, res) => {
    try {
        // Find all faculty members who are verified
        const faculties = await Faculty.find({ isVerified: true }).select('fullName email');
        
        // Find all details and populate the 'faculty' field with their name
        const profiles = await FacultyDetail.find({ faculty: { $in: faculties.map(f => f._id) } })
            .populate('faculty', 'fullName'); // This links the two collections

        res.json(profiles);
    } catch (error) {
        console.error("Error fetching profiles:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getFacultyProfileById = async (req, res) => {
    try {
        // Find the profile details using the faculty's main ID from the URL params
        const profile = await FacultyDetail.findOne({ faculty: req.params.id })
            .populate('faculty', 'fullName email'); // Populate with non-sensitive data

        if (profile) {
            res.json(profile);
        } else {
            res.status(404).json({ message: 'Faculty profile not found' });
        }
    } catch (error) {
        console.error("Error fetching single profile:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};
export const getFacultyDashboardStats = async (req, res) => {
    try {
        const facultyId = req.user._id;
        const PLATFORM_FEE_PERCENTAGE = 0.10; // 15%
        const oneWeekAgo = new Date(new Date() - 7 * 24 * 60 * 60 * 1000);

        // --- MODIFIED: Calculate Total Earnings per Currency ---
        const totalEarningsByCurrency = await Booking.aggregate([
            { $match: { faculty: facultyId, status: 'completed' } },
            { $group: { _id: '$currencyAtBooking', total: { $sum: '$priceAtBooking' } } }
        ]);

        // --- MODIFIED: Calculate Weekly Earnings per Currency ---
        const weeklyEarningsByCurrency = await Booking.aggregate([
            { $match: { faculty: facultyId, status: 'completed', createdAt: { $gte: oneWeekAgo } } },
            { $group: { _id: '$currencyAtBooking', total: { $sum: '$priceAtBooking' } } }
        ]);
        
        // --- MODIFIED: Calculate Wallet Balance per Currency ---
        const availableToWithdrawByCurrency = totalEarningsByCurrency.map(earning => ({
            currency: earning._id,
            amount: earning.total * (1 - PLATFORM_FEE_PERCENTAGE)
        }));

        // Fetch completed bookings for other stats
        const completedBookings = await Booking.find({ faculty: facultyId, status: 'completed' })
            .populate('student', 'fullName')
            .populate('service', 'title')
            .sort({ createdAt: -1 });

        const uniqueStudentsCount = new Set(completedBookings.map(b => b.student._id.toString())).size;
        const recentChatEarnings = completedBookings.slice(0, 5).map(b => ({
            id: b._id, student: b.student.fullName, topic: b.service.title,
            earnings: b.priceAtBooking, currency: b.currencyAtBooking, date: b.createdAt,
        }));

        res.json({
            totalEarnings: totalEarningsByCurrency,
            weeklyEarnings: weeklyEarningsByCurrency,
            availableToWithdraw: availableToWithdrawByCurrency,
            completedChats: completedBookings.length,
            uniqueStudents: uniqueStudentsCount,
            averageRating: 4.9, // Placeholder
            recentChatEarnings,
        });

    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};