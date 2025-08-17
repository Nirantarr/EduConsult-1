import jwt from 'jsonwebtoken';
import Faculty from '../models/Faculty.js';
import Student from '../models/Student.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token's ID and role
            if (decoded.role === 'student') {
                req.user = await Student.findById(decoded.id).select('-password');
            } else {
                req.user = await Faculty.findById(decoded.id).select('-password');
            }

            if (!req.user) {
                 return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};