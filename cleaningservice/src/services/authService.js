import axios from 'axios';

// Define the base URL for all authentication-related requests
const API_URL = 'http://localhost:5001/api';

// Function to perform the login
const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        if (response.status === 200) {
            // Assuming the server responds with some token or user data that you want to store in local storage
            localStorage.setItem('user', JSON.stringify(response.data));
            return response.data;
        }else {
            // Create a specific error message based on the response status
            throw new Error(`Login failed with status: ${response.status}`);
        }
    } catch (error) {
        // Re-throw the error to be handled by the caller (AuthContext)
        throw error;
    }
};
// Function to perform the logout
const logout = () => {
    // Remove user data from local storage to log user out
    localStorage.removeItem('user');
};

export default {
    login,
    logout
};
