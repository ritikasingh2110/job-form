// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import JobApplicationForm from './components/JobApplicationForm';
import Portal from './components/Portal';
import Jobs from './components/FindJob'
// import './App.css';

function App() {
  return (
    <Router>
      

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobapplicationform" element={<JobApplicationForm />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/jobs/:id" element={<Jobs />} />
        </Routes>
      
    </Router>
  );
}

export default App;
