import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { URLShortener } from "../components/URLShortener";
import { Link2, LogOut } from "lucide-react";
import { URLShortened } from "../types";
import axiosInstance from '../utils/apiConnect';
import { URLAdminList } from "../components/URLAdminList";

const AdminPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [urls, setUrls] = useState<URLShortened[]>([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const isFetching = location.state?.isFetching || false;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchURLs = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/urls/allurls');
      setUrls(response.data);
      console.log("URLs fetched", response.data);
    } catch (error) {
      console.error("Failed to fetch URLs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFetching || urls.length === 0) fetchURLs();
  }, [isFetching]);
  

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 sm:px-6 lg:px-8 h-full flex items-center justify-between ">
          <div className="flex items-center space-x-2">
            <Link2 className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-xl text-gray-900">
              URL Shortener Admin
            </span>
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
          <URLShortener onURLShortened={fetchURLs} />
          <URLAdminList urls={urls} loading={loading} onRefresh={fetchURLs} onDelete={fetchURLs}/>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
