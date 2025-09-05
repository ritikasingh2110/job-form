// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import JobApplicationForm from './components/JobApplicationForm';
import Portal from './components/Portal';
import Jobs from './components/FindJob'
import Terms from './components/Terms';
import Privacy from './components/Privacy';
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
          <Route path="/privacy-policy" element={<Privacy />} />
       </Routes>
      
    </Router>
  );
}

export default App;
