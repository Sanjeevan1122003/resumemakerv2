
// src/components/ResumePreview.js
import React from 'react';
import { FaPhone, FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import './ResumePreview.css';

const ResumePreview = ({ data, template = '1', isFullScreen = false }) => {
  const renderTemplate = () => {
    switch (template) {
      case '1':
        return <Template1 data={data} isFullScreen={isFullScreen} />;
      case '2':
        return <Template2 data={data} isFullScreen={isFullScreen} />;
      case '3':
        return <Template3 data={data} isFullScreen={isFullScreen} />;
      case '4':
        return <Template4 data={data} isFullScreen={isFullScreen} />;
      case '5':
        return <Template5 data={data} isFullScreen={isFullScreen} />;
      // case '6':
      //   return <Template6 data={data} isFullScreen={isFullScreen} />;
      default:
        return <Template1 data={data} isFullScreen={isFullScreen} />;
    }
  };

  return (
    <div className={`resume-preview p-4 bg-white`} >
      {renderTemplate()}
    </div>
  );
};

const Template1 = ({ data, isFullScreen }) => {
  const { experiences = [], projects = [], certificates = [], achievements = [] } = data;
  return (
    <div className={`template template1 container-fluid  ${isFullScreen ? 'fullscreen-template' : ''}`} id="resume-preview">
      {/* Header Section */}
      <div className="row mb-2">
        <div className="col-12 text-center" style={{ fontSize: "12px" }}>
          <h1 className="fw-bold text-uppercase mb-0" style={{ fontSize: "28px" }}>
            {data.fullname}
          </h1>
          <div className="mb-0">
            {data.phone_number && (<><span className="fw-bold">Phone: </span><span className='text-primary'>{data.phone_number}</span></>)}{' '}
            {data.formemail && (<><span className='fw-bold'>Email: </span><a href={`mailto:${data?.formemail}`} target="_blank" className='text-primary'>{data.formemail}</a></>)}
          </div>
          <div className="mb-0">
            {data.linkedin && (<> <span className="fw-bold">LinkedIn: </span><a href={`${data.linkedin}`} target="_blank" className='text-primary'>{data.linkedin}</a></>)}{' '}
            {data.github && (<><span className="fw-bold">GitHub: </span><a href={`${data.github}`} target="_blank" className='text-primary'>{data.github}</a></>)}
          </div>
        </div>
      </div>

      {/* Summary Section */}
      {data.summary && (
        <div className="row mb-2 col-12">
          <div className="col-12">
            <h2 className="fw-bold mb-1 text-primary text-uppercase" style={{ fontSize: "16px" }}>summary</h2>
            <p className="mb-0 d-flex flex-row justify-content-between">
              {data.summary}
            </p>
          </div>
        </div>
      )}

      {/* Education Section */}
      {(data.college_name || data.intermediate_name || data.school_name) && (
        <div className="row mb-2 col-12">
          <div className="col-12">
            <h2 className="fw-bold text-primary mb-2 text-uppercase" style={{ fontSize: "16px" }}>education</h2>

            {data.college_name && (
              <div className="mb-2">
                <div className="row">
                  <div className="col-8">
                    <p className="fw-bold mb-1">{data?.college_name}</p>
                  </div>
                  <div className="col-4 text-end">
                    <p className="mb-1">{data?.college_year.replace("-", " - ")}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <p className="mb-0">
                      {data?.college_degree} <span className='fw-bold'>{' '}({data?.college_course})</span>
                    </p>
                  </div>
                  <div className="col-4 text-end">
                    {data?.college_marks && (
                      <p className="mb-0">{data.college_marks}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {data?.intermediate_name && (
              <div className="mb-2">
                <div className="row">
                  <div className="col-8">
                    <p className="fw-bold mb-1">{data.intermediate_name}</p>
                  </div>
                  <div className="col-4 text-end">
                    <p className="mb-0">{(data.intermediate_year).replace('-', ' - ')}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <p className="mb-0">
                      {data.intermediate_degree} <span className='fw-bold'>{' '}({data?.intermediate_course})</span>
                    </p>
                  </div>
                  <div className="col-4 text-end">
                    {data.intermediate_marks && (
                      <p className="mb-0">{data.intermediate_marks}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {data?.school_name && (
              <div className="mb-0">
                <div className="row">
                  <div className="col-8">
                    <p className="fw-bold mb-1">{data.school_name}</p>
                  </div>
                  <div className="col-4 text-end">
                    <p className="mb-1">{(data.school_year).replace('-', ' - ')}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <p className="mb-0">
                      {data?.school_degree} <span className='fw-bold'>{' '}({data?.school_qualification})</span>
                    </p>
                  </div>
                  <div className="col-4 text-end">
                    {data.school_marks && (
                      <p className="mb-0">{data.school_marks}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Experience Section */}
      {experiences.length > 0 && (
        <div className="row mb-2 col-12">
          <div className="col-12">
            <h2 className="fw-bold text-primary mb-1 text-uppercase" style={{ fontSize: "16px" }}>experience</h2>
            {experiences.map((exp, index) => (
              <div key={index} className="mb-1">
                <div className="row">
                  <div className="col-8">
                    <h6 className="fw-bold mb-1">
                      {exp.company} {' '}<span className='fw-bold'>({exp.role})</span>
                    </h6>
                  </div>
                  <div className="col-4 text-end">
                    <p className="mb-1">{exp.startDate}<span className='fw-bold'> - </span>{exp.endDate}</p>
                  </div>
                </div>
                <p className="mb-0">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <div className="row mb-2 col-12">
          <div className="col-12">
            <h2 className="fw-bold text-primary mb-1 text-uppercase" style={{ fontSize: "16px" }}>projects</h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-1">
                <p className="fw-bold mb-1">
                  {project.name} <span className="fw-bold">( Link: <a href={`${project.link}`} target="_blank" className='fw-normal'>{project.link}</a> )</span>
                </p>
                <div className="mb-1">{project.description}</div>
                {index < projects.length - 1}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Section */}
      {certificates.length > 0 && (
        <div className="row mb-2 col-12">
          <div className="col-12">
            <h2 className="fw-bold text-primary mb-1 text-uppercase" style={{ fontSize: "16px" }}>certifications</h2>
            {certificates.map((cert, index) => (
              <span key={index}>
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="fw-bold text-dark" style={{ textDecoration: 'none' }}>
                  {cert.name}
                </a>
                {index < certificates.length - 1 ? ', ' : '.'}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* achievementsS Section */}
      {achievements.length > 0 && (
        <div className="row mb-0 col-12">
          <div className="col-12">
            <h2 className="fw-bold text-primary mb-1 text-uppercase" style={{ fontSize: "16px" }}>achievements</h2>
            <ul>
              {achievements.map((achiev, index) => (
                <li key={index}>{achiev}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Skills Section */}
      {(data?.technicalskills?.length > 0 || data?.softskills?.length > 0) && (
        <div className="row col-12">
          <div className="col-12">
            <h2 className="fw-bold text-primary mb-1 text-uppercase" style={{ fontSize: '16px' }}>skills</h2>

            {data?.technicalskills?.length > 0 && (
              <p className="fw-bold mb-1">
                Technical Skills:{' '}
                <span className="fw-normal">{data.technicalskills.join(', ')}</span>
              </p>
            )}

            {data?.softskills?.length > 0 && (
              <p className="fw-bold mb-2">
                Soft Skills:{' '}
                <span className="fw-normal">{data.softskills.join(', ')}</span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Template2 = ({ data, isFullScreen }) => {
  const { experiences = [], projects = [], certificates = [], achievements = [] } = data;

  return (
    <div className={`template template2 container-fluid  ${isFullScreen ? 'fullscreen-template' : ''}`} id="resume-preview">
      {/* Header Section */}
      <div className="row mb-2 col-12" style={{ fontSize: "12px", display: "flex", alignItems: "center", width: "745px" }}>
        {/* Left Section */}
        <div className="col-6 text-start" >
          <h1
            className="fw-bold text-uppercase mb-0"
            style={{ fontSize: "28px" }}
          >
            {data.fullname}
          </h1>

          <h6 className="fw-bold text-uppercase mb-0">
            {data.job_role}
          </h6>

        </div>

        {/* Right Section */}
        <div className="col-6 text-start">
          {data.phone_number && (<><p className="fw-bold mb-0">Phone: <span className="text-primary">{data.phone_number}</span></p></>)}
          {data.formemail && (<><p className="fw-bold mb-0">Email: <a href={`mailto:${data.formemail}`} target="_blank" rel="noopener noreferrer" className="text-primary">{data.formemail}</a></p></>)}
          {data.linkedin && (<><p className="fw-bold mb-0">LinkedIn: <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary">{data.linkedin}</a></p></>)}
          {data.github && (<><p className="fw-bold mb-0">GitHub: <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-primary">{data.github}</a></p></>)}
        </div>
      </div>

      {/* Summary Section */}
      {data.summary && (
        <div className="row mb-2 col-12" style={{ width: "745px" }}>
          <div className="col-12">
            <h2 className="fw-bold mb-1 text-dark text-uppercase" style={{ fontSize: "16px" }}>summary</h2>
            <p className="mb-0 d-flex flex-row justify-content-between">
              {data.summary}
            </p>
          </div>
        </div>
      )}

      {/* Education Section */}
      {(data.college_name || data.intermediate_name || data.school_name) && (
        <div className="row mb-2 col-12" style={{ width: "745px" }}>
          <div className="col-12">
            <h2 className="fw-bold text-dark mb-2 text-uppercase" style={{ fontSize: "16px" }}>education</h2>

            {data.college_name && (
              <div className="mb-2" >
                <div className="row">
                  <div className="col-8">
                    <h6 className="fw-bold mb-1">{data?.college_name}</h6>
                  </div>
                  <div className="col-4 text-end">
                    <p className="mb-1">{data?.college_year.replace("-", " - ")}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <p className="mb-0">
                      {data?.college_degree} <span className='fw-bold'>{' '}({data?.college_course})</span>
                    </p>
                  </div>
                  <div className="col-4 text-end">
                    {data?.college_marks && (
                      <p className="mb-0">{data.college_marks}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {data?.intermediate_name && (
              <div className="mb-2">
                <div className="row">
                  <div className="col-8">
                    <h6 className="fw-bold mb-1">{data.intermediate_name}</h6>
                  </div>
                  <div className="col-4 text-end">
                    <p className="mb-0">{(data.intermediate_year).replace('-', ' - ')}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <p className="mb-0">
                      {data.intermediate_degree} <span className='fw-bold'>{' '}({data?.intermediate_course})</span>
                    </p>
                  </div>
                  <div className="col-4 text-end">
                    {data.intermediate_marks && (
                      <p className="mb-0">{data.intermediate_marks}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {data?.school_name && (
              <div className="mb-0">
                <div className="row">
                  <div className="col-8">
                    <h6 className="fw-bold mb-1">{data.school_name}</h6>
                  </div>
                  <div className="col-4 text-end">
                    <p className="mb-1">{(data.school_year).replace('-', ' - ')}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <p className="mb-0">
                      {data?.school_degree} <span className='fw-bold'>{' '}({data?.school_qualification})</span>
                    </p>
                  </div>
                  <div className="col-4 text-end">
                    {data.school_marks && (
                      <p className="mb-0">{data.school_marks}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Experience Section */}
      {experiences.length > 0 && (
        <div className="row mb-2 col-12" style={{ width: "745px" }}>
          <div className="col-12">
            <h2 className="fw-bold text-dark mb-1 text-uppercase" style={{ fontSize: "16px" }}>experience</h2>
            {experiences.map((exp, index) => (
              <div key={index} className="mb-1">
                <div className="row">
                  <div className="col-8">
                    <h6 className="fw-bold mb-1">
                      {exp.company} {' '}<span className='fw-bold'>({exp.role})</span>
                    </h6>
                  </div>
                  <div className="col-4 text-end">
                    <p className="mb-1">{exp.startDate}<span className='fw-bold'> - </span>{exp.endDate}</p>
                  </div>
                </div>
                <p className="mb-0">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <div className="row mb-2 col-12" style={{ width: "745px" }}>
          <div className="col-12">
            <h2 className="fw-bold text-dark mb-1 text-uppercase" style={{ fontSize: "16px" }}>projects</h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-1">
                <p className="fw-bold mb-1">
                  {project.name} <span className="fw-bold">( Link: <a href={`${project.link}`} target="_blank" className='fw-bold'>{project.link}</a> )</span>
                </p>
                <div className="mb-1">{project.description}</div>
                {index < projects.length - 1}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Section */}
      {certificates.length > 0 && (
        <div className="row mb-2 col-12" style={{ width: "745px" }}>
          <div className="col-12">
            <h2 className="fw-bold text-dark mb-1 text-uppercase" style={{ fontSize: "16px" }}>certifications</h2>
            {certificates.map((cert, index) => (
              <span key={index}>
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="fw-bold text-dark" style={{ textDecoration: 'none' }}>
                  {cert.name}
                </a>
                {index < certificates.length - 1 ? ', ' : '.'}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* achievementsS Section */}
      {achievements.length > 0 && (
        <div className="row mb-0 col-12" style={{ width: "745px" }}>
          <div className="col-12">
            <h2 className="fw-bold text-dark mb-1 text-uppercase" style={{ fontSize: "16px" }}>achievements</h2>
            <ul>
              {achievements.map((achiev, index) => (
                <li key={index}>{achiev}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Skills Section */}
      {(data?.technicalskills?.length > 0 || data?.softskills?.length > 0) && (
        <div className="row col-12" style={{ width: "745px" }}>
          <div className="col-12">
            <h2 className="fw-bold text-dark mb-1 text-uppercase" style={{ fontSize: '16px' }}>skills</h2>

            {data?.technicalskills?.length > 0 && (
              <p className="fw-bold mb-1">
                Technical Skills:{' '}
                <span className="fw-normal">{data.technicalskills.join(', ')}</span>
              </p>
            )}

            {data?.softskills?.length > 0 && (
              <p className="fw-bold mb-2">
                Soft Skills:{' '}
                <span className="fw-normal">{data.softskills.join(', ')}</span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Template3 = ({ data, isFullScreen }) => {
  const { experiences = [], projects = [], certificates = [], achievements = [] } = data;

  return (
    <div className={`template template3 container-fluid  ${isFullScreen ? 'fullscreen-template' : ''}`} id="resume-preview">
      {/* Header Section */}
      <div className="row mb-2 col-12 text-center  text-uppercase mb-0" style={{ width: "745px" }}>
        <h1 className='fw-bold' style={{ fontSize: "38px" }}>{data.fullname}</h1>
        <h6 className='fw-bold' style={{ marginTop: "-15px" }}>{data.job_role}</h6>
      </div>
      {/* Right Section */}
      <div className="row mb-2 col-12 text-start" style={{ width: "745px" }}>
        <div className='col-5'>
          {data.phone_number && (<><p className="fw-bold mb-0"><FaPhone /> <span >{data.phone_number}</span></p></>)}
          {data.formemail && (<><p className="fw-bold mb-0"><FaEnvelope /> <a href={`mailto:${data.formemail}`} target="_blank" rel="noopener noreferrer" className='text-dark'>{data.formemail}</a></p></>)}
        </div>
        <div className='col-7'>
          {data.linkedin && (<><p className="fw-bold mb-0"><FaLinkedin /> <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className='text-dark'>{data.linkedin}</a></p></>)}
          {data.github && (<><p className="fw-bold mb-0"><FaGithub /> <a href={data.github} target="_blank" rel="noopener noreferrer" className='text-dark'>{data.github}</a></p></>)}
        </div>
      </div>


      {/* Summary Section */}
      {data.summary && (
        <div className="row mb-2 col-12" style={{ width: "745px" }}>
          <div className="col-12">
            <h2 className="fw-bold mb-1 text-dark text-capitalize" style={{ fontSize: "20px" }}>summary:</h2>
            <p className="mb-0 d-flex flex-row justify-content-between">
              {data.summary}
            </p>
          </div>
        </div>
      )}

      {/* Education Section */}
      {(data.college_name || data.intermediate_name || data.school_name) && (
        <div className="row mb-0 col-12" style={{ width: "745px" }}>
          <div className="col-12">
            <h2 className="fw-bold text-dark text-capitalize mb-0" style={{ fontSize: "20px" }}>education:</h2>

            {(data.college_name || data.intermediate_name || data.school_name) && (
              <div>
                <ul>
                  <li>
                    Completed{" "}
                    <span className="fw-bold">{data?.college_degree}</span>{" "}
                    in{" "}
                    <span className="fw-bold">{data?.college_course}</span>{" "}
                    from{" "}
                    <span className="fw-bold">{data?.college_name}</span>{" "}
                    during{" "}
                    <span className="fw-bold">
                      {data?.college_year.replace("-", " - ")}
                    </span>
                    , with a{" "}
                    <span className="fw-bold">{data.college_marks}</span>.
                  </li>

                  <li>
                    Completed{" "}
                    <span className="fw-bold">{data?.intermediate_degree}</span>{" "}
                    in{" "}
                    <span className="fw-bold">{data?.intermediate_course}</span>{" "}
                    from{" "}
                    <span className="fw-bold">{data?.intermediate_name}</span>{" "}
                    during{" "}
                    <span className="fw-bold">
                      {data?.intermediate_year.replace("-", " - ")}
                    </span>
                    , with a{" "}
                    <span className="fw-bold">{data.intermediate_marks}</span>.
                  </li>

                  <li>
                    Completed{" "}
                    <span className="fw-bold">{data?.school_qualification}</span>{" "}
                    from{" "}
                    <span className="fw-bold">{data?.school_name}</span>,{" "}
                    <span className="fw-bold">{data?.school_degree}</span>{" "}
                    during{" "}
                    <span className="fw-bold">
                      {data?.school_year.replace("-", " - ")}
                    </span>
                    , with a{" "}
                    <span className="fw-bold">{data.school_marks}</span>.
                  </li>

                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Experience Section */}
      {experiences.length > 0 && (
        <div className="row mb-2 col-12" style={{ width: "745px" }}>
          <div className="col-12">
            <h2 className="fw-bold text-dark text-capitalize mb-1" style={{ fontSize: "20px" }}>experience:</h2>
            {experiences.map((exp, index) => (
              <div key={index} className="mb-1">
                <div className="row">
                  <div className="col-8">
                    <h6 className="fw-bold mb-1">
                      {exp.company} {' '}<span className='fw-bold'>({exp.role})</span>
                    </h6>
                  </div>
                  <div className="col-4 text-end">
                    <p className="mb-1">{exp.startDate}<span className='fw-bold'> - </span>{exp.endDate}</p>
                  </div>
                </div>
                <p className="mb-0">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <div className="row mb-2 col-12" style={{ width: "745px" }}>
          <div className="col-12">
            <h2 className="fw-bold text-dark text-capitalize mb-1" style={{ fontSize: "20px" }}>projects:</h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-1">
                <p className="fw-bold mb-1">
                  {project.name} <span className="fw-bold">( Link: <a href={`${project.link}`} target="_blank" className='fw-bold text-dark'>{project.link}</a> )</span>
                </p>
                <div className="mb-1">{project.description}</div>
                {index < projects.length - 1}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Section */}
      {certificates.length > 0 && (
        <div className="row mb-2 col-12" style={{ width: "745px" }}>
          <div className="col-12">
            <h2 className="fw-bold text-dark text-capitalize mb-1" style={{ fontSize: "20px" }}>certifications:</h2>
            {certificates.map((cert, index) => (
              <span key={index}>
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="fw-bold text-dark" style={{ textDecoration: 'none' }}>
                  {cert.name}
                </a>
                {index < certificates.length - 1 ? ', ' : '.'}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* achievementsS Section */}
      {achievements.length > 0 && (
        <div className="row mb-0 col-12" style={{ width: "745px" }}>
          <div className="col-12">
            <h2 className="fw-bold text-dark text-capitalize mb-1" style={{ fontSize: "20px" }}>achievements:</h2>
            <ul>
              {achievements.map((achiev, index) => (
                <li key={index}>{achiev}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Skills Section */}
      {(data?.technicalskills?.length > 0 || data?.softskills?.length > 0) && (
        <div className="row col-12" style={{ width: "745px" }}>
          <div className="col-12">
            <h2 className="fw-bold text-dark text-capitalize mb-1" style={{ fontSize: "20px" }}>skills:</h2>

            {data?.technicalskills?.length > 0 && (
              <p className="fw-bold mb-1">
                Technical Skills:{' '}
                <span className="fw-normal">{data.technicalskills.join(', ')}</span>
              </p>
            )}

            {data?.softskills?.length > 0 && (
              <p className="fw-bold mb-2">
                Soft Skills:{' '}
                <span className="fw-normal">{data.softskills.join(', ')}</span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Template4 = ({ data, isFullScreen }) => {
  const { experiences = [], projects = [], certificates = [], achievements = [] } = data;

  return (
    <div className={`template template4 container-fluid  ${isFullScreen ? 'fullscreen-template' : ''}`} id="resume-preview">
      {/* Header Section */}
      <div className="row mb-2" style={{ width: "745px" }}>
        <div className="col-12 text-center" style={{ fontSize: "12px" }}>
          <h1 className="fw-bold text-uppercase mb-0" style={{ fontSize: "30px" }}>
            {data.fullname}
          </h1>
          <div className="mb-0">
            {data.phone_number && (<><span className="fw-bold">Phone: </span><span className='fw-semibold text-dark'>{data.phone_number}</span></>)}{' '}
            {data.formemail && (<><span className='fw-bold'>Email: </span><a href={`mailto:${data?.formemail}`} target="_blank" className='fw-semibold text-dark' style={{ textDecoration: "none" }}>{data.formemail}</a></>)}
          </div>
          <div className="mb-0">
            {data.linkedin && (<> <span className="fw-bold">LinkedIn: </span><a href={`${data.linkedin}`} target="_blank" className='fw-semibold text-dark' style={{ textDecoration: "none" }}>{data.linkedin}</a></>)}{' '}
            {data.github && (<><span className="fw-bold">GitHub: </span><a href={`${data.github}`} target="_blank" className='fw-semibold text-dark' style={{ textDecoration: "none" }}>{data.github}</a></>)}
          </div>
        </div>
      </div>

      <hr style={{ border: "1px solid #000000", margin: "10px 0", width: "710px" }} />

      {/* Summary Section */}
      {data.summary && (<>
        <div className="row mb-2 col-12" style={{ width: "745px" }}>
          <div className="col-12">
            <h2 className="fw-bold mb-1 text-dark text-uppercase" style={{ fontSize: "16px" }}>summary</h2>
            <p className="mb-0 d-flex flex-row justify-content-between">
              {data.summary}
            </p>
          </div>
        </div>
        <hr style={{ border: "1px solid #000000", margin: "10px 0", width: "710px" }} />
      </>
      )}



      {/* Education Section */}
      {(data.college_name || data.intermediate_name || data.school_name) && (<>
        <div className="row mb-2 col-12" style={{ width: "730px" }}>
          <div className="col-12">
            <h2 className="fw-bold text-dark mb-2 text-uppercase" style={{ fontSize: "16px" }}>education</h2>

            {data.college_name && (
              <div className="mb-2">
                <div className="row">
                  <div className="col-8">
                    <p className="fw-bold mb-1">{data?.college_name}</p>
                  </div>
                  <div className="col-4 text-end">
                    <p className="mb-1 fw-semibold">{data?.college_year.replace("-", " - ")}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <p className="mb-0">
                      {data?.college_degree} <span className='fw-bold'>{' '}({data?.college_course})</span>
                    </p>
                  </div>
                  <div className="col-4 text-end">
                    {data?.college_marks && (
                      <p className="mb-0">{data.college_marks}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {data?.intermediate_name && (
              <div className="mb-2">
                <div className="row">
                  <div className="col-8">
                    <p className="fw-bold mb-1">{data.intermediate_name}</p>
                  </div>
                  <div className="col-4 text-end">
                    <p className="mb-0 fw-semibold">{(data.intermediate_year).replace('-', ' - ')}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <p className="mb-0">
                      {data.intermediate_degree} <span className='fw-bold'>{' '}({data?.intermediate_course})</span>
                    </p>
                  </div>
                  <div className="col-4 text-end">
                    {data.intermediate_marks && (
                      <p className="mb-0">{data.intermediate_marks}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {data?.school_name && (
              <div className="mb-0">
                <div className="row">
                  <div className="col-8">
                    <p className="fw-bold mb-1">{data.school_name}</p>
                  </div>
                  <div className="col-4 text-end">
                    <p className="mb-1 fw-semibold">{(data.school_year).replace('-', ' - ')}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <p className="mb-0">
                      {data?.school_degree} <span className='fw-bold'>{' '}({data?.school_qualification})</span>
                    </p>
                  </div>
                  <div className="col-4 text-end">
                    {data.school_marks && (
                      <p className="mb-0">{data.school_marks}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <hr style={{ border: "1px solid #000000", margin: "10px 0", width: "710px" }} />
      </>
      )}

      {/* Experience Section */}
      {experiences.length > 0 && (<>
        <div className="row mb-2 col-12" style={{ width: "730px" }}>
          <div className="col-12">
            <h2 className="fw-bold text-dark mb-1 text-uppercase" style={{ fontSize: "16px" }}>experience</h2>
            {experiences.map((exp, index) => (
              <div key={index} className="mb-1">
                <div className="row">
                  <div className="col-8">
                    <h6 className="fw-bold mb-1">
                      {exp.company} {' '}<span className='fw-bold'>({exp.role})</span>
                    </h6>
                  </div>
                  <div className="col-4 text-end">
                    <p className="mb-1 fw-semibold">{exp.startDate}<span> - </span>{exp.endDate}</p>
                  </div>
                </div>
                <p className="mb-0">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
        <hr style={{ border: "1px solid #000000", margin: "10px 0", width: "710px" }} />
      </>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (<>
        <div className="row mb-2 col-12" style={{ width: "730px" }}>
          <div className="col-12">
            <h2 className="fw-bold text-dark mb-1 text-uppercase" style={{ fontSize: "16px" }}>projects</h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-1">
                <p className="fw-bold mb-1">
                  {project.name} <span className="fw-bold">( Link: <a href={`${project.link}`} target="_blank" className='fw-semibold text-dark' style={{ textDecoration: "none" }}>{project.link}</a> )</span>
                </p>
                <div className="mb-1">{project.description}</div>
                {index < projects.length - 1}
              </div>
            ))}
          </div>
        </div>
        <hr style={{ border: "1px solid #000000", margin: "10px 0", width: "710px" }} />
      </>
      )}

      {/* Certifications Section */}
      {certificates.length > 0 && (<>
        <div className="row mb-2 col-12" style={{ width: "745px" }}>
          <div className="col-12">
            <h2 className="fw-bold text-dark mb-1 text-uppercase" style={{ fontSize: "16px" }}>certifications</h2>
            {certificates.map((cert, index) => (
              <span key={index}>
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="fw-bold text-dark" style={{ textDecoration: 'none' }}>
                  {cert.name}
                </a>
                {index < certificates.length - 1 ? ', ' : '.'}
              </span>
            ))}
          </div>
        </div>
        <hr style={{ border: "1px solid #000000", margin: "10px 0", width: "710px" }} />
      </>
      )}

      {/* achievementsS Section */}
      {achievements.length > 0 && (<>
        <div className="row mb-0 col-12" style={{ width: "745px" }}>
          <div className="col-12">
            <h2 className="fw-bold text-dark mb-1 text-uppercase" style={{ fontSize: "16px" }}>achievements</h2>
            <ul>
              {achievements.map((achiev, index) => (
                <li key={index}>{achiev}</li>
              ))}
            </ul>
          </div>
        </div>
        <hr style={{ border: "1px solid #000000", margin: "10px 0", width: "710px" }} />
      </>
      )}

      {/* Skills Section */}
      {(data?.technicalskills?.length > 0 || data?.softskills?.length > 0) && (
        <div className="row col-12" style={{ width: "745px" }}>
          <div className="col-12">
            <h2 className="fw-bold text-dark mb-1 text-uppercase" style={{ fontSize: '16px' }}>skills</h2>

            {data?.technicalskills?.length > 0 && (
              <p className="fw-bold mb-1">
                Technical Skills:{' '}
                <span className="fw-normal">{data.technicalskills.join(', ')}</span>
              </p>
            )}

            {data?.softskills?.length > 0 && (
              <p className="fw-bold mb-2">
                Soft Skills:{' '}
                <span className="fw-normal">{data.softskills.join(', ')}</span>
              </p>
            )}
          </div>
        </div>

      )}
    </div>
  );
};

const Template5 = ({ data, isFullScreen }) => {
  const { experiences = [], projects = [], certificates = [], achievements = [] } = data;

  return (
    <div className={`template template5 container-fluid  ${isFullScreen ? 'fullscreen-template' : ''}`} id="resume-preview">
      {/* Header Section */}
      <div className="row mb-2" style={{ width: "745px" }}>
        <div className="col-12 text-center" style={{ fontSize: "14px" }}>
          <h1 className="fw-bold text-uppercase mb-0" style={{ fontSize: "28px" }}>
            {data.fullname}
          </h1>
          <div className="mb-0 text-center">
            {data.phone_number && (<><span className="fw-bold">Phone: </span><span className=' text-dark'>{data.phone_number}</span></>)}{' '}
            {data.formemail && (<><span className='fw-bold'>Email: </span><a href={`mailto:${data?.formemail}`} target="_blank" className=' text-dark' style={{ textDecoration: "none" }}>{data.formemail}</a></>)}
            {data.linkedin && (<> <span className="fw-bold">LinkedIn: </span><a href={`${data.linkedin}`} target="_blank" className=' text-dark' style={{ textDecoration: "none" }}>{data.linkedin}</a></>)}{' '}
            {data.github && (<><span className="fw-bold">GitHub: </span><a href={`${data.github}`} target="_blank" className=' text-dark' style={{ textDecoration: "none" }}>{data.github}</a></>)}
          </div>
        </div>
      </div>

      <hr style={{ border: "1px solid #000000", margin: "10px 0", width: "710px" }} />

      {/* Summary Section */}
      {data.summary && (<>
        <div className="row mb-2 col-12" style={{ width: "745px" }}>
          <div className="col-12">
            <h2 className="fw-bold mb-1 text-dark text-capitalize text-center" style={{ fontSize: "18px" }}>summary</h2>
            <p className="mb-0 d-flex flex-row justify-content-between">
              {data.summary}
            </p>
          </div>
        </div>
        <hr style={{ border: "1px solid #000000", margin: "10px 0", width: "710px" }} />
      </>
      )}



      {/* Education Section */}
      {(data.college_name || data.intermediate_name || data.school_name) && (<>
        <div className="row mb-2 col-12" style={{ width: "730px" }}>
          <div className="col-12">
            <h2 className="fw-bold text-dark mb-2 text-capitalize text-center" style={{ fontSize: "18px" }}>education</h2>

            {(data.college_name || data.intermediate_name || data.school_name) && (
              <div className='text-center'>
                <p className='mb-1'>
                  Completed{" "}
                  <span >{data?.college_degree}</span>{" "}
                  in{" "}
                  <span >{data?.college_course}</span>{" "}
                  from{" "}
                  <span >{data?.college_name}</span>{" "}
                  during{" "}
                  <span >
                    {data?.college_year.replace("-", " - ")}
                  </span>
                  , with a{" "}
                  <span >{data.college_marks}</span>.
                </p>

                <p className='mb-1'>
                  Completed{" "}
                  <span >{data?.intermediate_degree}</span>{" "}
                  in{" "}
                  <span >{data?.intermediate_course}</span>{" "}
                  from{" "}
                  <span >{data?.intermediate_name}</span>{" "}
                  during{" "}
                  <span >
                    {data?.intermediate_year.replace("-", " - ")}
                  </span>
                  , with a{" "}
                  <span >{data.intermediate_marks}</span>.
                </p>

                <p className='mb-1'>
                  Completed{" "}
                  <span >{data?.school_quapfication}</span>{" "}
                  from{" "}
                  <span >{data?.school_name}</span>,{" "}
                  <span >{data?.school_degree}</span>{" "}
                  during{" "}
                  <span >
                    {data?.school_year.replace("-", " - ")}
                  </span>
                  , with a{" "}
                  <span >{data.school_marks}</span>.
                </p>
              </div>
            )}
          </div>
        </div>
        <hr style={{ border: "1px solid #000000", margin: "10px 0", width: "710px" }} />
      </>
      )}

      {/* Experience Section */}
      {experiences.length > 0 && (<>
        <div className="row mb-2 col-12" style={{ width: "730px" }}>
          <div className="col-12">
            <h2 className="fw-bold text-dark mb-1 text-capitalize text-center" style={{ fontSize: "18px" }}>experience</h2>
            {experiences.map((exp, index) => (
              <div key={index} className="mb-1">
                <div className="row">
                  <div className="col-8">
                    <h6 className="fw-bold mb-1">
                      {exp.company} {' '}<span className='fw-bold'>({exp.role})</span>
                    </h6>
                  </div>
                  <div className="col-4 text-end">
                    <p className="mb-1 fw-semibold">{exp.startDate}<span> - </span>{exp.endDate}</p>
                  </div>
                </div>
                <p className="mb-0">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
        <hr style={{ border: "1px solid #000000", margin: "10px 0", width: "710px" }} />
      </>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (<>
        <div className="row mb-2 col-12" style={{ width: "730px" }}>
          <div className="col-12">
            <h2 className="fw-bold text-dark mb-1 text-capitalize text-center" style={{ fontSize: "18px" }}>projects</h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-1">
                <p className="fw-bold mb-1">
                  {project.name} <span className="fw-bold">( Link: <a href={`${project.link}`} target="_blank" className='fw-semibold text-dark' style={{ textDecoration: "none" }}>{project.link}</a> )</span>
                </p>
                <div className="mb-1">{project.description}</div>
                {index < projects.length - 1}
              </div>
            ))}
          </div>
        </div>
        <hr style={{ border: "1px solid #000000", margin: "10px 0", width: "710px" }} />
      </>
      )}

      {/* Certifications Section */}
      {certificates.length > 0 && (<>
        <div className="row mb-2 col-12" style={{ width: "745px" }}>
          <div className="col-12 text-center">
            <h2 className="fw-bold text-dark mb-1 text-capitalize " style={{ fontSize: "18px" }}>certifications</h2>
            {certificates.map((cert, index) => (
              <span key={index} >
                <span className="text-dark" style={{ textDecoration: 'none' }}>
                  {cert.name}
                </span>
                {index < certificates.length - 1 ? ', ' : '.'}
              </span>
            ))}
          </div>
        </div>
        <hr style={{ border: "1px solid #000000", margin: "10px 0", width: "710px" }} />
      </>
      )}

      {/* achievementsS Section */}
      {achievements.length > 0 && (<>
        <div className="row mb-0 col-12" style={{ width: "745px" }}>
          <div className="col-12 text-center">
            <h2 className="fw-bold text-dark mb-1 text-capitalize " style={{ fontSize: "18px" }}>achievements</h2>
            {achievements.map((achiev, index) => (
              <span key={index}>{achiev}  {index < achievements.length - 1 ? ', ' : '.'}</span>

            ))}
          </div>
        </div>
        <hr style={{ border: "1px solid #000000", margin: "10px 0", width: "710px" }} />
      </>
      )}

      {/* Skills Section */}
      {(data?.technicalskills?.length > 0 || data?.softskills?.length > 0) && (
        <div className="row col-12" style={{ width: "745px" }}>
          <div className="col-12">
            <h2 className="fw-bold text-dark mb-1 text-capitalize text-center" style={{ fontSize: "18px" }}>skills</h2>

            {data?.technicalskills?.length > 0 && (
              <p className="fw-bold mb-1">
                Technical Skills:{' '}
                <span className="fw-normal">{data.technicalskills.join(', ')}</span>
              </p>
            )}

            {data?.softskills?.length > 0 && (
              <p className="fw-bold mb-2">
                Soft Skills:{' '}
                <span className="fw-normal">{data.softskills.join(', ')}</span>
              </p>
            )}
          </div>
        </div>

      )}
    </div>
  );
};

// const Template6 = ({ data, isFullScreen }) => {
//   const { experiences = [], projects = [], certificates = [], achievements = [] } = data;

//   return (
//     <div className={`template template6 container-fluid  ${isFullScreen ? 'fullscreen-template' : ''}`} id="resume-preview">
//       {/* Header Section */}
//       <div className="row mb-2 col-12 bg-dark text-light py-4" style={{ fontSize: "12px", display: "flex", alignItems: "center", width: "745px" }}>
//         {/* Left Section */}
//         <div className="col-12 text-start" >
//           <h1
//             className="fw-bold text-uppercase mb-0"
//             style={{ fontSize: "28px" }}
//           >
//             {data.fullname}
//           </h1>

//           <h6 className="fw-bold text-uppercase mb-0">
//             {data.job_role}
//           </h6>

//         </div>
//       </div>

//        {/* Right Section */}
//         <div className="col-6 text-start">
//           {data.phone_number && (<><p className="fw-bold mb-1"><FaPhone /> <span>{data.phone_number}</span></p></>)}
//           {data.formemail && (<><p className="fw-bold mb-1"><FaEnvelope/> <a href={`mailto:${data.formemail}`} target="_blank" rel="noopener noreferrer" className="text-light">{data.formemail}</a></p></>)}
//           {data.linkedin && (<><p className="fw-bold mb-1"><FaLinkedin/> <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-light">{data.linkedin}</a></p></>)}
//           {data.github && (<><p className="fw-bold mb-0"><FaGithub/> <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-light">{data.github}</a></p></>)}
//         </div>+

//       {/* Summary Section */}
//       {data.summary && (
//         <div className="row mb-2 col-12" style={{ width: "745px" }}>
//           <div className="col-12">
//             <h2 className="fw-bold mb-1 text-dark text-uppercase" style={{ fontSize: "16px" }}>summary</h2>
//             <p className="mb-0 d-flex flex-row justify-content-between">
//               {data.summary}
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Education Section */}
//       {(data.college_name || data.intermediate_name || data.school_name) && (
//         <div className="row mb-2 col-12" style={{ width: "745px" }}>
//           <div className="col-12">
//             <h2 className="fw-bold text-dark mb-2 text-uppercase" style={{ fontSize: "16px" }}>education</h2>

//             {data.college_name && (
//               <div className="mb-2" >
//                 <div className="row">
//                   <div className="col-8">
//                     <h6 className="fw-bold mb-1">{data?.college_name}</h6>
//                   </div>
//                   <div className="col-4 text-end">
//                     <p className="mb-1">{data?.college_year.replace("-", " - ")}</p>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-8">
//                     <p className="mb-0">
//                       {data?.college_degree} <span className='fw-bold'>{' '}({data?.college_course})</span>
//                     </p>
//                   </div>
//                   <div className="col-4 text-end">
//                     {data?.college_marks && (
//                       <p className="mb-0">{data.college_marks}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {data?.intermediate_name && (
//               <div className="mb-2">
//                 <div className="row">
//                   <div className="col-8">
//                     <h6 className="fw-bold mb-1">{data.intermediate_name}</h6>
//                   </div>
//                   <div className="col-4 text-end">
//                     <p className="mb-0">{(data.intermediate_year).replace('-', ' - ')}</p>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-8">
//                     <p className="mb-0">
//                       {data.intermediate_degree} <span className='fw-bold'>{' '}({data?.intermediate_course})</span>
//                     </p>
//                   </div>
//                   <div className="col-4 text-end">
//                     {data.intermediate_marks && (
//                       <p className="mb-0">{data.intermediate_marks}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {data?.school_name && (
//               <div className="mb-0">
//                 <div className="row">
//                   <div className="col-8">
//                     <h6 className="fw-bold mb-1">{data.school_name}</h6>
//                   </div>
//                   <div className="col-4 text-end">
//                     <p className="mb-1">{(data.school_year).replace('-', ' - ')}</p>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-8">
//                     <p className="mb-0">
//                       {data?.school_degree} <span className='fw-bold'>{' '}({data?.school_qualification})</span>
//                     </p>
//                   </div>
//                   <div className="col-4 text-end">
//                     {data.school_marks && (
//                       <p className="mb-0">{data.school_marks}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Experience Section */}
//       {experiences.length > 0 && (
//         <div className="row mb-2 col-12" style={{ width: "745px" }}>
//           <div className="col-12">
//             <h2 className="fw-bold text-dark mb-1 text-uppercase" style={{ fontSize: "16px" }}>experience</h2>
//             {experiences.map((exp, index) => (
//               <div key={index} className="mb-1">
//                 <div className="row">
//                   <div className="col-8">
//                     <h6 className="fw-bold mb-1">
//                       {exp.company} {' '}<span className='fw-bold'>({exp.role})</span>
//                     </h6>
//                   </div>
//                   <div className="col-4 text-end">
//                     <p className="mb-1">{exp.startDate}<span className='fw-bold'> - </span>{exp.endDate}</p>
//                   </div>
//                 </div>
//                 <p className="mb-0">{exp.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Projects Section */}
//       {projects.length > 0 && (
//         <div className="row mb-2 col-12" style={{ width: "745px" }}>
//           <div className="col-12">
//             <h2 className="fw-bold text-dark mb-1 text-uppercase" style={{ fontSize: "16px" }}>projects</h2>
//             {projects.map((project, index) => (
//               <div key={index} className="mb-1">
//                 <p className="fw-bold mb-1">
//                   {project.name} <span className="fw-bold">( Link: <a href={`${project.link}`} target="_blank" className='fw-bold'>{project.link}</a> )</span>
//                 </p>
//                 <div className="mb-1">{project.description}</div>
//                 {index < projects.length - 1}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Certifications Section */}
//       {certificates.length > 0 && (
//         <div className="row mb-2 col-12" style={{ width: "745px" }}>
//           <div className="col-12">
//             <h2 className="fw-bold text-dark mb-1 text-uppercase" style={{ fontSize: "16px" }}>certifications</h2>
//             {certificates.map((cert, index) => (
//               <span key={index}>
//                 <a href={cert.link} target="_blank" rel="noopener noreferrer" className="fw-bold text-dark" style={{ textDecoration: 'none' }}>
//                   {cert.name}
//                 </a>
//                 {index < certificates.length - 1 ? ', ' : '.'}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* achievementsS Section */}
//       {achievements.length > 0 && (
//         <div className="row mb-0 col-12" style={{ width: "745px" }}>
//           <div className="col-12">
//             <h2 className="fw-bold text-dark mb-1 text-uppercase" style={{ fontSize: "16px" }}>achievements</h2>
//             <ul>
//               {achievements.map((achiev, index) => (
//                 <li key={index}>{achiev}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}

//       {/* Skills Section */}
//       {(data?.technicalskills?.length > 0 || data?.softskills?.length > 0) && (
//         <div className="row col-12" style={{ width: "745px" }}>
//           <div className="col-12">
//             <h2 className="fw-bold text-dark mb-1 text-uppercase" style={{ fontSize: '16px' }}>skills</h2>

//             {data?.technicalskills?.length > 0 && (
//               <p className="fw-bold mb-1">
//                 Technical Skills:{' '}
//                 <span className="fw-normal">{data.technicalskills.join(', ')}</span>
//               </p>
//             )}

//             {data?.softskills?.length > 0 && (
//               <p className="fw-bold mb-2">
//                 Soft Skills:{' '}
//                 <span className="fw-normal">{data.softskills.join(', ')}</span>
//               </p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

export default ResumePreview;

