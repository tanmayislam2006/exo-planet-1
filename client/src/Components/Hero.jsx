import { FaRocket, FaStar } from "react-icons/fa";

const Button = ({ children, variant = "solid", className = "" }) => {
  const base = "px-6 py-3 rounded-full font-semibold flex items-center gap-3 transition-all text-sm";
  const styles = {
    solid: "bg-gradient-to-r from-[#ff2fd9] to-[#8b5cf6] text-white shadow-md hover:brightness-105",
    ghost: "bg-[#0b1222]/60 text-[#e6e6ff] border border-[#2a3754] hover:bg-[#0f1a33]/80",
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Hero = () => {
  const stats = [
    { value: "5,000+", label: "Exoplanets Detected" },
    { value: "98.7%", label: "Accuracy Rate" },
    { value: "12", label: "NASA Datasets" },
    { value: "24/7", label: "Real-time Analysis" },
  ];

  return (
    // Note: place your background image at `public/images/hero-bg.jpg`
    <section
      className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-4 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/LandingPage.png')" }}
    >
      {/* Decorative purple overlay + subtle radial highlight */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#3b0b47]/60 via-[#1a0b2f]/45 to-[#071028]/92" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#6b1fa7]/18 to-transparent pointer-events-none" />
        <div className="absolute inset-0 backdrop-blur-sm mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto text-center px-6">
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-sm border border-[#3a2750]/40 text-[#f3e9ff]">
            <FaRocket className="w-4 h-4 text-[#ff9cf0]" />
            <span className="text-xs">NASA Space Apps Challenge 2024</span>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug text-white">
              Discover the Next
              <br />
              <span className="bg-gradient-to-r from-[#ff63d6] via-[#b96bff] to-[#8b5cf6] bg-clip-text text-transparent">
                Exoplanet Frontier
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#d6d6f8]/80 max-w-2xl mx-auto leading-relaxed">
              Powered by advanced AI and machine learning, our platform analyzes NASA's vast exoplanet datasets to identify new worlds beyond our solar system. Designed for accessibility and optimized for all users.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
            <Button variant="solid" className="shadow-xl">
              <FaStar className="w-4 h-4" />
              <span>Launch Dashboard</span>
            </Button>

            <Button variant="ghost">
              <FaRocket className="w-4 h-4 text-[#cfc8ff]" />
              <span>Start Prediction</span>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative overflow-hidden p-5 rounded-2xl bg-white/12 border border-white/20 backdrop-blur-md hover:shadow-[0_10px_40px_rgba(139,92,246,0.12)] transition-all"
              >
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  <span className="bg-gradient-to-r from-[#ff63d6] to-[#8b5cf6] bg-clip-text text-transparent">{stat.value}</span>
                </div>
                <div className="text-xs md:text-sm text-[#e8e7ff]/75">{stat.label}</div>
                {/* subtle purple border glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;