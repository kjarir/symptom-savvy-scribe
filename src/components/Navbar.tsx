
import React from 'react';
import { Activity, Bell, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="health-container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-health-primary mr-2" />
            <span className="text-xl font-bold text-health-primary">HealthGuide</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-health-primary transition-colors duration-300">Home</a>
            <a href="#" className="text-gray-600 hover:text-health-primary transition-colors duration-300">Symptom Checker</a>
            <a href="#" className="text-gray-600 hover:text-health-primary transition-colors duration-300">Medications</a>
            <a href="#" className="text-gray-600 hover:text-health-primary transition-colors duration-300">Resources</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-500" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-health-accent rounded-full"></span>
            </Button>
            
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-health-secondary text-white">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
