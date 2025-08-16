import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video } from 'lucide-react';

// MOCKUP: In a real app, this function would make a network request to your backend API.
const fetchFacultyBookings = async () => {
  console.log("Fetching bookings...");
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1200));

  // Return some sample data
  const mockData = [
    {
      id: 'booking-001',
      studentName: 'Alice Johnson',
      serviceName: 'Quantum Mechanics Q&A',
      dateTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
      status: 'Confirmed',
      chatRoomId: 'chat-xyz-123',
    },
    {
      id: 'booking-002',
      studentName: 'Bob Williams',
      serviceName: 'Astrophysics Consultation',
      dateTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      status: 'Confirmed',
      chatRoomId: 'chat-abc-456',
    },
    {
      id: 'booking-003',
      studentName: 'Charlie Brown',
      serviceName: 'General Physics Tutoring',
      dateTime: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Day after tomorrow
      status: 'Pending',
      chatRoomId: 'chat-def-789',
    },
  ];
  return mockData;
};


const ShowBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchFacultyBookings();
        setBookings(data);
      } catch (err) {
        setError('Failed to load bookings. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadBookings();
  }, []); // Empty dependency array means this runs once on component mount

  if (isLoading) {
    return <div className="text-center p-8 text-slate-500">Loading bookings...</div>;
  }

  if (error) {
    return <div className="text-center p-8 bg-red-100 text-red-700 rounded-lg shadow-md">{error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">Upcoming Bookings</h2>
      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="flex-1 mb-4 sm:mb-0">
                <p className="font-bold text-indigo-700 text-lg">{booking.serviceName}</p>
                <p className="text-slate-600">With: {booking.studentName}</p>
                <div className="flex items-center text-sm text-slate-500 mt-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{new Date(booking.dateTime).toLocaleDateString()}</span>
                  <Clock className="h-4 w-4 mr-2 ml-4" />
                  <span>{new Date(booking.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                 <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                 }`}>
                    {booking.status}
                 </span>
                 <button 
                    disabled={booking.status !== 'Confirmed'}
                    onClick={() => alert(`Joining chat for booking ID: ${booking.id}`)}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                    <Video className="h-4 w-4 mr-2" />
                    Join Chat
                 </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-500 py-8">You have no upcoming bookings.</p>
      )}
    </div>
  );
};

export default ShowBookings;