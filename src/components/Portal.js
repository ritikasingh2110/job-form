import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "./Portal.css";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">WhiteCirlce Groups</h1>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Jobs">Jobs</Link></li>
            <li><Link to="/terms&conditions">About</Link></li>
            <li><Link to="/privacy-policy">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Card({ title, description, jobsCount, type }) {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => navigate(`/jobs/${encodeURIComponent(type)}`)} // ✅ navigate with jobFunction
    >
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
        <span className="card-count">{jobsCount} Jobs</span>
      </div>
      <p className="card-description">{description}</p>
    </div>
  );
}

function JobSection() {
  const [jobCounts, setJobCounts] = useState({});

  // ✅ match with Firestore "jobFunction" field
  const jobs = [
    { type: "Consultant", title: "Consultant", description: "Positions related to Consultant" },
    { type: "Engineering Services", title: "Engineering Services", description: "Positions related to Core Technology Services" },
    { type: "Enterprise Application Services", title: "Enterprise Application Services", description: "Positions related to Core Technology Services" },
    { type: "Application Development and Maintenance", title: "Application Development and Maintenance", description: "Positions related to Core Technology Services" },
    { type: "Developer", title: "Developer", description: "Positions related to Developer" },
    { type: "Cloud and Infrastructure Services", title: "Cloud and Infrastructure Services", description: "Positions related to Core Technology Services" },
    { type: "Data and Analytics", title: "Data and Analytics", description: "Positions related to Core Technology Services" },
    { type: "Infosys Quality Engineering", title: "Infosys Quality Engineering", description: "Positions related to Technology Assurance" },
    { type: "Digital Experience (DX)", title: "Digital Experience (DX)", description: "Positions related to Core Technology Services" },
    { type: "Testing", title: "Testing", description: "Positions related to Testing" },
    { type: "Business Consulting", title: "Business Consulting", description: "Positions related to Sales & Client Services" },
    { type: "Cyber Security", title: "Cyber Security", description: "Positions related to Core Technology Services" },
  ];

  useEffect(() => {
    const fetchJobCounts = async () => {
      const counts = {};
      for (const job of jobs) {
        const q = query(collection(db, "jobs"), where("jobFunction", "==", job.type));
        const snapshot = await getDocs(q);
        counts[job.type] = snapshot.size;
      }
      setJobCounts(counts);
    };

    fetchJobCounts();
  }, []);

  return (
    <section className="job-section">
      <h1 className="job-title">Featured Jobs</h1>
      <div className="job-grid">
        {jobs.map((job) => (
          <Card
            key={job.type}
            type={job.type}
            title={job.title}
            description={job.description}
            jobsCount={jobCounts[job.type] ?? 0}
          />
        ))}
      </div>
    </section>
  );
}

export default function Portal() {
  return (
    <div>
      <Header />
      <JobSection />
    </div>
  );
}
