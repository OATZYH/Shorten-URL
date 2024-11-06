import React from 'react';
import { URLShortened } from '../types';
import { ExternalLink, Copy } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface URLListProps {
  urls: URLShortened[];
}

export const URLList: React.FC<URLListProps> = ({ urls }) => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  if (urls.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No shortened URLs found in database.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {urls.map((url) => (
        <div
          key={url.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-900 truncate max-w-[70%]">
              {url.originalUrl}
            </h3>
            <span className="text-sm text-gray-500">
              {new Date(url.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-blue-600 font-medium">{url.shortUrl}</span>
              <button
                onClick={() => copyToClipboard(url.shortUrl)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Copy className="h-4 w-4 text-gray-500" />
              </button>
              <a
                href={url.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ExternalLink className="h-4 w-4 text-gray-500" />
              </a>
            </div>
            <span className="text-sm text-gray-500">{url.clicks} clicks</span>
          </div>
        </div>
      ))}
    </div>
  );
};