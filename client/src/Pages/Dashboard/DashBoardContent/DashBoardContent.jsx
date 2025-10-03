import { Link } from "react-router";

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
const UsersIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20v-2a3 3 0 00-5.356-1.857M17 20h-2m2-2h-2m-2 4h-2M5 13a2 2 0 012-2h2.236a2 2 0 011.832 1.157l1.334 2.668A2 2 0 0015 17h2a2 2 0 002-2v-3a2 2 0 00-2-2m-3.268 4H12m1-4a2 2 0 00-2-2h-2m-3 4a2 2 0 00-2-2H4a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2v-3z" />
  </svg>
);

// Activity Icon (Feature)
const ActivityIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const DashBoardContent = () => (
  <div className="p-4 sm:p-8">
    <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-white">
        Welcome to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-fuchsia-300">Exo Data Hub</span>
    </h1>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Citizen Scientist Card */}
      <Link to="/dashboard/citizen-scientist" className="p-8 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 transition duration-500 hover:border-blue-400 hover:scale-[1.02]">
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
      </Link>
      
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
export default DashBoardContent;