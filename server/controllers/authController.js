
import Faculty from '../models/Faculty.js';
import Student from '../models/Student.js'; 
import jwt from 'jsonwebtoken';

// Utility to generate token, now including the role
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a new faculty
export const registerFaculty = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        let role = 'faculty';
        if (email.endsWith('@webarclight.com')) {
            role = 'admin';
        }

        const facultyExists = await Faculty.findOne({ email });
        if (facultyExists) {
            return res.status(400).json({ message: 'Faculty with this email already exists' });
        }

        const faculty = await Faculty.create({
            fullName,
            email,
            password,
            role,
        });

        if (faculty) {
            const token = generateToken(faculty._id, faculty.role);
            res.status(201).json({
                _id: faculty._id,
                fullName: faculty.fullName,
                email: faculty.email,
                role: faculty.role,
                token: token,
            });
        } else {
            res.status(400).json({ message: 'Invalid faculty data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// @desc    Auth faculty & get token (Login)
export const loginFaculty = async (req, res) => {
    const { email, password } = req.body;
    try {
        const faculty = await Faculty.findOne({ email }).select('+password');

        if (faculty && (await faculty.matchPassword(password))) {
            const token = generateToken(faculty._id, faculty.role);
            res.json({
                _id: faculty._id,
                fullName: faculty.fullName,
                email: faculty.email,
                role: faculty.role,
                token: token,
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// @desc    Register a new student
export const registerStudent = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        const studentExists = await Student.findOne({ email });
        if (studentExists) {
            return res.status(400).json({ message: 'Student with this email already exists' });
        }

        const student = await Student.create({ fullName, email, password });

        if (student) {
            const token = generateToken(student._id, student.role);
            res.status(201).json({
                _id: student._id,
                fullName: student.fullName,
                email: student.email,
                role: student.role,
                token: token,
            });
        } else {
            res.status(400).json({ message: 'Invalid student data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// @desc    Auth student & get token (Login)
export const loginStudent = async (req, res) => {
    const { email, password } = req.body;
    try {
        const student = await Student.findOne({ email }).select('+password');
        if (student && (await student.matchPassword(password))) {
            const token = generateToken(student._id, student.role);
            res.json({
                _id: student._id,
                fullName: student.fullName,
                email: student.email,
                role: student.role,
                token: token,
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};