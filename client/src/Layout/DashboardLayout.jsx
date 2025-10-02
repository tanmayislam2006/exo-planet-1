import React, { useState } from 'react';

// --- Icon Definitions (Mimicking Lucide Icons for single-file compliance) ---

// Hamburger Icon (Menu)
const MenuIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

// Close Icon (X)
const XIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Home Icon (Navigation)
const HomeIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
  </svg>
);

// Users Icon (Citizen Scientist)
const UsersIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20v-2a3 3 0 00-5.356-1.857M17 20h-2m2-2h-2m-2 4h-2M5 13a2 2 0 012-2h2.236a2 2 0 011.832 1.157l1.334 2.668A2 2 0 0015 17h2a2 2 0 002-2v-3a2 2 0 00-2-2m-3.268 4H12m1-4a2 2 0 00-2-2h-2m-3 4a2 2 0 00-2-2H4a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2v-3z" />
  </svg>
);

// Cpu Icon (Researcher)
const CpuIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="5" y="5" width="14" height="14" rx="2" ry="2"></rect>
    <path d="M9 9h6v6H9z"></path>
    <path d="M12 1v2"></path>
    <path d="M12 21v2"></path>
    <path d="M1 12h2"></path>
    <path d="M21 12h2"></path>
    <path d="M4.2 4.2l1.4 1.4"></path>
    <path d="M18.4 18.4l1.4 1.4"></path>
    <path d="M4.2 18.4l1.4-1.4"></path>
    <path d="M18.4 5.6l1.4-1.4"></path>
  </svg>
);

// ClipboardList Icon (Feature)
const ClipboardListIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M10 16h.01" />
  </svg>
);

// Activity Icon (Feature)
const ActivityIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

// --- Component for the main content (The two beautiful cards) ---

const DashboardContent = () => (
  <div className="p-4 sm:p-8">
    <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-white">
        Welcome to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-fuchsia-300">Exo Data Hub</span>
    </h1>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Citizen Scientist Card */}
      <div className="p-8 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 transition duration-500 hover:border-blue-400 hover:scale-[1.02]">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center shadow-lg transition duration-300 group-hover:shadow-2xl">
            <UsersIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Citizen Scientist</h2>
        </div>
        <p className="text-white/80 mb-6 text-lg">
          Dive into data, analyze light curves, and flag potential exoplanet transits. Your contribution accelerates global discovery.
        </p>
        <ul className="space-y-4 text-white">
          <li className="flex items-start">
            <ClipboardListIcon className="w-6 h-6 mr-3 text-[#f093fb] flex-shrink-0 mt-1" />
            <span>**Transit Analysis:** Access curated Kepler and TESS data streams instantly.</span>
          </li>
          <li className="flex items-start">
            <ActivityIcon className="w-6 h-6 mr-3 text-[#f093fb] flex-shrink-0 mt-1" />
            <span>**Community Validation:** Collaborate with peers to confirm initial findings.</span>
          </li>
        </ul>
        <button 
          className="mt-8 py-3 px-6 w-full text-lg bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold rounded-xl shadow-xl hover:from-[#764ba2] hover:to-[#667eea] transition duration-300 transform hover:translate-y-[-2px] focus:outline-none focus:ring-4 focus:ring-[#667eea]/50"
        >
          View Citizen Tools
        </button>
      </div>
      
      {/* Researcher Card */}
      <div className="p-8 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 transition duration-500 hover:border-fuchsia-400 hover:scale-[1.02]">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-r from-[#764ba2] to-[#f093fb] rounded-xl flex items-center justify-center shadow-lg transition duration-300 group-hover:shadow-2xl">
            <CpuIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Professional Researcher</h2>
        </div>
        <p className="text-white/80 mb-6 text-lg">
          Full access to raw data pipelines, machine learning model training, and advanced statistical analysis tools.
        </p>
        <ul className="space-y-4 text-white">
          <li className="flex items-start">
            <ClipboardListIcon className="w-6 h-6 mr-3 text-[#667eea] flex-shrink-0 mt-1" />
            <span>**ML Model Integration:** Deploy and test custom detection algorithms directly.</span>
          </li>
          <li className="flex items-start">
            <ActivityIcon className="w-6 h-6 mr-3 text-[#667eea] flex-shrink-0 mt-1" />
            <span>**API Access:** Secure and scalable access to the full data archive and compute resources.</span>
          </li>
        </ul>
        <button 
          className="mt-8 py-3 px-6 w-full text-lg bg-gradient-to-r from-[#764ba2] to-[#f093fb] text-white font-semibold rounded-xl shadow-xl hover:from-[#f093fb] hover:to-[#764ba2] transition duration-300 transform hover:translate-y-[-2px] focus:outline-none focus:ring-4 focus:ring-[#f093fb]/50"
        >
          Access Research Tools
        </button>
      </div>
    </div>
  </div>
);

// --- Main App Component (Implements the Dashboard Layout) ---

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Define the core cosmic gradient for the background
  const cosmicBgStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  };

  const navItems = [
    { name: "Home", path: "/dashboard", icon: HomeIcon, current: true },
    { name: "My Transits", path: "/transits", icon: ClipboardListIcon, current: false },
    { name: "AI Assistant", path: "/ai", icon: CpuIcon, current: false },
    // Add more navigation items here
  ];

  return (
    // Main Container with Cosmic Gradient and Animation
    <div className="min-h-screen relative overflow-hidden text-white font-sans" style={cosmicBgStyle}>
      
      {/* Animated Background Elements (Subtle stars/particles effect) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute top-40 right-32 w-40 h-40 bg-white/5 rounded-full animate-bounce delay-700 opacity-50"></div>
        <div className="absolute bottom-32 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse delay-1000 opacity-50"></div>
        <div className="absolute top-1/2 right-40 w-28 h-28 bg-white/5 rounded-full animate-bounce delay-500 opacity-50"></div>
      </div>
      
      {/* Dashboard Wrapper */}
      <div className="relative z-10 flex min-h-screen max-w-[1440px] mx-auto">
        
        {/* Mobile Overlay and Sidebar (Drawer) */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          ></div>
        )}

        {/* Sidebar Menu - Fixed on desktop, sliding on mobile */}
        <aside 
          className={`fixed inset-y-0 left-0 w-64 p-4 lg:w-72 lg:static lg:translate-x-0 transform transition-transform duration-300 ease-in-out z-50 
                     bg-white/10 backdrop-blur-xl lg:bg-transparent lg:backdrop-blur-none 
                     ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          style={{ borderRight: '1px solid rgba(255, 255, 255, 0.2)' }}
        >
          {/* Close button for mobile */}
          <div className="flex justify-between items-center mb-8 lg:mb-12">
            <div className="text-xl font-extrabold tracking-wider text-white">
              EXO-EXPLORER
            </div>
            <button
              className="p-2 lg:hidden rounded-full hover:bg-white/20 transition duration-150"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <XIcon className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Sidebar Navigation Links */}
          <ul className="space-y-3">
            {navItems.map(item => (
              <li key={item.name}>
                {/* NavLink simulation - currently active item has a gradient background */}
                <a
                  href={item.path} // Placeholder for routing
                  className={`flex items-center p-3 rounded-xl font-medium text-white/90 transition duration-200 
                              ${item.current 
                                ? 'bg-gradient-to-r from-[#764ba2] to-[#667eea] shadow-lg text-white' 
                                : 'hover:bg-white/20'}`
                              }
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-4">
          
          {/* Mobile Navbar/Header (shows only on small devices) */}
          <header className="sticky top-0 lg:hidden flex justify-between items-center p-4 bg-white/5 backdrop-blur-md border-b border-white/20 z-30">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <button
              className="p-2 rounded-full hover:bg-white/20 transition duration-150"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <MenuIcon className="h-6 w-6 text-white" />
            </button>
          </header>

          {/* Dynamic Content */}
          <div className="pb-10">
            {/* The Dashboard Content component containing the two beautiful cards */}
            <DashboardContent /> 
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
