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

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
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

          {/* Redirect */}
          <Route path="/:short_code" element={<RedirectPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
