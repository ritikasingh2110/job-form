import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "./FindJob.css";

export default function Jobs() {
  const { id } = useParams();
  const jobFunction = decodeURIComponent(id);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsCollection = collection(db, "jobs");
        const q = query(jobsCollection, where("jobFunction", "==", jobFunction));
        const querySnapshot = await getDocs(q);

        const jobsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setJobs(jobsData);
      } catch (error) {
        console.error("❌ Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [jobFunction]);

  if (loading) {
    return (
      <div className="jobs-loading">
        <div className="spinner"></div>
        <p>Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="jobs-page">
      <h2 className="jobs-title">
        {jobs.length > 0
          ? `${jobs.length} jobs found for "${jobFunction}"`
          : `No jobs found for "${jobFunction}"`}
      </h2>

      <div className="jobs-container">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <p><strong>Title:</strong> {job.title}</p>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Type:</strong> {job.type}</p>
            <p><strong>Salary:</strong> {job.salary} LPA</p>
            <p><strong>Skills:</strong> {job.skills}</p>
            <p><strong>Responsibilities:</strong> {job.responsibilities}</p>
            <p><strong>Description:</strong> {job.description || "Not provided"}</p>

            <button
              className="apply-btn"
              onClick={() => navigate(`/apply/${job.id}`, { state: job })}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
