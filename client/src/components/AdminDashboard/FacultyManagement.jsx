import React, { useState, useRef, useEffect } from 'react';
import { Users, ArrowLeft, UserCheck } from 'lucide-react';
import { gsap } from 'gsap';

// --- Mock Data ---
// This would come from your backend API in a real application
const facultyData = [
    { 
        id: 1, name: 'Dr. Evelyn Reed', email: 'e.reed@univ.edu', 
        expertise: ['Physics', 'Astrophysics'], registered: '2025-01-15',
        profileImage: 'https://i.pravatar.cc/150?u=faculty1',
        gradient: 'from-indigo-500 to-blue-500',
        services: [
            { id: 's1', name: 'Quantum Physics Inquiry', bookingsCount: 32 },
            { id: 's2', name: 'Thesis Brainstorming Session', bookingsCount: 15 },
        ]
    },
    { 
        id: 2, name: 'Mr. Samuel Chen', email: 's.chen@univ.edu', 
        expertise: ['Computer Science', 'AI'], registered: '2025-02-20',
        profileImage: 'https://i.pravatar.cc/150?u=faculty2',
        gradient: 'from-emerald-500 to-green-500',
        services: [
            { id: 's3', name: 'LMS Project Proposal Review', bookingsCount: 45 },
            { id: 's4', name: 'AI Ethics Discussion', bookingsCount: 22 },
            { id: 's5', name: 'Advanced Algorithms Tutoring', bookingsCount: 18 },
        ]
    },
    { 
        id: 3, name: 'Dr. Maria Garcia', email: 'm.garcia@univ.edu', 
        expertise: ['Curriculum Design'], registered: '2025-03-10',
        profileImage: 'https://i.pravatar.cc/150?u=faculty3',
        gradient: 'from-rose-500 to-pink-500',
        services: []
    },
    { 
        id: 4, name: 'Prof. David Lee', email: 'd.lee@univ.edu', 
        expertise: ['History', 'Ancient Civilizations'], registered: '2025-04-05',
        profileImage: 'https://i.pravatar.cc/150?u=faculty4',
        gradient: 'from-amber-500 to-orange-500',
        services: [
            { id: 's6', name: 'Historical Research Methods', bookingsCount: 28 },
        ]
    },
];

// --- Reusable Faculty Profile Card Component ---
const FacultyCard = ({ faculty, onSelect }) => {
    const cardRef = useRef(null);
    const shineRef = useRef(null);

    useEffect(() => {
        const cardEl = cardRef.current;
        const shineEl = shineRef.current;
        if (!cardEl || !shineEl) return;

        const handleMouseMove = (e) => {
            const rect = cardEl.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            gsap.to(shineEl, { 
                x: x - rect.width * 0.75, 
                y: y - rect.height * 0.75, 
                opacity: 0.2, 
                ease: 'power1.out' 
            });
        };
        const handleMouseLeave = () => {
            gsap.to(shineEl, { opacity: 0, ease: 'power1.out' });
        };
        
        cardEl.addEventListener('mousemove', handleMouseMove);
        cardEl.addEventListener('mouseleave', handleMouseLeave);
        
        return () => {
            cardEl.removeEventListener('mousemove', handleMouseMove);
            cardEl.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div ref={cardRef} className="bg-slate-800 text-white rounded-2xl shadow-lg overflow-hidden relative transform transition-transform hover:-translate-y-2">
            <div ref={shineRef} className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-white/50 to-transparent to-70% opacity-0 rounded-full pointer-events-none"></div>
            <div className={`h-20 bg-gradient-to-r ${faculty.gradient}`}></div>
            <div className="p-6 pt-0">
                <img 
                    src={faculty.profileImage} 
                    alt={faculty.name}
                    className="w-28 h-28 rounded-full -mt-14 mx-auto border-4 border-slate-800 shadow-md"
                />
                <div className="text-center mt-4">
                    <h3 className="font-bold text-xl text-white">{faculty.name}</h3>
                    <p className="text-sm text-slate-400">{faculty.email}</p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {faculty.expertise.map(tag => (
                            <span key={tag} className="text-xs bg-slate-700 text-slate-300 font-semibold px-2.5 py-1 rounded-full">{tag}</span>
                        ))}
                    </div>
                    <button 
                        onClick={() => onSelect(faculty)}
                        className="mt-6 w-full bg-indigo-600 font-semibold py-2.5 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Main FacultyManagement Component ---
const FacultyManagement = () => {
    const [selectedFaculty, setSelectedFaculty] = useState(null);

    // View 1: Main list of all faculty members
    if (!selectedFaculty) {
        return (
            <div className="p-4 sm:p-6 lg:p-8">
                {/* --- The Improved, Visible Header --- */}
                <header className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
                    {/* Left Side: Title and Subtitle */}
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-800">
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Faculty Management
                            </span>
                        </h1>
                        <p className="text-slate-500 mt-1 text-lg">An overview of all registered faculty members.</p>
                    </div>

                    {/* Right Side: Integrated Stat Card */}
                    <div className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4">
                        <div className="p-3 bg-indigo-500 rounded-lg">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Total Faculty</p>
                            <p className="text-3xl font-bold text-slate-800">{facultyData.length}</p>
                        </div>
                    </div>
                </header>

                {/* Grid of Faculty Profile Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {facultyData.map(faculty => (
                        <FacultyCard key={faculty.id} faculty={faculty} onSelect={setSelectedFaculty} />
                    ))}
                </div>
            </div>
        );
    }

    // View 2: Detailed view for a single selected faculty member
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <button 
                    onClick={() => setSelectedFaculty(null)} 
                    className="flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to All Faculty
                </button>
                <h1 className="text-3xl font-bold text-slate-800">Faculty Details</h1>
                <p className="text-slate-500 mt-1">Services and booking data for <span className="font-semibold text-slate-700">{selectedFaculty.name}</span>.</p>
            </header>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-3">
                    Provided Services ({selectedFaculty.services.length})
                </h2>
                {selectedFaculty.services.length > 0 ? (
                    <div className="space-y-4">
                        {selectedFaculty.services.map(service => (
                            <div key={service.id} className="bg-slate-50 p-4 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-slate-700">{service.name}</p>
                                </div>
                                <div className="flex items-center bg-emerald-100 text-emerald-800 text-sm font-bold px-3 py-1 rounded-full">
                                    <UserCheck className="w-4 h-4 mr-2" />
                                    {service.bookingsCount} Bookings
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-slate-500 py-8">This faculty member has not provided any services yet.</p>
                )}
            </div>
        </div>
    );
};

export default FacultyManagement;