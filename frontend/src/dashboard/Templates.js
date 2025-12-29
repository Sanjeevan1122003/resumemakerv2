// src/dashboard/Templates.js - UPDATED VERSION
import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Templates.css';

import MordernImg from "../assets/Modern Professional preview.png"
import ClassicImg from '../assets/Classic preview.png'
import ExecutiveImg from "../assets/Executive preview.png"
import MinimalistImg from '../assets/Minimalist preview.png'
import ProfessionalImg from "../assets/Professional preview.png"

const Templates = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const navigate = useNavigate();

  const templates = [
    {
      id: 1,
      name: 'Template 1 - Modern Professional',
      description: 'Clean and modern design perfect for tech and corporate roles',
      category: 'Modern Professional',
      color: 'var(--dark-color)',
      preview: 'modern'
    },
    {
      id: 2,
      name: 'Template 2 - Executive',
      description: 'Classic and elegant design for senior positions',
      category: 'Executive',
      color: 'var(--dark-color)',
      preview: 'executive'
    },
    {
      id: 3,
      name: 'Template 3 - Minimalist',
      description: 'Simple and clean design that focuses on content',
      category: 'Minimal',
      color: 'var(--dark-color)',
      preview: 'minimalist'
    },

    {
      id: 4,
      name: 'Template 4 - Professional',
      description: "Clean design perfect for tech and corporate roles",
      category: 'Professional',
      color: 'var(--dark-color)',
      preview: 'professional'
    },

    {
      id: 5,
      name: 'Template 5 - Classic',
      description: "A classic and dignified resume format tailored for experienced professionals",
      category: 'Classic',
      color: 'var(--dark-color)',
      preview: 'classic'
    }

  ];

  const handleSelect = (index) => {
    setActiveIndex(index);
  };

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleGenerate = () => {
    navigate("/generate-resume", { state: { template: selectedTemplate }})
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? templates.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === templates.length - 1 ? 0 : prev + 1));
  };

  const renderTemplatePreview = (template) => {
    const baseStyle = {
      backgroundColor: 'white',
      border: `2px solid ${selectedTemplate === template.id ? template.color : '#dee2e6'}`,
      borderRadius: '8px',
      padding: '1rem',
      height: '430px',
      position: 'relative',
      overflowY: "auto"
    };

    switch (template.preview) {
      case 'modern':
        return (
          <div style={baseStyle}>
            <img src={MordernImg} style={{ height: 'auto', width: '100%' }} alt='Modern Professional' />
          </div>
        );

      case 'executive':
        return (
          <div style={baseStyle}>
            <img src={ExecutiveImg} style={{ height: 'auto', width: '100%' }} alt='Executive' />
          </div>
        );

      case 'minimalist':
        return (
          <div style={baseStyle}>
            <img src={MinimalistImg} style={{ height: 'auto', width: '100%' }} alt='Minimalist' />
          </div>
        );

      case 'professional':
        return (
          <div style={baseStyle}>
            <img src={ProfessionalImg} style={{ height: 'auto', width: '100%' }} alt='Professional' />
          </div>
        );

      case 'classic':
        return (
          <div style={baseStyle}>
            <img src={ClassicImg} style={{ height: 'auto', width: '100%' }} alt='Classic' />
          </div>
        );

      default:
        return (
          <div style={baseStyle}>
            <img src={MordernImg} style={{ height: 'auto', width: '100%' }} alt='Modern Professional' />
          </div>
        );
    }
  };

  return (
    <div className="templates-page">
      <div className="row mb-5">
        <div className="col-12">
          <h1 className="fw-bold mb-3">Resume Templates</h1>
          <p className="text-muted">
            Choose from our professionally designed templates. All templates are ATS-friendly and fully customizable.
          </p>
        </div>
      </div>

      {/* Template Usage Instructions */}
      <div className="row mt-5 mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-3">How to Use Templates</h4>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <div className="text-center">
                    <div className="step-number mb-2">1</div>
                    <h6>Select a Template</h6>
                    <p className="text-muted small">Choose from our professional designs</p>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-center">
                    <div className="step-number mb-2">2</div>
                    <h6>Customize Content</h6>
                    <p className="text-muted small">Fill in your personal and professional details</p>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-center">
                    <div className="step-number mb-2">3</div>
                    <h6>Preview & Edit</h6>
                    <p className="text-muted small">See real-time changes and make adjustments</p>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-center">
                    <div className="step-number mb-2">4</div>
                    <h6>Download PDF</h6>
                    <p className="text-muted small">Export as high-quality PDF document</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="carousel-container card">
            <div className="card-body p-4">
              <div className="carousel-wrapper">
                <div className="carousel-navigation d-flex justify-content-between align-items-center mb-4">
                  <button className="btn btn-outline-dark" onClick={handlePrev}>
                    <FaArrowLeft /> Previous
                  </button>
                  <div className="carousel-indicators">
                    {templates.map((_, index) => (
                      <button
                        key={index}
                        className={`carousel-indicator ${activeIndex === index ? 'active text-dark' : ''}`}
                        onClick={() => handleSelect(index)}
                      />
                    ))}
                  </div>
                  <button className="btn btn-outline-dark" onClick={handleNext}>
                    Next <FaArrowRight />
                  </button>
                </div>

                <div className="carousel-slide">
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <div className="template-preview-container">
                        {renderTemplatePreview(templates[activeIndex])}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="template-info p-4">
                        <span className="template-category badge bg-light text-dark mb-2">
                          {templates[activeIndex].category}
                        </span>
                        <h2 className="template-name mb-3">{templates[activeIndex].name}</h2>
                        <p className="template-description text-muted mb-4">
                          {templates[activeIndex].description}
                        </p>
                        <div className="template-features mb-4">
                          <div className="feature-item d-flex align-items-center mb-2">
                            <div className="feature-check me-2 text-dark">
                              <FaCheck />
                            </div>
                            <span>ATS Friendly</span>
                          </div>
                          <div className="feature-item d-flex align-items-center mb-2">
                            <div className="feature-check me-2 text-dark">
                              <FaCheck />
                            </div>
                            <span>Fully Responsive</span>
                          </div>
                          <div className="feature-item d-flex align-items-center mb-2">
                            <div className="feature-check me-2 text-dark">
                              <FaCheck />
                            </div>
                            <span>Print Optimized</span>
                          </div>
                        </div>
                        <div className='d-flex felx-row justify-content-between aling-item-center'>
                          <button
                            className={`btn ${selectedTemplate === templates[activeIndex].id ? 'btn-dark' : 'btn-outline-dark'} btn-lg`}
                            onClick={() => handleTemplateSelect(templates[activeIndex].id)}
                          >
                            {selectedTemplate === templates[activeIndex].id ? 'Selected' : 'Select Template'}
                          </button>
                          {selectedTemplate === templates[activeIndex].id ? <button className='btn btn-dark' onClick={() => handleGenerate()}>Generate</button> : ""}
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

      {/* All Templates Grid */}
      <div className="row">
        <div className="col-12 mb-4">
          <h3 className="fw-bold">All Templates</h3>
        </div>
        {templates.map((template) => (
          <div key={template.id} className="col-lg-4 col-md-6 mb-4">
            <div
              className={`card template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
              onClick={() => handleTemplateSelect(template.id)}
              style={{ borderColor: selectedTemplate === template.id ? template.color : undefined }}
            >
              <div className="card-body">
                <div className="template-preview-sm mb-3">
                  {renderTemplatePreview(template)}
                </div>
                <div className="template-card-info">
                  <h5 className="template-card-name">{template.name}</h5>
                  <p className="template-card-description text-muted small">
                    {template.description}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-light text-dark">{template.category}</span>
                    {selectedTemplate === template.id && (
                      <span className="text-dark">
                        <FaCheck /> Selected
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;