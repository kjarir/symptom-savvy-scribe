
import React, { useState, useEffect } from 'react';
import { Activity, Bell, User, Menu, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Set active link based on current path
    if (location.pathname === '/') {
      const hash = location.hash.replace('#', '');
      setActiveLink(hash || 'home');
    } else if (location.pathname.includes('/resources')) {
      setActiveLink('resources');
    } else if (location.pathname.includes('/chat')) {
      setActiveLink('chat-assistant');
    }
    
    // Add scroll listener for navbar style change
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const scrollToSection = (sectionId: string) => {
    setActiveLink(sectionId);
    
    // If on home page, scroll to section
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.header 
      className={`bg-white sticky top-0 z-30 transition-all duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="health-container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center group">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Activity className="h-8 w-8 text-health-primary mr-2" />
            </motion.div>
            <span className="text-xl font-bold text-health-primary group-hover:text-health-secondary transition-colors duration-300">HealthGuide</span>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className={`${activeLink === "home" ? "text-health-primary font-medium" : "text-gray-600"} hover:text-health-primary transition-colors duration-300 relative`}
              onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}
            >
              Home
              {activeLink === "home" && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-health-primary"
                  layoutId="navbar-underline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
            <Link 
              to="/#symptom-checker"
              className={`${activeLink === "symptom-checker" ? "text-health-primary font-medium" : "text-gray-600"} hover:text-health-primary transition-colors duration-300 relative`}
              onClick={(e) => { e.preventDefault(); scrollToSection("symptom-checker"); }}
            >
              Symptom Checker
              {activeLink === "symptom-checker" && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-health-primary"
                  layoutId="navbar-underline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
            <Link 
              to="/#doctor-appointment"
              className={`${activeLink === "doctor-appointment" ? "text-health-primary font-medium" : "text-gray-600"} hover:text-health-primary transition-colors duration-300 relative`}
              onClick={(e) => { e.preventDefault(); scrollToSection("doctor-appointment"); }}
            >
              Find Doctors
              {activeLink === "doctor-appointment" && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-health-primary"
                  layoutId="navbar-underline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
            <Link 
              to="/resources"
              className={`${activeLink === "resources" ? "text-health-primary font-medium" : "text-gray-600"} hover:text-health-primary transition-colors duration-300 relative`}
              onClick={() => setActiveLink("resources")}
            >
              Resources
              {activeLink === "resources" && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-health-primary"
                  layoutId="navbar-underline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
            <Link 
              to="/chat"
              className={`${activeLink === "chat-assistant" ? "text-health-primary font-medium" : "text-gray-600"} hover:text-health-primary transition-colors duration-300 relative`}
              onClick={() => setActiveLink("chat-assistant")}
            >
              Chat
              {activeLink === "chat-assistant" && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-health-primary"
                  layoutId="navbar-underline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-health-accent rounded-full"></span>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-health-primary transition-all">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-health-secondary text-white">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </motion.div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-8">
                  <Link 
                    to="/" 
                    className="text-lg font-medium px-2 py-2 hover:bg-gray-100 rounded flex justify-between items-center"
                    onClick={() => scrollToSection("home")}
                  >
                    <span>Home</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link 
                    to="/#symptom-checker"
                    className="text-lg font-medium px-2 py-2 hover:bg-gray-100 rounded flex justify-between items-center"
                    onClick={() => scrollToSection("symptom-checker")}
                  >
                    <span>Symptom Checker</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link 
                    to="/#doctor-appointment"
                    className="text-lg font-medium px-2 py-2 hover:bg-gray-100 rounded flex justify-between items-center"
                    onClick={() => scrollToSection("doctor-appointment")}
                  >
                    <span>Find Doctors</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link 
                    to="/resources"
                    className="text-lg font-medium px-2 py-2 hover:bg-gray-100 rounded flex justify-between items-center"
                  >
                    <span>Resources</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link 
                    to="/chat"
                    className="text-lg font-medium px-2 py-2 hover:bg-gray-100 rounded flex justify-between items-center"
                  >
                    <span>Chat Assistant</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
