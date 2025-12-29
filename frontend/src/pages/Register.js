// src/pages/Register.js - MODERN RESPONSIVE VERSION
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaEye,
    FaEyeSlash,
    FaUser,
    FaEnvelope,
    FaLock,
    FaExclamationCircle,
} from 'react-icons/fa';
import './Auth.css';
import { authAPI } from '../service/api'

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await authAPI.signup({
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            navigate('/login');
        } catch (error) {
            if (error.message) {
                setError(error.message);
            } else if (error.error) {
                setError(error.error);
            } else {
                setError('Register failed. Please try again');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page min-vh-100 d-flex align-items-center justify-content-center py-3 py-sm-4">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xxl-4 col-xl-8 col-lg-8 col-md-8">
                        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                            <div className="row g-0">
                                <div className="col-12 d-flex flex-column">
                                    <div className="card-body p-3 p-sm-4 p-md-4 p-lg-5">
                                        {/* Logo/Brand Area */}
                                        <div className="text-center mb-2 mb-sm-4 mb-md-4 mb-lg-2">
                                            <div
                                                className="d-inline-flex align-items-center justify-content-center bg-dark rounded-circle mb-3"
                                                style={{
                                                    width: 'clamp(50px, 5vw, 60px)',
                                                    height: 'clamp(50px, 5vw, 60px)'
                                                }}
                                            >
                                                <FaUser className="text-white fs-4" />
                                            </div>
                                            <h1 className="fw-bold text-dark mb-2 fs-3 fs-sm-3 fs-md-2 fs-lg-2">
                                                Create Account
                                            </h1>
                                            <p className="text-muted mb-0 fs-6 fs-sm-6 fs-md-6 fs-lg-5">
                                                Join our community today
                                            </p>
                                        </div>

                                        {/* Error Alert */}
                                        {error && (
                                            <div
                                                className="alert alert-danger alert-dismissible fade show d-flex align-items-center rounded-3 mb-3 mb-sm-4"
                                                role="alert"
                                            >
                                                <FaExclamationCircle className="me-2 flex-shrink-0" />
                                                <div className="flex-grow-1 me-2 me-sm-3 small">
                                                    {error}
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn-close"
                                                    onClick={() => setError('')}
                                                    aria-label="Close"
                                                ></button>
                                            </div>
                                        )}

                                        {/* Form */}
                                        <form onSubmit={handleSubmit} className="mt-1 mt-sm-2">
                                            {/* Username Input */}
                                            <div className="mb-3 mb-sm-3 mb-md-3 mb-lg-2">
                                                <label
                                                    htmlFor="username"
                                                    className="form-label fw-semibold text-dark mb-2 small"
                                                >
                                                    <FaUser className="me-2" />
                                                    Username
                                                </label>
                                                <div className="input-group input-group-lg">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg border-1 border-secondary"
                                                        id="username"
                                                        name="username"
                                                        value={formData.username}
                                                        onChange={handleChange}
                                                        placeholder="Enter your username"
                                                        required
                                                        disabled={loading}
                                                        style={{ fontSize: '0.95rem' }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Email Input */}
                                            <div className="mb-3 mb-sm-3 mb-md-3 mb-lg-2">
                                                <label
                                                    htmlFor="email"
                                                    className="form-label fw-semibold text-dark mb-2 small"
                                                >
                                                    <FaEnvelope className="me-2" />
                                                    Email Address
                                                </label>
                                                <div className="input-group input-group-lg">
                                                    <input
                                                        type="email"
                                                        className="form-control form-control-lg border-1 border-secondary"
                                                        id="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="sanjeevan@example.com"
                                                        required
                                                        disabled={loading}
                                                        style={{ fontSize: '0.95rem' }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Password Input */}
                                            <div className="mb-3 mb-sm-4 mb-md-4 mb-lg-4">
                                                <label
                                                    htmlFor="password"
                                                    className="form-label fw-semibold text-dark mb-2 small"
                                                >
                                                    <FaLock className="me-2" />
                                                    Password
                                                </label>
                                                <div className="input-group input-group-lg">
                                                    <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        className="form-control form-control-lg border-1 border-secondary border-end-0"
                                                        id="password"
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        placeholder="Create a strong password"
                                                        required
                                                        minLength="6"
                                                        disabled={loading}
                                                        style={{ fontSize: '0.95rem' }}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-white border-1 border-secondary border-start-0 d-flex align-items-center justify-content-center"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        disabled={loading}
                                                        style={{
                                                            width: 'clamp(45px, 4vw, 55px)',
                                                            padding: '0.5rem'
                                                        }}
                                                    >
                                                        {showPassword ? (
                                                            <FaEyeSlash className="text-muted fs-6" />
                                                        ) : (
                                                            <FaEye className="text-muted fs-6" />
                                                        )}
                                                    </button>
                                                </div>
                                                <div className="form-text mt-2 small text-muted">
                                                    Password must be at least 6 characters long
                                                </div>
                                            </div>

                                            {/* Terms & Conditions */}
                                            <div className="mb-3 mb-sm-4 mb-md-4 mb-lg-4">
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input border-secondary"
                                                        id="terms"
                                                        required
                                                        disabled={loading}
                                                    />
                                                    <label
                                                        className="form-check-label text-dark ms-2 small"
                                                        htmlFor="terms"
                                                    >
                                                        I agree to submit my data to resume maker
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Submit Button */}
                                            <div className="d-grid mb-3 mb-sm-4 mb-md-4 mb-lg-4">
                                                <button
                                                    type="submit"
                                                    className="btn btn-dark fw-semibold rounded-3"
                                                    disabled={loading}
                                                    style={{
                                                        padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(1rem, 2vw, 1.5rem)',
                                                        fontSize: 'clamp(0.875rem, 1vw, 1rem)'
                                                    }}
                                                >
                                                    {loading ? (
                                                        <>
                                                            <span
                                                                className="spinner-border spinner-border-sm me-2"
                                                                role="status"
                                                                aria-hidden="true"
                                                            ></span>
                                                            Creating Account...
                                                        </>
                                                    ) : (
                                                        'Create Account'
                                                    )}
                                                </button>
                                            </div>

                                            {/* Divider */}
                                            <div className="position-relative my-3 my-sm-3 my-md-4 my-lg-4">
                                                <hr className="text-muted mb-0" />
                                                <div className="position-absolute top-50 start-50 translate-middle px-2 px-sm-3 bg-white">
                                                    <span className="text-muted small">
                                                        or continue with
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Login Link */}
                                            <div className="text-center pt-1 pt-sm-2">
                                                <p className="text-muted mb-0 small">
                                                    Already have an account?{' '}
                                                    <Link
                                                        to="/login"
                                                        className="text-decoration-none text-dark fw-semibold"
                                                    >
                                                        Sign in
                                                    </Link>
                                                </p>
                                            </div>
                                        </form>
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

export default Register;