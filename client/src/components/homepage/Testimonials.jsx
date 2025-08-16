// src/components/homepage/Testimonials.jsx
import React, { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react'; // Make sure to install lucide-react: npm install lucide-react
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Child Component: TestimonialCard (with original slate styling) ---
const TestimonialCard = React.forwardRef(({ testimonial }, ref) => {
    const cardRef = useRef(null);
    const spotlightRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        const spotlight = spotlightRef.current;
        if (!card || !spotlight) return;

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            gsap.to(spotlight, { x: e.clientX - rect.left, y: e.clientY - rect.top, duration: 0.4, ease: 'power3.out' });
        };
        const handleMouseEnter = () => gsap.to(spotlight, { scale: 1, opacity: 1, duration: 0.3 });
        const handleMouseLeave = () => gsap.to(spotlight, { scale: 0, opacity: 0, duration: 0.3 });

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div ref={ref} className="testimonial-card-container w-[90vw] md:w-[480px] flex-shrink-0 p-4 h-full">
            <div ref={cardRef} className="relative h-full bg-slate-800/60 backdrop-blur-lg rounded-2xl p-8 flex flex-col border border-slate-700 overflow-hidden">
                <div ref={spotlightRef} className="absolute top-0 left-0 w-32 h-32 bg-[var(--theme-accent)]/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl scale-0 opacity-0 pointer-events-none" />
                <Quote className="h-10 w-10 text-[var(--theme-accent)] mb-6 z-10" />
                <p className="text-slate-300 text-lg italic mb-6 leading-relaxed flex-grow z-10 font-sans">
                    "{testimonial.quote}"
                </p>
                <div className="flex items-center mt-auto pt-6 border-t border-slate-700 z-10">
                    <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-16 h-16 rounded-full object-cover mr-5 border-2 border-[var(--theme-accent)]"
                    />
                    <div>
                        <p className="font-bold text-white text-lg font-serif">{testimonial.author}</p>
                        <p className="text-sm text-slate-400 font-sans">{testimonial.role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
});


// --- Main Testimonials Component ---
const Testimonials = () => {
    const sectionRef = useRef(null);
    const pinContainerRef = useRef(null); 
    const headingBlockRef = useRef(null);
    const cardsWrapperRef = useRef(null);
    const cardsRef = useRef([]);

    // --- YOUR WEBSITE'S TESTIMONIAL CONTENT ---
    const testimonialsData = [
      { id: 1, quote: "ProfsConnect was a lifesaver for my final exams. The one-on-one session with Dr. Reed clarified concepts I was struggling with for weeks. It's incredibly efficient.", author: "Alex Johnson", role: "Student, Computer Science", avatar: "https://i.pravatar.cc/80?img=1" },
      { id: 2, quote: "As a professor, this platform allows me to connect with students beyond my own university and share my expertise in a meaningful way. The interface is seamless.", author: "Dr. Evelyn Reed", role: "Professor of Physics, MIT", avatar: "https://i.pravatar.cc/80?img=5" },
      { id: 3, quote: "I needed urgent feedback on my thesis proposal. Within an hour, I was chatting with a top-tier professor who gave me invaluable insights that shaped my entire project.", author: "Maria Garcia", role: "PhD Candidate, Sociology", avatar: "https://i.pravatar.cc/80?img=3" },
      { id: 4, quote: "The quality of experts available is simply unmatched. It feels like having the academic support of multiple universities right at your fingertips.", author: "David Kim", role: "Student, Economics", avatar: "https://i.pravatar.cc/80?img=7" },
      { id: 5, quote: "This platform has become my go-to for quick career advice from academics who are leaders in their field. The perspective they provide is priceless.", author: "Sanjay Gupta", role: "Alumnus, Business School", avatar: "https://i.pravatar.cc/80?img=9" },
      { id: 6, quote: "It's an empowering tool for both learning and teaching. The direct interaction fosters a genuine passion for subjects and helps students overcome hurdles instantly.", author: "Prof. Aisha Khan", role: "Professor of Literature, Oxford", avatar: "https://i.pravatar.cc/80?img=10" },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const pinContainer = pinContainerRef.current;
            const cardsWrapper = cardsWrapperRef.current;
            if (!pinContainer || !cardsWrapper) return;

            const scrollWidth = cardsWrapper.scrollWidth - document.documentElement.clientWidth;
            
            gsap.to(headingBlockRef.current, {
                y: -100, autoAlpha: 0, ease: 'power1.in',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=150',
                    scrub: true
                }
            });

            gsap.to(cardsWrapper, {
                x: -scrollWidth, ease: 'none',
                scrollTrigger: {
                    trigger: pinContainer, pin: true, scrub: 1,
                    start: 'center center',
                    end: () => `+=${scrollWidth}`,
                }
            });

            cardsRef.current.forEach(card => {
                gsap.from(card, {
                    scale: 0.9, autoAlpha: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: gsap.getTweensOf(cardsWrapper)[0],
                        start: 'left 85%',
                    }
                });
            });

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        // Reverted to the original dark background color
        <section ref={sectionRef} className="bg-[#1B283D] text-white relative overflow-hidden py-24 md:py-32 min-h-[200vh]">
            {/* Using the original grid styles */}
            <div className="absolute inset-0 z-0 bg-grid-original" />

            <div ref={headingBlockRef} className="container mx-auto px-4 text-center mb-16 relative z-10">
                <h2 className="text-3xl md:text-5xl font-extrabold font-serif mb-6">
                    Trusted by <span className="text-[var(--theme-accent)]">Academics & Students</span>
                </h2>
                <p className="text-lg text-slate-300 max-w-3xl mx-auto font-sans">
                    See why leading minds and ambitious learners choose ProfsConnect to bridge the knowledge gap.
                </p>
            </div>
            
            <div ref={pinContainerRef} className="h-[60vh] flex items-center">
                <div ref={cardsWrapperRef} className="flex items-center h-full w-max pl-[calc((100vw-480px)/2)]">
                    {testimonialsData.map((testimonial, index) => (
                        <TestimonialCard 
                            key={testimonial.id}
                            ref={el => cardsRef.current[index] = el}
                            testimonial={testimonial} 
                        />
                    ))}
                </div>
            </div>
            <GlobalStyles />
        </section>
    );
};

// --- Inlined Global Styles using the original fixed values ---
const GlobalStyles = () => (
    <style jsx global>{`
        .bg-grid-original {
            background-image: linear-gradient(rgba(48, 80, 144, 0.1) 1px, transparent 1px), 
                              linear-gradient(to right, rgba(48, 80, 144, 0.1) 1px, transparent 1px);
            background-size: 4rem 4rem;
        }
    `}</style>
);

export default Testimonials;