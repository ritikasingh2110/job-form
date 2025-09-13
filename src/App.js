// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import JobApplicationForm from './components/JobApplicationForm';
import Portal from './components/Portal';
import Jobs from './components/FindJob'
import Terms from './components/Terms';
import Services from './components/Services';
import Contact from './components/Contact';
// import './App.css';

function App() {
  return (
    <Router>
      

       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/jobs/:id" element={<Jobs />} />
          <Route path="/apply/:jobId" element={<JobApplicationForm />} />
          <Route path="/terms&conditions" element={<Terms />} />
          <Route path='/services' element={<Services />} /> 
          <Route path='/contact' element={<Contact />} />
       </Routes>
      
    </Router>
  );
}

export default App;
