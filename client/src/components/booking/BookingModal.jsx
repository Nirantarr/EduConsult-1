import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { X, Lock, Info, ChevronDown, ArrowRight, Mail, Phone, User as ProfileIcon } from 'lucide-react'; // Renamed Profile to ProfileIcon to avoid conflict with prop
import { gsap } from 'gsap';

// Hook to dynamically load the Razorpay script
const useScript = (src) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
        return () => { document.body.removeChild(script); };
    }, [src]);
};

const BookingModal = ({ isOpen, onClose, professor, services }) => {
    useScript('https://checkout.razorpay.com/v1/checkout.js');
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const overlayRef = useRef(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedService, setSelectedService] = useState(null);
    const [studentDetails, setStudentDetails] = useState({ name: '', email: '', phone: '' });
    
    const API_URL = process.env.REACT_APP_API_URL;
    const currencySymbols = { USD: '$', INR: '₹' };

    useEffect(() => {
        // Pre-fill student details if they are logged in
        const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
        if (studentInfo) {
            setStudentDetails({ name: studentInfo.fullName, email: studentInfo.email, phone: '' });
        }

        if (isOpen) {
            // Reset to initial state when modal opens
            setCurrentStep(1);
            setSelectedService(null);
            document.body.style.overflow = 'hidden';
            gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.3 });
            gsap.fromTo(modalRef.current, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" });
        } else {
            gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.3 });
            gsap.to(modalRef.current, { y: 50, autoAlpha: 0, duration: 0.4, ease: "power3.in", onComplete: () => { document.body.style.overflow = 'auto'; } });
        }
    }, [isOpen]);
    
    const handleServiceSelect = (service) => {
        setSelectedService(service);
        setCurrentStep(2);
    };

    const handleBackToServices = () => setCurrentStep(1);

    const handleConfirmAndPay = async () => {
          const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
        if (!studentInfo || !studentInfo.token) {
            alert('Please log in or sign up to book a session.');
            onClose(); // Close the modal before navigating
            navigate('/student/login'); // Redirect to the login page
            return; // Stop the function here
        }
        if (!studentDetails.name || !studentDetails.email || !studentDetails.phone) {
            alert("Please fill in all your details.");
            return;
        }

        try {
            const { token } = JSON.parse(localStorage.getItem('studentInfo'));
            const config = { headers: { Authorization: `Bearer ${token}` } };
            
            // 1. Create Order
            const { data: order } = await axios.post(`${API_URL}/api/payment/orders`, { serviceId: selectedService._id }, config);

            // 2. Razorpay Options
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID ,
                amount: order.amount,
                currency: order.currency,
                name: 'Educonsult',
                description: `Booking: ${selectedService.title}`,
                order_id: order.id,
                handler: async function (response) {
                    // 3. Verify Payment
                    try {
                        const { data } = await axios.post(`${API_URL}/api/payment/verify`, { ...response, serviceId: selectedService._id }, config);
                        alert(data.message);
                        onClose(); // Close the modal
                        navigate('/student-dashboard'); // Redirect
                    } catch (error) {
                        alert('Payment verification failed. Please contact support.');
                    }
                },
                prefill: { name: studentDetails.name, email: studentDetails.email, contact: studentDetails.phone },
                theme: { color: '#4F46E5' } // Indigo color
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            alert('Could not initiate payment. Please try again.');
        }
    };

    if (!isOpen) return null;

    const platformFee = selectedService ? (selectedService.price * 0.10).toFixed(2) : 0;
    const totalAmount = selectedService ? (parseFloat(selectedService.price) + parseFloat(platformFee)).toFixed(2) : 0;

    return (
        <div ref={overlayRef} className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div ref={modalRef} className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 sm:p-5 border-b">
                    <div className="flex items-center">
                        {currentStep === 2 && (
                            <button onClick={handleBackToServices} className="p-1 mr-2 rounded-full hover:bg-gray-100"><ArrowRight size={24} className="rotate-180" /></button>
                        )}
                        <img src={professor?.profileImage || '/default-avatar.png'} alt={professor?.faculty?.fullName} className="w-10 h-10 rounded-full object-cover" />
                        <span className="ml-3 font-semibold text-text-primary">{professor?.faculty?.fullName}</span>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><X size={24} /></button>
                </div>

                {/* Step 1: Select Service */}
                {currentStep === 1 && (
                    <div className="flex-grow overflow-y-auto p-4 sm:p-5 space-y-4">
                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-primary">Select a Service</h2>
                        {services && services.length > 0 ? (
                            services.map(service => (
                                <div key={service._id} className="bg-gray-50 rounded-lg p-4 border flex items-center justify-between hover:shadow-md">
                                    <div>
                                        <h3 className="text-lg font-semibold text-primary">{service.title}</h3>
                                        <p className="text-sm text-text-secondary">{currencySymbols[service.currency]}{service.price.toFixed(2)}</p>
                                    </div>
                                    <button onClick={() => handleServiceSelect(service)} className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-indigo-700">Select</button>
                                </div>
                            ))
                        ) : (
                            <p className="text-center py-8">No services available.</p>
                        )}
                    </div>
                )}

                {/* Step 2: Order Summary & Details */}
                {currentStep === 2 && selectedService && (
                    <>
                        <div className="flex-grow overflow-y-auto p-4 sm:p-5 space-y-6">
                            <h2 className="text-xl sm:text-2xl font-serif font-bold text-primary">Your Details</h2>
                            {/* Input Fields */}
                            <div className="space-y-4">
                                <div className="relative flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                                    <ProfileIcon size={20} className="absolute left-3 text-gray-500" />
                                    <label htmlFor="name-input" className="sr-only">Name</label>
                                    <input 
                                        id="name-input"
                                        type="text" 
                                        value={studentDetails.name} 
                                        onChange={(e) => setStudentDetails({...studentDetails, name: e.target.value})} 
                                        placeholder="Your Name" 
                                        className="pl-10 pr-3 py-2 w-full rounded-lg outline-none bg-transparent text-gray-800" 
                                    />
                                </div>
                                <div className="relative flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                                    <Mail size={20} className="absolute left-3 text-gray-500" />
                                    <label htmlFor="email-input" className="sr-only">Email</label>
                                    <input 
                                        id="email-input"
                                        type="email" 
                                        value={studentDetails.email} 
                                        onChange={(e) => setStudentDetails({...studentDetails, email: e.target.value})} 
                                        placeholder="your.email@example.com" 
                                        className="pl-10 pr-3 py-2 w-full rounded-lg outline-none bg-transparent text-gray-800" 
                                    />
                                </div>
                                <div className="relative flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                                    <Phone size={20} className="absolute left-3 text-gray-500" />
                                    <label htmlFor="phone-input" className="sr-only">Phone number</label>
                                    <input 
                                        id="phone-input"
                                        type="tel" 
                                        value={studentDetails.phone} 
                                        onChange={(e) => setStudentDetails({...studentDetails, phone: e.target.value})} 
                                        placeholder="e.g., 9876543210" 
                                        className="pl-10 pr-3 py-2 w-full rounded-lg outline-none bg-transparent text-gray-800" 
                                    />
                                </div>
                            </div>
                            {/* Order Summary */}
                            <div className="border rounded-lg">
                                <div className="p-4 bg-gray-50"><h3 className="font-semibold text-primary">Order Summary</h3></div>
                                <div className="p-4 space-y-3">
                                    <div className="flex justify-between"><span>1 x {selectedService.title}</span><span>{currencySymbols[selectedService.currency]}{selectedService.price.toFixed(2)}</span></div>
                                    <div className="flex justify-between"><span>Platform fee</span><span>{currencySymbols[selectedService.currency]}{platformFee}</span></div>
                                    <div className="flex justify-between text-lg font-bold border-t pt-3"><span>Total</span><span>{currencySymbols[selectedService.currency]}{totalAmount}</span></div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-between p-4 sm:p-5 bg-gray-50 border-t">
                            <div className="text-xl font-bold text-primary">{currencySymbols[selectedService.currency]}{totalAmount}</div>
                            <button onClick={handleConfirmAndPay} className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-indigo-700">Confirm & Pay</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BookingModal;