
import React from 'react';
import { ExternalLink, BookOpen, FileText, Video } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HealthResources = () => {
  const resources = [
    {
      title: "Understanding Common Cold Symptoms",
      description: "Learn how to differentiate between a common cold and more serious conditions like the flu or COVID-19.",
      category: "Article",
      icon: <FileText className="h-5 w-5" />,
      link: "#"
    },
    {
      title: "Managing Chronic Pain",
      description: "Comprehensive guide to understanding and managing different types of chronic pain conditions.",
      category: "Guide",
      icon: <BookOpen className="h-5 w-5" />,
      link: "#"
    },
    {
      title: "Mental Health First Aid",
      description: "Essential information on how to provide initial help to people experiencing mental health problems.",
      category: "Video",
      icon: <Video className="h-5 w-5" />,
      link: "#"
    },
    {
      title: "Nutrition and Immune Health",
      description: "How proper nutrition can help strengthen your immune system and prevent illness.",
      category: "Article",
      icon: <FileText className="h-5 w-5" />,
      link: "#"
    },
    {
      title: "Sleep Hygiene Guidelines",
      description: "Practical tips for improving sleep quality and addressing common sleep problems.",
      category: "Guide",
      icon: <BookOpen className="h-5 w-5" />,
      link: "#"
    },
    {
      title: "First Aid Essentials",
      description: "Basic first aid techniques everyone should know for handling common emergencies.",
      category: "Video",
      icon: <Video className="h-5 w-5" />,
      link: "#"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Article":
        return "bg-blue-100 text-blue-600";
      case "Guide":
        return "bg-green-100 text-green-600";
      case "Video":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <section className="py-16 bg-health-gray">
      <div className="health-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-health-primary mb-4">Health Resources</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collection of trusted health resources to help you better understand various health topics.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-2">
                  <Badge className={getCategoryColor(resource.category)}>
                    <span className="flex items-center">
                      {resource.icon}
                      <span className="ml-1">{resource.category}</span>
                    </span>
                  </Badge>
                </div>
                <CardTitle className="text-xl">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">
                  {resource.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href={resource.link} className="flex items-center justify-center">
                    <span>Read More</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button className="bg-health-primary hover:bg-blue-700">
            View All Resources
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HealthResources;
