import React, { createContext, useContext, useState, useEffect, use } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);


    const login = async (email: string, password: string): Promise<boolean> => {
        if (email && password) {
            localStorage.setItem("authToken", "mock-token");
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };
    const signup = async (email: string, password: string): Promise<boolean> => {
        // Mock signup - replace with real API call
        if (email && password) {
            localStorage.setItem("authToken", "mock-token");
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside an AuthProvider")
    return ctx;
}