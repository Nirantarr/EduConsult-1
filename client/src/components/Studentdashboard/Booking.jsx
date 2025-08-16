import React, { useEffect, useRef, useState } from 'react';
import { CalendarCheck, Video, History, PlusCircle } from 'lucide-react';
import { gsap } from 'gsap';

// --- Mock Data (In a real app, this would come from an API) ---
const upcomingSessionsData = [
    { id: 1, professor: 'Dr. Evelyn Reed', topic: 'Quantum Physics Inquiry', date: '2025-08-20T14:00:00Z', duration: 30 },
    { id: 2, professor: 'Mr. Samuel Chen', topic: 'LMS Project Proposal', date: '2025-08-22T10:00:00Z', duration: 45 },
    { id: 3, professor: 'Dr. Maria Garcia', topic: 'Curriculum Design Feedback', date: '2025-08-25T16:30:00Z', duration: 30 },
];

const pastSessionsData = [
    { id: 4, professor: 'Mr. David Lee', topic: 'Campus Life Initiative', date: '2025-07-15T11:00:00Z' },
    { id: 5, professor: 'Dr. Evelyn Reed', topic: 'Thesis Brainstorming', date: '2025-07-10T09:30:00Z' },
];


// --- Main Booking Page Component ---
const Booking = () => {
  const [showPast, setShowPast] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from(".animate-on-load", {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15
        });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div ref={mainRef} className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-10 animate-on-load">
            <h1 className="text-4xl font-bold text-gray-800">My Bookings</h1>
            <p className="text-gray-500 mt-1">Manage your upcoming and past live chat sessions.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column (Upcoming Sessions & CTA) */}
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg animate-on-load">
                    <div className="flex items-center mb-4">
                        <Video className="w-6 h-6 text-indigo-500 mr-3"/>
                        <h2 className="text-2xl font-bold text-gray-800">Upcoming Sessions</h2>
                    </div>
                    <div className="space-y-4">
                        {upcomingSessionsData.length > 0 ? (
                            upcomingSessionsData.map(session => (
                                <div key={session.id} className="bg-slate-50 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <p className="font-semibold text-gray-700">{session.topic}</p>
                                        <p className="text-sm text-gray-500">with {session.professor}</p>
                                        <p className="text-sm text-indigo-600 font-medium mt-1">{formatDate(session.date)} ({session.duration} mins)</p>
                                    </div>
                                    <button className="bg-green-500 text-white font-bold px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors w-full sm:w-auto">
                                        Join Now
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-8">You have no upcoming sessions.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Column (Summary & Past Sessions) */}
            <div className="space-y-8">
                {/* Summary Card */}
                <div className="bg-white p-6 rounded-2xl shadow-lg animate-on-load">
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-gray-800">Active Bookings</h3>
                        <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl shadow-lg">
                            <CalendarCheck className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 mt-2">
                        {upcomingSessionsData.length}
                    </div>
                    <p className="text-gray-600 font-medium">Upcoming Sessions</p>
                </div>

                {/* Call to Action Card */}
                <div className="bg-white p-6 rounded-2xl shadow-lg animate-on-load">
                    <div className="flex items-center mb-3">
                         <PlusCircle className="w-8 h-8 text-indigo-500 mr-3"/>
                         <h3 className="text-xl font-bold text-gray-800">Need Help?</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Book a new live chat session with an available professor.</p>
                    <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                        Book a New Session
                    </button>
                </div>

                {/* Past Sessions Accordion */}
                <div className="bg-white rounded-2xl shadow-lg animate-on-load">
                    <button 
                        onClick={() => setShowPast(!showPast)} 
                        className="w-full flex justify-between items-center p-6 text-left"
                    >
                        <div className="flex items-center">
                            <History className="w-6 h-6 text-gray-500 mr-3"/>
                            <h3 className="text-xl font-bold text-gray-800">Past Sessions</h3>
                        </div>
                        <svg className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${showPast ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showPast ? 'max-h-96' : 'max-h-0'}`}>
                        <div className="px-6 pb-6 space-y-3 border-t border-gray-200 pt-4">
                            {pastSessionsData.map(session => (
                                <div key={session.id} className="p-3 bg-slate-50 rounded-lg opacity-80">
                                    <p className="font-semibold text-sm text-gray-700">{session.topic}</p>
                                    <p className="text-xs text-gray-500">with {session.professor} on {new Date(session.date).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Booking;