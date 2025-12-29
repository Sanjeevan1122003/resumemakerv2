// src/components/TemplateSelector.js
import React from 'react';
import "./TemplateSelector.css"

const TemplateSelector = ({ selected, onChange }) => {
  const templates = [
    { id: '1', name: 'Template 1 - Modern Professional'},
    { id: '2', name: 'Template 2 - Executive'},
    { id: '3', name: 'Template 3 - Minimalist'},
    { id: '4', name: 'Template 4 - Professional'},
    { id: '5', name: 'Template 5 - Classic'},
    // { id: '6', name: 'Template 6 - Modern style'}
  ];

  return (
    <div className="template-selector">
      <label className="form-label fw-semibold mb-2">Select Template</label>
      <select 
        className="form-select form-select-sm"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        {templates.map(template => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>
      
      <div className="template-previews mt-3">
        <div className="row g-2">
          {templates.map(template => (
            <div key={template.id} className="col-6 col-md-3">
              <div 
                className={`template-preview-thumb ${selected === template.id ? 'selected' : ''}`}
                onClick={() => onChange(template.id)}
                style={{ borderColor: selected === template.id ? template.color : '#dee2e6' }}
              >
                <div 
                  className="preview-thumb-header"
                  style={{ backgroundColor: template.color }}
                ></div>
                <div className="preview-thumb-body">
                  <div className="preview-line" style={{  opacity: 0.7 }}></div>
                  <div className="preview-line" style={{  opacity: 0.5 }}></div>
                  <div className="preview-line" style={{  opacity: 0.3 }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;