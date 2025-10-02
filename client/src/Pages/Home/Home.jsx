import React from 'react';
import { Link } from 'react-router';
// Assuming you have Lucide React icons or similar components imported (e.g., Rocket, Users, Aperture)
// Replace these with your actual icon imports if needed
const Rocket = (props) => <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
const Users = (props) => <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20v-2a3 3 0 00-5.356-1.857M17 20h-2m2-2h-2m-2 4h-2M5 13a2 2 0 012-2h2.236a2 2 0 011.832 1.157l1.334 2.668A2 2 0 0015 17h2a2 2 0 002-2v-3a2 2 0 00-2-2m-3.268 4H12m1-4a2 2 0 00-2-2h-2m-3 4a2 2 0 00-2-2H4a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2v-3z" /></svg>;
const Aperture = (props) => <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8-8 3.582-8 8zm4 0h.01M16 12h.01M12 4v.01M12 20v.01M4 12H2M20 12h-2M12 4.5V2M12 19.5V22M4.5 12H2M19.5 12H22" /></svg>;
const Bot = (props) => <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const Cpu = (props) => <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;


const Home = () => {
  return (
    // Main Container with Cosmic Gradient Background and Animation
    <div className="min-h-screen relative overflow-hidden text-white" style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' 
    }}>
      
      {/* Animated Background Elements (Same as your login component) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-40 h-40 bg-white/5 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-40 w-28 h-28 bg-white/5 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-40 right-20 w-44 h-44 bg-white/10 rounded-full animate-pulse delay-1500"></div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 pt-20 pb-16">

        {/* 1. Hero Section: The Cosmic Gateway */}
        <section className="text-center px-4 max-w-4xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Rocket className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Exo Planet Explorer
              </span>
            </h1>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-white">
            Pioneering Exoplanet Research Together
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            A full-stack platform for **citizen science collaboration** and **professional research**, powering the next generation of exoplanet discoveries with data and AI.
          </p>
        </section>

        {/* 2. Role Selection / Features Showcase */}
        <section className="px-4 max-w-7xl mx-auto mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-white to-fuchsia-300 bg-clip-text text-transparent">
              Choose Your Mission
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Citizen Scientist Card */}
            <div className="p-8 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 hover:border-blue-400 transition duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white">Citizen Scientist</h4>
              </div>
              <p className="text-white/70 mb-6">
                Contribute directly to space research. Analyze light curves and identify transits using our intuitive tools.
              </p>
              <ul className="space-y-3 text-white">
                <li className="flex items-center">
                  <Bot className="w-5 h-5 mr-2 text-fuchsia-300 flex-shrink-0" />
                  **AI Chatbot:** Analyze data with text & voice commands.
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-fuchsia-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  **CSV Upload:** Easily submit your own observation data.
                </li>
                <li className="flex items-center">
                  <Aperture className="w-5 h-5 mr-2 text-fuchsia-300 flex-shrink-0" />
                  Real-time collaboration with researchers.
                </li>
              </ul>
              <Link to="/register?role=citizen" className="mt-8 inline-block py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition duration-300">
                Join as a Citizen Scientist
              </Link>
            </div>
            
            {/* Researcher Card */}
            <div className="p-8 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 hover:border-purple-400 transition duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white">Researcher</h4>
              </div>
              <p className="text-white/70 mb-6">
                Access a vast archive, manage datasets, and leverage machine learning for new discoveries.
              </p>
              <ul className="space-y-3 text-white">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 7-7M21 12h-2.585a2 2 0 01-1.414-.586l-.707-.707a2 2 0 00-1.414-.586h-4a2 2 0 00-1.414.586l-.707.707A2 2 0 017.585 12H4" /></svg>
                  **Input KOI Data:** Dedicated tools for Kepler Object of Interest management.
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9.25 10H7.5L7 17H9.75ZM15.25 17L14.75 10H13L12.5 17H15.25ZM12 4L19 4L19 20L5 20L5 4L12 4Z" /></svg>
                  **Train AI Model:** Use our platform to train custom exoplanet detection models.
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  Integrated data management and visualization.
                </li>
              </ul>
              <Link to="/register?role=researcher" className="mt-8 inline-block py-3 px-6 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-fuchsia-600 transition duration-300">
                Register as a Researcher
              </Link>
            </div>
            
          </div>
        </section>

        {/* 3. Global Collaboration CTA */}
        <section className="px-4 max-w-4xl mx-auto text-center py-16 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30">
          <h3 className="text-3xl font-bold mb-4 text-white">
            Ready to Launch Your Discovery?
          </h3>
          <p className="text-lg text-white/70 mb-8">
            The universe is waiting for your contribution. Log in or register now to join the mission.
          </p>
          <div className="flex justify-center gap-6">
            <Link 
              to="/login"
              className="py-3 px-8 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-full text-lg shadow-xl hover:from-purple-700 hover:to-blue-600 transition duration-300 transform hover:scale-105"
            >
              Log In and Start 🚀
            </Link>
            <Link 
              to="/register"
              className="py-3 px-8 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full text-lg shadow-xl border border-white/30 hover:bg-white/30 transition duration-300 transform hover:scale-105"
            >
              New Explorer? Register
            </Link>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default Home;