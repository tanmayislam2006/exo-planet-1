import { FaBolt, FaDatabase, FaBullseye } from "react-icons/fa";
import placeholderImage from "../assets/Container.png"; // Replace with actual image path
const AIDetection = () => {
  const features = [
    { icon: <FaBolt className="w-5 h-5 text-white" />, text: "Real-time data processing" },
    { icon: <FaDatabase className="w-5 h-5 text-white" />, text: "Multi-dataset analysis" },
    { icon: <FaBullseye className="w-5 h-5 text-white" />, text: "High-precision detection" },
  ];


  return (
    <section className="py-20 px-6 relative bg-gradient-to-b from-[#3b0b47] via-[#2a1140] to-[#120427]">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#0f3b2e]/80 text-[#9ff0d6]">
                Real-time Discovery
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-semibold text-[#e8e7ff]">
              AI-Powered Exoplanet Detection
            </h2>

            <p className="text-sm text-[#d6d6f8]/75 leading-relaxed">
              Our advanced machine learning models analyze light curves, radial velocity data, and transit photometry from multiple NASA missions including Kepler, TESS, and others.
            </p>

            <div className="space-y-4 mt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#111826]/60 flex items-center justify-center mt-1">
                    {feature.icon}
                  </div>
                  <span className="text-sm text-[#e8e7ff]/75">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            {/* Image fills a rounded card without additional background/border */}
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={placeholderImage}
                alt="Exoplanet discovery visualization showing planets and stars"
                className="w-full h-auto block"
              />
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-6 bg-gradient-to-b from-transparent via-[#6b1fa7]/20 to-transparent blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIDetection;