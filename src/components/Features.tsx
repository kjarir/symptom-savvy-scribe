
import React from 'react';
import { HeartPulse, Pill, Brain, Stethoscope, Activity, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: <HeartPulse className="h-12 w-12 p-2 rounded-full bg-red-100 text-health-accent" />,
      title: "Advanced Symptom Analysis",
      description: "Our AI-powered system analyzes your symptoms and provides personalized insights based on medical knowledge."
    },
    {
      icon: <Pill className="h-12 w-12 p-2 rounded-full bg-blue-100 text-health-primary" />,
      title: "Medication Information",
      description: "Get detailed information about medications, including uses, side effects, and proper dosage guidelines."
    },
    {
      icon: <Stethoscope className="h-12 w-12 p-2 rounded-full bg-green-100 text-health-green" />,
      title: "Condition Database",
      description: "Access a comprehensive database of medical conditions with detailed explanations and treatment options."
    },
    {
      icon: <Brain className="h-12 w-12 p-2 rounded-full bg-purple-100 text-purple-500" />,
      title: "AI Health Assistant",
      description: "Chat with our AI health assistant for instant answers to your health-related questions, available 24/7."
    },
    {
      icon: <Activity className="h-12 w-12 p-2 rounded-full bg-orange-100 text-orange-500" />,
      title: "Health Tracking",
      description: "Monitor your health trends and patterns over time to gain insights into your overall wellbeing."
    },
    {
      icon: <Calendar className="h-12 w-12 p-2 rounded-full bg-indigo-100 text-indigo-500" />,
      title: "Medication Reminders",
      description: "Set up reminders to never miss a dose of your medications and maintain your treatment schedule."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="health-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-health-primary mb-4">Key Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our health assistant provides a comprehensive set of tools to help you manage your health with confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl text-health-primary">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
