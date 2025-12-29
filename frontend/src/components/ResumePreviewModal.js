import React, { useEffect } from 'react';
import { MdOutlineZoomOutMap, MdOutlineZoomInMap } from "react-icons/md";
import ResumePreview from './ResumePreview'; // Import your ResumePreview component
import './ResumePreview.css';

const ResumePreviewModal = ({ formData, selectedTemplate, isOpen, onClose }) => {

    // Handle ESC key + body scroll
    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscKey);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscKey);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fullscreen-modal">
            <div className="modal-content">
                <div className="fullscreen-preview">
                    <ResumePreview data={formData} template={selectedTemplate} />
                </div>
            </div>

            <div className="modal-footer">
                <button className="btn btn-dark" onClick={onClose}>
                    <MdOutlineZoomInMap style={{ fontSize: "20px", marginLeft: "-5px" }} />
                    {" "}
                    Close Preview
                </button>
            </div>
        </div>
    );
};

export default ResumePreviewModal;
