import React from "react";
import { useParams } from "react-router-dom";
import "./FindJob.css";

export default function Jobs() {
  const { id } = useParams();

  // Dummy job details (per category)
  const jobDetails = {
    1: [
      {
        location: "BANGALORE, INFOSYS LIMITED",
        title: "Q2-SAP ABAP Consultant",
        experience: "6 to 9 Years",
        skills: "SAP ABAP, Adobe Forms, HANA, OData, Workflow, S/4 HANA",
        responsibilities: "SAP Technical Consultant with 4-8 yrs of relevant experience. Expertise on ABAP on HANA and Fiori."
      },
      {
        location: "PUNE, INFOSYS LIMITED",
        title: "Kafka Integration",
        experience: "7 to 20 Years",
        skills: "Cloud Platform, Microservices, Java, Apache Kafka, Springboot",
        responsibilities: "Design and develop reliable, testable, and maintainable software. Mentor and guide colleagues."
      }
    ],
    2: [
      {
        location: "HYDERABAD, INFOSYS LIMITED",
        title: "Engineering Analyst",
        experience: "3 to 6 Years",
        skills: "Python, AI/ML, Cloud Services",
        responsibilities: "Build scalable solutions with AI/ML integration for enterprise apps."
      }
    ]
    // add more job data per id if needed
  };

  const jobs = jobDetails[id] || [];

  return (
    <div className="jobs-page">
      <h2>{jobs.length} jobs found</h2>
      <div className="jobs-container">
        {jobs.map((job, index) => (
          <div key={index} className="job-card">
            <p className="job-location">{job.location}</p>
            <h3>{job.title}</h3>
            <p><strong>Work Experience:</strong> {job.experience}</p>
            <p><strong>Skills:</strong> {job.skills}</p>
            <p><strong>Responsibilities:</strong> {job.responsibilities}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
