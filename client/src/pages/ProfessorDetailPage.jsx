// src/pages/ProfessorDetailPage.jsx
import React, { useState, useLayoutEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MessageSquare, BookOpen, Clock, Linkedin, Twitter, Award, CheckCircle } from 'lucide-react';
import Navbar from '../components/homepage/Navbar';
import Footer from '../components/homepage/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- MOCK DATA ---
// In a real app, you would fetch this data from your backend based on the `id` from the URL
const professorMockData = {
    id: 1,
    name: 'Dr. Evelyn Reed',
    avatar: 'https://i.pravatar.cc/300?img=5',
    title: 'Professor of Physics, MIT',
    specialty: 'Expert in Quantum Mechanics & Astrophysics',
    rating: 4.9,
    reviewsCount: 132,
    sessionsCount: 500,
    about: "With over 20 years of experience in both academia and applied physics, I specialize in making complex topics understandable and exciting. My research at MIT focuses on quantum entanglement and its potential applications in computing. I am passionate about mentoring the next generation of scientists and thinkers, whether you're working on a groundbreaking thesis or just trying to grasp the fundamentals. My teaching philosophy is built on patience, clarity, and fostering a deep conceptual understanding.",
    services: [
        { name: "Live Chat Session", price: 75, duration: "30 min", description: "Get instant answers and guidance on specific physics problems or concepts." },
        { name: "Thesis Review & Consultation", price: 250, duration: "60 min", description: "A deep dive into your thesis or research paper with constructive feedback." },
        { name: "Project Guidance", price: 150, duration: "45 min", description: "Strategic guidance and troubleshooting for your academic or personal projects." }
    ],
    reviews: [
        { student: 'Alex Johnson', rating: 5, text: "Dr. Reed is phenomenal! She explained quantum superposition in a way I could finally understand. A total game-changer for my exam prep." },
        { student: 'Maria Garcia', rating: 5, text: "Her feedback on my thesis was invaluable. She pointed out flaws in my methodology that my own advisors missed. Highly recommend!" }
    ],
    expertiseTags: ['Quantum Physics', 'Astrophysics', 'General Relativity', 'Thesis Writing', 'Academic Research'],
    languages: ['English', 'German'],
    responseTime: 'Within 24 hours'
};

const ProfessorDetailPage = () => {
    const { id } = useParams(); // Use this ID to fetch data in a real app
    const professor = professorMockData; // Using mock data for now
    const [activeTab, setActiveTab] = useState('about');
    const pageRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".hero-animate", { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' });
            gsap.fromTo(".content-animate", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ".main-content", start: "top 80%" } });
        }, pageRef);
        return () => ctx.revert();
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case 'services':
                return (
                    <div className="space-y-6">
                        {professor.services.map(service => (
                            <div key={service.name} className="p-6 bg-white rounded-lg border border-border-color flex flex-col md:flex-row justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-serif font-bold text-primary">{service.name}</h3>
                                    <p className="text-text-secondary mt-1">{service.description}</p>
                                </div>
                                <div className="text-right mt-4 md:mt-0 md:ml-6 flex-shrink-0">
                                    <p className="text-2xl font-bold text-primary">${service.price}</p>
                                    <p className="text-sm text-text-secondary">{service.duration}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'reviews':
                return (
                    <div className="space-y-6">
                        {professor.reviews.map(review => (
                             <div key={review.student} className="p-6 bg-white rounded-lg border border-border-color">
                                 <div className="flex items-center mb-2">
                                     {[...Array(review.rating)].map((_, i) => <Star key={i} size={18} className="text-amber-500 fill-current" />)}
                                     <p className="ml-3 font-serif font-bold text-primary">{review.student}</p>
                                 </div>
                                 <p className="italic text-text-secondary">"{review.text}"</p>
                            </div>
                        ))}
                    </div>
                );
            case 'about':
            default:
                return <p className="text-lg text-text-secondary leading-relaxed whitespace-pre-line">{professor.about}</p>;
        }
    };

    return (
        <div ref={pageRef} className="bg-gray-50">
            <Navbar />

            {/* --- Hero Section --- */}
            <header className="bg-white pt-32 pb-16">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
                    <img src={professor.avatar} alt={professor.name} className="hero-animate w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-2xl mb-6 md:mb-0 md:mr-8" />
                    <div className="text-center md:text-left">
                        <h1 className="hero-animate text-4xl lg:text-5xl font-serif font-extrabold text-primary">{professor.name}</h1>
                        <p className="hero-animate mt-2 text-xl text-text-secondary">{professor.title}</p>
                        <p className="hero-animate mt-1 text-lg font-semibold text-accent">{professor.specialty}</p>
                        <div className="hero-animate mt-4 flex justify-center md:justify-start items-center gap-6 text-text-secondary">
                            <div className="flex items-center"><Star size={16} className="text-amber-500 mr-1.5 fill-current" /> <span className="font-bold text-text-primary">{professor.rating}</span> ({professor.reviewsCount} Reviews)</div>
                            <div className="flex items-center"><Award size={16} className="text-primary mr-1.5" /> {professor.sessionsCount}+ Sessions Completed</div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    
                    {/* --- Left Column: Main Content --- */}
                    <div className="lg:col-span-2 main-content content-animate">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-border-color/30">
                            {/* Tabs */}
                            <div className="border-b border-border-color mb-6 flex space-x-6">
                                <button onClick={() => setActiveTab('about')} className={`py-3 font-semibold ${activeTab === 'about' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary'}`}>About</button>
                                <button onClick={() => setActiveTab('services')} className={`py-3 font-semibold ${activeTab === 'services' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary'}`}>Services</button>
                                <button onClick={() => setActiveTab('reviews')} className={`py-3 font-semibold ${activeTab === 'reviews' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary'}`}>Reviews</button>
                            </div>
                            {/* Content */}
                            <div className="min-h-[300px]">
                                {renderContent()}
                            </div>
                        </div>
                    </div>

                    {/* --- Right Column: Sticky Sidebar --- */}
                    <div className="lg:sticky top-28 content-animate">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-border-color/30">
                             <h3 className="text-xl font-serif font-bold text-primary mb-4">Quick Info</h3>
                             <ul className="space-y-3 text-text-secondary">
                                <li className="flex items-center"><CheckCircle size={18} className="text-green-500 mr-3" /> <strong>Status:</strong><span className="ml-auto bg-green-100 text-green-700 font-bold px-3 py-1 text-xs rounded-full">Available</span></li>
                                <li className="flex items-center"><Clock size={18} className="text-primary mr-3" /> <strong>Response Time:</strong><span className="ml-auto font-semibold text-text-primary">{professor.responseTime}</span></li>
                             </ul>
                            <div className="mt-6 pt-6 border-t border-border-color">
                                 <h3 className="text-xl font-serif font-bold text-primary mb-4">Expertise</h3>
                                 <div className="flex flex-wrap gap-2">
                                    {professor.expertiseTags.map(tag => <span key={tag} className="bg-gray-100 text-text-secondary text-sm font-semibold px-3 py-1 rounded-full">{tag}</span>)}
                                 </div>
                            </div>
                             <a href="#" className="w-full block text-center mt-6 py-3 font-bold text-white bg-accent rounded-lg hover:bg-opacity-90 transition-all shadow-md">
                                Request a Session
                            </a>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProfessorDetailPage;