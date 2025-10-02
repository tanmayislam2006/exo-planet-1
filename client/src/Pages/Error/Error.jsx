import React from "react";
import ErrorImg from "../../assets/error.svg";
import { useNavigate } from "react-router";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6 bg-gray-100">
      <img src={ErrorImg} alt="Error" className="w-64 h-64 md:w-80 md:h-80  mb-6" />
      <h1 className="text-4xl font-bold text-primary mb-4">
        Oops! Something Went Wrong
      </h1>
      <p className="text-gray-600 mb-6">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-primary cursor-pointer text-white px-6 py-2 rounded-md"
      >
        Go Home
      </button>
    </div>
  );
};

export default Error;
