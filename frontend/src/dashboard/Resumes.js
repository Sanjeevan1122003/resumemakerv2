// src/dashboard/Resumes.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEdit, FaTrash, FaPlus, FaFilePdf } from 'react-icons/fa';
import { Oval } from 'react-loader-spinner'
import { TfiMenu } from "react-icons/tfi";
import { resumeAPI } from '../service/api'
import ResumePreviewModal from '../components/ResumePreviewModal';
import './Resumes.css';

const Resumes = () => {
  const [resumes, setResumes] = useState([]);
  const [resumeData, setResumeData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [totalResumes, setTotalResumes] = useState("0")
  const [templatesUsed, setTemplatesUsed] = useState("0")
  const [lastUpdated, setLastUpdated] = useState("00-00-0000")

  const navigate = useNavigate()

  useEffect(() => {
    const fetchResumeDetails = async () => {
      try {
        const result = await resumeAPI.getResumeDetails()
        setTotalResumes(result.resumes_count)
        setTemplatesUsed(result.templates_count)
        setLastUpdated(result.latest_date)
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchResumeDetails()
  }, [])

  useEffect(() => {
    const fetchUsersResumes = async () => {
      try {
        const result = await resumeAPI.getUsersResumes();

        setResumes(
          result.map((item, index) => ({
            id: index + 1,
            name: item.job_role,
            resumeId: item.id,
            template: `Template ${item.template_id}`,
            date: item.created_at,
            description: item.summary
          }))
        );
        console.log()
        setLoading(false)
        console.log(resumes)
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsersResumes();
  }, []);

  const handleDelete = async (id) => {
    const resumeId = id
    try {
      const result = await resumeAPI.deleteResume({ resumeId })
      setResumes(prev =>
        prev.filter(r => r.resumeId !== id)
      );
      alert(result.message);
    } catch (err) {
      console.error(err);
      alert(err.error || "Failed to delete resume");
    }
  };

  const handleView = async (id) => {
    setLoading(true)
    const resume = resumes.find(r => r.id === id);

    if (!resume) {
      console.log("Resume not found");
      return;
    }

    try {
      const result = await resumeAPI.getResume({
        name: resume.name,
        template: resume.template.replace("Template ", ""),
        resumeId: resume.resumeId,
      })
      setResumeData(result.resumeData)
      setIsOpen(true);
      setLoading(false)
    } catch (error) {
      console.error("error:", error);

    };
  };

  const handleClosePreview = () => setIsOpen(false);

  const handleEdit = async (id) => {
    const resume = resumes.find(r => r.id === id);
    if (!resume) {
      console.log("Resume not found");
      return;
    }
    try {
      const result = await resumeAPI.getResume({
        name: resume.name,
        template: resume.template.replace("Template ", ""),
        resumeId: resume.resumeId,
      })
      navigate("/generate-resume", {
        state: {
          template: result.resumeData.template_id,
          resumeData: result.resumeData
        }
      })
    } catch (error) {
      console.error("error:", error);
    };

  }

  const handleCreateNew = () => {
    navigate("/generate-resume")
  };


  return (
    <div className="resumes-page">
      {isloading ? (
        <div className='fullscreen-modal'>
          <div className='modal-content'>
            <Oval
              visible={true}
              height={60}
              width={60}
              color="#000000"
              secondaryColor="#bfbfbf"
              ariaLabel="oval-loading"
            />
          </div>
        </div>
      ) : (<>
        <ResumePreviewModal
          formData={resumeData}
          selectedTemplate={resumeData.template_id}
          isOpen={isOpen}
          onClose={handleClosePreview}
        />
      </>)}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="fw-bold mb-2">My Resumes</h1>
          <p className="text-muted">View and edit your saved resumes</p>
        </div>
        <button
          className="btn btn-dark btn-lg d-flex align-items-center gap-2"
          onClick={handleCreateNew}
        >
          <FaPlus /> Create New Resume
        </button>
      </div>

      {resumes.length > 0 ? (
        <div className="row">
          {resumes.map((resume) => (
            <div key={resume.id} className="col-lg-4 col-md-6 mb-4">
              <div className="card resume-card h-100">
                <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center">
                  <div>
                    <span className="badge bg-light text-dark">{resume.template}</span>
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn btn-link text-muted p-0"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      <TfiMenu />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleView(resume.id)}
                        >
                          <FaEye className="me-2" /> View
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleEdit(resume.id)}
                        >
                          <FaEdit className="me-2" /> Edit
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-dark"
                          onClick={() => handleDelete(resume.resumeId)}
                        >
                          <FaTrash className="me-2" /> Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <div className="resume-preview-icon mb-3">
                    <FaFilePdf size={48} className="text-dark" />
                  </div>
                  <h5 className="resume-name mb-2">{resume.name}</h5>
                  <div className="resume-meta text-muted small mb-3">
                    <div className="d-flex justify-content-between">
                      <span>Modified: {resume.date}</span>
                    </div>
                  </div>
                  <p className="resume-description text-muted small">
                    {resume.description || 'No description available'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="card-body text-center py-5">
            <FaFilePdf size={64} className="text-muted mb-3" />
            <h4 className="text-muted mb-3">No Resumes Yet</h4>
            <p className="text-muted mb-4">
              You haven't created any resumes yet. Start by creating your first professional resume.
            </p>
            <button
              className="btn btn-dark btn-lg"
              onClick={handleCreateNew}
            >
              <FaPlus className="me-2" /> Create Your First Resume
            </button>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="row mt-5">
        <div className="col-md-4 mb-4">
          <div className="card stat-card">
            <div className="card-body text-center">
              <h2 className="stat-number">{totalResumes}</h2>
              <p className="stat-label text-muted">Total Resumes</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card stat-card">
            <div className="card-body text-center">
              <h2 className="stat-number">
                {templatesUsed}
              </h2>
              <p className="stat-label text-muted">Templates Used</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 mb-4">
          <div className="card stat-card h-100">
            <div className="card-body d-flex flex-column justify-content-center text-center">
              <h2 className="stat-number">
                {lastUpdated}
              </h2>
              <p className="stat-label text-muted mb-0">
                Last Updated
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resumes;