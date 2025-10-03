import React from 'react';
import Hero from '../../Components/Hero';
import Features from '../../Components/Features';
import AIDetection from '../../Components/AIDetection';
import CTA from '../../Components/CTA';

const Home = () => {
  return (
    <div>
        <Hero/>
        <Features/>
        <AIDetection/>
        <CTA/>
    </div>
  );
};

export default Home;