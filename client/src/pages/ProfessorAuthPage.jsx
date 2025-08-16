// src/pages/ProfessorAuthPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Briefcase, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import axios from 'axios'; 
import Navbar from '../components/homepage/Navbar';
// --- VISUALS for Professor Page ---
const professorImages = [
    { name: 'Engaging Lecture', imgSrc: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=2070' },
    { name: 'One-on-One Mentorship', imgSrc: 'https://images.unsplash.com/photo-1516514423353-842c58aa8b4c?q=80&w=2070' },
    { name: 'Academic Research', imgSrc: 'https://images.unsplash.com/photo-1531538606176-4f9262df5da7?q=80&w=1974' },
];

const VisualCard = ({ name, imgSrc }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg flex flex-col items-center text-center">
        <img src={imgSrc} alt={name} className="w-full h-48 object-cover rounded-xl mb-3" />
        <p className="font-sans text-text-secondary text-sm font-semibold">{name}</p>
    </div>
);

const InputField = ({ id, type, label, icon: Icon, value, onChange }) => (
    <div className="relative">
        <input 
            id={id} 
            name={id}
            type={type} 
            placeholder=" " 
            className="block w-full px-4 py-3 pl-12 bg-gray-50 border-2 border-border-color rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-accent peer transition-colors"
            value={value}
            onChange={onChange}
            required
        />
        <label htmlFor={id} className="absolute text-base text-text-secondary duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 px-2 left-10 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">{label}</label>
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary peer-focus:text-accent transition-colors" />
    </div>
);

const ProfessorAuthPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoginView, setIsLoginView] = useState(location.pathname.includes('/login'));
    // State for form fields
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const API_URL = process.env.REACT_APP_API_URL ;
    // Refs for animations
    const formContainerRef = useRef(null);
    const headingRef = useRef(null);

    const handleToggleView = () => {
        gsap.to([formContainerRef.current, headingRef.current], {
            duration: 0.4, opacity: 0, y: 20, ease: 'power3.in',
            onComplete: () => {
                setIsLoginView(!isLoginView);
                navigate(isLoginView ? '/faculty/signup' : '/faculty/login', { replace: true });
                gsap.fromTo([formContainerRef.current, headingRef.current], { y: -20, opacity: 0 }, { duration: 0.5, y: 0, opacity: 1, ease: 'power3.out', delay: 0.1 });
            }
        });
    };
    
      useEffect(() => {
        setIsLoginView(location.pathname.includes('/login'));
        setFullName('');
        setEmail('');
        setPassword('');
        setError('');
    }, [location.pathname]);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await axios.post(`${API_URL}/api/auth/faculty/login`, { email, password });
            
            // Save user info and token to local storage
            localStorage.setItem('facultyInfo', JSON.stringify(data));

            // Redirect to home page on successful login
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during login.');
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await axios.post(`${API_URL}/api/auth/faculty/signup`, { fullName, email, password });

            // Save user info and token to local storage
            localStorage.setItem('facultyInfo', JSON.stringify(data));

            // Redirect to home page on successful signup
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during signup.');
        }
    };
    return (
        <div className="min-h-screen bg-light-bg grid grid-cols-1 lg:grid-cols-2">
            <Navbar/>
                      <div className="flex flex-col justify-center items-center p-8 lg:p-12">
                <div className="w-full max-w-md">
                     {/* ... Header and heading ... */}
                     <Link to="/" className="inline-block mb-8"><div className="flex items-center"><img src="/logo.jpg" alt="Educonsult Logo" className="h-16 w-16 rounded-full" /><span className="ml-3 text-3xl font-bold text-primary font-serif">Educonsult</span></div></Link>
                    <div ref={headingRef}>
                        <h1 className="text-4xl font-serif font-bold text-primary">{isLoginView ? 'Mentor Portal' : 'Become a Mentor'}</h1>
                        <p className="mt-3 text-text-secondary">{isLoginView ? 'Welcome back. Manage your sessions and profile.' : 'Join our community of experts and start sharing your knowledge.'}</p>
                    </div>

                    {error && <div className="mt-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg">{error}</div>}

                    <div ref={formContainerRef} className="mt-8 space-y-6">
                        {isLoginView ? (
                            <form className="space-y-6" onSubmit={handleLoginSubmit}>
                                <InputField id="email" type="email" label="University Email" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} />
                                <InputField id="password" type="password" label="Password" icon={Lock} value={password} onChange={(e) => setPassword(e.target.value)} />
                                <button type="submit" className="w-full py-4 text-white font-bold bg-primary rounded-lg hover:bg-primary-light transition-colors shadow-custom">Login</button>
                            </form>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSignupSubmit}>
                                <InputField id="fullName" type="text" label="Full Name" icon={User} value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                <InputField id="email" type="email" label="Email" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} />
                                <InputField id="password" type="password" label="Create Password" icon={Lock} value={password} onChange={(e) => setPassword(e.target.value)} />
                                <button type="submit" className="w-full py-4 text-white font-bold bg-primary rounded-lg hover:bg-primary-light transition-colors shadow-custom">Create Mentor Account</button>
                            </form>
                        )}
                    </div>
                    <div className="mt-6 text-center text-text-secondary">
                        <button onClick={handleToggleView} className="font-semibold text-primary hover:underline">{isLoginView ? 'Become a Mentor' : 'Already have an account? Login'}</button>
                    </div>
                </div>
            </div>

             <div className="hidden lg:block relative bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-primary/5"></div>
                <div className="absolute inset-0 flex items-center justify-center p-12">
                     <div className="w-[500px] h-[700px] flex gap-4 -rotate-3 transform">
                        <div className="w-1/2 space-y-4"><div className="animate-scroll-up space-y-4">{[...professorImages, ...professorImages].map((p, i) => <VisualCard key={`c1-${i}`} {...p} />)}</div></div>
                        <div className="w-1/2 space-y-4 pt-16"><div className="animate-scroll-down space-y-4">{[...professorImages.slice().reverse(), ...professorImages.slice().reverse()].map((p, i) => <VisualCard key={`c2-${i}`} {...p} />)}</div></div>
                    </div>
                </div>
                 <div className="absolute bottom-12 left-12 right-12 bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20">
                    <h2 className="text-2xl font-serif font-bold text-primary">Share Your Wisdom, Shape the Future</h2>
                    <p className="mt-2 text-text-secondary">Connect with bright minds from around the world and make a lasting impact.</p>
                </div>
            </div>
        </div>
    );
};

export default ProfessorAuthPage;