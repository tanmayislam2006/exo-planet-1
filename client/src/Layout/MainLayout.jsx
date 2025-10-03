import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="bg-gradient-to-b from-[#0a1a2d] to-[#071028] min-h-screen text-white">
      <Navbar />
      <div className="min-h-[calc(100vh-200px)]">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
