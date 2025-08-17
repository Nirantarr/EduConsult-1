import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpenIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const ServicesManagerF = () => {
    // State to hold services fetched from the API
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // State for the "Add New Service" form
    const [newService, setNewService] = useState({
        title: '',
        description: '',
        price: '',
        currency: 'USD', // Default currency
    });
    
    const API_URL = process.env.REACT_APP_API_URL;

    // --- Function to fetch services ---
    const fetchServices = async () => {
        try {
            const { token } = JSON.parse(localStorage.getItem('facultyInfo'));
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.get(`${API_URL}/api/services/my-services`, config);
            setServices(data);
        } catch (err) {
            setError('Failed to fetch services.');
        } finally {
            setLoading(false);
        }
    };

    // --- Fetch services on component mount ---
    useEffect(() => {
        fetchServices();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewService(prev => ({ ...prev, [name]: value }));
    };

    // --- Handle adding a new service ---
    const handleAddService = async (e) => {
        e.preventDefault();
        if (!newService.title || !newService.price) {
            alert('Please provide a title and a price.');
            return;
        }
        try {
            const { token } = JSON.parse(localStorage.getItem('facultyInfo'));
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.post(`${API_URL}/api/services`, newService, config);
            
            // Add new service to the list and clear the form
            setServices([...services, data]);
            setNewService({ title: '', description: '', price: '', currency: 'USD' });
        } catch (err) {
            alert('Failed to add service. Please try again.');
        }
    };
    
    // --- Handle deleting a service ---
    const handleRemoveService = async (serviceId) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                const { token } = JSON.parse(localStorage.getItem('facultyInfo'));
                const config = { headers: { Authorization: `Bearer ${token}` } };
                await axios.delete(`${API_URL}/api/services/${serviceId}`, config);
                
                // Remove service from the list in the UI
                setServices(services.filter(service => service._id !== serviceId));
            } catch (err) {
                alert('Failed to delete service. Please try again.');
            }
        }
    };

    const currencySymbols = {
        USD: '$',
        INR: '₹',
    };

    if (loading) return <div>Loading services...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <header className="mb-12">
                <h1 className="text-4xl font-bold text-gray-800">Manage My Services</h1>
                <p className="text-gray-500 mt-2">Add, edit, or remove the services you offer to students.</p>
            </header>

            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">My Service Offerings</h2>
                    <div className="space-y-4">
                        {services.length > 0 ? (
                            services.map(service => (
                                <div key={service._id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-700">{service.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                                        <p className="text-lg font-bold text-green-600 mt-2">
                                            {currencySymbols[service.currency]}{service.price.toFixed(2)}
                                        </p>
                                    </div>
                                    <button onClick={() => handleRemoveService(service._id)} className="text-gray-400 hover:text-red-500 transition-colors ml-4 p-2">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 py-8">You haven't added any services yet.</p>
                        )}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <PlusIcon className="w-6 h-6 mr-2 text-indigo-500" /> Add a New Service
                    </h2>
                    <form onSubmit={handleAddService} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">Service Title</label>
                            <div className="relative"><BookOpenIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input name="title" type="text" value={newService.title} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2 border rounded-lg"/></div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">Description</label>
                            <textarea name="description" value={newService.description} onChange={handleInputChange} rows="4" className="w-full px-4 py-2 border rounded-lg"></textarea>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm font-semibold text-gray-600 mb-2">Price</label>
                                <input name="price" type="number" step="0.01" value={newService.price} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg"/>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-2">Currency</label>
                                <select name="currency" value={newService.currency} onChange={handleInputChange} className="w-full px-2 py-2 border rounded-lg bg-white">
                                    <option value="USD">USD</option>
                                    <option value="INR">INR</option>
                                </select>
                            </div>
                        </div>
                        <div className="pt-2">
                            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors">Add Service</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ServicesManagerF;