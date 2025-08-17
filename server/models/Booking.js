import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    service: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Service' },
    student: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Student' },
    faculty: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Faculty' },
    priceAtBooking: { type: Number, required: true },
    currencyAtBooking: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    razorpay: {
        orderId: String,
        paymentId: String,
        signature: String,
    },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;