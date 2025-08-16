import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    LayoutDashboard,
    BookCopy,      
    Users,         
    CircleUserRound,
    LogOut,        
    ChevronDown,   
    GraduationCap  
} from 'lucide-react';

// Accept `activeView` and `onNavigate` props
const Sidebar = ({ activeView, onNavigate }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Changed 'to' to 'view' to match the state names
 // Inside your Sidebar.js file...

const navLinks = [
  { to: "/dashboard/student", icon: LayoutDashboard, text: "Dashboard" },
  { to: "/dashboard/student/booking", icon: BookCopy, text: "My Bookings" },
  { to: "/dashboard/student/profile", icon: CircleUserRound, text: "My Profile" },
];

// ... rest of the file
  return (
    <div className="flex flex-col h-full bg-slate-800 text-slate-200">
      
      <div className="p-4 border-b border-slate-700">
        <Link to="/" className="text-2xl font-bold text-white text-center block">LMS Portal</Link>
      </div>
      
      <div className="p-4 text-center border-b border-slate-700 relative">
        <img
            className="h-20 w-20 rounded-full border-2 border-indigo-400 object-cover mx-auto shadow-lg"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            alt="Student Profile"
        />
        <h3 className="mt-3 font-semibold text-white">Alex Johnson</h3>
        <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-center w-full bg-slate-700/50 p-2 rounded-lg mt-3 cursor-pointer hover:bg-slate-700"
        >
          <GraduationCap className="h-5 w-5 text-indigo-400 mr-2" />
          <span className="font-semibold text-sm">Student</span>
          <ChevronDown className={`ml-auto h-4 w-4 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        {isDropdownOpen && (
            <div className="absolute left-4 right-4 mt-2 bg-slate-900 rounded-lg p-2 shadow-xl z-10">
                <a href="#" className="block px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded-md">Switch Role (demo)</a>
            </div>
        )}
      </div>

      <nav className="flex-grow p-4">
        <ul className="space-y-1">
          {navLinks.map((link) => (
            <li key={link.text}>
              <button
                onClick={() => onNavigate(link.view)}
                className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 text-left ${
                  activeView === link.view
                    ? 'bg-indigo-600 text-white shadow-inner'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <link.icon className="h-5 w-5 mr-3" />
                {/* --- THIS IS THE CORRECTED LINE --- */}
                <span className="font-medium">{link.text}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <Link to="/logout" className="flex items-center px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white">
            <LogOut className="h-5 w-5 mr-3" />
            <span className="font-medium">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;