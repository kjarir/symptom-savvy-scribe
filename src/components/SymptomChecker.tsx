
import React, { useState } from 'react';
import { CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Mock database of symptoms and conditions
const symptomsDatabase = {
  "headache": ["Common Cold", "Migraine", "Tension Headache", "Sinusitis"],
  "fever": ["Flu", "COVID-19", "Common Cold", "Infection"],
  "cough": ["Common Cold", "Bronchitis", "COVID-19", "Asthma"],
  "sore throat": ["Strep Throat", "Common Cold", "Tonsillitis"],
  "runny nose": ["Common Cold", "Allergies", "Sinusitis"],
  "nausea": ["Food Poisoning", "Migraine", "Stomach Flu", "Motion Sickness"],
  "vomiting": ["Food Poisoning", "Stomach Flu", "Appendicitis"],
  "dizziness": ["Vertigo", "Low Blood Pressure", "Migraine", "Dehydration"],
  "fatigue": ["Anemia", "Depression", "Chronic Fatigue Syndrome", "Thyroid Issues"],
  "stomach pain": ["Gastritis", "Appendicitis", "Food Poisoning", "IBS"],
  "chest pain": ["Heart Attack", "Anxiety", "Acid Reflux", "Pneumonia"],
  "rash": ["Allergic Reaction", "Eczema", "Psoriasis", "Chickenpox"]
};

// Mock medication database
const medicationsDatabase = {
  "Common Cold": ["Acetaminophen", "Ibuprofen", "Decongestants", "Antihistamines"],
  "Migraine": ["Sumatriptan", "Rizatriptan", "Ibuprofen", "Acetaminophen"],
  "Tension Headache": ["Ibuprofen", "Acetaminophen", "Naproxen"],
  "Flu": ["Oseltamivir", "Acetaminophen", "Ibuprofen", "Decongestants"],
  "COVID-19": ["Acetaminophen", "Ibuprofen", "Consult doctor for specific treatments"],
  "Allergies": ["Cetirizine", "Loratadine", "Fexofenadine", "Diphenhydramine"],
  "Food Poisoning": ["Bismuth subsalicylate", "Loperamide", "Oral rehydration solution"],
  "Vertigo": ["Meclizine", "Dimenhydrinate", "Scopolamine"],
  "Anxiety": ["Alprazolam", "Escitalopram", "Sertraline", "Venlafaxine"],
  "Acid Reflux": ["Omeprazole", "Lansoprazole", "Ranitidine", "Antacids"],
  "Eczema": ["Hydrocortisone cream", "Moisturizers", "Antihistamines"],
  "Sinusitis": ["Amoxicillin", "Pseudoephedrine", "Saline nasal spray"],
  "Bronchitis": ["Dextromethorphan", "Guaifenesin", "Antibiotics if bacterial"],
  "Asthma": ["Albuterol", "Fluticasone", "Montelukast"],
  "Strep Throat": ["Penicillin", "Amoxicillin", "Azithromycin"],
  "Tonsillitis": ["Penicillin", "Acetaminophen", "Ibuprofen"],
  "Stomach Flu": ["Bismuth subsalicylate", "Loperamide", "Oral rehydration solution"],
  "Motion Sickness": ["Dimenhydrinate", "Meclizine", "Scopolamine"],
  "Low Blood Pressure": ["Fludrocortisone", "Midodrine", "Increased salt intake"],
  "Dehydration": ["Oral rehydration solution", "Electrolyte drinks"],
  "Anemia": ["Iron supplements", "Vitamin B12", "Folic acid"],
  "Depression": ["Sertraline", "Escitalopram", "Fluoxetine", "Venlafaxine"],
  "Chronic Fatigue Syndrome": ["Cognitive behavioral therapy", "Graded exercise therapy"],
  "Thyroid Issues": ["Levothyroxine", "Methimazole"],
  "Gastritis": ["Antacids", "Proton pump inhibitors", "H2 blockers"],
  "Appendicitis": ["Surgery", "Antibiotics"],
  "IBS": ["Antispasmodics", "Loperamide", "Fiber supplements"],
  "Heart Attack": ["Aspirin", "Nitroglycerin", "Emergency medical attention"],
  "Pneumonia": ["Antibiotics", "Cough medicine", "Pain relievers"],
  "Allergic Reaction": ["Antihistamines", "Epinephrine for severe reactions", "Corticosteroids"],
  "Psoriasis": ["Topical corticosteroids", "Vitamin D analogs", "Retinoids"],
  "Chickenpox": ["Calamine lotion", "Antihistamines", "Acetaminophen"]
};

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<{ conditions: string[], medications: string[] } | null>(null);
  const { toast } = useToast();

  const analyzeSymptoms = () => {
    if (!symptoms.trim()) {
      toast({
        title: "Error",
        description: "Please enter your symptoms",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      const enteredSymptoms = symptoms.toLowerCase();
      const possibleConditions = new Set<string>();
      
      // Check which symptoms are present in our database
      Object.keys(symptomsDatabase).forEach(symptom => {
        if (enteredSymptoms.includes(symptom)) {
          symptomsDatabase[symptom as keyof typeof symptomsDatabase].forEach(condition => {
            possibleConditions.add(condition);
          });
        }
      });
      
      // If no conditions found
      if (possibleConditions.size === 0) {
        toast({
          title: "No matches found",
          description: "We couldn't identify specific conditions based on your symptoms. Please be more specific or consult a healthcare professional.",
          variant: "destructive",
        });
        setIsAnalyzing(false);
        return;
      }
      
      // Get unique medications for identified conditions
      const possibleMedications = new Set<string>();
      Array.from(possibleConditions).forEach(condition => {
        if (medicationsDatabase[condition as keyof typeof medicationsDatabase]) {
          medicationsDatabase[condition as keyof typeof medicationsDatabase].forEach(medication => {
            possibleMedications.add(medication);
          });
        }
      });
      
      setResults({
        conditions: Array.from(possibleConditions),
        medications: Array.from(possibleMedications)
      });
      
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetChecker = () => {
    setSymptoms("");
    setResults(null);
  };

  return (
    <section id="symptom-checker" className="py-12">
      <div className="health-container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-health-primary mb-4">Symptom Checker</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Describe your symptoms in detail for the most accurate results. Our AI-powered system will analyze your input and suggest potential conditions and medications.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Describe Your Symptoms</CardTitle>
              <CardDescription>
                Be specific about what you're experiencing, including duration and severity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Example: I've had a headache for two days, along with a sore throat and mild fever..."
                className="min-h-[120px] health-input"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                disabled={isAnalyzing}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetChecker} disabled={isAnalyzing}>
                Reset
              </Button>
              <Button 
                onClick={analyzeSymptoms} 
                disabled={isAnalyzing}
                className="bg-health-primary hover:bg-blue-700"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Symptoms"
                )}
              </Button>
            </CardFooter>
          </Card>
          
          {results && (
            <div className="mt-8 space-y-6">
              <Card>
                <CardHeader className="bg-health-primary text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Possible Conditions
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    Based on your symptoms, these conditions are possible matches.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {results.conditions.map((condition, index) => (
                      <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-health-green mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-gray-900">{condition}</h4>
                          <p className="text-sm text-gray-600">
                            This is a potential match based on your described symptoms.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Important Disclaimer</h4>
                        <p className="text-sm text-gray-600">
                          This is not a medical diagnosis. Always consult with a healthcare professional for proper evaluation and treatment.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-health-secondary text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Possible Medications
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    These medications are commonly used for the identified conditions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.medications.map((medication, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-health-green mr-3 flex-shrink-0" />
                        <span className="font-medium text-gray-900">{medication}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-health-lightGreen border border-health-green rounded-lg">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-health-green mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Medication Safety</h4>
                        <p className="text-sm text-gray-600">
                          Never take medications without consulting a healthcare professional. Always check for contraindications and proper dosing.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SymptomChecker;
