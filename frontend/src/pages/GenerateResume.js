// src/pages/GenerateResume.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash, FaDownload, FaEye, FaSave } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import ResumePreviewModal from '../components/ResumePreviewModal';
import './GenerateResume.css';
import '../components/ResumePreview.css';
import { resumeAPI } from "../service/api"
import { MdOutlineZoomOutMap } from "react-icons/md";

const GenerateResume = () => {
    const { state } = useLocation()

    const [selectedTemplate, setSelectedTemplate] = useState(() => {
        return state?.template ?? '1'
    })

    const [formData, setFormData] = useState(() => ({
        fullname: state?.resumeData?.fullname ?? '',
        phone_number: state?.resumeData?.phone_number ?? '',
        job_role: state?.resumeData?.job_role ?? '',
        formemail: state?.resumeData?.formemail ?? '',
        linkedin: state?.resumeData?.linkedin ?? '',
        github: state?.resumeData?.github ?? '',
        summary: state?.resumeData?.summary ?? '',
        school_name: state?.resumeData?.school_name ?? '',
        school_marks: state?.resumeData?.school_marks ?? '',
        school_year: state?.resumeData?.school_year ?? '',
        school_degree: state?.resumeData?.school_degree ?? '',
        school_qualification: state?.resumeData?.school_qualification ?? '',
        intermediate_name: state?.resumeData?.intermediate_name ?? '',
        intermediate_degree: state?.resumeData?.intermediate_degree ?? '',
        intermediate_course: state?.resumeData?.intermediate_course ?? '',
        intermediate_marks: state?.resumeData?.intermediate_marks ?? '',
        intermediate_year: state?.resumeData?.intermediate_year ?? '',
        college_name: state?.resumeData?.college_name ?? '',
        college_degree: state?.resumeData?.college_degree ?? '',
        college_course: state?.resumeData?.college_course ?? '',
        college_marks: state?.resumeData?.college_marks ?? '',
        college_year: state?.resumeData?.college_year ?? '',
        technicalskills: state?.resumeData?.technicalskills ?? [],
        softskills: state?.resumeData?.softskills ?? [],
        experiences: state?.resumeData?.experiences ?? [],
        projects: state?.resumeData?.projects ?? [],
        certificates: state?.resumeData?.certificates ?? [],
        achievements: state?.resumeData?.achievements ?? [],
        template_id: state?.resumeData?.template_id ?? selectedTemplate
    }))

    // const [formData, setFormData] = useState({
    //     "fullname": "Sanjeevan Thangaraj",
    //     "phone_number": "09502965479",
    //     "formemail": "sanjeevan1122003@gmail.com",
    //     "job_role": "Fullstack Developer",
    //     "linkedin": "https://www.linkedin.com/in/sanjeevan-thangaraj",
    //     "github": "https://github.com/sanjeevan1122003",
    //     "summary": "Dedicated Full-stack developer with over two years of experience in front-end development and an additional year focused on backend development. Proficient in HTML, CSS, JavaScript, Python, Node.js, React.js and SQL. Enthusiastic about building user-friendly applications that balance aesthetic appeal with functional depth.",
    //     "school_name": "Ratnam high school",
    //     "school_marks": "8.3 CGPA",
    //     "school_year": "2018-2019",
    //     "school_degree": "AP secondary board",
    //     "school_qualification": "SSC",
    //     "intermediate_name": "Narayana Junior College",
    //     "intermediate_degree": "AP intermidiate borad",
    //     "intermediate_course": "MPC",
    //     "intermediate_marks": "783",
    //     "intermediate_year": "2019-2021",
    //     "college_name": "Priyadharshini Engineering College",
    //     "college_degree": "BTECH",
    //     "college_course": "CSE",
    //     "college_marks": "7 CGPA",
    //     "college_year": "2021-2025",
    //     "softskills": [
    //         "Communication",
    //         "Leadership",
    //         "Teamwork",
    //         "Problem Solving"
    //     ],
    //     "technicalskills": [
    //         "React",
    //         "REST API",
    //         "SQL Server",
    //         "Node.js",
    //         "Python",
    //         "JavaScript",
    //         "Express.js",
    //         "HTML5",
    //         "Tailwind CSS",
    //         "Bootstrap"
    //     ],
    //     "achievements": [
    //         "Designed and developed a Portfolio website",
    //         "Built a full-stack Expense Tracker web app"
    //     ],
    //     "certificates": [
    //         {
    //             "id": 1766036688163,
    //             "link": "",
    //             "name": "AWS workshop Certification"
    //         },
    //         {
    //             "id": 1766036694450,
    //             "link": "",
    //             "name": "Data analytics Certification"
    //         }
    //     ],
    //     "experiences": [
    //         {
    //             "id": 1766039108842,
    //             "role": "Voice process",
    //             "title": "Customer Support",
    //             "company": "Teleperformance",
    //             "current": false,
    //             "endDate": "30/10/205",
    //             "startDate": "01/08/2025",
    //             "description": "I’m a full-stack web developer with hands-on experience building responsive and dynamic web applications, including a portfolio, expense tracker and various web clones. I use React.js for frontend development and Node.js with Express for the backend, along with PostgreSQL for managing structured data."
    //         }
    //     ],
    //     "projects": [
    //         {
    //             "id": 1766036586860,
    //             "link": "https://portfolio.sanjeevantech.com/",
    //             "name": "Portfolio",
    //             "description": "Designed and developed a Portfolio website using HTML, CSS, Bootstrap, and JavaScript. Implemented responsive design principles to ensure compatibility across devices. Enhanced user experience by using Flexbox and responsive development."
    //         },
    //         {
    //             "id": 1766036620065,
    //             "link": "https://clonewebpage.ccbp.tech/",
    //             "name": "Clone Webpage",
    //             "description": "Designed and developed a Clone Web Page using HTML, CSS, Bootstrap, and JavaScript. Implemented responsive design principles to ensure compatibility across devices. Enhanced user experience by using Flexbox technology."
    //         },
    //         {
    //             "id": 1766036649544,
    //             "link": "https://expensetracker.sanjeevantech.com/",
    //             "name": "Expense Tracker",
    //             "description": "Built a full-stack Expense Tracker web app with secure JWT authentication, responsive React.js, Vite, Tailwind CSS, and a dynamic analytics dashboard. Implemented expense CRUD operations, filters, interactive charts, PDF report export, and a scalable backend using Node.js, Express.js, and PostgreSQL."
    //         }
    //     ],
    //     "template_id": "1"
    // || state?.resumeData }
    // )

    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate();
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    // Load saved data from localStorage
    useEffect(() => {
        const savedData = localStorage.getItem('resumeFormData');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    // Save data to localStorage whenever formData changes
    useEffect(() => {
        localStorage.setItem('resumeFormData', JSON.stringify(formData));
    }, [formData]);

    const handleSaveResume = async () => {
        try {
            const result = await resumeAPI.saveResumeData(formData);
            setMessage(result.message);
            alert(result.message)
        } catch (err) {
            setError(err?.message || 'Error while sending the data');
        }
    };

    const handleSaveAndGenerateResume = async () => {
        try {
            // 1. Save resume data to backend
            const result = await resumeAPI.saveResumeData(formData);
            setMessage(result?.message || 'Resume saved successfully');
            alert(result.message)

            // 2. Get resume preview element
            const element = document.getElementById('resume-preview');

            // 3. Create a safe timestamp for filename
            const now = new Date();
            const time = now.toISOString().replace(/[:.]/g, '-');

            // 4. Validate PDF prerequisites
            if (!element) {
                alert('Resume preview not found.');
                return;
            }

            if (!window.html2pdf) {
                alert('PDF generation library not loaded. Please try again.');
                return;
            }

            // 5. PDF configuration
            const opt = {
                margin: [0.3, 0.3, 0.5, 0.3], // [top, left, bottom, right] in inches
                filename: `${formData?.fullname || 'resume'}-${time}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            };

            // 6. Generate and download PDF
            await window.html2pdf().set(opt).from(element).save();

        } catch (err) {
            // 7. Error handling
            setError(err?.message || 'Error while saving or generating resume');
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Add these state variables at the top of your component
    const [techSkillSearch, setTechSkillSearch] = useState('');
    const [softSkillSearch, setSoftSkillSearch] = useState('');

    // Comprehensive skill databases
    const allTechnicalSkills = [
        // Programming Languages
        'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'PHP', 'Ruby', 'Go', 'Swift',
        'Kotlin', 'Rust', 'Scala', 'Perl', 'R', 'Dart', 'Elixir', 'Clojure', 'Haskell',

        // Frontend
        'React', 'Angular', 'Vue.js', 'Next.js', 'Nuxt.js', 'Svelte', 'jQuery', 'HTML5', 'CSS3',
        'SASS', 'SCSS', 'LESS', 'Bootstrap', 'Tailwind CSS', 'Material-UI', 'Chakra UI',

        // Backend
        'Node.js', 'Express.js', 'Django', 'Flask', 'Spring Boot', 'ASP.NET', 'Laravel', 'Ruby on Rails',
        'FastAPI', 'NestJS', 'GraphQL', 'REST API',

        // Databases
        'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle', 'SQL Server', 'Firebase',
        'Cassandra', 'Elasticsearch', 'DynamoDB', 'MariaDB',

        // Mobile
        'React Native', 'Flutter', 'iOS Development', 'Android Development', 'Xamarin', 'Ionic',

        // DevOps & Cloud
        'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'CI/CD', 'Jenkins', 'GitLab CI',
        'GitHub Actions', 'Terraform', 'Ansible', 'Linux', 'Nginx', 'Apache',

        // Testing
        'Jest', 'Mocha', 'Chai', 'Cypress', 'Selenium', 'JUnit', 'Pytest', 'Testing Library',

        // Tools
        'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Jira', 'Confluence', 'Figma', 'Adobe XD',
        'Webpack', 'Vite', 'Babel', 'ESLint', 'Prettier',

        // Data Science & AI
        'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy',
        'Data Analysis', 'Data Visualization', 'Tableau', 'Power BI',

        // Others
        'Microservices', 'Serverless', 'WebSockets', 'OAuth', 'JWT', 'Blockchain', 'Web3',
        'WordPress', 'Shopify', 'API Integration'
    ];

    const allSoftSkills = [
        // Communication
        'Communication', 'Public Speaking', 'Presentation', 'Writing', 'Active Listening',
        'Negotiation', 'Persuasion', 'Storytelling',

        // Leadership & Management
        'Leadership', 'Project Management', 'Team Management', 'Strategic Planning',
        'Decision Making', 'Delegation', 'Mentoring', 'Coaching',

        // Teamwork
        'Teamwork', 'Collaboration', 'Conflict Resolution', 'Empathy', 'Interpersonal Skills',
        'Cross-functional Collaboration',

        // Problem-solving
        'Problem Solving', 'Critical Thinking', 'Analytical Thinking', 'Creativity',
        'Innovation', 'Research', 'Troubleshooting',

        // Work Ethic
        'Time Management', 'Organization', 'Adaptability', 'Flexibility', 'Resilience',
        'Stress Management', 'Work Ethic', 'Accountability', 'Reliability',

        // Business
        'Business Acumen', 'Customer Service', 'Client Management', 'Networking',
        'Sales', 'Marketing', 'Strategic Thinking',

        // Technical Soft Skills
        'Attention to Detail', 'Quality Assurance', 'Documentation', 'Technical Writing',
        'Code Review', 'System Design', 'Architecture Planning'
    ];

    // Filtered skill lists based on search
    const filteredTechnicalSkills = allTechnicalSkills.filter(skill =>
        skill.toLowerCase().includes(techSkillSearch.toLowerCase()) &&
        !formData.technicalskills.includes(skill)
    ).slice(0, 10); // Limit to 10 suggestions

    const filteredSoftSkills = allSoftSkills.filter(skill =>
        skill.toLowerCase().includes(softSkillSearch.toLowerCase()) &&
        !formData.softskills.includes(skill)
    ).slice(0, 10); // Limit to 10 suggestions

    // Skill handler functions
    const addTechnicalSkill = (skill) => {
        const skillToAdd = skill.trim();
        if (skillToAdd && !formData.technicalskills.includes(skillToAdd)) {
            setFormData(prev => ({
                ...prev,
                technicalskills: [...prev.technicalskills, skillToAdd]
            }));
            setTechSkillSearch('');
        }
    };

    const removeTechnicalSkill = (index) => {
        setFormData(prev => ({
            ...prev,
            technicalskills: prev.technicalskills.filter((_, i) => i !== index)
        }));
    };

    const addSoftSkill = (skill) => {
        const skillToAdd = skill.trim();
        if (skillToAdd && !formData.softskills.includes(skillToAdd)) {
            setFormData(prev => ({
                ...prev,
                softskills: [...prev.softskills, skillToAdd]
            }));
            setSoftSkillSearch('');
        }
    };

    const removeSoftSkill = (index) => {
        setFormData(prev => ({
            ...prev,
            softskills: prev.softskills.filter((_, i) => i !== index)
        }));
    };

    // Add keyboard support
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter' && techSkillSearch.trim() && e.target.className.includes('form-control')) {
                if (!formData.technicalskills.includes(techSkillSearch.trim()) &&
                    !allTechnicalSkills.includes(techSkillSearch.trim())) {
                    addTechnicalSkill(techSkillSearch.trim());
                }
            }
        };

        document.addEventListener('keypress', handleKeyPress);
        return () => document.removeEventListener('keypress', handleKeyPress);
    }, [techSkillSearch, formData.technicalskills]);

    // Experience Handlers
    const addExperience = () => {
        setFormData(prev => ({
            ...prev,
            experiences: [...prev.experiences, {
                id: Date.now(),
                title: "",
                company: "",
                role: "",
                startDate: "",
                endDate: "",
                description: "",
                current: false
            }]
        }));
    };

    const updateExperience = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            experiences: prev.experiences.map(exp =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        }));
    };

    const removeExperience = (id) => {
        setFormData(prev => ({
            ...prev,
            experiences: prev.experiences.filter(exp => exp.id !== id)
        }));
    };

    // Project handlers
    const addProject = () => {
        setFormData(prev => ({
            ...prev,
            projects: [...prev.projects, {
                id: Date.now(),
                name: "",
                link: "",
                description: ""
            }]
        }));
    };

    const updateProject = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            projects: prev.projects.map(project =>
                project.id === id ? { ...project, [field]: value } : project
            )
        }));
    };

    const removeProject = (id) => {
        setFormData(prev => ({
            ...prev,
            projects: prev.projects.filter(project => project.id !== id)
        }));
    };

    // Certificate handlers
    const addCertificate = () => {
        setFormData(prev => ({
            ...prev,
            certificates: [...prev.certificates, {
                id: Date.now(),
                name: "",
                link: ""
            }]
        }));
    };

    const updateCertificate = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            certificates: prev.certificates.map(cert =>
                cert.id === id ? { ...cert, [field]: value } : cert
            )
        }));
    };

    const removeCertificate = (id) => {
        setFormData(prev => ({
            ...prev,
            certificates: prev.certificates.filter(cert => cert.id !== id)
        }));
    };

    // Achievement handlers (simple string array)
    const addAchievement = () => {
        setFormData(prev => ({
            ...prev,
            achievements: [...prev.achievements, ""]
        }));
    };

    const updateAchievement = (index, value) => {
        setFormData(prev => {
            const newAchievements = [...prev.achievements];
            newAchievements[index] = value;
            return { ...prev, achievements: newAchievements };
        });
    };

    const removeAchievement = (index) => {
        setFormData(prev => ({
            ...prev,
            achievements: prev.achievements.filter((_, i) => i !== index)
        }));
    };

    // Similar handlers for Projects, Certificates, Achievements...

    const handleGeneratePDF = () => {
        const element = document.getElementById('resume-preview');
        const now = new Date();
        const time = now.toLocaleString();
        if (element && window.html2pdf) {
            const opt = {
                margin: [0.3, 0.3, 0.5, 0.3] //[top, left, bottom, right]
                ,
                filename: `${formData.fullname + time || 'resume'}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            };
            window.html2pdf().set(opt).from(element).save();
            alert("Resume downloaded successfully!")
        }
        else { alert('PDF generation library not loaded. Please try again.'); }
    };

    const handleFullScreenPreview = () => setIsOpen(true);

    const handleClosePreview = () => setIsOpen(false);

    return (
        <div className="generate-resume-page">
            <div className="container-fluid">
                <div className="row">
                    {/* Left Panel - Form */}
                    <div className="col-lg-5">
                        <div className="form-panel">
                            <div className="panel-header d-flex justify-content-between align-items-center mb-4">
                                <h5 className="fw-bold">Resume Builder</h5>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-outline-dark" onClick={handleSaveResume} style={{ width: "auto", height: "30px", padding: "5px", fontSize: "14px" }}  >
                                        <FaSave className="me-2" /> Save
                                    </button>
                                    <button className="btn btn-dark" onClick={handleGeneratePDF} style={{ width: "auto", height: "30px", padding: "5px", fontSize: "14px" }} >
                                        <FaDownload className="me-2" /> Download PDF
                                    </button>
                                </div>
                            </div>

                            {/* Template Selector */}
                            <div className="mb-2">
                                <TemplateSelector
                                    selected={selectedTemplate}
                                    onChange={setSelectedTemplate}
                                />
                            </div>

                            {/* Personal Details Form - EXACT Structure */}
                            <div className="form-section card mb-4">
                                <div className="card-header bg-light">
                                    <h5 className="mb-0">Personal Details</h5>
                                </div>
                                <div className="card-body">
                                    <div className="col-12 mb-3">
                                        <label className="form-label">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.fullname}
                                            onChange={(e) => handleInputChange('fullname', e.target.value)}
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label className="form-label">Phone Number </label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            value={formData.phone_number}
                                            onChange={(e) => handleInputChange('phone_number', e.target.value)}
                                            placeholder="Enter your phone number"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Email </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={formData.formemail}
                                            onChange={(e) => handleInputChange('formemail', e.target.value)}
                                            placeholder="Enter your email"
                                        />
                                    </div>

                                    <div className="row">
                                        <div className="col-xl-12 col-md-6 mb-3">
                                            <label className="form-label">Job Role </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.job_role}
                                                onChange={(e) => handleInputChange('job_role', e.target.value)}
                                                placeholder="e.g., Senior Developer"
                                            />
                                        </div>

                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">LinkedIn Profile</label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            value={formData.linkedin}
                                            onChange={(e) => handleInputChange('linkedin', e.target.value)}
                                            placeholder="https://linkedin.com/in/yourprofile"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">GitHub Profile</label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            value={formData.github}
                                            onChange={(e) => handleInputChange('github', e.target.value)}
                                            placeholder="https://github.com/in/yourprofile"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Professional Summary</label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            value={formData.summary}
                                            onChange={(e) => handleInputChange('summary', e.target.value)}
                                            placeholder="Brief summary of your professional background"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Skills Section */}
                            <div className="form-section card mb-4">
                                <div className="card-header bg-light">
                                    <h5 className="mb-0">Skills</h5>
                                </div>
                                <div className="card-body">
                                    {/* Selected Skills Display */}
                                    <div className="mb-4">
                                        <label className="form-label">Selected Skills</label>
                                        <div className="selected-skills d-flex flex-wrap gap-2 mb-3 p-3 border rounded">
                                            {formData.technicalskills.length === 0 && formData.softskills.length === 0 ? (
                                                <span className="text-muted">No skills added yet. Search and select skills below.</span>
                                            ) : (
                                                <>
                                                    {/* Technical Skills */}
                                                    {formData.technicalskills.map((skill, index) => (
                                                        <span key={`tech-${index}`} className="badge bg-dark d-flex align-items-center" style={{ fontSize: "14px" }}>
                                                            {skill}
                                                            <button
                                                                type="button"
                                                                className="btn-close btn-close-white ms-2"
                                                                style={{ fontSize: '0.5rem' }}
                                                                onClick={() => removeTechnicalSkill(index)}
                                                                aria-label="Remove"
                                                            />
                                                        </span>
                                                    ))}

                                                    {/* Soft Skills */}
                                                    {formData.softskills.map((skill, index) => (
                                                        <span key={`soft-${index}`} className="badge bg-dark d-flex align-items-center" style={{ fontSize: "14px" }}>
                                                            {skill}
                                                            <button
                                                                type="button"
                                                                className="btn-close btn-close-white ms-2"
                                                                style={{ fontSize: '0.5rem' }}
                                                                onClick={() => removeSoftSkill(index)}
                                                                aria-label="Remove"
                                                            />
                                                        </span>
                                                    ))}
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Technical Skills Search */}
                                    <div className="mb-4">
                                        <label className="form-label">Technical Skills</label>
                                        <div className="position-relative">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={techSkillSearch}
                                                onChange={(e) => setTechSkillSearch(e.target.value)}
                                                placeholder="Type ex:- 'JavaScript, React, Python, Node.js, etc...'"
                                            />

                                            {techSkillSearch && (
                                                <div className="position-absolute top-100 start-0 end-0 mt-1 bg-white border rounded shadow-lg z-3">
                                                    <div className="list-group" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                                        {filteredTechnicalSkills.map((skill, index) => (
                                                            <button
                                                                key={index}
                                                                type="button"
                                                                className="list-group-item list-group-item-action text-start"
                                                                onClick={() => addTechnicalSkill(skill)}
                                                            >
                                                                {skill}
                                                            </button>
                                                        ))}
                                                        {filteredTechnicalSkills.length === 0 && (
                                                            <div className="list-group-item text-muted">
                                                                No matching skills. Press Enter to add "{techSkillSearch}"
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                    </div>

                                    {/* Soft Skills Search */}
                                    <div className="mb-3">
                                        <label className="form-label">Soft Skills</label>
                                        <div className="position-relative">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={softSkillSearch}
                                                onChange={(e) => setSoftSkillSearch(e.target.value)}
                                                placeholder="Type ex:-'Communication, Leadership, etc...'"
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter' && softSkillSearch.trim()) {
                                                        addSoftSkill(softSkillSearch.trim());
                                                        setSoftSkillSearch('');
                                                    }
                                                }}
                                            />

                                            {softSkillSearch && (
                                                <div className="position-absolute top-100 start-0 end-0 mt-1 bg-white border rounded shadow-lg z-3">
                                                    <div className="list-group" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                                        {filteredSoftSkills.map((skill, index) => (
                                                            <button
                                                                key={index}
                                                                type="button"
                                                                className="list-group-item list-group-item-action text-start"
                                                                onClick={() => addSoftSkill(skill)}
                                                            >
                                                                {skill}
                                                            </button>
                                                        ))}
                                                        {filteredSoftSkills.length === 0 && (
                                                            <div className="list-group-item text-muted">
                                                                No matching skills. Press Enter to add "{softSkillSearch}"
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Education Form */}
                            <div className="form-section card mb-4">
                                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Education</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <h6>Graduation: </h6>
                                        <div className="col-xl-12 col-md-6 mb-3">
                                            <label className="form-label">College/University name: </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.college_name}
                                                onChange={(e) => handleInputChange('college_name', e.target.value)}
                                                placeholder="Enter college/university name"
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Year: </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.college_year}
                                                onChange={(e) => handleInputChange('college_year', e.target.value)}
                                                placeholder="e.g., 2016-2020"
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Marks/CGPA: </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.college_marks}
                                                onChange={(e) => handleInputChange('college_marks', e.target.value)}
                                                placeholder="e.g., 583, 8.3, etc.."
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Course:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.college_course}
                                                onChange={(e) => handleInputChange('college_course', e.target.value)}
                                                placeholder="e.g., CSE, MECH, EEE, etc.."
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Degree: </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.college_degree}
                                                onChange={(e) => handleInputChange('college_degree', e.target.value)}
                                                placeholder="e.g., BTECH, BE, BCOM, etc.."
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <h6>Intermediate/Diploma: </h6>
                                        <div className="col-xl-12 col-md-6 mb-3">
                                            <label className="form-label">College/University name: </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.intermediate_name}
                                                onChange={(e) => handleInputChange('intermediate_name', e.target.value)}
                                                placeholder="Enter college/university name"
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Year: </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.intermediate_year}
                                                onChange={(e) => handleInputChange('intermediate_year', e.target.value)}
                                                placeholder="e.g., 2016-2020"
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Marks/CGPA: </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.intermediate_marks}
                                                onChange={(e) => handleInputChange('intermediate_marks', e.target.value)}
                                                placeholder="e.g., 583, 8.3, etc.."
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Course:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.intermediate_course}
                                                onChange={(e) => handleInputChange('intermediate_course', e.target.value)}
                                                placeholder="e.g., MPC, CEC, etc.."
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Board: </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.intermediate_degree}
                                                onChange={(e) => handleInputChange('intermediate_degree', e.target.value)}
                                                placeholder="e.g., AP intermidiate board, etc.."
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <h6>School: </h6>
                                        <div className="col-12 mb-3">
                                            <label className="form-label">School name: </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.school_name}
                                                onChange={(e) => handleInputChange('school_name', e.target.value)}
                                                placeholder="Enter school name"
                                            />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Year: </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.school_year}
                                                onChange={(e) => handleInputChange('school_year', e.target.value)}
                                                placeholder="e.g., 2016-2020"
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Qualification: </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.school_qualification}
                                                onChange={(e) => handleInputChange('school_qualification', e.target.value)}
                                                placeholder="e.g., SSC, CBSE"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Marks/CGPA:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.school_marks}
                                                onChange={(e) => handleInputChange('school_marks', e.target.value)}
                                                placeholder="e.g., 583, 8.3, etc.."
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Board: </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.school_degree}
                                                onChange={(e) => handleInputChange('school_degree', e.target.value)}
                                                placeholder="e.g., AP Secondary board, etc.."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Experience Section - Dynamic */}
                            <div className="form-section card mb-4">
                                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Experience</h5>
                                    <button className="btn btn-sm btn-dark" onClick={addExperience}>
                                        <FaPlus className="me-1" /> Add
                                    </button>
                                </div>
                                <div className="card-body">
                                    {formData.experiences.map((exp, index) => (
                                        <div key={exp.id} className="experience-item card mb-3">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <h6 className="mb-0">Experience {index + 1}</h6>
                                                    <button
                                                        className="btn btn-sm btn-outline-dark"
                                                        onClick={() => removeExperience(exp.id)}
                                                    >
                                                        <FaTrash className="text-dark" />
                                                    </button>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label">Job Title *</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={exp.title}
                                                            onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                                                            placeholder="e.g., Senior Developer"
                                                        />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label">Company *</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={exp.company}
                                                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                                            placeholder="Company name"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label">Role</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={exp.role}
                                                            onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                                                            placeholder="Your role"
                                                        />
                                                    </div>
                                                    <div className="col-md-3 mb-3">
                                                        <label className="form-label">Start Date</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={exp.startDate}
                                                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                                            placeholder="MM/YYYY"
                                                        />
                                                    </div>
                                                    <div className="col-md-3 mb-3">
                                                        <label className="form-label">End Date</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={exp.endDate}
                                                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                                            placeholder="MM/YYYY or Present"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">Description</label>
                                                    <textarea
                                                        className="form-control"
                                                        rows="3"
                                                        value={exp.description}
                                                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                                        placeholder="Describe your responsibilities and achievements"
                                                    />
                                                </div>

                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id={`current-${exp.id}`}
                                                        checked={exp.current}
                                                        onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                                                    />
                                                    <label className="form-check-label" htmlFor={`current-${exp.id}`}>
                                                        I currently work here
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {formData.experiences.length === 0 && (
                                        <div className="text-center py-3">
                                            <p className="text-muted">No experience added yet.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Projects Section */}
                            <div className="form-section card mb-4">
                                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Projects</h5>
                                    <button className="btn btn-sm btn-dark" onClick={addProject}>
                                        <FaPlus className="me-1" /> Add
                                    </button>
                                </div>
                                <div className="card-body">
                                    {formData.projects.map((project, index) => (
                                        <div key={project.id} className="project-item card mb-3">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <h6 className="mb-0">Project {index + 1}</h6>
                                                    <button
                                                        className="btn btn-sm btn-outline-dark"
                                                        onClick={() => removeProject(project.id)}
                                                    >
                                                        <FaTrash className='text-dark' />
                                                    </button>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label">Project Name *</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={project.name}
                                                            onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                                                            placeholder="e.g., E-commerce Website"
                                                        />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label">Project Link</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={project.link}
                                                            onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                                                            placeholder="GitHub or Live Demo URL"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">Description *</label>
                                                    <textarea
                                                        className="form-control"
                                                        rows="3"
                                                        value={project.description}
                                                        onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                                                        placeholder="Describe the project, technologies used, and your contributions"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {formData.projects.length === 0 && (
                                        <div className="text-center py-3">
                                            <p className="text-muted">No projects added yet.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Certificates Section */}
                            <div className="form-section card mb-4">
                                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Certificates</h5>
                                    <button className="btn btn-sm btn-dark" onClick={addCertificate}>
                                        <FaPlus className="me-1" /> Add
                                    </button>
                                </div>
                                <div className="card-body">
                                    {formData.certificates.map((cert, index) => (
                                        <div key={cert.id} className="certificate-item card mb-3">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <h6 className="mb-0">Certificate {index + 1}</h6>
                                                    <button
                                                        className="btn btn-sm btn-outline-dark"
                                                        onClick={() => removeCertificate(cert.id)}
                                                    >
                                                        <FaTrash className="text-dark" />
                                                    </button>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label">Certificate Name *</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={cert.name}
                                                            onChange={(e) => updateCertificate(cert.id, 'name', e.target.value)}
                                                            placeholder="e.g., AWS Certified Solutions Architect"
                                                        />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label">Certificate Link</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={cert.link}
                                                            onChange={(e) => updateCertificate(cert.id, 'link', e.target.value)}
                                                            placeholder="Verification URL or Credential ID"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {formData.certificates.length === 0 && (
                                        <div className="text-center py-3">
                                            <p className="text-muted">No certificates added yet.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Achievements Section */}
                            <div className="form-section card mb-4">
                                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Achievements</h5>
                                    <button className="btn btn-sm btn-dark" onClick={addAchievement}>
                                        <FaPlus className="me-1" /> Add
                                    </button>
                                </div>
                                <div className="card-body">
                                    {formData.achievements.map((achievement, index) => (
                                        <div key={index} className="achievement-item card mb-3">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <h6 className="mb-0">Achievement {index + 1}</h6>
                                                    <button
                                                        className="btn btn-sm btn-outline-dark"
                                                        onClick={() => removeAchievement(index)}
                                                    >
                                                        <FaTrash className="text-dark" />
                                                    </button>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">Achievement Description *</label>
                                                    <textarea
                                                        className="form-control"
                                                        rows="2"
                                                        value={achievement}
                                                        onChange={(e) => updateAchievement(index, e.target.value)}
                                                        placeholder="e.g., Won 1st prize in National Hackathon 2023"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {formData.achievements.length === 0 && (
                                        <div className="text-center py-3">
                                            <p className="text-muted">No achievements added yet.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="d-grid gap-2">
                                <button className="btn btn-dark btn-lg" onClick={handleSaveAndGenerateResume}>
                                    <FaSave className="me-2" /> Save & Generate Templates
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Preview */}
                    <div className="col-lg-7">
                        <div className="preview-panel col-12">
                            <div className="col-11 preview-header d-flex justify-content-between align-items-center mb-4">
                                <h3 className="fw-bold">Live Preview</h3>
                                {/* Pass formData and selectedTemplate to ResumePreviewModal */}
                                <button
                                    className="btn btn-outline-dark d-none d-md-block"
                                    onClick={handleFullScreenPreview}
                                    title="Open fullscreen preview"
                                >
                                    <MdOutlineZoomOutMap style={{ fontSize: "20px", marginLeft: "-5px" }} />
                                    Full Screen
                                </button>
                                <ResumePreviewModal
                                    formData={formData}
                                    selectedTemplate={selectedTemplate}
                                    isOpen={isOpen}
                                    onClose={handleClosePreview}
                                />
                            </div>

                            <div className="preview-container">
                                <ResumePreview
                                    data={formData}
                                    template={selectedTemplate}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerateResume;