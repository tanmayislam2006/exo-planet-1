import { FaStar } from "react-icons/fa";

const CTA = () => {
  return (
    <section className="py-12 px-4 bg-cover bg-center" style={{ backgroundImage: "url('/images/cta-bg.svg')" }}>
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#071028]/60 -z-10" />
          <h2 className="text-sm md:text-base text-[#d6c7ff] font-medium">Ready to Explore the Universe?</h2>
          <p className="mt-3 text-xs md:text-sm text-[#cfc8ff]/80">Join thousands of researchers, scientists, and space enthusiasts in discovering new worlds.</p>

          <div className="mt-6">
            <button className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#ff2fd9] to-[#8b5cf6] text-white font-semibold rounded-full shadow-md hover:brightness-105 transition">
              <FaStar className="w-4 h-4" />
              <span className="text-sm">Begin Your Journey</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;