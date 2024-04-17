import React, { createContext, useContext, useState } from 'react';
import AuthService from '../services/authService'; // Adjust the path to where AuthService is located

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await AuthService.login(email, password);
            if (response) {
                setIsAuthenticated(true);
                setUser(response); // Assuming the response contains user data
            }
        } catch (error) {
            console.error('Login error:', error);
            setIsAuthenticated(false);
            setUser(null);
            throw error; // Throw error to be handled by the calling component
        }
    };

    const logout = () => {
        AuthService.logout();
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
