// // src/components/faculty-dashboard/Chat.jsx

// import React from 'react';

// const Chat = () => {
//   // Dummy data
//   const chatSessions = [
//     { id: 1, student: 'John Doe', topic: 'Calculus Basics', lastMessage: 'See you then!' },
//   ];

//   return (
//     <div>
//       <h2 className="text-3xl font-primary text-theme-primary mb-6">Chat</h2>
//       <div className="flex space-x-4">
//         <div className="w-1/3 bg-white p-4 rounded-lg shadow-md">
//           <h3 className="text-xl font-primary text-theme-primary mb-4">Sessions</h3>
//           <ul>
//             {chatSessions.map(session => (
//               <li key={session.id} className="p-2 border-b cursor-pointer hover:bg-gray-100">
//                 <p className="font-bold">{session.student}</p>
//                 <p className="text-sm text-text-secondary">{session.topic}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="w-2/3 bg-white p-4 rounded-lg shadow-md">
//           <div className="h-96 border-b mb-4 overflow-y-auto">
//             {/* Chat messages would be rendered here */}
//             <p className="text-center text-text-secondary">Select a session to start chatting.</p>
//           </div>
//           <div className="flex">
//             <input type="text" className="flex-1 p-2 border rounded-l-lg" placeholder="Type your message..." />
//             <button className="bg-theme-primary text-white p-2 rounded-r-lg">Send</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;