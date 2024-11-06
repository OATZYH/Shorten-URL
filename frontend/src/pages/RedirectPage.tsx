import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RedirectPage: React.FC = () => {
  const { short_code } = useParams<{ short_code: string }>();
  const [error, setError] = useState<string | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchLongUrl = async () => {
      try {
        const response = await axios.get(
          `${apiUrl || 'http://localhost:5000/api'}/urls/${short_code}`
        );
        const longUrl = response.data.long_url;
        window.location.href = longUrl;
      } catch (err) {
        console.error('Error fetching long URL:', err);
        setError('The short URL is invalid or has expired.');
      }
    };

    fetchLongUrl();
  }, [short_code]);

  if (error) {
    return <div>{error}</div>;
  }

  return <div>Redirecting...</div>;
};

export default RedirectPage;
