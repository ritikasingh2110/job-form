// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import JobApplicationForm from './components/JobApplicationForm';
// import './App.css';

function App() {
  return (
    <Router>
      

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobapplicationform" element={<JobApplicationForm />} />
        </Routes>
      
    </Router>
  );
}

export default App;
