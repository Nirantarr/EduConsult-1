import React, { useState, useEffect, useRef } from 'react';

// Component Imports
import SidebarF from '../components/FacultyDashboard/SidebarF';
import MainContentF from '../components/FacultyDashboard/MainContentF';
import EditProfileF from '../components/FacultyDashboard/EditProfileF';
import ServicesManagerF from '../components/FacultyDashboard/ServicesManagerF';
import ShowBookings from '../components/FacultyDashboard/ShowBookings'; // <-- 1. Import the new component

// Icon and Animation Library Imports
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { gsap } from 'gsap';

const FacultyDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // State now includes 'bookings' as a possible active view
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard', 'bookings', 'services', 'profile', etc.
  const contentRef = useRef(null);

  // State for profile form (can be expanded to hold all faculty data)
  const [profileData, setProfileData] = useState({
    fullName: 'Dr. Evelyn Reed',
    title: 'Professor of Physics',
    profileImage: 'https://i.pravatar.cc/150?u=faculty',
    expertiseTags: ['Quantum Physics', 'Astrophysics'],
    // ... other fields
  });

  // Animate content on view change
  useEffect(() => {
    gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    );
  }, [activeView]);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to a backend API
    alert(`Profile updated for: ${profileData.fullName}`);
    setActiveView('dashboard'); // Switch back to the dashboard view after submission
  };

  // Function to render the correct content component based on the activeView state
  const renderContent = () => {
    switch (activeView) {
        case 'profile':
            return <EditProfileF profileData={profileData} setProfileData={setProfileData} onSubmit={handleProfileSubmit} />;
        case 'services':
            return <ServicesManagerF />;
        case 'bookings': // <-- 2. Added case to render the ShowBookings component
            return <ShowBookings />;
        case 'live-chat':
             return <div className="text-center p-8 bg-white rounded-lg shadow-md"><h2>Live Chat Interface (Coming Soon)</h2></div>;
        default:
            return <MainContentF />;
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="flex h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:w-64 flex-shrink-0">
          <SidebarF activeView={activeView} onNavigate={setActiveView} />
        </div>
        
        {/* Mobile Sidebar */}
        <div className={`fixed inset-0 z-40 lg:hidden transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="w-64 h-full">
            <SidebarF activeView={activeView} onNavigate={(view) => { setActiveView(view); setIsSidebarOpen(false); }} />
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header */}
          <header className="lg:hidden bg-white shadow-md p-4 flex justify-between items-center">
             <h2 className="text-xl font-bold text-slate-700">Faculty Panel</h2>
             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-md hover:bg-slate-100">
                {isSidebarOpen ? <XMarkIcon className="h-6 w-6 text-slate-800" /> : <Bars3Icon className="h-6 w-6 text-slate-800" />}
             </button>
          </header>
          
          {/* Content */}
          <main ref={contentRef} className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
            {renderContent()}
          </main>
        </div>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"></div>}
    </div>
  );
};

export default FacultyDashboard;