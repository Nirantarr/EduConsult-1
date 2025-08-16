// // src/components/faculty-dashboard/Courses.jsx

// import React from 'react';

// const Courses = () => {
//   // Dummy data
//   const courseAnalytics = [
//     { id: 1, name: 'Subject Guidance', bookings: 15, earnings: 750 },
//     { id: 2, name: 'Motivational Talk', bookings: 10, earnings: 750 },
//   ];

//   return (
//     <div>
//       <h2 className="text-3xl font-primary text-theme-primary mb-6">Course Analytics</h2>
//       <div className="space-y-4">
//         {courseAnalytics.map(course => (
//           <div key={course.id} className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-primary text-theme-primary">{course.name}</h3>
//             <div className="flex justify-between mt-4">
//               <p>Total Bookings: {course.bookings}</p>
//               <p>Total Earnings: ${course.earnings}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Courses;