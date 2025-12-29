import axios from 'axios'
import Cookies from 'js-cookie'

const api = process.env.REACT_APP_API_URL || 'http://localhost:5001'

const apiService = axios.create({
    baseURL: api,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Add token to requests if it exists
apiService.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Handle response errors (like token expiry)
apiService.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            Cookies.remove('token')
            // Optional: redirect to login page
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

// Authentication APIs
export const authAPI = {
    signup: async (userData) => {
        try {
            const response = await apiService.post('/usersignup', userData)
            return response.data
        } catch (error) {
            throw error.response?.data || { error: 'Signup failed' }
        }
    },

    login: async (credentials) => {
        try {
            const response = await apiService.post('/userlogin', credentials)
            if (response.data.token) {
                Cookies.set('token', response.data.token, {
                    sameSite: "lax",
                    path: "/",
                    expires: 90,
                })
            }
            if (response.data.userEmail) {
                Cookies.set('user_email', response.data.userEmail, {
                    sameSite: "lax",
                    path: "/",
                    expires: 90,
                })
            }
            return response.data
        } catch (error) {
            throw error.response?.data || { error: 'Login failed' }
        }
    },

    logout: () => {
        Cookies.remove('token')
        Cookies.remove('user')
    },

    getToken: () => {
        return Cookies.get('token')
    },

    isAuthenticated: () => {
        return !!Cookies.get('token')
    }
}

// User APIs
export const userAPI = {
    getUserDetails: async () => {
        try {
            const response = await apiService.get('/userdetails')
            return response.data
        } catch (error) {
            throw error.response?.data || { error: 'Failed to fetch user details' }
        }
    },

}

// Resume APIs
export const resumeAPI = {
    saveResumeData: async (resumeData) => {
        try {
            const response = await apiService.post('/resumedata', resumeData)
            return response.data
        } catch (error) {
            throw error.response?.data || { error: 'Failed to save resume data' }
        }
    },

    getResumeData: async () => {
        try {
            const response = await apiService.get('/userresumedata')
            return response.data
        } catch (error) {
            throw error.response?.data || { error: 'Failed to fetch resume data' }
        }
    },

    getResumeDetails: async () => {
        try {
            const response = await apiService.get('/userresumesdetails')
            return response.data.data
        }
        catch (error) {
            throw error.response?.data || { error: 'Failed to fetch resume count' }
        }
    },

    getUsersResumes: async () => {
        try {
            const response = await apiService.get('/resumesdata')
            return response.data.data
        }
        catch (error) {
            throw error.response?.data || { error: 'Failed to fetch resume count' }
        }
    },

    getResume: async ({ name, template, resumeId }) => {
        try {
            const response = await apiService.get(
                `/resume`,
                {
                    params: { name, template, resumeId }
                });
            return response.data
        }
        catch (error) {
            throw error.response?.data || { error: 'Failed to fetch resume' }
        }
    },

    deleteResume: async ({ resumeId }) => {
        try {
            const response = await apiService.delete(`/delresume/${resumeId}`);
            return response.data;
        } catch (error) {
            throw (
                error.response?.data || {
                    error: "Failed to delete resume",
                }
            );
        }
    }



    // // Helper function to format resume data before sending
    // formatResumeData: (data) => {
    //     return {
    //         fullname: data.fullname || '',
    //         phone_number: data.phone_number || '',
    //         email: data.email || '',
    //         job_role: data.job_role || '',

    //         // Education
    //         school_name: data.school_name || '',
    //         school_marks: data.school_marks || '',
    //         school_year: data.school_year || '',
    //         school_degree: data.school_degree || '',

    //         intermediate_name: data.intermediate_name || '',
    //         intermediate_degree: data.intermediate_degree || '',
    //         intermediate_course: data.intermediate_course || '',
    //         intermediate_marks: data.intermediate_marks || '',
    //         intermediate_year: data.intermediate_year || '',

    //         college_name: data.college_name || '',
    //         college_degree: data.college_degree || '',
    //         college_course: data.college_course || '',
    //         college_marks: data.college_marks || '',
    //         college_year: data.college_year || '',

    //         // Skills & Links
    //         softSkills: Array.isArray(data.softSkills) ? data.softSkills : [],
    //         technicalSkills: Array.isArray(data.technicalSkills) ? data.technicalSkills : [],
    //         linkedin_Link: data.linkedin_Link || data.linkedinLink || '',

    //         // Arrays (ensure they are arrays)
    //         achievements: Array.isArray(data.achievements) ? data.achievements : [],
    //         certificates: Array.isArray(data.certificates) ? data.certificates : [],
    //         experiences: Array.isArray(data.experiences) ? data.experiences : [],
    //         projects: Array.isArray(data.projects) ? data.projects : []
    //     }
    // }
}

// Utility functions
export const apiUtils = {
    // Test API connection
    testConnection: async () => {
        try {
            const response = await apiService.get('/')
            return response.data
        } catch (error) {
            console.error('API Connection Error:', error)
            return null
        }
    },

    // Set auth token manually (useful after signup)
    setAuthToken: (token) => {
        if (token) {
            Cookies.set('token', token)
            apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`
        } else {
            Cookies.remove('token')
            delete apiService.defaults.headers.common['Authorization']
        }
    },

    // Clear all auth data
    clearAuth: () => {
        Cookies.remove('token')
        Cookies.remove('user')
        delete apiService.defaults.headers.common['Authorization']
    }
}

// Export axios instance for custom requests
export { apiService }

// Default export for backward compatibility
export default apiService