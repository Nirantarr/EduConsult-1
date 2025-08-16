// // src/components/faculty-dashboard/Sidebar.jsx

// import React, { useState, useEffect } from 'react';
// import { FaBook, FaConciergeBell, FaComments, FaDollarSign, FaChartBar, FaBars, FaTimes } from 'react-icons/fa';

// // --- Reusable Navigation Item Component for cleaner code ---
// const NavItem = ({ item, activeSection, onClick }) => (
//   <button
//     onClick={onClick}
//     className={`w-full flex items-center px-8 py-4 text-left relative transition-all duration-300
//       ${activeSection === item.id
//         ? 'text-theme-primary font-bold'
//         : 'text-text-secondary hover:text-theme-primary hover:bg-slate-50'
//       }`}
//   >
//     {/* The active state blue indicator bar */}
//     {activeSection === item.id && (
//       <span className="absolute right-0 top-0 h-full w-1.5 bg-theme-primary rounded-l-lg"></span>
//     )}
//     <span className="text-xl mr-5">{item.icon}</span>
//     <span className="text-md">{item.label}</span>
//   </button>
// );


// const Sidebar = ({ activeSection, setActiveSection }) => {
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const navItems = [
//     { id: 'bookings', icon: <FaBook />, label: 'Bookings' },
//     { id: 'services', icon: <FaConciergeBell />, label: 'Services' },
//     { id: 'chat', icon: <FaComments />, label: 'Chat' },
//     { id: 'payout', icon: <FaDollarSign />, label: 'Payout' },
//     { id: 'courses', icon: <FaChartBar />, label: 'Courses' },
//   ];

//   // Effect to prevent body scroll when the mobile menu is open
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     // Cleanup function to reset the style when the component unmounts
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isMobileMenuOpen]);


//   const handleNavClick = (sectionId) => {
//     setActiveSection(sectionId);
//     setMobileMenuOpen(false); // Close mobile menu on navigation
//   };

//   // --- Reusable Sidebar Content for both Desktop and Mobile ---
//   const SidebarContent = () => (
//     <div className="flex flex-col h-full bg-white">
//       {/* Header */}
//       <div className="p-8 flex items-center justify-between border-b border-gray-200">
//         <h1 className="text-4xl font-primary text-theme-primary">Educonsult</h1>
//         {/* The 'X' close button for mobile view, hidden on desktop */}
//         <button
//              onClick={() => setMobileMenuOpen(false)}
//              className="md:hidden text-text-secondary hover:text-theme-primary"
//              aria-label="Close menu"
//            >
//              <FaTimes className="h-6 w-6"/>
//            </button>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
//         <div className="py-4">
//           {navItems.map((item) => (
//             <NavItem
//               key={item.id}
//               item={item}
//               activeSection={activeSection}
//               onClick={() => handleNavClick(item.id)}
//             />
//           ))}
//         </div>
//       </nav>
//        {/* Footer Area */}
//        <div className="p-4 border-t border-gray-200"></div>
//     </div>
//   );


//   return (
//     <>
//       {/* --- DESKTOP SIDEBAR --- */}
//       <aside className="hidden md:flex flex-col w-72 h-screen border-r border-gray-200 shadow-sm">
//         <SidebarContent />
//       </aside>

//       {/* --- MOBILE HAMBURGER BUTTON --- */}
//       {/* This button is styled to match your image, with the subtle highlight */}
//       <button
//         onClick={() => setMobileMenuOpen(true)}
//         className="md:hidden fixed top-5 left-5 z-30 p-2 rounded-md bg-white shadow-lg border border-gray-200"
//         aria-label="Open menu"
//       >
//         <FaBars className="h-6 w-6 text-theme-primary" />
//       </button>

//       {/* --- MOBILE OVERLAY AND SLIDE-IN PANEL --- */}
//       {/* This is the new, robust structure */}
//       <div
//         className={`fixed inset-0 z-40 transition-opacity duration-300 md:hidden
//           ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`
//         }
//       >
//         {/* Backdrop: Catches clicks to close the menu */}
//         <div
//           onClick={() => setMobileMenuOpen(false)}
//           className="absolute inset-0 bg-black/60"
//           aria-hidden="true"
//         ></div>

//         {/* Sliding Panel: The actual sidebar content */}
//         <div
//           className={`relative h-full w-72 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out
//             ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`
//           }
//         >
//            <SidebarContent />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;