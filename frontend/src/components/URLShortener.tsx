import React, { useState } from 'react';
import { Link2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import  axiosInstance  from '../utils/apiConnect';

interface URLShortenerProps {
  onURLShortened: () => void;
}

export const URLShortener: React.FC<URLShortenerProps> = ({ onURLShortened }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    try {
      await axiosInstance.post('/urls', { long_url : url });
      toast.success('URL shortened successfully!');
      setUrl('');
    } catch (error) {
      toast.error('Failed to shorten URL');
    } finally {
      setLoading(false);
      onURLShortened();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full px-4 sm:px-6 md:px-8">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your URL to shorten"
            className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
        >
          {loading ? <span className="loading loading-dots loading-md"></span> : 'Shorten'}
        </button>
      </div>
    </form>
  );
};