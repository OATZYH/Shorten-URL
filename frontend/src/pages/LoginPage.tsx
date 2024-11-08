import React from "react";
import { AuthForm } from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/dashboard", { state: { isFetching: true } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 md:px-8">
      <div className="w-full md:max-w-96 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-md">
          <p className="font-medium">Demo Credentials:</p>
          <p>Username: Sarun</p>
          <p>Password: Sarun_password</p>
        </div>
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          <p className="font-medium">Admin Credentials:</p>
          <p>Username: Admin</p>
          <p>Password: Admin_password</p>
        </div>
        <AuthForm type="login" onSuccess={handleSuccess} />
        <div className="mt-4 text-center">
          <button
            onClick={() => window.location.href = '/register'}
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            Don't have an account? Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
