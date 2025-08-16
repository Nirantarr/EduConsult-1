import React from 'react';

const FacultyManagement = () => {
    // Mock data
    const facultyData = [
        { id: 1, name: 'Dr. Evelyn Reed', email: 'e.reed@univ.edu', expertise: ['Physics', 'Astrophysics'], registered: '2025-01-15' },
        { id: 2, name: 'Mr. Samuel Chen', email: 's.chen@univ.edu', expertise: ['Computer Science', 'AI'], registered: '2025-02-20' },
        { id: 3, name: 'Dr. Maria Garcia', email: 'm.garcia@univ.edu', expertise: ['Curriculum Design'], registered: '2025-03-10' },
    ];

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Faculty Management</h1>
                <p className="text-slate-500 mt-1">View and manage all registered faculty members.</p>
            </header>
            <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b-2 border-slate-200">
                            <th className="p-3 text-sm font-semibold text-slate-500">Name</th>
                            <th className="p-3 text-sm font-semibold text-slate-500">Email</th>
                            <th className="p-3 text-sm font-semibold text-slate-500">Expertise</th>
                            <th className="p-3 text-sm font-semibold text-slate-500">Registered On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facultyData.map(faculty => (
                            <tr key={faculty.id} className="border-b border-slate-100 hover:bg-slate-50">
                                <td className="p-3 font-medium text-slate-700">{faculty.name}</td>
                                <td className="p-3 text-slate-600">{faculty.email}</td>
                                <td className="p-3 text-slate-600">
                                    <div className="flex flex-wrap gap-1">
                                        {faculty.expertise.map(tag => <span key={tag} className="text-xs bg-indigo-100 text-indigo-700 font-semibold px-2 py-0.5 rounded-full">{tag}</span>)}
                                    </div>
                                </td>
                                <td className="p-3 text-slate-500">{faculty.registered}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FacultyManagement;