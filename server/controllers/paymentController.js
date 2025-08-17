import Razorpay from 'razorpay';
import crypto from 'crypto';
import Booking from '../models/Booking.js';
import Service from '../models/Service.js';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create a Razorpay order
// @route   POST /api/payment/orders
export const createOrder = async (req, res) => {
    try {
        const { serviceId } = req.body;
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        const options = {
            amount: service.price * 100, // Amount in the smallest currency unit (e.g., paise for INR)
            currency: service.currency,
            receipt: crypto.randomBytes(10).toString('hex'),
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// @desc    Verify a payment and create a booking
// @route   POST /api/payment/verify
export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, serviceId } = req.body;
        
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex');

        if (razorpay_signature !== expectedSign) {
            return res.status(400).json({ message: 'Invalid signature sent!' });
        }

        const service = await Service.findById(serviceId);

        const booking = await Booking.create({
            service: serviceId,
            student: req.user._id,
            faculty: service.faculty,
            priceAtBooking: service.price,
            currencyAtBooking: service.currency,
            status: 'completed',
            razorpay: {
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
                signature: razorpay_signature,
            },
        });
        
        // This is the point where you would enable chat functionality for this booking
        res.json({ message: 'Payment verified successfully!', booking });

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};