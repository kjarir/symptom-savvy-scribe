
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, X, MinusCircle, Maximize2, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};

// Enhanced responses for the health assistant
const healthResponses = [
  {
    keywords: ["headache", "head", "pain", "migraine"],
    response: "Based on your description of headache symptoms, this could be due to several causes including tension, migraine, or sinus issues. Try resting in a dark, quiet room, stay hydrated, and consider over-the-counter pain relievers like ibuprofen or acetaminophen. If headaches are severe, persistent, or accompanied by other symptoms like fever or stiff neck, please consult a healthcare provider."
  },
  {
    keywords: ["cold", "flu", "fever", "cough", "sore throat"],
    response: "Your symptoms sound like they could be due to a common cold or flu. Rest, hydration, and over-the-counter medications for symptom relief are recommended. For cold and flu: drink plenty of fluids, use saline nasal sprays, and take acetaminophen or ibuprofen for fever and pain. If symptoms worsen or persist beyond a week, or if you develop difficulty breathing, please seek medical attention."
  },
  {
    keywords: ["stomach", "nausea", "vomit", "diarrhea", "food"],
    response: "Your digestive symptoms could be related to gastroenteritis, food poisoning, or other gastrointestinal issues. I recommend staying hydrated with clear liquids, trying the BRAT diet (bananas, rice, applesauce, toast), and avoiding dairy, spicy, or fatty foods temporarily. If you notice blood in stool or vomit, severe abdominal pain, or symptoms persisting beyond 48 hours, please consult a healthcare professional immediately."
  },
  {
    keywords: ["skin", "rash", "itchy", "allergy", "hives"],
    response: "The skin symptoms you're describing could be related to an allergic reaction, contact dermatitis, or other skin conditions. For temporary relief, try a cool compress, over-the-counter antihistamines, or hydrocortisone cream for itching. Avoid potential allergens and irritants. If the rash is spreading rapidly, accompanied by difficulty breathing, or if you develop fever or blisters, seek immediate medical attention as these could indicate a more serious condition."
  },
  {
    keywords: ["tired", "fatigue", "exhausted", "energy", "sleep"],
    response: "Persistent fatigue can be caused by many factors including poor sleep, stress, vitamin deficiencies, or underlying medical conditions. Try improving sleep hygiene, managing stress, ensuring adequate hydration, and eating a balanced diet rich in iron, B vitamins, and protein. If fatigue persists despite lifestyle changes, or is accompanied by other symptoms like unexplained weight loss or fever, please consult with a healthcare provider for a thorough evaluation."
  },
  {
    keywords: ["anxiety", "stress", "panic", "worry", "nervous"],
    response: "What you're describing sounds like symptoms of anxiety or stress. Try relaxation techniques such as deep breathing, meditation, or progressive muscle relaxation. Regular exercise, adequate sleep, and limiting caffeine and alcohol can also help manage anxiety. If your symptoms are severe, interfere with daily functioning, or include panic attacks, please consider speaking with a mental health professional who can provide appropriate treatment options including therapy or medication if needed."
  }
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
    
    // Find the most relevant response based on keywords
    const userInput = inputMessage.toLowerCase();
    let bestResponse = "I don't have specific information about that. For accurate medical advice, please consult with a healthcare professional. Is there something else I can help you with?";
    
    // Try to find a matching response based on keywords
    for (const responseItem of healthResponses) {
      if (responseItem.keywords.some(keyword => userInput.includes(keyword))) {
        bestResponse = responseItem.response;
        break;
      }
    }
    
    // Simulate assistant typing
    setTimeout(() => {
      const assistantMessage: Message = {
        id: messages.length + 2,
        text: bestResponse,
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

  const buttonVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 15 } },
    hover: { scale: 1.1, backgroundColor: "#1565C0", boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" },
    tap: { scale: 0.95 }
  };

  const chatWindowVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 20, stiffness: 300 } },
    exit: { opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.2 } }
  };

  const minimizedVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 20, stiffness: 300 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  };

  return (
    <>
      {/* Chat button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button 
            onClick={toggleChat}
            className="fixed bottom-6 right-6 bg-health-primary text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            exit={{ scale: 0, opacity: 0 }}
          >
            <MessageSquare className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Chat widget */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed right-6 bottom-6 z-50">
            <AnimatePresence mode="wait">
              {isMinimized ? (
                <motion.div 
                  key="minimized"
                  className="w-72"
                  variants={minimizedVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Card className="w-full shadow-xl border-health-primary border-t-4">
                    <CardHeader className="p-4 border-b flex flex-row items-center justify-between space-y-0 bg-white">
                      <div className="flex items-center">
                        <span className="font-semibold text-health-primary">Health Assistant</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={maximizeChat} className="hover:bg-gray-100">
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={toggleChat} className="hover:bg-gray-100">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ) : (
                <motion.div 
                  key="expanded"
                  className="w-96 h-[550px]"
                  variants={chatWindowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Card className="w-full h-full flex flex-col shadow-xl border-health-primary border-t-4">
                    {/* Header */}
                    <CardHeader className="p-4 border-b flex flex-row items-center justify-between space-y-0 bg-white">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2 bg-health-primary">
                          <AvatarFallback>
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-health-primary">Health Assistant</h3>
                          <p className="text-xs text-gray-400">Online</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={minimizeChat} className="hover:bg-gray-100">
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={toggleChat} className="hover:bg-gray-100">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    
                    {/* Messages */}
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          className={cn(
                            "flex",
                            message.sender === 'user' ? "justify-end" : "justify-start"
                          )}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div
                            className={cn(
                              "max-w-[80%] rounded-lg p-3 transition-all duration-300",
                              message.sender === 'user'
                                ? "bg-health-primary text-white hover:bg-blue-700"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
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
                        </motion.div>
                      ))}
                      {isTyping && (
                        <motion.div 
                          className="flex justify-start"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800">
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </CardContent>
                    
                    {/* Input */}
                    <CardFooter className="p-3 border-t">
                      <div className="flex w-full items-center space-x-2">
                        <Textarea
                          placeholder="Type your health question..."
                          className="flex-1 min-h-[40px] resize-none transition-all duration-300 focus:border-health-primary"
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyDown={handleKeyPress}
                        />
                        <Button
                          size="icon"
                          className="bg-health-primary hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                          onClick={handleSendMessage}
                          disabled={!inputMessage.trim() || isTyping}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;
