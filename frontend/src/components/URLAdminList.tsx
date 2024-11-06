import { URLShortened } from "../types";
import { ExternalLink, Copy, RotateCcw, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import axiosInstance from "../utils/apiConnect";

interface URLListProps {
  urls: URLShortened[];
  onRefresh: () => void;
  loading: boolean;
  onDelete: () => void;
}

export function URLAdminList({
  urls,
  onRefresh,
  loading,
  onDelete,
}: URLListProps) {
  const shortUrlBase = import.meta.env.VITE_BASE_URL;

  function combineURL(short_code: string) {
    return `${shortUrlBase || "http://localhost:5173"}/${short_code}`;
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const handleDelete = async (url_id: string) => {
    if (window.confirm("Are you sure you want to delete this URL?")) {
      try {
        await axiosInstance.delete(`/urls/${url_id}`);
        toast.success("URL deleted successfully");
      } catch (error) {
        toast.error("Failed to delete URL");
      } finally {
        onDelete();
      }
    }
  };

  if (urls.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No shortened URLs found in database.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8 h-96">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="self-end">
        <button className="btn btn-sm" onClick={onRefresh}>
          Refresh
          <RotateCcw className="h-4 w-4 text-gray-500" />
        </button>
      </div>
      <div className="w-full space-y-4">
        {urls.map((item) => (
          <div
            key={item.url_id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900 truncate max-w-[70%]">
                {item.long_url}
              </h3>
              <span className="text-sm text-gray-500">
                Created by : {item.username}
                <span className="text-sm text-gray-500 ml-4">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-blue-600 font-medium">
                  {combineURL(item.short_code)}
                </span>
                <div className="tooltip" data-tip="Copy to clipboard">
                  <button
                    onClick={() => copyToClipboard(combineURL(item.short_code))}
                    className="btn btn-circle btn-sm"
                  >
                    <Copy className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
                <div className="tooltip" data-tip="Open short link">
                  <button
                    className="btn btn-circle btn-sm"
                    onClick={() => {
                      window.open(combineURL(item.short_code), "_blank");
                    }}
                  >
                    <ExternalLink className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
                <div className="tooltip" data-tip="Delete">
                  <button
                    className="btn btn-circle btn-sm btn-error"
                    onClick={() => handleDelete(item.url_id)}
                  >
                    <Trash className="h-4 w-4 " />
                  </button>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {item.click_count} clicks
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
