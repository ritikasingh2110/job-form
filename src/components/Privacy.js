import React from "react";
import "./Privacy.css";

export default function Privacy() {
  return (
    <div className="privacy-container">
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

      <footer className="privacy-footer">
        <p>
          For any questions regarding this Privacy Policy, please contact us at{" "}
          <strong>contact@WhiteCirlce.com</strong>.
        </p>
      </footer>
    </div>
  );
}
