import React, { useState } from 'react';
// 1. Import all the components it needs to be able to show
import Sidebar from '../components/Studentdashboard/Sidebar';
import MainContent from '../components/Studentdashboard/Miancontent'; // Using your filename
import Booking from '../components/Studentdashboard/Booking';
import EditProfile from '../components/Studentdashboard/EditProfile';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const StudentDashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // 2. This state now controls which view is visible, just like the faculty dashboard
  const [activeView, setActiveView] = useState('dashboard'); // Default view

  // 3. This function decides which component to render
  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <MainContent />;
      case 'booking':
        return <Booking />;
      case 'profile':
        return <EditProfile />;
      default:
        return <MainContent />;
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="flex h-screen">
        
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:w-64 flex-shrink-0">
          {/* 4. Pass the activeView and the function to change it */}
          <Sidebar activeView={activeView} onNavigate={setActiveView} />
        </div>

        {/* Mobile Sidebar */}
        <div 
          className={`fixed inset-0 z-40 lg:hidden transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="w-64 h-full bg-slate-800">
             {/* 5. Pass props here too, and also close the menu on navigation */}
             <Sidebar 
                activeView={activeView} 
                onNavigate={(view) => {
                  setActiveView(view);
                  setIsSidebarOpen(false);
                }} 
             />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="lg:hidden bg-white shadow-md p-4 flex justify-between items-center">
             <h2 className="text-xl font-bold text-slate-700">Student Portal</h2>
             <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                className="p-2 rounded-md hover:bg-slate-100"
                aria-label="Toggle navigation"
            >
                {isSidebarOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
             </button>
          </header>
          
          {/* 6. The <Outlet> is gone. We now call our render function. */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
            onClick={() => setIsSidebarOpen(false)} 
            className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
        ></div>
      )}
    </div>
  );
};

export default StudentDashboardPage;