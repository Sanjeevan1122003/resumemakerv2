// src/dashboard/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaUpload, FaChartLine, FaHistory } from 'react-icons/fa';
import './DashboardMain.css';
import { useState, useEffect } from 'react';
import { Oval } from 'react-loader-spinner'
import { userAPI, authAPI, resumeAPI } from '../service/api'
import ResumePreviewModal from '../components/ResumePreviewModal';

const Dashboard = () => {
  const [data, setData] = useState({})
  const [totalResumes, setTotalResumes] = useState("0")
  const [templatesUsed, setTemplatesUsed] = useState("0")
  const [lastUpdated, setLastUpdated] = useState("00-00-0000")
  const [recentResumes, setRecentResumes] = useState([]);
  const [resumeData, setResumeData] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [isloading, setLoading] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await userAPI.getUserDetails()
        setData(result)
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchUserData()
  }, [])


  useEffect(() => {
    const fetchResumeDetails = async () => {
      try {
        const result = await resumeAPI.getResumeDetails()
        setTotalResumes(result.resumes_count)
        setTemplatesUsed(result.templates_count)
        setLastUpdated(result.latest_date || "00-00-0000")
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

        setRecentResumes(
          result.map((item, index) => ({
            id: index + 1,
            name: item.job_role,
            resumeId: item.id,
            template: `Template ${item.template_id}`,
            date: item.created_at
          }))
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsersResumes();
  }, []);


  const handleViewResume = async (id) => {
    setLoading(true)
    const resume = recentResumes.find(r => r.id === id);

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
  }

  const handleClosePreview = () => setIsOpen(false);

  const handleEditResume = async (id) => {
    const resume = recentResumes.find(r => r.id === id);
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

  const handleGenerateResume = () => {
    navigate('/generate-resume');
  };

  const handleUploadResume = () => {
    navigate('/upload-resume');
  };

  const stats = {
    totalResumes: totalResumes,
    templatesUsed: templatesUsed,
    lastUpdated: lastUpdated
  };

  return (
    <div className="dashboard-page">
      {/* Welcome Section */}
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
      <div className="welcome-section mb-5">
        <h1 className="display-6 fw-bold mb-2">Welcome {data.username}!</h1>
        <p className="text-light">Create, manage, and download your ATS friendly professional resumes</p>
      </div>

      {/* Quick Actions */}
      <div className="row mb-5">
        <div className="col-md-6 mb-4">
          <div
            className="card action-card h-100 cursor-pointer"
            onClick={handleGenerateResume}
          >
            <div className="card-body text-center p-5">
              <div className="action-icon mb-3">
                <FaFileAlt size={48} className="text-dark" />
              </div>
              <h3 className="card-title mb-3">Generate Resume</h3>
              <p className="card-text text-muted mb-4">
                Create a new resume from scratch using our professional templates
              </p>
              <button className="btn btn-dark btn-lg">
                Start Creating
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div
            className="card action-card h-100 cursor-pointer"
            onClick={handleUploadResume}
          >
            <div className="card-body text-center p-5">
              <div className="action-icon mb-3">
                <FaUpload size={48} className="text-dark" />
              </div>
              <h3 className="card-title mb-3">Upload Resume</h3>
              <p className="card-text text-muted mb-4">
                Upload your existing resume and let us parse and enhance it
              </p>
              <button className="btn btn-outline-dark btn-lg">
                Upload File
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="row mb-5">
        <div className="col-md-4 mb-4">
          <div className="card stat-card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="stat-icon me-3">
                  <FaFileAlt size={32} className="text-dark" />
                </div>
                <div>
                  <h3 className="stat-number mb-0 text-dark">{stats.totalResumes}</h3>
                  <p className="stat-label text-muted mb-0">Total Resumes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card stat-card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="stat-icon me-3">
                  <FaChartLine size={32} className="text-dark" />
                </div>
                <div>
                  <h3 className="stat-number mb-0 text-dark">{stats.templatesUsed}</h3>
                  <p className="stat-label text-muted mb-0">Templates Used</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card stat-card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="stat-icon me-3">
                  <FaHistory size={32} className="text-dark" />
                </div>
                <div>
                  <h3 className="stat-number mb-0 text-dark">{stats.lastUpdated}</h3>
                  <p className="stat-label text-muted mb-0">Last Upload</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Resumes */}
      <div className="card d-none d-md-block">
        <div className="card-header bg-white border-bottom">
          <h3 className="card-title mb-0">Recent Resumes</h3>
        </div>
        <div className="card-body">
          {recentResumes.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Template</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentResumes.map((resume) => (
                    <tr key={resume.id}>
                      <td>{resume.name || 'None'}</td>
                      <td>
                        <span className="badge bg-light text-dark">{resume.template || 'None'}</span>
                      </td>
                      <td>{resume.date || 'None'}</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-dark" onClick={() => handleViewResume(resume.id)}>View</button>
                          <button className="btn btn-outline-dark" onClick={() => handleEditResume(resume.id)}>Edit</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-5">
              <FaFileAlt size={48} className="text-muted mb-3" />
              <h4 className="text-muted">No resumes yet</h4>
              <p className="text-muted">Create your first resume to get started</p>
              <button
                className="btn btn-dark"
                onClick={handleGenerateResume}
              >
                Create Resume
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
