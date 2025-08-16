// src/pages/BrowsePage.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Filter, X, Award } from 'lucide-react';
import Navbar from '../components/homepage/Navbar';
import Footer from '../components/homepage/Footer';
import { gsap } from 'gsap';

// --- MOCK DATA (shortened for brevity, use your full data) --- 
const professorsData = [
    { id: 1, name: 'Dr. Evelyn Reed', university: 'MIT', specialty: 'Quantum Physics', rating: 4.9, reviews: 132, category: 'Physics', services: ['Live Chat', 'Project Guidance'], availableNow: true, avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 2, name: 'Dr. Samuel Grant', university: 'Oxford', specialty: 'Shakespearean Literature', rating: 4.8, reviews: 89, category: 'Literature', services: ['Thesis Review', 'Live Chat'], availableNow: false, avatar: 'https://i.pravatar.cc/150?img=7' },
    { id: 3, name: 'Dr. Angela Chen', university: 'Stanford', specialty: 'Machine Learning', rating: 5.0, reviews: 256, category: 'Computer Science', services: ['Live Chat', 'Project Guidance', 'Mock Interview'], availableNow: true, avatar: 'https://i.pravatar.cc/150?img=35' },
    { id: 4, name: 'Dr. Ben Carter', university: 'Harvard Business', specialty: 'Corporate Strategy', rating: 4.9, reviews: 180, category: 'Business', services: ['Live Chat', 'Career Advice'], availableNow: false, avatar: 'https://i.pravatar.cc/150?img=11' },
    { id: 5, name: 'Dr. David Kim', university: 'Caltech', specialty: 'Organic Chemistry', rating: 4.7, reviews: 95, category: 'Chemistry', services: ['Live Chat', 'Project Guidance'], availableNow: true, avatar: 'https://i.pravatar.cc/150?img=14' },
    { id: 6, name: 'Dr. Maria Rodriguez', university: 'Princeton', specialty: 'Economic Policy', rating: 4.8, reviews: 112, category: 'Economics', services: ['Thesis Review', 'Career Advice'], availableNow: false, avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 7, name: 'Dr. Wei Zhang', university: 'Tsinghua', specialty: 'AI Ethics', rating: 4.9, reviews: 78, category: 'Computer Science', services: ['Live Chat', 'Thesis Review'], availableNow: true, avatar: 'https://i.pravatar.cc/150?img=24' },
    { id: 8, name: 'Prof. Ian Malcolm', university: 'UChicago', specialty: 'Chaos Theory', rating: 5.0, reviews: 314, category: 'Mathematics', services: ['Live Chat', 'Thesis Review'], availableNow: true, avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 9, name: 'Dr. Eleanor Vance', university: 'Yale', specialty: 'Gothic Architecture', rating: 4.7, reviews: 65, category: 'Art & Design', services: ['Project Guidance', 'Thesis Review'], availableNow: false, avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 10, name: 'Prof. Alan Turing', university: 'Cambridge', specialty: 'Cryptography', rating: 5.0, reviews: 450, category: 'Computer Science', services: ['Mock Interview', 'Project Guidance'], availableNow: false, avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 11, name: 'Dr. John Carter', university: 'Harvard Medical', specialty: 'Emergency Medicine', rating: 4.9, reviews: 210, category: 'Medicine', services: ['Career Advice', 'Live Chat'], availableNow: true, avatar: 'https://i.pravatar.cc/150?img=6' },
    { id: 12, name: 'Prof. Annalise Keating', university: 'Georgetown Law', specialty: 'Criminal Law', rating: 4.9, reviews: 298, category: 'Law', services: ['Mock Interview', 'Career Advice'], availableNow: true, avatar: 'https://i.pravatar.cc/150?img=8' },
];

const categories = ['All', 'Physics', 'Literature', 'Computer Science', 'Business', 'Chemistry', 'Economics', 'Engineering', 'Mathematics', 'Art & Design', 'Medicine', 'Law'];
const serviceTypes = ['Live Chat', 'Thesis Review', 'Project Guidance', 'Mock Interview', 'Career Advice'];

const ProfessorCard = ({ prof }) => (
    <div className="bg-white rounded-2xl shadow-card border border-border-color/60 p-5 flex flex-col transform hover:-translate-y-2 transition-transform duration-300 overflow-hidden group">
        <div className="flex items-start mb-4">
            <img src={prof.avatar} alt={prof.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mr-4 border-2 border-white shadow-md" />
            <div className="flex-grow">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-primary">{prof.name}</h3>
                <p className="text-text-secondary font-sans text-sm">{prof.university}</p>
                 <div className="flex items-center text-amber-500 mt-2">
                    <Star size={16} className="fill-current" />
                    <span className="ml-1.5 font-bold text-sm text-text-primary">{prof.rating}</span>
                    <span className="ml-2 text-text-secondary font-sans text-sm">({prof.reviews} reviews)</span>
                </div>
            </div>
        </div>
        <p className="text-text-primary font-sans mb-4 text-sm leading-relaxed flex-grow">
            <span className="font-semibold text-text-secondary">Specialty:</span> {prof.specialty}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
            {prof.services.map(service => (
                <span key={service} className="bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full">{service}</span>
            ))}
        </div>
        <div className="mt-auto pt-4 border-t border-border-color flex justify-between items-center">
             <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 transition-colors ${prof.availableNow ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                <span className={`text-sm font-semibold ${prof.availableNow ? 'text-green-600' : 'text-text-secondary'}`}>
                    {prof.availableNow ? 'Available Now' : 'Offline'}
                </span>
            </div>
            <Link to={`/professor/${prof.id}`} className="px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-bold text-white bg-primary rounded-lg hover:bg-secondary transition-all duration-300 shadow-md transform group-hover:scale-105">
                View Profile
            </Link>
        </div>
    </div>
);

const BrowsePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ category: 'All', services: [], availableNow: false });
    const cardGridRef = useRef(null);

    const handleFilterChange = (filterType, value) => setFilters(prev => ({ ...prev, [filterType]: value }));
    const handleServiceToggle = (service) => {
        setFilters(prev => ({ ...prev, services: prev.services.includes(service) ? prev.services.filter(s => s !== service) : [...prev.services, service] }));
    };

    const filteredProfessors = useMemo(() => {
        return professorsData.filter(prof => (
            (prof.name.toLowerCase().includes(searchTerm.toLowerCase()) || prof.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (filters.category === 'All' || prof.category === filters.category) &&
            (filters.services.length === 0 || filters.services.every(s => prof.services.includes(s))) &&
            (!filters.availableNow || prof.availableNow)
        ));
    }, [searchTerm, filters]);
    
    useEffect(() => {
        if (cardGridRef.current) {
            gsap.fromTo(cardGridRef.current.children, 
                { autoAlpha: 0, y: 30 },
                { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
            );
        }
    }, [filteredProfessors]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            <main className="container mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-12 sm:pb-16">
                <header className="text-center mb-12 sm:mb-16">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-primary leading-tight">
                        Our Directory of Experts
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-text-secondary max-w-3xl mx-auto">
                        Your journey to mastery begins here. Search, filter, and connect with the world's leading minds, ready to guide you.
                    </p>
                </header>
                
                {/* --- RESPONSIVE FILTER CONTAINER --- */}
                {/* NOTE: `lg:sticky` makes it sticky ONLY on large screens. On mobile, it scrolls with the page. */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:sticky lg:top-24 z-20 mb-10 sm:mb-12 border border-border-color/30">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-center">
                        <div className="lg:col-span-2 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary/70" />
                            <input type="text" placeholder="Search by name or specialty..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg border-2 border-border-color/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
                                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                        <div className="relative">
                             <select value={filters.category} onChange={(e) => handleFilterChange('category', e.target.value)}
                                className="w-full appearance-none pl-4 pr-10 py-3 bg-gray-50 rounded-lg border-2 border-border-color/50 focus:outline-none focus:ring-2 focus:ring-accent transition-shadow">
                                 {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                            <Filter className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary/70 pointer-events-none" />
                        </div>
                         <div className="flex items-center justify-center bg-gray-50 rounded-lg p-3 border-2 border-border-color/50">
                            <label htmlFor="availability" className="flex items-center cursor-pointer">
                                <div className="relative"><input type="checkbox" id="availability" className="sr-only" checked={filters.availableNow} onChange={(e) => handleFilterChange('availableNow', e.target.checked)} /><div className="block bg-gray-300 w-14 h-8 rounded-full"></div><div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform"></div></div>
                                <div className="ml-3 text-text-primary font-semibold">Available Now</div>
                            </label>
                        </div>
                    </div>
                     <div className="mt-4 pt-4 border-t border-border-color/60">
                         <div className="flex flex-wrap gap-2 sm:gap-3">
                             {serviceTypes.map(service => (
                                 <button key={service} onClick={() => handleServiceToggle(service)}
                                     className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold rounded-full transition-all duration-200 border-2 ${filters.services.includes(service) ? 'bg-primary text-white border-primary' : 'bg-transparent text-text-secondary border-border-color/50 hover:border-primary/50 hover:text-primary'}`}>
                                     {service}
                                 </button>
                             ))}
                         </div>
                    </div>
                </div>
                
                <div ref={cardGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                     {filteredProfessors.map(prof => <ProfessorCard key={prof.id} prof={prof} />)}
                </div>

                {filteredProfessors.length === 0 && (
                     <div className="text-center py-16 sm:py-20 col-span-full">
                         <div className="inline-block p-5 bg-accent/10 rounded-full mb-6">
                            <Search className="h-10 w-10 sm:h-12 sm:h-12 text-accent" />
                         </div>
                         <h3 className="text-xl sm:text-2xl font-serif font-bold text-primary">No Experts Found</h3>
                         <p className="mt-2 text-text-secondary">Try adjusting your search or filter criteria. The perfect mentor is waiting for you!</p>
                     </div>
                 )}
            </main>

            <Footer />
            <style jsx>{`
                input:checked ~ .dot { transform: translateX(100%); background-color: #4F46E5; /* A sample accent color */ }
                input:checked + .block { background-color: #312E81; /* A sample primary color */ }
            `}</style>
        </div>
    );
};

export default BrowsePage;