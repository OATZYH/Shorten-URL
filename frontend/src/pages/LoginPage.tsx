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
            onClick={() => (window.location.href = "/register")}
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            Don't have an account? Sign up
          </button>
        </div>
        <div className="mt-4 text-center">
          <button
            className="bg-white flex w-full items-center text-gray-700 justify-center gap-x-3 text-sm sm:text-base  rounded-lg hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5"
            onClick={() =>
              // open link in new tab
              window.open(
                "https://quill-nation-cf8.notion.site/Test-136eb45ca445808eb967f6bbd4dd8e91?pvs=4"
              )
            }
          >
            <svg
              className="w-6 h-6 sm:h-6 sm:w-6"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M3.25781 3.11684C3.67771 3.45796 3.83523 3.43193 4.62369 3.37933L12.0571 2.93299C12.2147 2.93299 12.0836 2.77571 12.0311 2.74957L10.7965 1.85711C10.56 1.67347 10.2448 1.46315 9.64083 1.51576L2.44308 2.04074C2.18059 2.06677 2.12815 2.19801 2.2327 2.30322L3.25781 3.11684ZM3.7041 4.84917V12.6704C3.7041 13.0907 3.91415 13.248 4.38693 13.222L12.5562 12.7493C13.0292 12.7233 13.0819 12.4341 13.0819 12.0927V4.32397C13.0819 3.98306 12.9508 3.79921 12.6612 3.82545L4.12422 4.32397C3.80918 4.35044 3.7041 4.50803 3.7041 4.84917ZM11.7688 5.26872C11.8212 5.50518 11.7688 5.74142 11.5319 5.76799L11.1383 5.84641V11.6205C10.7965 11.8042 10.4814 11.9092 10.2188 11.9092C9.79835 11.9092 9.69305 11.7779 9.37812 11.3844L6.80345 7.34249V11.2532L7.61816 11.437C7.61816 11.437 7.61816 11.9092 6.96086 11.9092L5.14879 12.0143C5.09615 11.9092 5.14879 11.647 5.33259 11.5944L5.80546 11.4634V6.29276L5.1489 6.24015C5.09625 6.00369 5.22739 5.66278 5.5954 5.63631L7.53935 5.50528L10.2188 9.5998V5.97765L9.53564 5.89924C9.4832 5.61018 9.69305 5.40028 9.95576 5.37425L11.7688 5.26872ZM1.83874 1.33212L9.32557 0.780787C10.245 0.701932 10.4815 0.754753 11.0594 1.17452L13.4492 2.85424C13.8436 3.14309 13.975 3.22173 13.975 3.53661V12.7493C13.975 13.3266 13.7647 13.6681 13.0293 13.7203L4.33492 14.2454C3.78291 14.2717 3.52019 14.193 3.23111 13.8253L1.47116 11.5419C1.1558 11.1216 1.02466 10.8071 1.02466 10.4392V2.25041C1.02466 1.77825 1.23504 1.38441 1.83874 1.33212Z"
                  fill="#000000"
                ></path>{" "}
              </g>
            </svg>
            <span>How this work?</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
