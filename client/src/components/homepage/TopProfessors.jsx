// src/components/homepage/TopProfessors.jsx
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- FULLY EXPANDED DATA WITH 10 CATEGORIES ---
const allProfessors = [
    // Career
    { id: 1, name: 'Dr. Johnathan Doe', title: 'Lead Career Advisor', imgSrc: 'https://i.pravatar.cc/400?img=11', category: 'Career', university: 'Stanford Alumni', specialty: 'Tech Interviews' },
    { id: 2, name: 'Samantha Ray', title: 'Resume Expert', imgSrc: 'https://i.pravatar.cc/400?img=21', category: 'Career', university: 'Yale School of Mgmt', specialty: 'CV & Cover Letters' },
    { id: 3, name: 'Dr. Michael Chen', title: 'Executive Coach', imgSrc: 'https://i.pravatar.cc/400?img=31', category: 'Career', university: 'Ex-Google', specialty: 'Leadership' },

    // Consulting
    { id: 4, name: 'Dr. Jane Smith', title: 'Senior Consultant', imgSrc: 'https://i.pravatar.cc/400?img=12', category: 'Consulting', university: 'McKinsey & Company', specialty: 'Market Entry' },
    { id: 5, name: 'Carlos Diaz', title: 'Strategy Consultant', imgSrc: 'https://i.pravatar.cc/400?img=22', category: 'Consulting', university: 'Bain & Company', specialty: 'Growth Strategy' },

    // Content
    { id: 6, name: 'Dr. Alice Johnson', title: 'Content Strategist', imgSrc: 'https://i.pravatar.cc/400?img=13', category: 'Content', university: 'HubSpot Academy', specialty: 'SEO Writing' },
    { id: 7, name: 'Ben Carter', title: 'Copywriting Pro', imgSrc: 'https://i.pravatar.cc/400?img=23', category: 'Content', university: 'DigitalMarketer', specialty: 'Ad Copy' },

    // Data & AI
    { id: 8, name: 'Dr. Mark Davis', title: 'AI & Data Scientist', imgSrc: 'https://i.pravatar.cc/400?img=14', category: 'Data & AI', university: 'DeepMind', specialty: 'Machine Learning' },
    { id: 9, name: 'Yi Zhang', title: 'Data Engineer', imgSrc: 'https://i.pravatar.cc/400?img=24', category: 'Data & AI', university: 'Ex-Facebook AI', specialty: 'Big Data Pipelines' },
    { id: 10, name: 'Elena Petrov', title: 'Data Analyst', imgSrc: 'https://i.pravatar.cc/400?img=34', category: 'Data & AI', university: 'MIT', specialty: 'Statistical Analysis' },

    // Design
    { id: 11, name: 'Clara Oswald', title: 'UX/UI Design Lead', imgSrc: 'https://i.pravatar.cc/400?img=15', category: 'Design', university: 'Ex-Apple', specialty: 'User Experience' },
    { id: 12, name: 'Leo Fischer', title: 'Product Designer', imgSrc: 'https://i.pravatar.cc/400?img=25', category: 'Design', university: 'IDEO', specialty: 'Human-Centered Design' },
    
    // Finance
    { id: 13, name: 'Chris Green', title: 'Financial Analyst', imgSrc: 'https://i.pravatar.cc/400?img=17', category: 'Finance', university: 'Goldman Sachs', specialty: 'Investment Banking' },
    { id: 14, name: 'Nina Simone', title: 'Venture Capitalist', imgSrc: 'https://i.pravatar.cc/400?img=27', category: 'Finance', university: 'a16z', specialty: 'Startup Funding' },
    
    // HR
    { id: 15, name: 'David Wilson', title: 'Head of People Ops', imgSrc: 'https://i.pravatar.cc/400?img=19', category: 'HR', university: 'SHRM Certified', specialty: 'Talent Acquisition' },
    { id: 16, name: 'Jessica Miller', title: 'HR Business Partner', imgSrc: 'https://i.pravatar.cc/400?img=29', category: 'HR', university: 'Ex-Microsoft', specialty: 'Employee Relations' },
    
    // Law
    { id: 17, name: 'Sophia Taylor', title: 'Legal Counsel', imgSrc: 'https://i.pravatar.cc/400?img=20', category: 'Law', university: 'Harvard Law', specialty: 'Corporate Law' },
    { id: 18, name: 'Robert Brown', title: 'Cybersecurity Expert', imgSrc: 'https://i.pravatar.cc/400?img=16', category: 'Cybersecurity', university: 'Cisco Security', specialty: 'Ethical Hacking' },
    
    // Product
    { id: 19, name: 'Olivia Black', title: 'Product Manager', imgSrc: 'https://i.pravatar.cc/400?img=18', category: 'Product', university: 'Ex-Shopify', specialty: 'Product Roadmaps' },
    { id: 20, name: 'Daniel Garcia', title: 'Growth PM', imgSrc: 'https://i.pravatar.cc/400?img=28', category: 'Product', university: 'Reforge Alum', specialty: 'User Growth' },
];

const categories = [ 'Career', 'Consulting', 'Content', 'Data & AI', 'Design', 'Finance', 'HR', 'Law', 'Cybersecurity', 'Product' ];

// --- ENHANCED & RESPONSIVE CARD ---
const ProfessorCard = ({ id, name, title, imgSrc, university, specialty }) => (
    <div className="group relative flex-shrink-0 w-64 sm:w-72 bg-white rounded-2xl p-4 shadow-card text-center mx-3 sm:mx-4 overflow-hidden">
        <img src={imgSrc} alt={name} className="w-full h-56 sm:h-60 object-cover rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110" />
        <h3 className="text-lg sm:text-xl font-serif font-semibold text-primary">{name}</h3>
        <p className="font-sans text-sm sm:text-base text-text-secondary">{title}</p>
        <p className="font-sans text-xs sm:text-sm text-text-secondary mt-1">{university}</p>
        <div className="mt-4">
            <span className="inline-block bg-accent/10 text-accent font-semibold px-3 py-1 rounded-full text-xs">
                {specialty}
            </span>
        </div>
        <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link to={`/browse`} className="px-5 py-2.5 sm:px-6 sm:py-3 text-base sm:text-lg font-bold text-primary bg-white rounded-lg hover:bg-gray-100">
                View Profile
            </Link>
        </div>
    </div>
);


const TopProfessors = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [filteredProfessors, setFilteredProfessors] = useState([]);
    const [isTransitioning, setIsTransitioning] = useState(false);
    
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const q = gsap.utils.selector(sectionRef);
        gsap.fromTo(q(".section-header"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: sectionRef.current, start: "top 80%", } });
    }, []);
    
    const handleCategoryClick = (category) => {
        if (category === activeCategory) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setActiveCategory(category);
            setIsTransitioning(false);
        }, 300);
    };

    useEffect(() => {
        setFilteredProfessors(allProfessors.filter(p => p.category === activeCategory)); 
    }, [activeCategory]);
    
    const displayList = filteredProfessors.length > 0 ? [...filteredProfessors, ...filteredProfessors] : [];

    return (
        <section ref={sectionRef} id="professors" className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 text-center">
                <div className="section-header">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary">The Go-To Platform for Experts</h2>
                    <p className="mt-4 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
                        Experts from every niche use our platform to build trust, grow revenue, and stay booked.
                    </p>
                </div>
                
                <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
                    {categories.map(category => (
                        <button key={category} onClick={() => handleCategoryClick(category)}
                            className={`px-4 py-2 sm:px-6 sm:py-2 rounded-full font-sans font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 ${activeCategory === category ? 'bg-primary text-white shadow-custom' : 'bg-white text-text-primary border border-border-color hover:bg-primary/10'}`}>
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative mt-12 sm:mt-16 w-full">
                <div className="absolute top-0 bottom-0 left-0 w-12 lg:w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                <div className={`transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                    {displayList.length > 0 && (
                        // FASTER animation on mobile, SLOWER on desktop
                        <div className="group flex animate-[scroll-left_10s_linear_infinite] lg:animate-[scroll-left_40s_linear_infinite] group-hover:[animation-play-state:paused]">
                            {displayList.map((prof, index) => (
                                <ProfessorCard key={`${prof.id}-${index}`} {...prof} />
                            ))}
                        </div>
                    )}
                </div>
                <div className="absolute top-0 bottom-0 right-0 w-12 lg:w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            </div>
        </section>
    );
};

export default TopProfessors;