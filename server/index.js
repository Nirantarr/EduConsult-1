import 'dotenv/config'; // <-- THE FIX: Import and execute dotenv config FIRST.
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js'; 
import serviceRoutes from './routes/serviceRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { initializeSocket } from './socket.js'; 
import http from 'http';


const app = express();


const server = http.createServer(app);
initializeSocket(server);
// Middleware
app.use(cors());
app.use(express.json({ limit: '500kb' })); // Increase the limit
app.use(express.urlencoded({ extended: true, limit: '500kb' }));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/admin', adminRoutes); 


const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
    server.listen(process.env.PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => console.log(err));