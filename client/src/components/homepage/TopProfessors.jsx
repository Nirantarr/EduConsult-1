// src/components/homepage/TopProfessors.jsx
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import LoadingAnimation from '../ui/LoadingAnimation'; // Import the LoadingAnimation component

gsap.registerPlugin(ScrollTrigger);


const categories = ['Career', 'Consulting', 'Data & AI', 'Design', 'Finance', 'Law', 'Product'];

// --- ENHANCED & RESPONSIVE CARD ---
const ProfessorCard = ({ professor }) => {
    const { faculty, title, profileImage, expertiseTags, education } = professor;
    const facultyId = faculty?._id;
    const name = faculty?.fullName;

    return (
        <div className="group relative flex-shrink-0 w-64 sm:w-72 bg-white rounded-2xl p-4 shadow-card text-center mx-3 sm:mx-4 overflow-hidden">
            <img
                src={profileImage || '/default-avatar.png'}
                alt={name}
                className="w-full h-56 sm:h-60 object-cover rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110"
            />
            <h3 className="text-lg sm:text-xl font-serif font-semibold text-primary">{name}</h3>
            <p className="font-sans text-sm sm:text-base text-text-secondary">{title}</p>
            <p className="font-sans text-xs sm:text-sm text-text-secondary mt-1">{education}</p>
            <div className="mt-4 min-h-[28px]">
                {(expertiseTags && expertiseTags.length > 0) && (
                    <span className="inline-block bg-accent/10 text-accent font-semibold px-3 py-1 rounded-full text-xs">
                        {expertiseTags[0]}
                    </span>
                )}
            </div>
            <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* --- Corrected Link to the detail page --- */}
                <Link to={`/professor/${facultyId}`} className="px-5 py-2.5 text-lg font-bold text-primary bg-white rounded-lg hover:bg-gray-100">
                    View Profile
                </Link>
            </div>
        </div>
    );
};


const TopProfessors = () => {
    const [allProfessors, setAllProfessors] = useState([]);
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [filteredProfessors, setFilteredProfessors] = useState([]);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [loading, setLoading] = useState(true); // New loading state
    const sectionRef = useRef(null);
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

    // Fetch all faculty data when the component mounts
    useEffect(() => {
        const fetchAllFaculty = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const { data } = await axios.get(`${API_URL}/api/faculty/profiles`);
                setAllProfessors(data);
            } catch (error) {
                console.error("Failed to fetch faculty profiles for homepage", error);
                // Optionally handle error state here, e.g., setError(true)
            } finally {
                setLoading(false); // Set loading to false after fetch (success or failure)
            }
        };
        fetchAllFaculty();
    }, [API_URL]);

    useLayoutEffect(() => {
        // Only animate if not loading
        if (!loading && sectionRef.current) {
            const q = gsap.utils.selector(sectionRef);
            gsap.fromTo(q(".section-header"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: sectionRef.current, start: "top 80%", } });
        }
    }, [loading]); // Add loading to dependency array

    const handleCategoryClick = (category) => {
        if (category === activeCategory) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setActiveCategory(category);
            setIsTransitioning(false);
        }, 300);
    };

    useEffect(() => {
        if (allProfessors.length > 0) {
            const filtered = allProfessors.filter(p =>
                // Simple mapping: check if any expertise tag contains the category name (case-insensitive)
                (p.expertiseTags || []).some(tag => tag.toLowerCase().includes(activeCategory.toLowerCase()))
            );
            // If no one matches, show a few from the general list as a fallback
            setFilteredProfessors(filtered.length > 0 ? filtered : allProfessors.slice(0, 4));
        } else if (!loading) { // If no professors and not loading, set filtered to empty to show no results
             setFilteredProfessors([]);
        }
    }, [activeCategory, allProfessors, loading]); // Add loading to dependency array

    // Duplicate the list for a seamless scrolling animation
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
                {loading ? (
                    <div className="flex justify-center"> {/* Adjust height as needed */}
                        <LoadingAnimation />
                    </div>
                ) : (
                    <>
                        <div className="absolute top-0 bottom-0 left-0 w-12 lg:w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                        <div className={`transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                            {displayList.length > 0 ? (
                                <div className="group flex animate-[scroll-left_40s_linear_infinite] group-hover:[animation-play-state:paused]">
                                    {displayList.map((prof, index) => (
                                        <ProfessorCard key={`${prof._id}-${index}`} professor={prof} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 text-text-secondary">No experts found for this category.</div>
                            )}
                        </div>
                        <div className="absolute top-0 bottom-0 right-0 w-12 lg:w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
                    </>
                )}
            </div>
        </section>
    );
};

export default TopProfessors;