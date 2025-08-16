import React, { useState } from 'react';
import { BookOpenIcon, CurrencyDollarIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const ServicesManagerF = () => {
    // In a real app, this would come from an API and be managed by the parent page
    const [services, setServices] = useState([
        { id: 1, title: '1:1 Doubt Solving Session', description: 'A 60-minute live video call to resolve specific academic questions.', price: 50 },
        { id: 2, title: 'Career Guidance & Mentorship', description: 'A 45-minute session focused on career paths, resume building, and industry insights.', price: 75 },
        { id: 3, title: 'Project Help & Code Review', description: 'Review and guidance on academic projects, up to 90 minutes.', price: 120 },
    ]);
    
    // State for the "Add New Service" form
    const [newServiceTitle, setNewServiceTitle] = useState('');
    const [newServiceDesc, setNewServiceDesc] = useState('');
    const [newServicePrice, setNewServicePrice] = useState('');

    const handleAddService = (e) => {
        e.preventDefault();
        if (!newServiceTitle || !newServicePrice) {
            alert('Please provide a title and a price for the new service.');
            return;
        }
        const newService = {
            id: Date.now(), // simple unique ID for demo purposes
            title: newServiceTitle,
            description: newServiceDesc,
            price: parseFloat(newServicePrice),
        };
        setServices([...services, newService]);
        // Clear the form
        setNewServiceTitle('');
        setNewServiceDesc('');
        setNewServicePrice('');
    };
    
    const handleRemoveService = (serviceId) => {
        setServices(services.filter(service => service.id !== serviceId));
    };

    return (
        <div>
            <header className="mb-12">
                <h1 className="text-4xl font-bold text-gray-800">Manage My Services</h1>
                <p className="text-gray-500 mt-2">Add, edit, or remove the services you offer to students.</p>
            </header>

            <div className="grid lg:grid-cols-3 gap-12">
                
                {/* --- Left Column: Existing Services List --- */}
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">My Service Offerings</h2>
                    <div className="space-y-4">
                        {services.length > 0 ? (
                            services.map(service => (
                                <div key={service.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-700">{service.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                                        <p className="text-lg font-bold text-green-600 mt-2">${service.price.toFixed(2)}</p>
                                    </div>
                                    <button onClick={() => handleRemoveService(service.id)} className="text-gray-400 hover:text-red-500 transition-colors ml-4 p-2">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 py-8">You haven't added any services yet.</p>
                        )}
                    </div>
                </div>

                {/* --- Right Column: Add New Service Form --- */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <PlusIcon className="w-6 h-6 mr-2 text-indigo-500" />
                        Add a New Service
                    </h2>
                    <form onSubmit={handleAddService} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2" htmlFor="serviceTitle">Service Title</label>
                            <div className="relative"><BookOpenIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input id="serviceTitle" type="text" value={newServiceTitle} onChange={(e) => setNewServiceTitle(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg"/></div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2" htmlFor="serviceDesc">Description</label>
                            <textarea id="serviceDesc" value={newServiceDesc} onChange={(e) => setNewServiceDesc(e.target.value)} rows="4" className="w-full px-4 py-2 border rounded-lg"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2" htmlFor="servicePrice">Price ($)</label>
                            <div className="relative"><CurrencyDollarIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input id="servicePrice" type="number" value={newServicePrice} onChange={(e) => setNewServicePrice(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg"/></div>
                        </div>
                        <div className="pt-2">
                            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                                Add Service
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ServicesManagerF;