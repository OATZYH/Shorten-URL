// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectIfAuth from "./components/RedirectIfAuth";
import { Toaster } from "react-hot-toast";
import RedirectPage from "./pages/RedirectPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminPage from "./pages/AdminPage";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Toaster />
        <Routes>
          {/* Public Routes */}
          <Route element={<RedirectIfAuth />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Default Route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />

          {/* Admin Protected Routes */}
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          {/* Unauthorized and Not Found Routes */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Redirect */}
          <Route path="/:short_code" element={<RedirectPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
