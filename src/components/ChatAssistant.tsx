
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, X, MinusCircle, Maximize2, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const maximizeChat = () => {
    setIsMinimized(false);
  };

  return (
    <>
      {/* Chat button */}
      {!isOpen && (
        <button 
          onClick={toggleChat}
          className="fixed bottom-6 right-6 bg-health-primary text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}
      
      {/* Chat widget */}
      {isOpen && (
        <div 
          className={cn(
            "fixed right-6 bottom-6 z-50 transition-all duration-300 ease-in-out",
            isMinimized ? "w-72 h-14" : "w-96 h-[550px]"
          )}
        >
          <Card className="w-full h-full flex flex-col shadow-xl border-health-primary border-t-4">
            {/* Header */}
            <CardHeader className="p-4 border-b flex flex-row items-center justify-between space-y-0 bg-white">
              <div className="flex items-center">
                {isMinimized ? (
                  <span className="font-semibold text-health-primary">Health Assistant</span>
                ) : (
                  <>
                    <Avatar className="h-8 w-8 mr-2 bg-health-primary">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-health-primary">Health Assistant</h3>
                      <p className="text-xs text-gray-400">Online</p>
                    </div>
                  </>
                )}
              </div>
              <div className="flex space-x-2">
                {isMinimized ? (
                  <Button variant="ghost" size="icon" onClick={maximizeChat}>
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon" onClick={minimizeChat}>
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={toggleChat}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            {!isMinimized && (
              <>
                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.sender === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg p-3",
                          message.sender === 'user'
                            ? "bg-health-primary text-white"
                            : "bg-gray-100 text-gray-800"
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
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </CardContent>
                
                {/* Input */}
                <CardFooter className="p-3 border-t">
                  <div className="flex w-full items-center space-x-2">
                    <Textarea
                      placeholder="Type your health question..."
                      className="flex-1 min-h-[40px] resize-none"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />
                    <Button
                      size="icon"
                      className="bg-health-primary hover:bg-blue-700"
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;
