import React from 'react';
import { AuthForm } from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/dashboard', { state: { isFetching: true } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 md:px-8">
      <div className="w-full md:max-w-96 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <AuthForm type="register" onSuccess={handleSuccess} />
        <div className="mt-4 text-center">
          <button
            onClick={() => window.location.href = '/login'}
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            Already have an account? Log in
          </button>
          </div>
      </div>
    </div>
  );
};

export default RegisterPage;
