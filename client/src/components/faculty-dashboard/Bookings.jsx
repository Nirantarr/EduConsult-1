// // src/components/faculty-dashboard/Bookings.jsx

// import React, { useState } from 'react';
// import { FaRegCommentDots, FaRegBell, FaShareAlt, FaPlus } from 'react-icons/fa';

// // --- STYLED SUB-COMPONENTS for a cleaner and more beautiful layout ---

// // 1. The star of the show: A beautifully styled card for upcoming sessions.
// const UpcomingBookingItem = ({ session, onChatClick }) => (
//   // Gradient border trick: A padded gradient parent wraps a white child.
//   <div className="p-0.5 rounded-xl bg-gradient-to-r from-theme-secondary via-theme-primary to-theme-secondary transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
//     <div className="bg-white rounded-[11px] p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//       {/* Left Side: Topic and Student */}
//       <div>
//         <p className="font-bold text-lg text-text-primary">{session.topic}</p>
//         <p className="text-sm text-text-secondary">with {session.student}</p>
//       </div>

//       {/* Right Side: Icons and Date/Time */}
//       <div className="flex flex-row-reverse sm:flex-row items-center gap-6 sm:gap-8 w-full sm:w-auto">
//         {/* Action Icons */}
//         <div className="flex items-center gap-5 text-gray-400 text-lg">
//           <button onClick={() => onChatClick(session)} className="hover:text-theme-primary transition-colors" title="Chat with student">
//             <FaRegCommentDots />
//           </button>
//           <button className="hover:text-theme-primary transition-colors" title="Send a notification">
//             <FaRegBell />
//           </button>
//           <button className="hover:text-theme-primary transition-colors" title="Share session details">
//             <FaShareAlt />
//           </button>
//         </div>

//         {/* Date and Time */}
//         <div className="text-left sm:text-right flex-grow sm:flex-grow-0">
//           <p className="text-sm text-text-primary font-medium">{session.date}</p>
//           <p className="text-sm text-text-secondary">{session.time}</p>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // 2. A distinct, clean style for completed sessions.
// const CompletedBookingItem = ({ session }) => (
//   <div className="bg-white p-5 border border-gray-200/80 rounded-xl flex justify-between items-center hover:bg-slate-50 transition-colors duration-200">
//     <div>
//       <p className="font-semibold text-text-primary">{session.topic}</p>
//       <p className="text-sm text-text-secondary">with {session.student} on {session.date}</p>
//     </div>
//     <div className="text-right">
//       <p className="font-bold text-lg text-green-500">+${session.earnings}</p>
//     </div>
//   </div>
// );

// // 3. An engaging "empty state" with a call-to-action button.
// const NoUpcomingSessions = () => (
//     <div className="text-center py-16 px-6 bg-white rounded-2xl border-2 border-dashed">
//         <img
//             src="https://res.cloudinary.com/topmate/image/asset/f_auto,q_auto/v1672227579/temp/Rectangle_1311_s5w1lo.svg"
//             alt="No bookings"
//             className="mx-auto h-40 w-40 mb-6 opacity-80"
//         />
//         <h3 className="text-2xl font-primary text-text-primary mb-2">Your schedule is clear!</h3>
//         <p className="text-text-secondary max-w-sm mx-auto mb-8">
//             Share your page to get new bookings, or add a new service to offer.
//         </p>
//         <button className="bg-gradient-to-r from-theme-primary to-theme-secondary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 mx-auto">
//             <FaPlus />
//             Create New Service
//         </button>
//   </div>
// );


// // --- MAIN BOOKINGS COMPONENT ---
// const Bookings = ({ setActiveSection }) => {
//   const [activeTab, setActiveTab] = useState('upcoming');

//   // --- DUMMY DATA ---
//   // To see the "NoUpcomingSessions" component, make this array empty: []
//   const upcomingSessions = [
//     { id: 1, student: 'John Doe', topic: 'Calculus Basics', date: '2025-09-10', time: '10:00 AM' },
//     { id: 2, student: 'Jane Smith', topic: 'React State Management', date: '2025-09-12', time: '2:00 PM' },
//   ];

//   const completedSessions = [
//     { id: 3, student: 'Peter Jones', topic: 'Introduction to Python', date: '2025-08-01', earnings: 50 },
//     { id: 4, student: 'Emily White', topic: 'Data Structures', date: '2025-07-22', earnings: 50 },
//   ];

//   const handleChatNavigation = (session) => {
//     setActiveSection('chat');
//   };

//   return (
//     // Add a subtle background to the entire component area for depth
//     <div className="max-w-6xl mx-auto bg-slate-50/50 p-4 sm:p-8 rounded-2xl">
//       <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
//         <h2 className="text-4xl font-primary text-text-primary">Bookings</h2>
//         {/* Tab Navigation */}
//         <div className="flex mt-4 md:mt-0 border border-gray-200 rounded-lg p-1 bg-white">
//           <button
//             onClick={() => setActiveTab('upcoming')}
//             className={`px-6 py-2 rounded-md font-semibold text-sm transition-all
//               ${activeTab === 'upcoming'
//                 ? 'bg-theme-primary text-white shadow'
//                 : 'text-text-secondary hover:bg-gray-100'
//               }`}
//           >
//             Upcoming
//           </button>
//           <button
//             onClick={() => setActiveTab('completed')}
//             className={`px-6 py-2 rounded-md font-semibold text-sm transition-all
//               ${activeTab === 'completed'
//                 ? 'bg-theme-primary text-white shadow'
//                 : 'text-text-secondary hover:bg-gray-100'
//               }`}
//           >
//             Completed
//           </button>
//         </div>
//       </div>

//       {/* Tab Content */}
//       <div>
//         {activeTab === 'upcoming' && (
//           <div className="space-y-4">
//             {upcomingSessions.length > 0 ? (
//               upcomingSessions.map(session => (
//                 <UpcomingBookingItem
//                   key={session.id}
//                   session={session}
//                   onChatClick={handleChatNavigation}
//                 />
//               ))
//             ) : (
//               <NoUpcomingSessions />
//             )}
//           </div>
//         )}

//         {activeTab === 'completed' && (
//           <div className="space-y-4">
//             {completedSessions.map(session => (
//               <CompletedBookingItem key={session.id} session={session} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Bookings;