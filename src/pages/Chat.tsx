
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};

// Sample responses for the health assistant
const healthResponses = [
  "It sounds like you might be experiencing symptoms of a common cold. Try getting plenty of rest, staying hydrated, and taking over-the-counter cold medicines as directed.",
  "Those symptoms could be associated with seasonal allergies. Antihistamines may help reduce your symptoms. If they persist, consider consulting with an allergist.",
  "Based on what you've described, this could be related to stress or anxiety. Consider relaxation techniques, regular exercise, and adequate sleep. If symptoms persist, speak with a healthcare provider.",
  "Your symptoms might be indicating a mild case of food poisoning. Stay hydrated and stick to bland foods. If symptoms worsen or continue beyond 48 hours, please seek medical attention.",
  "This could potentially be a sign of a vitamin deficiency. Consider reviewing your diet and possibly taking a multivitamin, but it's best to consult with a healthcare provider for proper testing and recommendations.",
  "For more accurate information about your symptoms, I recommend using our Symptom Checker tool which can provide more detailed analysis based on our medical database.",
  "Remember that while I can provide general information, I'm not a replacement for professional medical advice. Please consult with a healthcare provider for proper diagnosis and treatment.",
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your health assistant. How can I help you today?",
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate assistant typing
    setTimeout(() => {
      // Select a random response from the healthResponses array
      const responseText = healthResponses[Math.floor(Math.random() * healthResponses.length)];
      
      const assistantMessage: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-health-gray">
        <div className="health-container max-w-4xl mx-auto py-8 px-4">
          <div className="mb-6 animate-fade-in">
            <Link to="/">
              <Button variant="ghost" className="group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-health-primary mb-2">Health Assistant Chat</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ask any health-related questions and get instant responses from our AI health assistant.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-4 animate-fade-in">
            <div className="flex items-center mb-6">
              <Avatar className="h-10 w-10 mr-3 bg-health-primary">
                <AvatarFallback>
                  <Bot className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-health-primary">Health Assistant</h2>
                <div className="flex items-center">
                  <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>
              <div className="ml-auto flex items-center bg-blue-50 text-health-primary rounded-full px-3 py-1 text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                <span>AI Powered</span>
              </div>
            </div>
            
            <div className="h-[400px] md:h-[500px] overflow-y-auto p-4 space-y-4 mb-4 rounded-lg bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex animate-fade-in",
                    message.sender === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-3",
                      message.sender === 'user'
                        ? "bg-health-primary text-white"
                        : "bg-white border border-gray-200 text-gray-800"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      {message.sender === 'assistant' && (
                        <Avatar className="h-6 w-6 mt-0.5">
                          <AvatarFallback className="bg-health-secondary text-white">
                            <Bot className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {message.sender === 'user' && (
                        <Avatar className="h-6 w-6 mt-0.5">
                          <AvatarFallback className="bg-health-secondary text-white">
                            <User className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="max-w-[80%] rounded-lg p-3 bg-white border border-gray-200 text-gray-800">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="flex gap-2">
              <Textarea
                placeholder="Type your health question..."
                className="flex-1 min-h-[50px] resize-none"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <Button
                className="bg-health-primary hover:bg-blue-700 transition-all"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
              >
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-500 animate-fade-in">
            <p>Note: This health assistant provides general information and is not a substitute for professional medical advice.</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Chat;
