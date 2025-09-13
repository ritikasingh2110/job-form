import React from "react";
import "./Terms.css";
import { useNavigate, Link } from "react-router-dom";

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
              <Link to="/portal">Jobs</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default function Terms() {
  return (
    <div>
      <Header/>
    <div className="terms-container">
      <h1 className="terms-title">Terms and Conditions</h1>
      <p>
        Welcome to our Job Portal. By using our services, you agree to comply
        with and be bound by the following Terms and Conditions. Please read
        them carefully before proceeding.
      </p>

      <section>
        <h2>1. Eligibility</h2>
        <p>
          You must be at least 18 years old to use this portal. By registering,
          you confirm that you meet the eligibility requirements.
        </p>
      </section>

      <section>
        <h2>2. User Responsibilities</h2>
        <ul>
          <li>You are responsible for maintaining the confidentiality of your account.</li>
          <li>All information you provide must be accurate, current, and complete.</li>
          <li>
            You agree not to misuse the portal by posting fraudulent job listings
            or misleading information.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Employer Responsibilities</h2>
        <ul>
          <li>Employers must provide genuine job postings.</li>
          <li>
            Discrimination, offensive content, or misleading postings are strictly prohibited.
          </li>
          <li>
            Employers are responsible for the accuracy of job details and timely
            updates.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Limitation of Liability</h2>
        <p>
          We act only as a platform to connect job seekers and employers. We are
          not responsible for the hiring process, job offers, employment terms,
          or disputes between users.
        </p>
      </section>

      <section>
        <h2>5. Intellectual Property</h2>
        <p>
          All content, design, and features of this portal are the property of
          the company. Unauthorized copying, modification, or distribution is prohibited.
        </p>
      </section>

      <section>
        <h2>6. Termination</h2>
        <p>
          We reserve the right to suspend or terminate accounts violating our
          Terms and Conditions without prior notice.
        </p>
      </section>

      <section>
        <h2>7. Governing Law</h2>
        <p>
          These Terms shall be governed in accordance with the laws of India.
          Any disputes shall be subject to the exclusive jurisdiction of the
          courts in Bhopal, Madhya Pradesh.
        </p>
      </section>
      {/* <div className="privacy-container"> */}
      <h1 className="privacy-title">Privacy Policy</h1>
      <p>
        Your privacy is important to us. This Privacy Policy explains how we
        collect, use, and protect your information when you use our Job Portal.
        By using our services, you consent to the practices described in this
        policy.
      </p>

      <section>
        <h2>1. Information We Collect</h2>
        <ul>
          <li>Personal details: name, email, phone number, and resume.</li>
          <li>Employer details: company name, contact information, job postings.</li>
          <li>Technical details: IP address, browser type, and device information.</li>
        </ul>
      </section>

      <section>
        <h2>2. How We Use Your Data</h2>
        <ul>
          <li>To connect job seekers with employers.</li>
          <li>To personalize and improve our services.</li>
          <li>To send important updates or notifications.</li>
          <li>To comply with legal requirements.</li>
        </ul>
      </section>

      <section>
        <h2>3. Data Sharing</h2>
        <p>
          We do not sell or rent your personal data. Data may only be shared
          with:
        </p>
        <ul>
          <li>Employers, if you apply for a job.</li>
          <li>Service providers that help us operate our portal.</li>
          <li>Authorities, if legally required.</li>
        </ul>
      </section>

      <section>
        <h2>4. Data Security</h2>
        <p>
          We use reasonable security measures to protect your data against
          unauthorized access, alteration, or disclosure. However, no method of
          transmission over the internet is completely secure.
        </p>
      </section>

      <section>
        <h2>5. Your Rights</h2>
        <ul>
          <li>You may update, correct, or delete your account at any time.</li>
          <li>You may request a copy of your personal data stored with us.</li>
          <li>You may withdraw consent for data processing.</li>
        </ul>
      </section>

      <section>
        <h2>6. Cookies</h2>
        <p>
          Our portal uses cookies to improve user experience, track activity,
          and provide personalized recommendations. You can disable cookies in
          your browser settings.
        </p>
      </section>

      <section>
        <h2>7. Policy Updates</h2>
        <p>
          We may update this Privacy Policy from time to time. Continued use of
          our portal indicates acceptance of the updated policy.
        </p>
      </section>

      {/* <footer className="privacy-footer">
        <p>
          For any questions regarding this Privacy Policy, please contact us at{" "}
          <strong>contact@WhiteCirlce.com</strong>.
        </p>
      </footer> */}
    {/* </div> */}

      <footer className="terms-footer">
        <p>
          For any questions regarding these Terms and Conditions or Privacy
          Policy, please contact us at <strong>contact@whitecircle.com</strong>.
        </p>
      </footer>
    </div>
    </div>
  );
}
