import React, { useState, useEffect } from 'react'; // <-- Import useState and useEffect
import { DollarSign, BookCheck, Users, TrendingUp, Star, Wallet, Download } from 'lucide-react'; // <-- Import Wallet and Download icons

const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
            <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

// --- NEW WALLET BALANCE CARD ---
// This new component fetches and displays the wallet balance.
const WalletBalanceCard = () => {
    const [wallet, setWallet] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Mockup fetching wallet data
    useEffect(() => {
        const fetchWalletData = async () => {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            setWallet({ balance: 1234.56, currency: 'USD' });
            setIsLoading(false);
        };
        fetchWalletData();
    }, []);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Wallet className="h-6 w-6 mr-3 text-indigo-500" />
                <span>Your Wallet</span>
            </h2>
            {isLoading ? (
                <div className="h-20 flex items-center justify-center text-gray-500">Loading Balance...</div>
            ) : (
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Available to Withdraw</p>
                        <p className="text-4xl font-bold text-gray-800 tracking-tight">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: wallet.currency }).format(wallet.balance)}
                        </p>
                    </div>
                    <button 
                        onClick={() => alert('Initiating withdrawal!')}
                        className="mt-4 sm:mt-0 flex items-center px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Withdraw Funds
                    </button>
                </div>
            )}
        </div>
    );
};


const MainContentF = () => {
    // Mock data - this would come from your backend API
    const earningsData = {
        total: 850.00,
        recentChats: [
            { id: 1, student: 'Alex Johnson', topic: 'Quantum Physics Inquiry', earnings: 25.00, date: '2025-08-15' },
            { id: 2, student: 'Maria Garcia', topic: 'Thesis Brainstorming', earnings: 45.00, date: '2025-08-14' },
            { id: 3, student: 'David Lee', topic: 'Project Proposal Review', earnings: 25.00, date: '2025-08-14' },
        ]
    };
    const statsData = {
        completedChats: 23,
        totalStudents: 15,
        rating: 4.9
    };

    return (
        <div className="max-w-7xl mx-auto">
            <header className="mb-10">
                <h1 className="text-4xl font-bold text-gray-800">My Dashboard</h1>
                <p className="text-gray-500 mt-1">Your earnings and activity at a glance.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-gradient-to-br from-indigo-500 to-blue-500 text-white p-6 rounded-2xl shadow-xl">
                    <h2 className="font-semibold">Total Earnings</h2>
                    <p className="text-4xl font-bold mt-2">${earningsData.total.toFixed(2)}</p>
                    <div className="flex items-center text-sm opacity-80 mt-1">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>+ $120.00 this week</span>
                    </div>
                </div>
                <StatCard icon={BookCheck} title="Completed Chats" value={statsData.completedChats} color="from-green-500 to-emerald-500" />
                <StatCard icon={Users} title="Unique Students" value={statsData.totalStudents} color="from-violet-500 to-purple-500" />
                <StatCard icon={Star} title="Average Rating" value={`${statsData.rating} / 5.0`} color="from-yellow-400 to-amber-500" />
            </div>
            
            {/* --- WALLET COMPONENT ADDED HERE --- */}
            <div className="mb-10">
                <WalletBalanceCard />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Chat Earnings</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b-2 border-gray-200">
                                <th className="p-3 text-sm font-semibold text-gray-500">Student</th>
                                <th className="p-3 text-sm font-semibold text-gray-500">Topic</th>
                                <th className="p-3 text-sm font-semibold text-gray-500">Date</th>
                                <th className="p-3 text-sm font-semibold text-gray-500 text-right">Earnings</th>
                            </tr>
                        </thead>
                        <tbody>
                            {earningsData.recentChats.map(chat => (
                                <tr key={chat.id} className="border-b border-gray-100 hover:bg-slate-50">
                                    <td className="p-3 font-medium text-gray-700">{chat.student}</td>
                                    <td className="p-3 text-gray-600">{chat.topic}</td>
                                    <td className="p-3 text-gray-500">{chat.date}</td>
                                    <td className="p-3 font-bold text-green-600 text-right">${chat.earnings.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MainContentF;