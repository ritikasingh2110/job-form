// src/components/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to <span>WhiteCircle!</span></h1>
          <p>Your Future Starts Here. Explore careers and services designed for innovation.</p>
          <Link to="/Portal" className="cta-btn">Find Job</Link>
        </div>
      </section>

      {/* Services Overview */}
      <section className="services-preview">
        <h2>Our Services</h2>
        <div className="service-cards">
          <div className="card">
            <h3>IT Consulting</h3>
            <p>We provide end-to-end tech consulting for startups and enterprises.</p>
          </div>
          <div className="card">
            <h3>Web Development</h3>
            <p>Custom web applications built with scalable and modern frameworks.</p>
          </div>
          <div className="card">
            <h3>Cloud Solutions</h3>
            <p>Reliable and secure cloud migration and DevOps services.</p>
          </div>
        </div>
        <Link to="/portal" className="explore-btn">Explore More</Link>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-col">
            <h3>WhiteCircle Pvt. Ltd.</h3>
            <p>123 Tech Park, Bengaluru, India</p>
            <p>Email: contact@whitecircle.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/portal">Services</Link></li>
              <li><Link to="/terms&conditions">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy">Contact</Link></li>
            </ul>
          </div>
        </div>
        <p className="footer-bottom">&copy; 2025 WhiteCircle. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
