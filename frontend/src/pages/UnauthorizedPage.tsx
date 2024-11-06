import React from "react";

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center justify-center min-h-screen">
      <h1>403 - Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <div className="flex flex-col p-4  w-[50%] space-y-4 items-center">
        <a href="/admin" className="px-3 py-2 bg-green-100 text-green-700 w-fit">For admin : Admin page</a>
        <a href="/dashboard" className="px-3 py-2 bg-blue-50 text-blue-700 w-fit">For user : User page</a>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
