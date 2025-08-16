import React, { useState, useEffect, useRef } from 'react';
// Using Solid icons for a bolder look on the light theme
import { UserIcon as UserIconSolid, CameraIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/solid';
// Import CreditCard for the new Student ID field
import { Mail, Lock, Building, GraduationCap, Tags, CreditCard } from 'lucide-react';
import { gsap } from 'gsap';

const EditProfile = () => {
  const cardRef = useRef(null);
  const shineRef = useRef(null);

  // State remains the same
  const [studentName, setStudentName] = useState('Alex Johnson');
  const [email, setEmail] = useState('alex.j@university.edu');
  const [studentId, setStudentId] = useState('12345678');
  const [program, setProgram] = useState('B.Sc. Computer Science');
  const [university, setUniversity] = useState('Tech University Global');
  const [levelOfStudy, setLevelOfStudy] = useState('Undergraduate');
  const [subjectsOfInterest, setSubjectsOfInterest] = useState('Quantum Physics, AI Ethics, Astrophysics, Rocket Propulsion');
  const [commsPreference, setCommsPreference] = useState('email');
  const [profileImage, setProfileImage] = useState('https://i.pravatar.cc/150?u=a042581f4e29026704d');

  // GSAP animation for the 3D card effect
  useEffect(() => {
    // ... (Your existing GSAP animation code remains unchanged)
  }, []);

  const handleImageUpload = (e) => {
    // ... (Your existing image upload logic remains unchanged)
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Profile updated for: ${studentName}`);
  };

  return (
    // Main background is a soft, light gray
    <div className="bg-slate-100 text-slate-800 min-h-full">
      <div className="p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto">
        
        <div className="text-left mb-12">
            <h1 className="text-4xl font-bold text-slate-900">My Profile</h1>
            <p className="text-slate-500 mt-1">Update your information and see it live on your student ID.</p>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-8 items-start">
            
            <div className="lg:col-span-3 bg-white border border-slate-200 p-8 rounded-2xl shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  <section>
                      <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2">Basic Information</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                          <div>
                              <label className="block text-sm font-medium text-slate-600 mb-2" htmlFor="fullName">Full Name</label>
                              <div className="relative">
                                  <UserIconSolid className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                  <input id="fullName" type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} className="w-full pl-11 pr-4 py-2.5 bg-slate-50 text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                              </div>
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-slate-600 mb-2" htmlFor="email">Email Address</label>
                              <div className="relative">
                                  <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                  {/* --- THIS FIELD IS NOW EDITABLE --- */}
                                  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-11 pr-4 py-2.5 bg-slate-50 text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                              </div>
                          </div>
                      </div>
                  </section>

                  <section>
                      <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2">Academic Information</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                           {/* --- STUDENT ID ADDED TO FORM (READ-ONLY) --- */}
                           <div>
                              <label className="block text-sm font-medium text-slate-600 mb-2" htmlFor="studentId">Student ID</label>
                              <div className="relative">
                                  <CreditCard className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                  <input id="studentId" type="text" className="w-full pl-11 pr-4 py-2.5 bg-slate-200 text-slate-500 border border-slate-300 rounded-lg cursor-not-allowed" />
                              </div>
                          </div>
                           <div>
                              <label className="block text-sm font-medium text-slate-600 mb-2" htmlFor="levelOfStudy">Level of Study</label>
                              <div className="relative">
                                  <GraduationCap className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                  <select id="levelOfStudy" value={levelOfStudy} onChange={(e) => setLevelOfStudy(e.target.value)} className="w-full pl-11 pr-4 py-2.5 bg-slate-50 text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
                                      <option>High School</option> <option>Undergraduate</option> <option>Postgraduate</option> <option>Doctorate</option>
                                  </select>
                              </div>
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-slate-600 mb-2" htmlFor="university">University / Institution</label>
                              <div className="relative">
                                  <Building className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                  <input id="university" type="text" value={university} onChange={(e) => setUniversity(e.target.value)} className="w-full pl-11 pr-4 py-2.5 bg-slate-50 text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                              </div>
                          </div>
                           {/* --- THIS FIELD IS NOW EDITABLE --- */}
                           <div>
                               <label className="block text-sm font-medium text-slate-600 mb-2" htmlFor="program">Field of Study / Major</label>
                               <input id="program" type="text" value={program} onChange={(e) => setProgram(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                           </div>
                      </div>
                  </section>
                  
                  <section>
                      <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2">Interests & Needs</h3>
                      <div className="mb-6">
                          <label className="block text-sm font-medium text-slate-600 mb-2" htmlFor="subjects">Subjects of Interest</label>
                          <textarea id="subjects" value={subjectsOfInterest} onChange={(e) => setSubjectsOfInterest(e.target.value)} rows="3" placeholder="e.g., Quantum Physics, AI Ethics" className="w-full px-4 py-2.5 bg-slate-50 text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-slate-600 mb-3">Communication Preferences</label>
                          <div className="flex items-center space-x-6">
                              <label className="flex items-center cursor-pointer">
                                  <input type="radio" name="comms" value="email" checked={commsPreference === 'email'} onChange={(e) => setCommsPreference(e.target.value)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                                  <span className="ml-2 text-slate-700">Email</span>
                              </label>
                              <label className="flex items-center cursor-pointer">
                                  <input type="radio" name="comms" value="in-app" checked={commsPreference === 'in-app'} onChange={(e) => setCommsPreference(e.target.value)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                                  <span className="ml-2 text-slate-700">In-App</span>
                              </label>
                          </div>
                      </div>
                  </section>
                  
                  <div className="pt-4">
                      <button type="submit" className="w-full flex items-center justify-center bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-transform hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          <ArrowUpOnSquareIcon className="w-5 h-5 mr-2" /> Save Changes
                      </button>
                  </div>
                </form>
            </div>

            {/* Aesthetic Cards Column */}
            <div className="lg:col-span-2 space-y-8">
                {/* DARK & VIBRANT ID CARD */}
                <div ref={cardRef} className="w-full max-w-sm h-64 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-6 flex flex-col justify-between relative overflow-hidden text-white" style={{ transformStyle: 'preserve-3d' }}>
                    <div ref={shineRef} className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-radial from-white/20 to-transparent to-70% opacity-0 rounded-full" style={{ transform: 'translate(-50%, -50%)' }}></div>
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg z-10">Student ID</h3>
                        <div className="w-12 h-12 bg-indigo-500/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center font-bold text-2xl z-10">L</div>
                    </div>
                    <div className="flex items-center space-x-4 z-10">
                        <div className="relative">
                             <img src={profileImage} alt="Profile" className="h-24 w-24 rounded-full object-cover border-2 border-indigo-400/50" />
                             <label htmlFor="profile-upload" className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full cursor-pointer shadow-md hover:bg-gray-200 transition-colors">
                                <CameraIcon className="w-5 h-5 text-gray-600" />
                                <input type="file" id="profile-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
                             </label>
                        </div>
                        <div>
                            <p className="font-bold text-xl drop-shadow-md">{studentName}</p>
                            <p className="text-sm text-slate-300">{studentId}</p>
                            <p className="text-xs text-slate-400 mt-2">{program}</p>
                            <p className="text-xs text-slate-400">{university}</p>
                        </div>
                    </div>
                </div>
                
                {/* WARM AMBER SECURITY CARD */}
                <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl shadow-lg">
                  <h3 className="text-lg font-semibold text-amber-900 mb-2 flex items-center"><Lock className="w-5 h-5 mr-3 text-amber-500" /> Security</h3>
                  <p className="text-sm text-amber-700 mb-4">Manage your account security settings.</p>
                  <button onClick={() => alert("Navigating to password change page...")} className="w-full text-center bg-white border border-amber-300 text-amber-800 font-bold py-2.5 px-4 rounded-lg hover:bg-amber-100 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400">
                      Change Password
                  </button>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default EditProfile;