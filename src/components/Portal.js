import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "./Portal.css";
import { FaSearch } from "react-icons/fa"; 

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
              <Link to="/terms&conditions">About</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Contact</Link>
            </li>
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
      onClick={() => navigate(`/jobs/${encodeURIComponent(type)}`)}
    >
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
        <span className="card-count">
          {jobsCount === undefined ? (
            <div className="spinner small-spinner"></div>
          ) : (
            `${jobsCount} Jobs`
          )}
        </span>
      </div>
      <p className="card-description">{description}</p>
    </div>
  );
}

function JobSection() {
  const [jobCounts, setJobCounts] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [allJobs, setAllJobs] = useState([]);
  const [matchedJob, setMatchedJob] = useState(null);
  const navigate = useNavigate();

  const jobs = [
    {
      type: "Consultant",
      title: "Consultant",
      description: "Positions related to Consultant",
    },
    {
      type: "Engineering Services",
      title: "Engineering Services",
      description: "Positions related to Core Technology Services",
    },
    {
      type: "Enterprise Application Services",
      title: "Enterprise Application Services",
      description: "Positions related to Core Technology Services",
    },
    {
      type: "Application Development and Maintenance",
      title: "Application Development and Maintenance",
      description: "Positions related to Core Technology Services",
    },
    {
      type: "Developer",
      title: "Developer",
      description: "Positions related to Developer",
    },
    {
      type: "Cloud and Infrastructure Services",
      title: "Cloud and Infrastructure Services",
      description: "Positions related to Core Technology Services",
    },
    {
      type: "Data and Analytics",
      title: "Data and Analytics",
      description: "Positions related to Core Technology Services",
    },
    {
      type: "Infosys Quality Engineering",
      title: "Infosys Quality Engineering",
      description: "Positions related to Technology Assurance",
    },
    {
      type: "Digital Experience (DX)",
      title: "Digital Experience (DX)",
      description: "Positions related to Core Technology Services",
    },
    {
      type: "Testing",
      title: "Testing",
      description: "Positions related to Testing",
    },
    {
      type: "Business Consulting",
      title: "Business Consulting",
      description: "Positions related to Sales & Client Services",
    },
    {
      type: "Cyber Security",
      title: "Cyber Security",
      description: "Positions related to Core Technology Services",
    },
  ];

  useEffect(() => {
    const fetchJobCounts = async () => {
      const counts = {};
      for (const job of jobs) {
        const q = query(
          collection(db, "jobs"),
          where("jobFunction", "==", job.type)
        );
        const snapshot = await getDocs(q);
        counts[job.type] = snapshot.size;
        setJobCounts((prev) => ({ ...prev, [job.type]: snapshot.size }));
      }
    };

    const fetchAllJobs = async () => {
      const jobsCollection = collection(db, "jobs");
      const snapshot = await getDocs(jobsCollection);
      const jobsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllJobs(jobsData);
    };

    fetchJobCounts();
    fetchAllJobs();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setMatchedJob(null);
      return;
    }
    const term = searchTerm.trim().toLowerCase();
    const foundJob = allJobs.find((job) =>
      job.jobId.toString().toLowerCase() === term
    );
    setMatchedJob(foundJob || null);
  }, [searchTerm, allJobs]);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="job-section">
      <h1 className="job-title">Featured Jobs</h1>
      <div className="job-search">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search jobs by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="job-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card
              key={job.type}
              type={job.type}
              title={job.title}
              description={job.description}
              jobsCount={jobCounts[job.type]}
            />
          ))
        ) : (
          <p className="no-results">No jobs found with this title.</p>
        )}
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
