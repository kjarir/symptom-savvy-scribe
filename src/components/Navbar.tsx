
import React, { useState } from 'react';
import { Activity, Bell, User, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");

  const scrollToSection = (sectionId: string) => {
    setActiveLink(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="health-container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-health-primary mr-2" />
            <span className="text-xl font-bold text-health-primary">HealthGuide</span>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a 
              href="#" 
              className={`${activeLink === "home" ? "text-health-primary font-medium" : "text-gray-600"} hover:text-health-primary transition-colors duration-300`}
              onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}
            >
              Home
            </a>
            <a 
              href="#" 
              className={`${activeLink === "symptom-checker" ? "text-health-primary font-medium" : "text-gray-600"} hover:text-health-primary transition-colors duration-300`}
              onClick={(e) => { e.preventDefault(); scrollToSection("symptom-checker"); }}
            >
              Symptom Checker
            </a>
            <a 
              href="#" 
              className={`${activeLink === "doctor-appointment" ? "text-health-primary font-medium" : "text-gray-600"} hover:text-health-primary transition-colors duration-300`}
              onClick={(e) => { e.preventDefault(); scrollToSection("doctor-appointment"); }}
            >
              Find Doctors
            </a>
            <a 
              href="#" 
              className={`${activeLink === "resources" ? "text-health-primary font-medium" : "text-gray-600"} hover:text-health-primary transition-colors duration-300`}
              onClick={(e) => { e.preventDefault(); scrollToSection("resources"); }}
            >
              Resources
            </a>
            <a 
              href="#" 
              className={`${activeLink === "chat-assistant" ? "text-health-primary font-medium" : "text-gray-600"} hover:text-health-primary transition-colors duration-300`}
              onClick={(e) => { e.preventDefault(); scrollToSection("chat-assistant"); }}
            >
              Chat
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-500" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-health-accent rounded-full"></span>
            </Button>
            
            <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-health-primary transition-all">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-health-secondary text-white">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-8">
                  <a 
                    href="#" 
                    className="text-lg font-medium px-2 py-2 hover:bg-gray-100 rounded"
                    onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}
                  >
                    Home
                  </a>
                  <a 
                    href="#" 
                    className="text-lg font-medium px-2 py-2 hover:bg-gray-100 rounded"
                    onClick={(e) => { e.preventDefault(); scrollToSection("symptom-checker"); }}
                  >
                    Symptom Checker
                  </a>
                  <a 
                    href="#" 
                    className="text-lg font-medium px-2 py-2 hover:bg-gray-100 rounded"
                    onClick={(e) => { e.preventDefault(); scrollToSection("doctor-appointment"); }}
                  >
                    Find Doctors
                  </a>
                  <a 
                    href="#" 
                    className="text-lg font-medium px-2 py-2 hover:bg-gray-100 rounded"
                    onClick={(e) => { e.preventDefault(); scrollToSection("resources"); }}
                  >
                    Resources
                  </a>
                  <a 
                    href="#" 
                    className="text-lg font-medium px-2 py-2 hover:bg-gray-100 rounded"
                    onClick={(e) => { e.preventDefault(); scrollToSection("chat-assistant"); }}
                  >
                    Chat Assistant
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
