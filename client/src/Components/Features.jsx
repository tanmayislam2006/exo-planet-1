import { FaBrain, FaEye, FaVolumeUp, FaUsers, FaRocket } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaBrain className="w-6 h-6 text-white" />,
      title: "AI-Powered Discovery",
      description:
        "Advanced machine learning algorithms trained on NASA's exoplanet datasets for accurate detection.",
      color: "from-[#ff63d6] to-[#8b5cf6]",
    },
    {
      icon: <FaEye className="w-6 h-6 text-white" />,
      title: "ADHD-Friendly Design",
      description:
        "Clean, non-overwhelming interface designed for focus and clarity.",
      color: "from-[#3dd6b8] to-[#5ee7d6]",
    },
    {
      icon: <FaVolumeUp className="w-6 h-6 text-white" />,
      title: "Accessibility First",
      description:
        "Audio notifications and visual indicators for hearing-impaired users.",
      color: "from-[#7ee3a8] to-[#4fd1c5]",
    },
    {
      icon: <FaUsers className="w-6 h-6 text-white" />,
      title: "Multi-User Experience",
      description:
        "Tailored interfaces for scientists, researchers, and space enthusiasts.",
      color: "from-[#ffd36b] to-[#ff9cdf]",
    },
  ];

  return (
    <section className="py-20 px-6 relative bg-gradient-to-b from-[#3b0b47] via-[#2a1140] to-[#120427]">
      {/* small pill badge top-right */}
      <div className="absolute top-6 right-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/8 border border-white/10 text-xs text-[#f3e9ff] backdrop-blur-sm">
          <FaRocket className="w-3 h-3 text-[#ffd6f6]" />
          <span>NASA Space Apps Challenge 2024</span>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="text-sm md:text-base text-[#e9e6ff]/80 font-semibold">Built for Everyone</h2>
          <p className="mt-3 text-sm text-[#dcd6ff]/70">
            Our platform prioritizes accessibility, user experience, and scientific accuracy to make exoplanet discovery accessible to all.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative overflow-hidden p-6 rounded-2xl bg-white/6 border border-white/10 backdrop-blur-md hover:shadow-[0_12px_40px_rgba(139,92,246,0.12)] transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${feature.color} shadow-md`}>
                {feature.icon}
              </div>
              <h3 className="text-md font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-[#e8e7ff]/75 leading-relaxed">
                {feature.description}
              </p>
              {/* light decorative border */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;