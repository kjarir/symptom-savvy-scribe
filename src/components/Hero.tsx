
import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart, Search, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

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
  const [scrollY, setScrollY] = useState(0);
  const { toast } = useToast();

  // Track scroll position for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div id="home" className="relative overflow-hidden bg-gradient-to-r from-health-primary to-health-secondary py-16 md:py-24">
      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: Math.random() * 10 + 5 + "px",
              height: Math.random() * 10 + 5 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%"
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, Math.random() * 0.5 + 0.5, 1]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Hero Content */}
      <div 
        className="health-container relative z-10"
        style={{
          transform: `translateY(${scrollY * 0.1}px)` // Simple parallax effect
        }}
      >
        <motion.div 
          className="md:flex items-center justify-between"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="md:w-1/2 text-white mb-12 md:mb-0" variants={itemVariants}>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Your Personal Health Assistant
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Check your symptoms, find potential conditions, get medication recommendations, and book appointments with doctors near you.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                className="bg-white text-health-primary hover:bg-gray-100 transform transition hover:scale-105"
                onClick={() => {
                  const element = document.getElementById("symptom-checker");
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Check Symptoms
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 transform transition hover:scale-105"
                onClick={() => {
                  const element = document.getElementById("doctor-appointment");
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Find Doctors
              </Button>
            </motion.div>
            
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center text-sm mb-2">
                <PlusCircle className="h-4 w-4 mr-2" />
                <span>Common symptoms:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map((symptom, index) => (
                  <motion.button 
                    key={symptom}
                    onClick={() => handleSymptomClick(symptom)}
                    className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-sm transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    {symptom}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative">
              <motion.div 
                className="absolute -top-6 -left-6"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Heart className="h-12 w-12 text-white" />
              </motion.div>
              <motion.div 
                className="bg-white rounded-lg shadow-xl p-6 max-w-md"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
                whileHover={{
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
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
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button 
                    className="w-full bg-health-primary hover:bg-blue-600 transform transition hover:scale-105"
                    onClick={handleAnalyzeSymptoms}
                  >
                    Analyze Symptoms
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
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
