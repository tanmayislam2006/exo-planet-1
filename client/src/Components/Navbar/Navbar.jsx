import React, { use, useState } from "react";
import { FaReact, FaChartBar, FaBrain, FaUser, FaBars, FaTimes } from "react-icons/fa";
import AuthContext from "../../Context/AuthContext";
import { Link } from "react-router";

const Button = ({ children, className = "" }) => {
  return (
    <button
      className={`px-3 py-1.5 rounded-full border border-transparent text-sm font-medium transition-all ${className}`}
    >
      {children}
    </button>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {firebaseUser}=use(AuthContext)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#071028]/95 backdrop-blur-sm border-b border-[#1a2440] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 flex items-center justify-center shadow-md">
              <FaReact className="w-6 h-6 text-white animate-spin-slow" />
            </div>
            <span className="text-lg font-semibold text-white">
              ExoPlanet AI
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/ "
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-500 text-white shadow-md"
            >
              <span className="text-sm font-medium">Home</span>
            </Link>

            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-[#cbd5e1] hover:text-white hover:bg-[#0f1a33] transition-colors"
            >
              <FaChartBar className="w-4 h-4" />
              <span className="text-sm">Dashboard</span>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Button className="flex items-center gap-2 border border-purple-600 text-purple-100 px-3 py-1">
                <FaUser className="w-4 h-4" />
                <span className="hidden sm:inline">Scientist</span>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-[#cbd5e1] hover:text-white hover:bg-[#0f1a33] focus:outline-none"
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
            >
              {open ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${open ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-[#071028]">
          <a
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-500 text-white shadow-md mx-3"
          >
            <span className="text-sm font-medium">Home</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-[#cbd5e1] hover:text-white hover:bg-[#0f1a33] transition-colors mx-3"
          >
            <FaChartBar className="w-4 h-4" />
            <span className="text-sm">Dashboard</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-[#cbd5e1] hover:text-white hover:bg-[#0f1a33] transition-colors mx-3"
          >
            <FaBrain className="w-4 h-4" />
            <span className="text-sm">AI Predictor</span>
          </a>
          <div className="border-t border-[#13203a] mt-2 pt-3 mx-3">
            <a className="flex items-center gap-2 px-3 py-2 rounded-full border border-purple-600 text-purple-100" href="#">
              <FaUser className="w-4 h-4" /> <span>Scientist</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
