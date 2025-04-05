
import React, { useState } from 'react';
import { MapPin, Calendar, Search, ChevronDown, Clock, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Sample doctor data (would typically come from an API)
const DOCTORS = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "General Practitioner",
    rating: 4.8,
    reviews: 127,
    distance: 0.8,
    availability: ["Today", "Tomorrow", "Wed"],
    image: "https://i.pravatar.cc/150?img=32",
    address: "123 Health St, Medical Center"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 214,
    distance: 1.3,
    availability: ["Tomorrow", "Thu", "Fri"],
    image: "https://i.pravatar.cc/150?img=68",
    address: "456 Wellness Ave, Heart Institute"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    rating: 4.7,
    reviews: 95,
    distance: 2.1,
    availability: ["Today", "Thu", "Fri"],
    image: "https://i.pravatar.cc/150?img=26",
    address: "789 Care Lane, Children's Clinic"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Dermatologist",
    rating: 4.6,
    reviews: 78,
    distance: 3.0,
    availability: ["Wed", "Thu", "Fri"],
    image: "https://i.pravatar.cc/150?img=51",
    address: "101 Skin Blvd, Dermatology Center"
  }
];

const specialties = [
  "All Specialties",
  "General Practitioner",
  "Cardiologist",
  "Pediatrician",
  "Dermatologist",
  "Neurologist",
  "Orthopedist"
];

const DoctorAppointment = () => {
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState(specialties[0]);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const { toast } = useToast();

  const handleBookAppointment = (doctorId: number) => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Please select a date and time",
        description: "You need to select both a date and time to book an appointment",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would make an API call to book the appointment
    toast({
      title: "Appointment Booked!",
      description: `Your appointment has been scheduled for ${selectedDate} at ${selectedTime}`,
    });

    // Reset selection
    setSelectedDoctor(null);
    setSelectedDate("");
    setSelectedTime("");
  };

  const handleUseCurrentLocation = () => {
    // In a real app, this would use the Geolocation API
    setLocation("Current Location");
    toast({
      title: "Location detected",
      description: "Using your current location to find nearby doctors",
    });
  };

  return (
    <div className="py-12 bg-health-gray" id="doctor-appointment">
      <div className="health-container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Find Doctors Near You</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Book appointments with the best doctors in your area. 
            We'll help you find specialists who match your needs and are available when you need them.
          </p>
        </div>

        {/* Search Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="flex items-center border rounded-md px-3 py-2">
                <MapPin className="text-health-primary mr-2 h-5 w-5" />
                <input 
                  type="text" 
                  placeholder="Enter your location" 
                  className="flex-1 focus:outline-none"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <Button 
                variant="link" 
                className="text-health-primary absolute right-2 top-2 text-sm"
                onClick={handleUseCurrentLocation}
              >
                Use current location
              </Button>
            </div>
            
            <div className="relative">
              <div className="flex items-center border rounded-md px-3 py-2">
                <Search className="text-health-primary mr-2 h-5 w-5" />
                <select 
                  className="flex-1 bg-transparent focus:outline-none appearance-none"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                >
                  {specialties.map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
            
            <Button className="bg-health-primary hover:bg-blue-700">
              Find Doctors
            </Button>
          </div>
        </div>

        {/* Doctor Listings */}
        <div className="grid md:grid-cols-2 gap-6">
          {DOCTORS.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-start">
                  <div className="mr-4">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-health-primary"
                    />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <div className="text-sm text-gray-500">{doctor.specialty}</div>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm ml-1">{doctor.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({doctor.reviews} reviews)</span>
                      <div className="ml-auto flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        {doctor.distance} miles away
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="text-sm text-gray-600 mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-health-primary" />
                  {doctor.address}
                </div>
                
                {selectedDoctor === doctor.id ? (
                  <div className="mt-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Select Date:</label>
                      <div className="flex gap-2">
                        {doctor.availability.map((day) => (
                          <Button 
                            key={day} 
                            variant={selectedDate === day ? "default" : "outline"}
                            className={selectedDate === day ? "bg-health-primary" : ""}
                            onClick={() => setSelectedDate(day)}
                          >
                            {day}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {selectedDate && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Select Time:</label>
                        <div className="grid grid-cols-3 gap-2">
                          {["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"].map((time) => (
                            <Button 
                              key={time} 
                              variant={selectedTime === time ? "default" : "outline"}
                              className={selectedTime === time ? "bg-health-primary" : ""}
                              onClick={() => setSelectedTime(time)}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-2 mt-4">
                      <Button 
                        className="flex-1 bg-health-primary hover:bg-blue-700"
                        onClick={() => handleBookAppointment(doctor.id)}
                      >
                        Confirm Booking
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setSelectedDoctor(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-2">Next Available:</p>
                      <div className="flex flex-wrap gap-2">
                        {doctor.availability.map((day) => (
                          <span key={day} className="px-2 py-1 bg-health-lightGreen text-health-green rounded-full text-xs">
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-0 flex justify-between">
                {selectedDoctor !== doctor.id && (
                  <>
                    <Button 
                      variant="outline" 
                      className="flex items-center"
                      onClick={() => window.open(`tel:+1234567890`)}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button 
                      className="bg-health-primary hover:bg-blue-700"
                      onClick={() => setSelectedDoctor(doctor.id)}
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      Book Appointment
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;
