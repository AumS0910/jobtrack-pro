import React, { createContext, useContext, useState, useEffect, use } from "react";

interface User {
    name: string;
    email: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const userData = localStorage.getItem("userData");
        if (token && userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
        }
    }, []);


    const login = async (email: string, password: string): Promise<boolean> => {
        if (email && password) {
            const mockUser = { name: "John Doe", email: email };
            localStorage.setItem("authToken", "mock-token");
            localStorage.setItem("userData", JSON.stringify(mockUser));
            setIsAuthenticated(true);
            setUser(mockUser);
            return true;
        }
        return false;
    };
    const signup = async (email: string, password: string): Promise<boolean> => {
        // Mock signup - replace with real API call
        if (email && password) {
            const mockUser = { name: "New User", email };
            localStorage.setItem("authToken", "mock-token");
            localStorage.setItem("userData", JSON.stringify(mockUser));
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        setIsAuthenticated(false);
        setUser(null);
    };

    const updateUser = (updatedUser: User) => {
        setUser(updatedUser);
        localStorage.setItem("userData", JSON.stringify(updatedUser));
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside an AuthProvider")
    return ctx;
}