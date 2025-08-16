// src/pages/FacultyDashboard.jsx

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Importing all the dashboard components from the 'components' folder
import Sidebar from '../components/faculty-dashboard/Sidebar';
import Bookings from '../components/faculty-dashboard/Bookings';
import Services from '../components/faculty-dashboard/Services';
import Chat from '../components/faculty-dashboard/Chat';
import Payout from '../components/faculty-dashboard/Payout';
import Courses from '../components/faculty-dashboard/Courses';

const FacultyDashboard = () => {
  // State to manage the currently active section. 'bookings' is the default.
  const [activeSection, setActiveSection] = useState('bookings');
  const mainContentRef = useRef(null);

  // This effect runs a subtle animation whenever the active section changes.
  useEffect(() => {
    gsap.fromTo(
      mainContentRef.current,
      { opacity: 0, y: 20 }, // Animate from
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' } // Animate to
    );
  }, [activeSection]); // Dependency array: reruns the effect when activeSection changes

  // Function to render the correct component based on the active section
  const renderSection = () => {
    switch (activeSection) {
      case 'bookings':
        return <Bookings setActiveSection={setActiveSection} />;
      case 'services':
        return <Services />;
      case 'chat':
        return <Chat />;
      case 'payout':
        return <Payout />;
      case 'courses':
        return <Courses />;
      default:
        // Fallback to the bookings section
        return <Bookings  setActiveSection={setActiveSection}   />;
    }
  };

  return (
    // Main container with a flex layout for the sidebar and main content
    <div className="flex min-h-screen bg-gray-100" style={{ fontFamily: 'var(--secondary-font)' }}>
      {/* Sidebar component for navigation */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main content area that displays the active section's component */}
      <main ref={mainContentRef} className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {renderSection()}
      </main>
    </div>
  );
};

export default FacultyDashboard;