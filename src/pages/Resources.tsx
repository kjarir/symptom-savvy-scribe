
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, BookOpen, Video, Clock, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { healthArticles } from '../data/healthArticles';

const Resources = () => {
  const { id } = useParams();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    
    setTimeout(() => {
      if (id) {
        const article = healthArticles.find(article => article.id === parseInt(id));
        setSelectedArticle(article || null);
      } else {
        setSelectedArticle(null);
      }
      setIsLoading(false);
    }, 600);
    
    // Scroll to top when article changes
    window.scrollTo(0, 0);
  }, [id]);
  
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Article":
        return <FileText className="h-5 w-5" />;
      case "Guide":
        return <BookOpen className="h-5 w-5" />;
      case "Video":
        return <Video className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };
  
  const getCategoryColor = (category) => {
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-health-gray py-12 px-4 sm:px-6 lg:px-8">
        <div className="health-container max-w-4xl mx-auto">
          {!id ? (
            // Resources listing
            <>
              <div className="text-center mb-12 animate-fade-in">
                <h1 className="text-4xl font-bold text-health-primary mb-4">Health Resources</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Comprehensive guides, articles, and videos to help you understand various health topics and conditions.
                </p>
              </div>
              
              <div className="grid gap-6 animate-fade-in">
                {healthArticles.map((article) => (
                  <Link 
                    key={article.id} 
                    to={`/resources/${article.id}`}
                    className="transition-transform duration-300 hover:translate-y-[-4px]"
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          {article.image && (
                            <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                              <img 
                                src={article.image} 
                                alt={article.title} 
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                              />
                            </div>
                          )}
                          <div className={`p-6 ${article.image ? 'md:w-2/3' : 'w-full'}`}>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getCategoryColor(article.category)}>
                                <span className="flex items-center">
                                  {getCategoryIcon(article.category)}
                                  <span className="ml-1">{article.category}</span>
                                </span>
                              </Badge>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{article.readTime}</span>
                              </div>
                            </div>
                            <h2 className="text-xl font-bold mb-2 text-health-primary">{article.title}</h2>
                            <p className="text-gray-600 mb-4 line-clamp-2">{article.description}</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <User className="h-3 w-3 mr-1" />
                              <span>{article.author}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            // Single article view
            <>
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-pulse flex space-x-4">
                    <div className="space-y-6 w-full">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    </div>
                  </div>
                </div>
              ) : selectedArticle ? (
                <div className="animate-fade-in">
                  <Link to="/resources">
                    <Button variant="ghost" className="mb-6 group">
                      <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                      Back to Resources
                    </Button>
                  </Link>
                  
                  <div className="mb-4 flex items-center gap-3">
                    <Badge className={getCategoryColor(selectedArticle.category)}>
                      <span className="flex items-center">
                        {getCategoryIcon(selectedArticle.category)}
                        <span className="ml-1">{selectedArticle.category}</span>
                      </span>
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{selectedArticle.readTime}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-3 w-3 mr-1" />
                      <span>{selectedArticle.author}</span>
                    </div>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-health-primary mb-6">{selectedArticle.title}</h1>
                  
                  {selectedArticle.image && (
                    <div className="mb-8 rounded-lg overflow-hidden shadow-md">
                      <img 
                        src={selectedArticle.image} 
                        alt={selectedArticle.title} 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="prose prose-lg max-w-none">
                    {selectedArticle.content.map((paragraph, index) => (
                      <p key={index} className="mb-6 leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                  
                  {selectedArticle.tags && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <div className="flex flex-wrap gap-2">
                        {selectedArticle.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-100">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h2 className="text-2xl font-bold text-gray-700 mb-4">Article Not Found</h2>
                  <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
                  <Button asChild>
                    <Link to="/resources">
                      Back to Resources
                    </Link>
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Resources;
