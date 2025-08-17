import Faculty from '../models/Faculty.js';
import FacultyDetail from '../models/FacultyDetail.js';

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