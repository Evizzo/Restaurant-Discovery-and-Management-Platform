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
