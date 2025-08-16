// import React, { useState, useRef, useEffect } from 'react';
// import { FaPlus } from 'react-icons/fa';
// import { FiShare2, FiMoreVertical } from "react-icons/fi";
// import Modal from '../ui/Modal';
// import ServiceForm from './ServiceForm';

// const Services = () => {
//   // --- STATE MANAGEMENT ---
//   const [services, setServices] = useState([
//     { id: 1, title: 'Subject Guidance', shortDescription: 'In-depth guidance on any subject.', longDescription: '', duration: 60, price: 50 },
//     { id: 2, title: 'Motivational Talk', shortDescription: 'A session to boost student morale.', longDescription: '', duration: 45, price: 75 },
//   ]);
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [editingService, setEditingService] = useState(null); // null for new, object for edit
//   const [openMenuId, setOpenMenuId] = useState(null); // Tracks which card's menu is open
//   const menuRef = useRef(null);

//   // --- MENU HANDLING ---
//   // Close menu if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setOpenMenuId(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const toggleMenu = (serviceId) => {
//     setOpenMenuId(openMenuId === serviceId ? null : serviceId);
//   };

//   // --- CRUD (Create, Read, Update, Delete) OPERATIONS ---
//   const handleAddNew = () => {
//     setEditingService(null);
//     setIsFormVisible(true);
//   };
  
//   const handleEdit = (service) => {
//     setEditingService(service);
//     setIsFormVisible(true);
//     setOpenMenuId(null);
//   };

//   const handleDelete = (serviceId) => {
//     setServices(services.filter(s => s.id !== serviceId));
//     setOpenMenuId(null);
//   };
  
//   const handleSaveService = (formData) => {
//     if (formData.id) { // Editing existing service
//       setServices(services.map(s => s.id === formData.id ? formData : s));
//     } else { // Creating new service
//       const newService = { ...formData, id: Date.now() }; // Use a better ID in a real app
//       setServices([...services, newService]);
//     }
//     setIsFormVisible(false);
//   };

//   // --- RENDER ---
//   return (
//     <div className="max-w-7xl mx-auto">
//       <h2 className="text-3xl sm:text-4xl font-primary text-text-primary mb-8">Your Services</h2>
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {/* Service Cards */}
//         {services.map(service => (
//           <div key={service.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between transition-shadow hover:shadow-xl">
//             <div>
//               <h3 className="text-xl font-primary text-theme-primary">{service.title}</h3>
//               <p className="text-text-secondary my-2 text-sm">{service.shortDescription}</p>
//               <p className="font-bold text-lg text-theme-primary mt-4">${service.price}/session</p>
//             </div>
            
//             {/* Action Buttons */}
//             <div className="mt-6 flex items-center justify-end space-x-2 relative">
//               <button onClick={() => handleEdit(service)} className="bg-gray-100 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200">Edit</button>
//               <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200"><FiShare2 /></button>
//               <button onClick={() => toggleMenu(service.id)} className="bg-gray-100 p-2 rounded-full hover:bg-gray-200"><FiMoreVertical /></button>
              
//               {/* Dropdown Menu */}
//               {openMenuId === service.id && (
//                 <div ref={menuRef} className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
//                   <a href="#" className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-100">Copy Link</a>
//                   <a href="#" className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-100">Duplicate Service</a>
//                   <button onClick={() => handleDelete(service.id)} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete Service</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
        
//         {/* Add New Service Card */}
//         <button 
//           onClick={handleAddNew}
//           className="bg-white rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-6 text-text-secondary hover:border-theme-primary hover:text-theme-primary transition-all min-h-[240px]">
//           <FaPlus className="mb-2" size={24} />
//           <span className="font-semibold">Add New Service</span>
//         </button>
//       </div>

//       {/* Modal for Form */}
//       <Modal isVisible={isFormVisible} onClose={() => setIsFormVisible(false)}>
//         <ServiceForm 
//           serviceToEdit={editingService}
//           onSave={handleSaveService}
//           onCancel={() => setIsFormVisible(false)}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default Services;