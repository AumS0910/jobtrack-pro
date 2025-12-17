// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import Signup from './pages/SignUp.tsx'
import { AuthProvider, useAuth } from './context/AuthContext.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { JobProvider } from './context/JobContext.tsx'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <JobProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <App />
                </ProtectedRoute>
              } />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </JobProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
