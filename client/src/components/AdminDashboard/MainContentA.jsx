import React from 'react';
import { Users, UserCheck, BookOpenCheck, DollarSign } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center">
        <div className={`p-4 rounded-lg mr-4 ${color}`}>
            <Icon className="h-7 w-7 text-white" />
        </div>
        <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="text-3xl font-bold text-slate-800">{value}</p>
        </div>
    </div>
);

const MainContentA = () => {
    // Mock data - would come from an API
    const stats = {
        totalStudents: 1250,
        totalFaculty: 75,
        totalBookings: 432,
        totalRevenue: 15230.50,
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Admin Overview</h1>
                <p className="text-slate-500 mt-1">A high-level view of the platform's activity.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Students" value={stats.totalStudents} icon={Users} color="bg-blue-500" />
                <StatCard title="Registered Faculty" value={stats.totalFaculty} icon={UserCheck} color="bg-indigo-500" />
                <StatCard title="Total Bookings" value={stats.totalBookings} icon={BookOpenCheck} color="bg-emerald-500" />
                <StatCard title="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} icon={DollarSign} color="bg-amber-500" />
            </div>
        </div>
    );
};

export default MainContentA;
