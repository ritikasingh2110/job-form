import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Contact.css";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">WhiteCirlce Groups</h1>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Jobs">Jobs</Link>
            </li>
            <li>
                <Link to="/services">Services</Link>
              
            </li>
            <li>
              <Link to="/terms&conditions">Terms & Conditions</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! We will get back to you soon.");
    setFormData({ name: "", email: "", contact: "", message: "" });
  };

  return (
    <div>
        <Header />
    <section className="contact-section">
      <div className="contact-container">
        <h2 className="contact-heading">Contact Us</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Mail</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Contact No.</label>
            <input
              type="tel"
              name="contact"
              placeholder="Enter your phone number"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="send-btn">Send</button>
        </form>
      </div>
    </section>
    </div>
  );
}
