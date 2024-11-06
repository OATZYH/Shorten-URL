import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RedirectPage: React.FC = () => {
  const { short_code } = useParams<{ short_code: string }>();
  const [error, setError] = useState<string | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchLongUrl = async () => {
      try {
        const response = await axios.get(
          `${apiUrl || "http://localhost:5000/api"}/urls/${short_code}`
        );
        const longUrl = response.data.long_url;
        window.location.href = longUrl;
      } catch (err) {
        console.error("Error fetching long URL:", err);
        setError("The short URL is invalid or has expired.");
      }
    };

    fetchLongUrl();
  }, [short_code]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="md:min-w-96 p-6 bg-white rounded-lg shadow-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="md:min-w-96 p-6 bg-white rounded-lg shadow-lg">
        Keep calm, redirecting you to the long URL...
      </div>
    </div>
  );
};

export default RedirectPage;
