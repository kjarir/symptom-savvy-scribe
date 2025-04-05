
import React from 'react';
import { Activity, Mail, Phone, MapPin, FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="health-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <Activity className="h-6 w-6 text-health-secondary mr-2" />
              <span className="text-xl font-bold">HealthGuide</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted health assistant, providing personalized health insights and reliable information, whenever you need it.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-health-secondary transition-colors">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-health-secondary transition-colors">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-health-secondary transition-colors">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-health-secondary transition-colors">
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-health-secondary transition-colors">Home</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-health-secondary transition-colors">Symptom Checker</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-health-secondary transition-colors">Health Resources</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-health-secondary transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-health-secondary transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Health Topics</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-health-secondary transition-colors">Mental Health</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-health-secondary transition-colors">Nutrition</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-health-secondary transition-colors">Physical Activity</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-health-secondary transition-colors">Sleep Health</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-health-secondary transition-colors">Chronic Conditions</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-health-secondary mr-2 mt-0.5" />
                <span className="text-gray-400">123 Health Avenue, Medical District, CA 90210</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-health-secondary mr-2" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-health-secondary mr-2" />
                <span className="text-gray-400">support@healthguide.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          <p className="mb-2">© {new Date().getFullYear()} HealthGuide. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-health-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-health-secondary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-health-secondary transition-colors">Cookie Policy</a>
          </div>
          <p className="mt-4 text-xs">
            Disclaimer: HealthGuide is not a medical device and is not intended to diagnose, treat, cure, or prevent any disease. 
            Always consult with a qualified healthcare provider for medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
