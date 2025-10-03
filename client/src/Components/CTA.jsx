import { FaStar, FaRocket, FaUsers, FaGlobeAmericas } from "react-icons/fa";

const CTA = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a]"></div>
      
      {/* Animated Stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Floating Planets */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-16 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-25 animate-float" style={{animationDelay: '4s'}}></div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="flex justify-center items-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto mb-4">
                <FaUsers className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">10K+</h3>
              <p className="text-[#d6c7ff] text-sm">Active Researchers</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center items-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl mx-auto mb-4">
                <FaGlobeAmericas className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">5K+</h3>
              <p className="text-[#d6c7ff] text-sm">Exoplanets Discovered</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center items-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-400 rounded-2xl mx-auto mb-4">
                <FaRocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">100+</h3>
              <p className="text-[#d6c7ff] text-sm">Research Papers</p>
            </div>
          </div>

          {/* Main CTA Content */}
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <FaStar className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white">Join the Cosmic Exploration</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Explore the{" "}
              <span className="bg-gradient-to-r from-[#ff2fd9] to-[#8b5cf6] bg-clip-text text-transparent">
                Universe?
              </span>
            </h2>

            {/* Description */}
            <p className="text-xl md:text-2xl text-[#cfc8ff]/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of researchers, scientists, and space enthusiasts in discovering new worlds beyond our solar system.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#ff2fd9] to-[#8b5cf6] text-white font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:brightness-110">
                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <FaRocket className="w-5 h-5 relative z-10" />
                <span className="text-lg relative z-10">Begin Your Cosmic Journey</span>
              </button>
              
              <button className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <FaUsers className="w-5 h-5" />
                <span className="text-lg">Join Community</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-[#cfc8ff]/60">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-[#0f172a]"
                    />
                  ))}
                </div>
                <span>Join 10K+ Space Explorers</span>
              </div>
              
              <div className="hidden sm:block w-px h-6 bg-white/20"></div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>
                <span>Rated 4.9/5 by Researchers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default CTA;