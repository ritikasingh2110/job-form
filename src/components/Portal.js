import React from "react";
import { useNavigate } from "react-router-dom";
import "./Portal.css";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">JobFinder</h1>
        <nav>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Jobs</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Card({ title, description, jobsCount, id }) {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(`/jobs/${id}`)}>
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
      <span className="card-count">{jobsCount} Jobs</span>
    </div>
  );
}

function JobSection() {
  const jobs = [
    { id: 1, title: "Consultant", description: "Positions related to Consultant", jobsCount: 284 },
    { id: 2, title: "Engineering Services", description: "Positions related to Core Technology Services", jobsCount: 215 },
    { id: 3, title: "Enterprise Application Services", description: "Positions related to Core Technology Services", jobsCount: 207 },
    { id: 4, title: "Application Development and Maintenance", description: "Positions related to Core Technology Services", jobsCount: 171 },
    { id: 5, title: "Developer", description: "Positions related to Developer", jobsCount: 125 },
    { id: 6, title: "Cloud and Infrastructure Services", description: "Positions related to Core Technology Services", jobsCount: 87 },
    { id: 7, title: "Data and Analytics", description: "Positions related to Core Technology Services", jobsCount: 85 },
    { id: 8, title: "Infosys Quality Engineering", description: "Positions related to Technology Assurance", jobsCount: 83 },
    { id: 9, title: "Digital Experience (DX)", description: "Positions related to Core Technology Services", jobsCount: 72 },
    { id: 10, title: "Testing", description: "Positions related to Testing", jobsCount: 43 },
    { id: 11, title: "Business Consulting", description: "Positions related to Sales & Client Services", jobsCount: 19 },
    { id: 12, title: "Cyber Security", description: "Positions related to Core Technology Services", jobsCount: 18 },
  ];

  return (
    <section className="job-section">
      <h1 className="job-title">Featured Jobs</h1>
      <div className="job-grid">
        {jobs.map((job) => (
          <Card key={job.id} id={job.id} title={job.title} description={job.description} jobsCount={job.jobsCount} />
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
