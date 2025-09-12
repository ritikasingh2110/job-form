import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Services.css";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaGlobe,
  FaDatabase,
  FaCloud,
  FaCogs,
  FaUsersCog,
  FaChartLine,
  FaRobot,
  FaHandshake,
  FaBullhorn,
} from "react-icons/fa";

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
              <Link to="/terms&conditions">Terms & Conditions</Link>
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
const services = [
  {
    title: "Digital Transformation",
    icon: <FaChartLine className="icon pink" />,
  },
  {
    title: "Application Development",
    icon: <FaLaptopCode className="icon blue" />,
    sub: ["Web Development", "Android Development"],
  },
  {
    title: "Low Code",
    icon: <FaGlobe className="icon green" />,
    sub: ["WordPress Development", "Shopify"],
  },
  { title: "BI & Analytics", icon: <FaDatabase className="icon purple" /> },
  {
    title: "ERP Solutions",
    icon: <FaCogs className="icon orange" />,
    sub: ["SAP", "Oracle", "Microsoft Netsuite", "Microsoft Dynamics 365"],
  },
  {
    title: "CRM",
    icon: <FaUsersCog className="icon teal" />,
    sub: ["Salesforce", "ServiceNow", "frappie.io"],
  },
  {
    title: "Staffing and Payroll Services",
    icon: <FaHandshake className="icon red" />,
  },
  { title: "Outsourcing Services", icon: <FaCloud className="icon cyan" /> },
  {
    title: "Digital Marketing Services",
    icon: <FaBullhorn className="icon yellow" />,
  },
  {
    title: "Robotic Process Automation",
    icon: <FaRobot className="icon violet" />,
  },
];

export default function Services() {
  return (
    <div>
      <Header />
      <section className="services-section">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          {services.map((srv, idx) => (
            <div className="service-card" key={idx}>
              <div className="icon-wrapper">{srv.icon}</div>
              <h3>{srv.title}</h3>
              {srv.sub && (
                <ul className="subpoints">
                  {srv.sub.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
