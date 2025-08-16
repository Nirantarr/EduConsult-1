import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FacultyDashboard from './pages/FacultyDashboard';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import SupportPage from './pages/SupportPage';
import ProfessorAuthPage from './pages/ProfessorAuthPage';
import ProfessorDetailPage from './pages/ProfessorDetailPage';
import StudentAuthPage from './pages/StudentAuthPage';

import './index.css'; 

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />      
        <Route path="/support" element={<SupportPage />} />  
        <Route path="/contact" element={<SupportPage />} />     
        <Route path="/browse" element={<BrowsePage />} />      
        <Route path="/faculty/login" element={<ProfessorAuthPage />} />      
        <Route path="/faculty/signup" element={<ProfessorAuthPage />} />      
        <Route path="/student/login" element={<StudentAuthPage />} />   
        <Route path="/student/signup" element={<StudentAuthPage />} />   
        <Route path="/professor/:id" element={<ProfessorDetailPage />} />
          {/* <Route 
            path="/faculty-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['faculty', 'admin']}>
                <FacultyDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          /> */}

      </Routes>
    </div>
    </Router>
  );
}

export default App;