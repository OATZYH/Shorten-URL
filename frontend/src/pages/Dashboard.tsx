import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { URLShortener } from '../components/URLShortener';
import { URLList } from '../components/URLList';
import { Link2, LogOut } from 'lucide-react';

const mockUrls = [
  {
    id: '1',
    originalUrl: 'https://example.com/very/long/url/that/needs/shortening',
    shortUrl: 'https://short.url/abc123',
    clicks: 42,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    originalUrl: 'https://another-example.com/path/to/resource',
    shortUrl: 'https://short.url/xyz789',
    clicks: 17,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];
const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
     console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
    <nav className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-4 sm:px-6 lg:px-8 h-full flex items-center justify-between ">
        <div className="flex items-center space-x-2">
          <Link2 className="h-6 w-6 text-blue-600" />
          <span className="font-semibold text-xl text-gray-900">URL Shortener</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Username : {user?.username}</span>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
                      
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>

    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <URLShortener onURLShortened={() => {}} />
        <URLList urls={mockUrls} />
      </div>
    </main>
  </div>
  );
};

export default Dashboard;
