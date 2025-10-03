// components/Navbar.jsx
import React from 'react';
import { User, LogOut, Rocket } from 'lucide-react';

const Navbar = ({ title, user, onLogout }) => {
  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/30 p-6 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
          <Rocket className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-extrabold">
          <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
          <User className="w-5 h-5 text-white" />
          <span className="text-white">{user?.name || 'Researcher'}</span>
        </div>
        <button 
          onClick={onLogout}
          className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full border border-white/30 hover:bg-white/30 transition duration-300 flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;