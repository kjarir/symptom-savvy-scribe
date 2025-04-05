
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SymptomChecker from '../components/SymptomChecker';
import Features from '../components/Features';
import HealthResources from '../components/HealthResources';
import ChatAssistant from '../components/ChatAssistant';
import DoctorAppointment from '../components/DoctorAppointment';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div id="home" className="scroll-mt-16">
          <Hero />
        </div>
        <div id="features" className="scroll-mt-16">
          <Features />
        </div>
        <div id="symptom-checker" className="scroll-mt-16">
          <SymptomChecker />
        </div>
        <div id="doctor-appointment" className="scroll-mt-16">
          <DoctorAppointment />
        </div>
        <div id="resources" className="scroll-mt-16">
          <HealthResources />
        </div>
        <div id="chat-assistant" className="scroll-mt-16">
          <ChatAssistant />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
