// frontend/src/Contact.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">WhiteCirlce Groups</h1>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Jobs">Jobs</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/terms&conditions">Terms & Conditions</Link></li>
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

  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ Loading state
  const [feedback, setFeedback] = useState(""); // ✅ Feedback message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);   // ✅ Start loading
    setFeedback("");         // ✅ Clear previous messages

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFeedback("Message sent successfully!");
        setFormData({ name: "", email: "", contact: "", message: "" });
      } else {
        setFeedback("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setFeedback("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false); // ✅ Stop loading
    }
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              ></textarea>
            </div>

            <button type="submit" className="send-btn" disabled={isSubmitting}>
              {isSubmitting ? "Sending... Please wait" : "Send"}
            </button>
          </form>
          {feedback && <p style={{ textAlign: "center", marginTop: "10px" }}>{feedback}</p>}
        </div>
      </section>
    </div>
  );
}
