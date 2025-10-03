import { FaRocket, FaStar, FaPlay, FaChartLine, FaGlobeAmericas } from "react-icons/fa";

const Button = ({ children, variant = "solid", className = "", ...props }) => {
  const base = "px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 transition-all duration-300 text-base group relative overflow-hidden";
  const styles = {
    solid: "bg-gradient-to-r from-[#ff2fd9] to-[#8b5cf6] text-white shadow-2xl hover:shadow-3xl hover:scale-105",
    ghost: "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:scale-105",
    outline: "bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50"
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <span className="relative z-10">{children}</span>
    </button>
  );
};

const Hero = () => {
  const stats = [
    { value: "5,000+", label: "Exoplanets Detected", icon: FaGlobeAmericas },
    { value: "98.7%", label: "Accuracy Rate", icon: FaChartLine },
    { value: "12", label: "NASA Datasets", icon: FaRocket },
    { value: "24/7", label: "Real-time Analysis", icon: FaStar },
  ];

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-black">
      {/* Full-width Background */}
      <div className="absolute inset-0">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/LandingPage.png')" }}
        />
        
        {/* Enhanced Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
        
        {/* Animated Elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content Container - max-w-7xl */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <div className="w-3 h-3 bg-gradient-to-r from-[#ff2fd9] to-[#8b5cf6] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-white">NASA Space Apps Challenge
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white">
                Discover The
                <br />
                <span className="bg-gradient-to-r from-[#ff2fd9] via-[#b96bff] to-[#8b5cf6] bg-clip-text text-transparent">
                  Exoplanet Finder
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                Advanced AI-powered platform analyzing NASA's exoplanet datasets to uncover new worlds beyond our solar system.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <button className="bg-gradient-to-r from-[#ff2fd9] to-[#8b5cf6] text-lg flex items-center gap-3 px-4 py-2 rounded-2xl font-semibold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
                <FaRocket className="w-5 h-5" />
                Launch Dashboard
              </button>

              <button className="text-lg flex items-center gap-3 px-4 py-2 rounded-2xl font-semibold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 border-2 border-gray-400">
                <FaPlay className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-gray-900"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-300">Join 10K+ Researchers</span>
              </div>
              
              <div className="hidden sm:block w-px h-6 bg-gray-600"></div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-300">4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Right Content - Stats Grid */}
          <div className="grid grid-cols-2 gap-6 lg:gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                >
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                  <div className="absolute inset-[1px] rounded-3xl bg-gray-900"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 25px 50px -12px rgba(139, 92, 246, 0.4);
        }
      `}</style>
    </section>
  );
};

export default Hero;