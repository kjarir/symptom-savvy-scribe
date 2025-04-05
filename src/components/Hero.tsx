
import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-health-primary to-health-secondary py-16 md:py-24">
      <div className="health-container">
        <div className="md:flex items-center justify-between">
          <div className="md:w-1/2 text-white mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Personal Health Assistant
            </h1>
            <p className="text-lg md:text-xl mb-6 opacity-90">
              Check your symptoms, find potential conditions, and get medication recommendations all in one place.
            </p>
            <div className="flex space-x-4">
              <Button className="bg-white text-health-primary hover:bg-gray-100">
                Check Symptoms
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 animate-pulse-slow">
                <Heart className="h-12 w-12 text-white" />
              </div>
              <div className="bg-white rounded-lg shadow-xl p-6 max-w-md">
                <h3 className="text-xl font-semibold text-health-primary mb-4">How are you feeling today?</h3>
                <p className="text-gray-600 mb-4">Describe your symptoms below and get instant health insights.</p>
                <input 
                  type="text" 
                  placeholder="I have a headache and fever..." 
                  className="health-input mb-4"
                />
                <Button className="w-full">Analyze Symptoms</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-health-gray to-transparent"></div>
    </div>
  );
};

export default Hero;
