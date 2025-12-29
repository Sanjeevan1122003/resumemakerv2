// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './dashboard/DashboardLayout';
import Dashboard from './dashboard/Dashboard';
import Templates from './dashboard/Templates';
import Resumes from './dashboard/Resumes';
import GenerateResume from './pages/GenerateResume';
import UploadResume from './pages/UploadResume';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
          <Route path="resumes" element={<ProtectedRoute><Resumes /></ProtectedRoute>} />
        </Route>

        <Route path="/generate-resume" element={
          <ProtectedRoute>
            <GenerateResume />
            // </ProtectedRoute>
        } />

        <Route path="/upload-resume" element={
          <ProtectedRoute>
            <UploadResume />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;