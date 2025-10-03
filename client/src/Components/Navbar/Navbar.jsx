import React, { useContext, useState, useRef, useEffect } from "react";
import { FaReact, FaChartBar, FaBrain, FaUser, FaBars, FaTimes, FaSignOutAlt, FaTachometerAlt, FaChevronDown } from "react-icons/fa";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { firebaseUser, logoutUser } = useContext(AuthContext);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    setDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#071028]/95 backdrop-blur-sm border-b border-[#1a2440] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 flex items-center justify-center shadow-md">
                <FaReact className="w-6 h-6 text-white animate-spin-slow" />
              </div>
              <span className="text-lg font-semibold text-white">
                ExoPlanet AI
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-500 text-white shadow-md hover:shadow-lg transition-all"
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
            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-purple-600 text-purple-100 hover:bg-purple-600/20 transition-all duration-200"
              >
                <FaUser className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {firebaseUser?.email?.split('@')[0] || 'User'}
                </span>
                <FaChevronDown 
                  className={`w-3 h-3 transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#0f1a33] border border-[#1a2440] rounded-lg shadow-2xl backdrop-blur-lg py-1 z-50">
                  {/* User Info */}
                  <div className="px-4 py-2 border-b border-[#1a2440]">
                    <p className="text-sm text-white font-medium truncate">
                      {firebaseUser?.email?.split('@')[0] || 'User'}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {firebaseUser?.email || 'user@example.com'}
                    </p>
                  </div>

                  {/* Dashboard Link */}
                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-[#cbd5e1] hover:bg-[#13203a] hover:text-white transition-colors"
                  >
                    <FaTachometerAlt className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-[#cbd5e1] hover:text-white hover:bg-[#0f1a33] focus:outline-none transition-colors"
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
        <div className="px-2 pt-2 pb-3 space-y-1 bg-[#071028] border-t border-[#1a2440]">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-500 text-white shadow-md mx-3"
          >
            <span className="text-sm font-medium">Home</span>
          </Link>
          
          <Link
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-[#cbd5e1] hover:text-white hover:bg-[#0f1a33] transition-colors mx-3"
          >
            <FaChartBar className="w-4 h-4" />
            <span className="text-sm">Dashboard</span>
          </Link>
          
          <Link
            to="/predict"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-[#cbd5e1] hover:text-white hover:bg-[#0f1a33] transition-colors mx-3"
          >
            <FaBrain className="w-4 h-4" />
            <span className="text-sm">AI Predictor</span>
          </Link>

          {/* Mobile User Section */}
          <div className="border-t border-[#13203a] mt-2 pt-3 mx-3 space-y-2">
            <div className="px-3 py-2">
              <p className="text-sm text-white font-medium">
                {firebaseUser?.email?.split('@')[0] || 'User'}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {firebaseUser?.email || 'user@example.com'}
              </p>
            </div>
            
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-[#cbd5e1] hover:text-white hover:bg-[#0f1a33] transition-colors"
            >
              <FaTachometerAlt className="w-4 h-4" />
              <span className="text-sm">Dashboard</span>
            </Link>
            
            <button
              onClick={() => {
                logoutUser();
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
            >
              <FaSignOutAlt className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;