import React from "react";
import { useAuth } from '../api/AuthContex';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const authContext = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const isLoggedIn = await authContext.login();
      if (isLoggedIn) {
        navigate("/")
      }
    };

    fetchData();
  }, [authContext.login]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#D1A373] to-[#8B5A2B]">
      <h1 className="font-semibold text-4xl mb-8">Prijavite se pomoću</h1>
      <div className="flex flex-col gap-4">
        {/* <button className="flex items-center justify-center w-64 h-12 bg-blue-500 text-white rounded-md shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 12a5 5 0 11-10 0 5 5 0 0110 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 12a5 5 0 11-10 0 5 5 0 0110 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12a9 9 0 0118 0M12 3v6m0 12v-6m-6 6h12" />
          </svg>
          Facebook
        </button>
        <button className="flex items-center justify-center w-64 h-12 bg-gradient-to-r from-[#C13584] to-[#FD1D1D] text-white rounded-md shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm3 12.77h-1.91c.24 1.54-.23 3.06-1.15 4.3h1.34l.57-3.58h-1.28c-.06-.33-.15-.66-.25-1h1.22l.47-2.77h-1.75c-.75-1.97-2.45-3.4-4.55-3.4-2.73 0-4.95 2.32-4.95 5.18s2.22 5.18 4.95 5.18c1.29 0 2.43-.5 3.29-1.31l2.24 2.26c-1.23 1.26-2.81 2.02-4.53 2.02-3.6 0-6.53-3.06-6.53-6.83s2.93-6.83 6.53-6.83c3.26 0 5.69 2.35 5.69 5.62v.65z" />
          </svg>
          Instagram
        </button> */}
        <a href="http://localhost:8080/oauth2/authorization/google">
        <button className="flex items-center justify-center w-64 h-12 bg-white text-gray-700 rounded-md shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Google
        </button></a>
      </div>
    </div>
  );
};

export default LoginPage;
