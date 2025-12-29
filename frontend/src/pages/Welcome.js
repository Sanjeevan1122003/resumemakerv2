// src/pages/Welcome.js
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FaFileAlt, FaUserEdit, FaDownload } from 'react-icons/fa';
import Cookies from 'js-cookie'
import './Welcome.css';

const Welcome = () => {
  const token = Cookies.get('token')

  if (!token) {
    return (
      <div className="welcome-page min-vh-100 d-flex flex-column bg-light">
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2 py-lg-3">
          <div className="container-fluid container-lg d-flex justify-content-center align-items-center w-100">
            <Link className="navbar-brand fw-bold text-dark d-flex justify-content-center align-items-center" to="/">
              <FaFileAlt className="me-2" style={{ fontSize: 'clamp(24px, 3vw, 32px)' }} />
              {/* Visible on desktop and tablet landscape only */}
              <span className="d-none d-md-inline d-print-block" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)' }}>
                Resume Maker
              </span>
            </Link>

            {/* Responsive button container */}
            <div className="d-flex flex-wrap gap-2 gap-lg-3 ms-auto">
              <Link
                to="/login"
                className="btn btn-dark px-3 px-sm-4 py-1 py-sm-2 fw-bold"
                style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-outline-dark px-3 px-sm-4 py-1 py-sm-2 fw-bold"
                style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
              >
                Register
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero-section flex-grow-1 d-flex align-items-center py-3 py-lg-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="fw-bold mb-3 mb-lg-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                  Create Professional Resumes That Get You <span className="text-dark">Hired</span>
                </h1>
                <p className="lead mb-3 mb-lg-4" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
                  Build your perfect resume with our easy-to-use resume builder.
                  Choose from professionally designed templates, customize every detail,
                  and download as PDF - all for free!
                </p>
                <div className="features mb-4 mb-lg-5">
                  <div className="feature-item d-flex align-items-center mb-2 mb-lg-3">
                    <FaUserEdit className="text-dark me-2 me-lg-3" style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }} />
                    <span style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' }}>
                      Easy-to-use editor with real-time preview
                    </span>
                  </div>
                  <div className="feature-item d-flex align-items-center mb-2 mb-lg-3">
                    <FaFileAlt className="text-dark me-2 me-lg-3" style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }} />
                    <span style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' }}>
                      Multiple professional templates
                    </span>
                  </div>
                  <div className="feature-item d-flex align-items-center mb-2 mb-lg-3">
                    <FaDownload className="text-dark me-2 me-lg-3" style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }} />
                    <span style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' }}>
                      Download as high-quality PDF
                    </span>
                  </div>
                </div>
                {/* Optional: Add a CTA button */}
                <Link
                  to="/register"
                  className="btn btn-dark btn-lg mt-2 px-3 px-sm-4 py-1 py-sm-2"
                  style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
                >
                  Get Started
                </Link>
              </div>
              <div className="col-lg-6">
                <div className="hero-image">
                  <div className="resume-preview-card card shadow-lg">
                    <div className="card-body p-3 p-lg-4">
                      <div className="resume-header bg-dark text-white p-2 p-lg-3 rounded mb-2 mb-lg-3">
                        <h3 className="mb-0" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}>
                          Sanjeevan Thangaraj
                        </h3>
                        <p className="mb-0" style={{ fontSize: 'clamp(0.875rem, 2vw, 1.1rem)' }}>
                          FullStack Developer
                        </p>
                      </div>
                      <div className="resume-content">
                        <div className="section mb-2 mb-lg-3">
                          <h6 className="fw-bold text-dark" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                            Experience
                          </h6>
                          <p className="mb-1" style={{ fontSize: 'clamp(0.875rem, 1.8vw, 1rem)' }}>
                            Company Name - Role
                          </p>
                          <small className="text-muted" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>
                            time duration
                          </small>
                        </div>
                        <div className="section mb-2 mb-lg-3">
                          <h6 className="fw-bold text-dark" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                            Projects
                          </h6>
                          <p className="mb-1" style={{ fontSize: 'clamp(0.875rem, 1.8vw, 1rem)' }}>
                            1 Project Name (<span className="text-decoration-underline">project link</span>)
                          </p>
                          <small className="text-muted" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>
                            - Project description.
                          </small>
                          <p className="mb-1" style={{ fontSize: 'clamp(0.875rem, 1.8vw, 1rem)' }}>
                            2 Project Name (<span className="text-decoration-underline">project link</span>)
                          </p>
                          <small className="text-muted" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>
                            - Project description.
                          </small>
                        </div>
                        <div className="section mb-2 mb-lg-3">
                          <h6 className="fw-bold text-dark" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                            Cretifications
                          </h6>
                          <p className="mb-1" style={{ fontSize: 'clamp(0.875rem, 1.8vw, 1rem)' }}>
                            1 Cretificate Name (<span className="text-decoration-underline">Cretificate link</span>)
                          </p>
                          <p className="mb-1" style={{ fontSize: 'clamp(0.875rem, 1.8vw, 1rem)' }}>
                            2 Cretificate Name (<span className="text-decoration-underline">Cretificate link</span>)
                          </p>
                        </div>
                        <div className="section mb-2 mb-lg-3">
                          <h6 className="fw-bold text-dark" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                            Education
                          </h6>
                          <p className="mb-1" style={{ fontSize: 'clamp(0.875rem, 1.8vw, 1rem)' }}>
                            University Name - Degree name
                          </p>
                          <small className="text-muted" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>
                            time duration
                          </small>
                        </div>
                        <div className="section">
                          <h6 className="fw-bold text-dark" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                            Skills
                          </h6>
                          <div className="d-flex flex-wrap gap-1">
                            <span className="badge bg-light text-dark" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>
                              JavaScript
                            </span>
                            <span className="badge bg-light text-dark" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>
                              React
                            </span>
                            <span className="badge bg-light text-dark" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>
                              Node.js
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-dark text-white py-5 py-lg-4 mt-auto">
          <div className="container text-center">
            <p className="mb-0 fw-bold" style={{ fontSize: 'clamp(0.875rem, 1.8vw, 1rem)' }}>
              &copy; 2025 Resume Maker. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    );
  }
  return <Navigate to="/dashboard" replace />;
};

export default Welcome;