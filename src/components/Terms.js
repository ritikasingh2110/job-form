import React from "react";
import "./Terms.css";

export default function Terms() {
  return (
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

      <footer className="terms-footer">
        <p>
          For any questions regarding these Terms and Conditions or Privacy
          Policy, please contact us at <strong>contact@whitecircle.com</strong>.
        </p>
      </footer>
    </div>
  );
}
