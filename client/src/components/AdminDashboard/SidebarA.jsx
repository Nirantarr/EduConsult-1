import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart3, LogOut, ShieldCheck } from 'lucide-react';

const SidebarA = ({ activeView, onNavigate }) => {
  const navLinks = [
    { view: 'dashboard', icon: LayoutDashboard, text: 'Overview' },
    { view: 'faculty', icon: Users, text: 'Faculty Management' },
    { view: 'analytics', icon: BarChart3, text: 'Booking Analytics' },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-800 text-slate-200">
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-2xl font-bold text-white text-center">Admin Panel</h2>
      </div>
      <div className="p-4 text-center border-b border-slate-700">
        <ShieldCheck className="h-20 w-20 text-indigo-400 mx-auto" />
        <h3 className="mt-3 font-semibold text-white">Admin User</h3>
        <p className="text-xs text-slate-400">System Operator</p>
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
                <span className="font-medium">{link.text}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-700">
        <Link to="/logout" className="flex items-center w-full px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white">
          <LogOut className="h-5 w-5 mr-3" />
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default SidebarA;