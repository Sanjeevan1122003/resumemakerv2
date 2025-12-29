// src/pages/UploadResume.js
import React, { useState } from 'react';
import { FaUpload, FaFilePdf, FaFileWord, FaSpinner } from 'react-icons/fa';
import './UploadResume.css';

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(selectedFile.type)) {
        setError('Please upload a PDF or DOCX file only');
        return;
      }

      if (selectedFile.size > maxSize) {
        setError('File size must be less than 5MB');
        return;
      }

      setError('');
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError('');

    // Simulate file upload and data extraction
    setTimeout(() => {
      // This is mock data. In a real app, you would use a PDF parsing library
      const mockExtractedData = {
        personalDetails: {
          fullname: 'John Doe',
          phone: '+1 (123) 456-7890',
          jobrole: 'Senior Software Engineer',
          email: 'john.doe@example.com',
          linkedin: 'linkedin.com/in/johndoe',
          address: '123 Main St, San Francisco, CA 94105',
          summary: 'Experienced software engineer with 5+ years in full-stack development.'
        },
        education: {
          college: 'Stanford University',
          degree: 'Master of Computer Science',
          year: '2015-2017',
          intermediate: 'ABC High School',
          marks: '3.9 GPA',
          school: 'XYZ School'
        },
        experience: [
          {
            id: '1',
            title: 'Senior Software Engineer',
            company: 'Tech Corp Inc.',
            role: 'Full-stack Developer',
            startDate: '01/2020',
            endDate: 'Present',
            description: 'Led a team of 5 developers, improved system performance by 40%',
            current: true
          }
        ],
        projects: [
          {
            id: '1',
            name: 'E-commerce Platform',
            link: 'github.com/johndoe/ecommerce',
            description: 'Full-stack e-commerce solution with React and Node.js'
          }
        ],
        certificates: [
          {
            id: '1',
            name: 'AWS Certified Solutions Architect',
            link: 'aws.amazon.com/certification'
          }
        ],
        achievements: [
          'Employee of the Year 2022',
          'Best Project Award 2021'
        ]
      };

      setExtractedData(mockExtractedData);
      setUploading(false);
      
      // Save extracted data to localStorage
      localStorage.setItem('resumeFormData', JSON.stringify(mockExtractedData));
      
      alert('Resume uploaded and data extracted successfully! You can now edit and generate your resume.');
    }, 2000);
  };

  const handleUseExtractedData = () => {
    if (extractedData) {
      // Navigate to generate resume page with extracted data
      window.location.href = '/generate-resume';
    }
  };

  return (
    <div className="upload-resume-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-5">
                <div className="text-center mb-5">
                  <h1 className="fw-bold text-dark mb-3">Upload Resume</h1>
                  <p className="text-muted">
                    Upload your existing resume (PDF or DOCX) and we'll extract the information for you
                  </p>
                </div>

                {error && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError('')}></button>
                  </div>
                )}

                <div className="upload-section text-center py-5 mb-5">
                  <div className="upload-icon mb-4">
                    <FaUpload size={64} className="text-dark" />
                  </div>
                  
                  <div className="file-input-container mb-4">
                    <input
                      type="file"
                      id="resumeUpload"
                      className="form-control d-none"
                      onChange={handleFileChange}
                      accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    />
                    <label htmlFor="resumeUpload" className="btn btn-outline-dark btn-lg">
                      <FaUpload className="me-2" /> Choose File
                    </label>
                    {file && (
                      <div className="file-info mt-3">
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          {file.type.includes('pdf') ? <FaFilePdf className="text-dark" size={44} /> : <FaFileWord className="text-dark" size={44} />}
                          <span className="fw-semibold">{file.name}</span>
                          <span className="text-muted">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="supported-formats mb-4">
                    <p className="text-muted mb-2">Supported formats:</p>
                    <div className="d-flex justify-content-center gap-4">
                      <div className="format-item">
                        <FaFilePdf size={24} className="text-dark" />
                        <span className="ms-2">PDF</span>
                      </div>
                      <div className="format-item">
                        <FaFileWord size={24} className="text-dark" />
                        <span className="ms-2">DOCX</span>
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn btn-dark btn-lg px-5"
                    onClick={handleUpload}
                    disabled={uploading || !file}
                  >
                    {uploading ? (
                      <>
                        <FaSpinner className="me-2 fa-spin" />
                        Processing...
                      </>
                    ) : (
                      'Extract Information'
                    )}
                  </button>
                </div>

                {extractedData && (
                  <div className="extracted-data-section">
                    <h3 className="fw-bold mb-4">Extracted Information</h3>
                    
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="card h-100">
                          <div className="card-header bg-light">
                            <h5 className="mb-0">Personal Details</h5>
                          </div>
                          <div className="card-body">
                            <div className="mb-2">
                              <strong>Name:</strong> {extractedData.personalDetails.fullname}
                            </div>
                            <div className="mb-2">
                              <strong>Email:</strong> {extractedData.personalDetails.email}
                            </div>
                            <div className="mb-2">
                              <strong>Phone:</strong> {extractedData.personalDetails.phone}
                            </div>
                            <div className="mb-2">
                              <strong>Job Role:</strong> {extractedData.personalDetails.jobrole}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="card h-100">
                          <div className="card-header bg-light">
                            <h5 className="mb-0">Education</h5>
                          </div>
                          <div className="card-body">
                            <div className="mb-2">
                              <strong>College:</strong> {extractedData.education.college}
                            </div>
                            <div className="mb-2">
                              <strong>Degree:</strong> {extractedData.education.degree}
                            </div>
                            <div className="mb-2">
                              <strong>Year:</strong> {extractedData.education.year}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card mb-4">
                      <div className="card-header bg-light">
                        <h5 className="mb-0">Experience</h5>
                      </div>
                      <div className="card-body">
                        {extractedData.experience.map((exp) => (
                          <div key={exp.id} className="mb-3">
                            <div className="fw-bold">{exp.title} at {exp.company}</div>
                            <div className="text-muted">{exp.startDate} - {exp.endDate}</div>
                            <div>{exp.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-center mt-4">
                      <button 
                        className="btn btn-dark btn-lg px-5"
                        onClick={handleUseExtractedData}
                      >
                        Use This Data & Generate Resume
                      </button>
                      <p className="text-muted mt-2">
                        You can edit any information before generating your resume
                      </p>
                    </div>
                  </div>
                )}

                <div className="features-section mt-5 pt-5 border-top">
                  <h4 className="fw-bold mb-4">Why Upload Your Resume?</h4>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <div className="feature-item text-center p-3">
                        <div className="feature-icon mb-3">
                          <div className="icon-circle bg-dark text-white">
                            <FaUpload />
                          </div>
                        </div>
                        <h5>Quick Setup</h5>
                        <p className="text-muted">Save time by auto-filling your resume details</p>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <div className="feature-item text-center p-3">
                        <div className="feature-icon mb-3">
                          <div className="icon-circle bg-dark text-white">
                            <FaFilePdf />
                          </div>
                        </div>
                        <h5>Format Conversion</h5>
                        <p className="text-muted">Convert any resume format to professional PDF</p>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <div className="feature-item text-center p-3">
                        <div className="feature-icon mb-3">
                          <div className="icon-circle bg-dark text-white">
                            <FaFileWord />
                          </div>
                        </div>
                        <h5>Easy Editing</h5>
                        <p className="text-muted">Edit and enhance your existing resume</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;