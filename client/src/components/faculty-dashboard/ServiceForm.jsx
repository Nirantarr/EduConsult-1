// import React, { useState, useEffect } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // Import the styles for the editor

// // This component receives three props:
// // 1. serviceToEdit: An object containing service data if we are editing, otherwise null.
// // 2. onSave: A function to call when the form is submitted with valid data.
// // 3. onCancel: A function to call when the user clicks the "Cancel" button.
// const ServiceForm = ({ serviceToEdit, onSave, onCancel }) => {
  
//   // A single state object to hold all form data
//   const [formData, setFormData] = useState({
//     title: '',
//     shortDescription: '',
//     longDescription: '',
//     duration: '',
//     price: '',
//   });

//   // This useEffect hook watches for changes to the `serviceToEdit` prop.
//   // It's the key to making the form work for both creating and editing.
//   useEffect(() => {
//     if (serviceToEdit) {
//       // If a service object is provided, we're in "Edit Mode".
//       // Populate the form with the existing data.
//       setFormData(serviceToEdit);
//     } else {
//       // If no service object is provided, we're in "Create Mode".
//       // Reset the form to its initial empty state.
//       setFormData({
//         title: '',
//         shortDescription: '',
//         longDescription: '',
//         duration: '',
//         price: '',
//       });
//     }
//   }, [serviceToEdit]); // This effect re-runs only when the serviceToEdit object changes.

//   // A generic handler for standard text and number inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({ ...prevData, [name]: value }));
//   };

//   // A specific handler for the ReactQuill rich text editor
//   const handleQuillChange = (content) => {
//     setFormData(prevData => ({ ...prevData, longDescription: content }));
//   };
  
//   // Handles the form submission
//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent the default browser page reload
//     onSave(formData); // Pass the final form data up to the parent component
//   };

//   // The modules and formats for the ReactQuill editor toolbar
//   const quillModules = {
//     toolbar: [
//       [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '1'}],
//       ['link', 'image'],
//       ['clean']
//     ],
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <h2 className="text-3xl font-primary text-text-primary">
//         {/* The title changes dynamically based on the mode */}
//         {serviceToEdit ? 'Edit Service' : 'Create New Service'}
//       </h2>
      
//       {/* Title Input */}
//       <div>
//         <label htmlFor="title" className="block text-sm font-medium text-text-secondary mb-1">Title</label>
//         <input 
//           type="text" 
//           id="title"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           className="w-full border-gray-300 rounded-md shadow-sm focus:ring-theme-primary focus:border-theme-primary"
//           required 
//         />
//       </div>
      
//       {/* Short Description Input */}
//       <div>
//         <label htmlFor="shortDescription" className="block text-sm font-medium text-text-secondary mb-1">Short Description</label>
//         <input 
//           type="text" 
//           id="shortDescription"
//           name="shortDescription"
//           placeholder="This will be visible below your service title"
//           value={formData.shortDescription}
//           onChange={handleChange}
//           className="w-full border-gray-300 rounded-md shadow-sm focus:ring-theme-primary focus:border-theme-primary"
//         />
//       </div>

//       {/* Long Description (Rich Text Editor) */}
//       <div>
//         <label className="block text-sm font-medium text-text-secondary mb-1">Long Description</label>
//         <ReactQuill 
//           theme="snow"
//           value={formData.longDescription}
//           onChange={handleQuillChange}
//           modules={quillModules}
//           className="bg-white"
//         />
//       </div>

//       {/* Duration and Pricing Inputs */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         <div>
//           <label htmlFor="duration" className="block text-sm font-medium text-text-secondary mb-1">Duration (mins)</label>
//           <input 
//             type="number"
//             id="duration"
//             name="duration"
//             value={formData.duration}
//             onChange={handleChange}
//             className="w-full border-gray-300 rounded-md shadow-sm focus:ring-theme-primary focus:border-theme-primary"
//           />
//         </div>
//         <div>
//           <label htmlFor="price" className="block text-sm font-medium text-text-secondary mb-1">Amount ($)</label>
//           <div className="relative">
//             <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-secondary">$</span>
//             <input 
//               type="number"
//               id="price"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               className="w-full pl-7 border-gray-300 rounded-md shadow-sm focus:ring-theme-primary focus:border-theme-primary"
//               required
//             />
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="pt-4 flex justify-end space-x-3">
//         <button type="button" onClick={onCancel} className="bg-gray-200 text-text-secondary px-5 py-2 rounded-md hover:bg-gray-300 font-semibold transition-colors">
//           Cancel
//         </button>
//         <button type="submit" className="bg-theme-primary text-white px-5 py-2 rounded-md hover:bg-opacity-90 font-semibold transition-colors">
//           Save Service
//         </button>
//       </div>
//     </form>
//   );
// };

// export default ServiceForm;