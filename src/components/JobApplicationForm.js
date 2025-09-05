// src/components/JobApplicationForm.js
import React, { useState, useRef } from "react";
import { saveJobApplication } from "../firebase/helpers/firestoreHelpers";
import { uploadResumePDF } from "../firebase/appwrite.js";
import "./JobApplicationForm.css";
import { useNavigate } from "react-router-dom";

// Initial form state

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  position: "",
  experience: "",
  resume: null,
  linkedin: "",
  portfolio: "",
  startDate: "",
  salary: "",
  relocate: "",
  referral: "",
  additionalInfo: "",
  terms: false,
};

export default function JobApplicationForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [resumeInfo, setResumeInfo] = useState(null);
  const [invalid, setInvalid] = useState({});
  const [shaking, setShaking] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Helpers
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[\d\s\+\-\(\)]{8,20}$/;
    return re.test(phone);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setInvalid((prev) => ({ ...prev, [name]: false }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // Only allow PDF
      if (file.type !== "application/pdf") {
        alert("Only PDF files are allowed!");
        fileInputRef.current.value = "";
        return;
      }
      setFormData((prev) => ({ ...prev, resume: file }));
      setResumeInfo({ name: file.name, sizeKB: Math.round(file.size / 1024) });
      setInvalid((prev) => ({ ...prev, resume: false }));
    } else {
      setFormData((prev) => ({ ...prev, resume: null }));
      setResumeInfo(null);
    }
  };

  const triggerShake = (fields) => {
    const map = {};
    fields.forEach((f) => (map[f] = true));
    setShaking(map);
    setTimeout(() => setShaking({}), 600);
  };

  const validateAll = () => {
    const errors = {};

    if (!formData.firstName.trim()) errors.firstName = true;
    if (!formData.lastName.trim()) errors.lastName = true;
    if (!formData.email.trim() || !validateEmail(formData.email))
      errors.email = true;
    if (!formData.phone.trim() || !validatePhone(formData.phone))
      errors.phone = true;
    if (!formData.address.trim()) errors.address = true;

    if (!formData.position) errors.position = true;
    if (formData.experience === "" || formData.experience === null)
      errors.experience = true;
    if (!formData.resume) errors.resume = true;

    if (!formData.startDate) errors.startDate = true;
    if (formData.salary === "" || formData.salary === null)
      errors.salary = true;
    if (!formData.relocate) errors.relocate = true;
    if (!formData.referral) errors.referral = true;

    if (!formData.terms) errors.terms = true;

    const keys = Object.keys(errors);
    if (keys.length > 0) {
      setInvalid(errors);
      // animate
      triggerShake(keys);
      // scroll to first invalid field for UX
      const first = keys[0];
      const el = document.querySelector(`[name="${first}"]`);
      if (el && typeof el.scrollIntoView === "function") {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setResumeInfo(null);
    setInvalid({});
    setShaking({});
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    setSubmitting(true);

    try {
      let resumeFileId = null;

      // Upload resume to Appwrite first
      if (formData.resume) {
        const uploadedFile = await uploadResumePDF(formData.resume);
        if (!uploadedFile?.$id) {
          throw new Error("Resume upload failed, no file ID returned.");
        }
        resumeFileId = uploadedFile.$id;
      }

      // Save the rest of the data to Firebase (with file ID from Appwrite)
      await saveJobApplication({
        ...formData,
        resumeId: resumeFileId, // ✅ store as resumeId, not resume
      });
      alert("✅ Form Submitted successfully");
      setModalOpen(true);
      resetForm();
      navigate("/portal");
    } catch (error) {
      console.error("Error saving application:", error);
      alert("Application could not be saved. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="Jobcontainer">
      <div>
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/portal")}
        >
          ⬅
        </button>
      </div>
      <div className="form-container">
        <div className="form-header">
          <h1>
            <i className="fas fa-briefcase" /> WHITECIRCLE GROUP - CAREER
          </h1>
          <h1>
            <i className="fas fa-briefcase" /> Job Application
          </h1>
          <p>Join our team and start your journey with us!</p>
        </div>

        <form id="job-application-form" onSubmit={handleSubmit} noValidate>
          {/* --- Step 1: Personal Information (shown inline) --- */}
          <div className="form-step active" id="step-1">
            <h2>Personal Information</h2>

            <div className="input-group">
              <div
                className={`input-field ${invalid.firstName ? "invalid" : ""} ${
                  shaking.firstName ? "shake-anim" : ""
                }`}
              >
                <label htmlFor="first-name">First Name</label>
                <input
                  type="text"
                  id="first-name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div
                className={`input-field ${invalid.lastName ? "invalid" : ""} ${
                  shaking.lastName ? "shake-anim" : ""
                }`}
              >
                <label htmlFor="last-name">Last Name</label>
                <input
                  type="text"
                  id="last-name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div
              className={`input-field ${invalid.email ? "invalid" : ""} ${
                shaking.email ? "shake-anim" : ""
              }`}
            >
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div
              className={`input-field ${invalid.phone ? "invalid" : ""} ${
                shaking.phone ? "shake-anim" : ""
              }`}
            >
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div
              className={`input-field ${invalid.address ? "invalid" : ""} ${
                shaking.address ? "shake-anim" : ""
              }`}
            >
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* --- Step 2: Professional Information --- */}
          <div className="form-step active" id="step-2">
            <h2>Professional Information</h2>

            <div
              className={`input-field ${invalid.position ? "invalid" : ""} ${
                shaking.position ? "shake-anim" : ""
              }`}
            >
              <label htmlFor="position">Position Applied For</label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select a position
                </option>
                <option value="developer">Software Developer</option>
                <option value="designer">UI/UX Designer</option>
                <option value="manager">Project Manager</option>
                <option value="marketer">Marketing Specialist</option>
                <option value="analyst">Data Analyst</option>
              </select>
            </div>

            <div
              className={`input-field ${invalid.experience ? "invalid" : ""} ${
                shaking.experience ? "shake-anim" : ""
              }`}
            >
              <label htmlFor="experience">Years of Experience</label>
              <input
                type="number"
                id="experience"
                name="experience"
                min="0"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>

            <div className={`input-field ${invalid.resume ? "invalid" : ""}`}>
              <label htmlFor="resume">Upload Resume (PDF or DOC)</label>
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              {resumeInfo && (
                <div className="file-label">
                  <i className="fas fa-file-alt" />
                  <span>{resumeInfo.name}</span>
                  <small>{resumeInfo.sizeKB} KB</small>
                </div>
              )}
            </div>

            <div className="input-field">
              <label htmlFor="linkedin">LinkedIn Profile (Optional)</label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                placeholder="https://linkedin.com/in/username"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="portfolio">Portfolio Website (Optional)</label>
              <input
                type="url"
                id="portfolio"
                name="portfolio"
                placeholder="https://yourportfolio.com"
                value={formData.portfolio}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* --- Step 3: Additional Information --- */}
          <div className="form-step active" id="step-3">
            <h2>Additional Information</h2>

            <div
              className={`input-field ${invalid.startDate ? "invalid" : ""} ${
                shaking.startDate ? "shake-anim" : ""
              }`}
            >
              <label htmlFor="start-date">Earliest Start Date</label>
              <input
                type="date"
                id="start-date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>

            <div
              className={`input-field ${invalid.salary ? "invalid" : ""} ${
                shaking.salary ? "shake-anim" : ""
              }`}
            >
              <label htmlFor="salary">Expected Salary (LPA)</label>
              <input
                type="number"
                id="salary"
                name="salary"
                min="0"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>

            <div className={`input-field ${invalid.relocate ? "invalid" : ""}`}>
              <label>Are you willing to relocate?</label>
              <div
                className={`radio-group ${
                  shaking.relocate ? "shake-anim" : ""
                }`}
              >
                <input
                  type="radio"
                  id="relocate-yes"
                  name="relocate"
                  value="yes"
                  checked={formData.relocate === "yes"}
                  onChange={handleChange}
                />
                <label htmlFor="relocate-yes">Yes</label>

                <input
                  type="radio"
                  id="relocate-no"
                  name="relocate"
                  value="no"
                  checked={formData.relocate === "no"}
                  onChange={handleChange}
                />
                <label htmlFor="relocate-no">No</label>
              </div>
            </div>

            <div
              className={`input-field ${invalid.referral ? "invalid" : ""} ${
                shaking.referral ? "shake-anim" : ""
              }`}
            >
              <label htmlFor="referral">How did you hear about us?</label>
              <select
                id="referral"
                name="referral"
                value={formData.referral}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="job-board">Job Board</option>
                <option value="social-media">Social Media</option>
                <option value="friend">Friend or Colleague</option>
                <option value="website">Company Website</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="input-field">
              <label htmlFor="additional-info">Additional Information</label>
              <textarea
                id="additional-info"
                name="additionalInfo"
                rows="4"
                placeholder="Tell us anything else you'd like us to know..."
                value={formData.additionalInfo}
                onChange={handleChange}
              />
            </div>

            <div
              className={`input-field checkbox-field ${
                invalid.terms ? "invalid" : ""
              }`}
            >
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
              />
              <label htmlFor="terms">
                I agree to the <a href="#">terms and conditions.</a>
              </label>
            </div>

            <div className="button-group">
              <button
                type="submit"
                className="btn submit-btn"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    Submit Application <i className="fas fa-paper-plane" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Success modal */}
      {modalOpen && (
        <div className="modal" id="success-modal" style={{ display: "flex" }}>
          <div className="modal-content">
            <span className="close-modal" onClick={() => setModalOpen(false)}>
              &times;
            </span>
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2>Application Submitted!</h2>
            <p>
              Thank you for your application. We will review it and get back to
              you soon.
            </p>
            <button
              className="btn modal-btn"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
