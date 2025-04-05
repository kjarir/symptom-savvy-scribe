
import React, { useState } from 'react';
import { ArrowRight, Heart, Search, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const commonSymptoms = [
  "Headache", 
  "Fever", 
  "Cough", 
  "Fatigue", 
  "Nausea",
  "Sore throat"
];

const Hero = () => {
  const [inputValue, setInputValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { toast } = useToast();

  const handleSymptomClick = (symptom: string) => {
    setInputValue(prev => prev ? `${prev}, ${symptom}` : symptom);
  };

  const handleAnalyzeSymptoms = () => {
    if (!inputValue.trim()) {
      toast({
        title: "Please enter symptoms",
        description: "Enter your symptoms before analyzing",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would trigger the symptom checker analysis
    toast({
      title: "Analyzing symptoms...",
      description: "We're checking your symptoms: " + inputValue,
    });
    
    // Scroll to symptom checker section
    const element = document.getElementById("symptom-checker");
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 1000);
    }
  };

  return (
    <div id="home" className="relative bg-gradient-to-r from-health-primary to-health-secondary py-16 md:py-24">
      <div className="health-container">
        <div className="md:flex items-center justify-between">
          <div className="md:w-1/2 text-white mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Your Personal Health Assistant
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
              Check your symptoms, find potential conditions, get medication recommendations, and book appointments with doctors near you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-white text-health-primary hover:bg-gray-100 transform transition hover:scale-105">
                Check Symptoms
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 transform transition hover:scale-105">
                Find Doctors
              </Button>
            </div>
            
            <div className="mt-8">
              <div className="flex items-center text-sm mb-2">
                <PlusCircle className="h-4 w-4 mr-2" />
                <span>Common symptoms:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map(symptom => (
                  <button 
                    key={symptom}
                    onClick={() => handleSymptomClick(symptom)}
                    className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-sm transition-colors"
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 animate-pulse-slow">
                <Heart className="h-12 w-12 text-white" />
              </div>
              <div className="bg-white rounded-lg shadow-xl p-6 max-w-md transform transition duration-500 hover:shadow-2xl">
                <h3 className="text-xl font-semibold text-health-primary mb-4">How are you feeling today?</h3>
                <p className="text-gray-600 mb-6">Describe your symptoms below and get instant health insights.</p>
                <div 
                  className={`flex items-center p-3 border rounded-lg mb-4 transition-shadow ${isInputFocused ? 'shadow-md border-health-primary' : ''}`}
                >
                  <Search className={`h-5 w-5 mr-2 ${isInputFocused ? 'text-health-primary' : 'text-gray-400'}`} />
                  <input 
                    type="text" 
                    placeholder="I have a headache and fever..." 
                    className="flex-1 outline-none"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                  />
                </div>
                <Button 
                  className="w-full bg-health-primary hover:bg-blue-600 transform transition hover:scale-105"
                  onClick={handleAnalyzeSymptoms}
                >
                  Analyze Symptoms
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-health-gray to-transparent"></div>
      
      {/* Animated wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path fill="#F5F5F5" fillOpacity="1" d="M0,128L48,112C96,96,192,64,288,64C384,64,480,96,576,128C672,160,768,192,864,186.7C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
