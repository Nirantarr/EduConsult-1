import React from 'react';
// 1. Chart.js Imports
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Import icons for the stat cards
import { Users, UserCheck, BookOpenCheck, DollarSign } from 'lucide-react';

// 2. IMPORTANT: Register the Chart.js components you will use
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Reusable Stat Card Component (no changes needed)
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

    // 3. Mock Data for the Charts
    const bookingChartData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Student Bookings This Week',
          data: [12, 19, 15, 21, 14, 18, 25],
          borderColor: 'rgb(79, 70, 229)',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          fill: true,
          tension: 0.4,
        },
      ],
    };

    const studentSignupChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'New Student Signups',
            data: [65, 59, 80, 81, 56, 92],
            backgroundColor: 'rgba(34, 197, 94, 0.6)',
            borderColor: 'rgb(22, 163, 74)',
            borderWidth: 1,
          },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Admin Overview</h1>
                <p className="text-slate-500 mt-1">A high-level view of the platform's activity.</p>
            </header>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Students" value={stats.totalStudents.toLocaleString()} icon={Users} color="bg-blue-500" />
                <StatCard title="Registered Faculty" value={stats.totalFaculty.toLocaleString()} icon={UserCheck} color="bg-indigo-500" />
                <StatCard title="Total Bookings" value={stats.totalBookings.toLocaleString()} icon={BookOpenCheck} color="bg-emerald-500" />
                <StatCard title="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} icon={DollarSign} color="bg-amber-500" />
            </div>

            {/* --- 4. NEW GRAPH SECTION --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Student Bookings Graph */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Student Bookings</h2>
                    <Line options={chartOptions} data={bookingChartData} />
                </div>

                {/* New Students Graph */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">New Student Signups</h2>
                    <Bar options={chartOptions} data={studentSignupChartData} />
                </div>
            </div>
        </div>
    );
};

export default MainContentA;