
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SymptomChecker from '../components/SymptomChecker';
import Features from '../components/Features';
import HealthResources from '../components/HealthResources';
import ChatAssistant from '../components/ChatAssistant';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      <SymptomChecker />
      <HealthResources />
      <ChatAssistant />
      <Footer />
    </div>
  );
};

export default Index;
