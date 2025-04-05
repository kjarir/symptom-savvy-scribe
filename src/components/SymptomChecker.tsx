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

// Diet recommendations for conditions
const dietRecommendationsDatabase = {
  "Common Cold": [
    "Warm chicken soup or broth",
    "Hot herbal teas with honey and lemon",
    "Vitamin C-rich foods (oranges, strawberries, kiwi)",
    "Garlic and onions for natural antiviral properties",
    "Stay hydrated with plenty of water"
  ],
  "Migraine": [
    "Avoid trigger foods (aged cheese, processed meats, chocolate)",
    "Magnesium-rich foods (dark leafy greens, nuts, seeds)",
    "Omega-3 fatty acids (salmon, flaxseeds)",
    "Stay hydrated and avoid alcohol",
    "Small, frequent meals to maintain blood sugar"
  ],
  "Tension Headache": [
    "Magnesium-rich foods (spinach, almonds, avocado)",
    "Anti-inflammatory foods (turmeric, ginger)",
    "Stay hydrated with water and electrolytes",
    "Limit caffeine and alcohol",
    "Regular, balanced meals to maintain blood sugar"
  ],
  "Flu": [
    "Clear broths and soups",
    "Electrolyte-rich drinks",
    "Vitamin C-rich foods (citrus, berries, bell peppers)",
    "Zinc-rich foods (lean meats, chickpeas, pumpkin seeds)",
    "Ginger and turmeric for anti-inflammatory benefits"
  ],
  "COVID-19": [
    "High-protein foods to support immunity (fish, eggs, beans)",
    "Vitamin D-rich foods (fatty fish, egg yolks)",
    "Probiotic foods for gut health (yogurt, kefir)",
    "Anti-inflammatory foods (berries, leafy greens)",
    "Stay well hydrated with water and herbal teas"
  ],
  "Allergies": [
    "Anti-inflammatory foods (fatty fish, turmeric, ginger)",
    "Local honey (may help with seasonal allergies)",
    "Quercetin-rich foods (apples, berries, onions)",
    "Vitamin C-rich foods to support immune function",
    "Avoid common allergens (dairy, gluten) if sensitive"
  ],
  "Food Poisoning": [
    "Clear liquids (water, broth, electrolyte solutions)",
    "BRAT diet (bananas, rice, applesauce, toast)",
    "Avoid dairy, spicy foods, and fatty foods",
    "Ginger tea to soothe nausea",
    "Gradually reintroduce bland foods as symptoms improve"
  ],
  "Vertigo": [
    "Hydrating foods and plenty of water",
    "Low-sodium diet to reduce fluid retention",
    "Avoid caffeine and alcohol",
    "Vitamin D and calcium-rich foods (dairy, fortified foods)",
    "Small, frequent meals to prevent blood sugar fluctuations"
  ],
  "Anxiety": [
    "Complex carbohydrates (oats, whole grains)",
    "Omega-3 fatty acids (fatty fish, walnuts, flaxseeds)",
    "Magnesium-rich foods (dark chocolate, leafy greens)",
    "Probiotic foods for gut-brain health",
    "Limit caffeine, alcohol, and high-sugar foods"
  ],
  "Acid Reflux": [
    "Avoid spicy, acidic, and fatty foods",
    "Alkaline foods (melons, bananas, cauliflower)",
    "Smaller, more frequent meals",
    "Avoid eating close to bedtime",
    "Ginger and chamomile tea to soothe symptoms"
  ],
  "Eczema": [
    "Anti-inflammatory omega-3 foods (fish, flaxseeds)",
    "Probiotic foods for gut health (yogurt, fermented foods)",
    "Vitamin E-rich foods (nuts, seeds, olive oil)",
    "Avoid common trigger foods (dairy, gluten, eggs)",
    "Quercetin-rich foods (apples, onions) to reduce inflammation"
  ],
  "Sinusitis": [
    "Spicy foods to promote drainage (cayenne, horseradish)",
    "Anti-inflammatory foods (turmeric, ginger)",
    "Vitamin A-rich foods for mucosal health (carrots, sweet potatoes)",
    "Hydrating foods and plenty of fluids",
    "Avoid dairy which can increase mucus production"
  ],
  "Bronchitis": [
    "Warm liquids (tea, broth) to soothe irritated airways",
    "Honey for cough relief (for adults and children over 1)",
    "Vitamin C and antioxidant-rich foods",
    "Anti-inflammatory spices (turmeric, ginger)",
    "Stay well hydrated to thin mucus"
  ],
  "Asthma": [
    "Vitamin D-rich foods (fatty fish, fortified foods)",
    "Omega-3 fatty acids to reduce inflammation",
    "Magnesium-rich foods to relax airways",
    "Vitamin C and E for antioxidant protection",
    "Avoid sulfites, preservatives, and known trigger foods"
  ],
  "Strep Throat": [
    "Soft, easy-to-swallow foods (soups, smoothies, yogurt)",
    "Warm liquids with honey for soothing",
    "Cold foods (ice cream, popsicles) to numb pain",
    "Vitamin C-rich foods to support immune function",
    "Avoid acidic, spicy, or rough-textured foods"
  ],
  "Tonsillitis": [
    "Soft, non-acidic foods (mashed potatoes, bananas)",
    "Cold foods to reduce inflammation (ice cream, popsicles)",
    "Warm broths and soups for comfort",
    "Caffeine-free herbal teas with honey",
    "Avoid spicy, crunchy, or acidic foods"
  ],
  "Stomach Flu": [
    "Clear liquids initially (water, broth, electrolyte drinks)",
    "BRAT diet (bananas, rice, applesauce, toast)",
    "Ginger or peppermint tea for nausea",
    "Avoid dairy, caffeine, alcohol, and fatty foods",
    "Gradually reintroduce bland foods"
  ],
  "Motion Sickness": [
    "Small, light meals before traveling",
    "Ginger (tea, candies, or capsules)",
    "Avoid heavy, fatty, or spicy meals before travel",
    "Stay hydrated but avoid alcohol",
    "Peppermint tea or candies may help some people"
  ],
  "Low Blood Pressure": [
    "Increased salt intake (consult doctor first)",
    "Hydrating foods and plenty of fluids",
    "Small, frequent meals to prevent drops in blood pressure",
    "Foods rich in B vitamins (whole grains, meat)",
    "Iron-rich foods (lean meats, lentils, spinach)"
  ],
  "Dehydration": [
    "Electrolyte-rich foods (bananas, coconut water)",
    "Water-rich fruits and vegetables (watermelon, cucumber)",
    "Broths and clear soups",
    "Avoid caffeine and alcohol which can worsen dehydration",
    "Small, frequent fluid intake throughout the day"
  ],
  "Anemia": [
    "Iron-rich foods (red meat, beans, spinach)",
    "Vitamin C to enhance iron absorption (citrus, bell peppers)",
    "Vitamin B12 sources (meat, dairy, fortified foods)",
    "Folate-rich foods (leafy greens, lentils)",
    "Avoid tea and coffee with meals as they inhibit iron absorption"
  ],
  "Depression": [
    "Omega-3 fatty acids (fatty fish, walnuts)",
    "Foods rich in B vitamins (whole grains, eggs)",
    "Antioxidant-rich fruits and vegetables",
    "Vitamin D sources (fatty fish, egg yolks, fortified foods)",
    "Limit processed foods, sugar, and alcohol"
  ],
  "Chronic Fatigue Syndrome": [
    "Anti-inflammatory foods (colorful vegetables, olive oil)",
    "Protein-rich foods for energy (lean meats, beans)",
    "Complex carbohydrates for sustained energy",
    "Magnesium-rich foods for muscle function",
    "Avoid inflammatory foods (processed foods, refined sugar)"
  ],
  "Thyroid Issues": [
    "For hypothyroidism: Iodine-rich foods (seaweed, fish) in moderation",
    "For hyperthyroidism: Limit iodine-rich foods",
    "Selenium-rich foods (Brazil nuts, seafood)",
    "Zinc-rich foods (oysters, pumpkin seeds)",
    "Avoid goitrogens (raw cruciferous vegetables) if iodine-deficient"
  ],
  "Gastritis": [
    "Small, frequent meals",
    "Avoid spicy, acidic, and fatty foods",
    "Probiotic foods (yogurt, kefir) when tolerated",
    "High-fiber foods to promote healing",
    "Avoid alcohol, caffeine, and NSAIDs"
  ],
  "Appendicitis": [
    "Follow doctor's recommendations (usually NPO before surgery)",
    "Post-surgery: Clear liquids progressing to regular diet",
    "High-fiber foods when recovered to maintain bowel health",
    "Stay well hydrated",
    "Regular small meals as tolerated during recovery"
  ],
  "IBS": [
    "Low FODMAP diet under guidance",
    "Soluble fiber sources (oats, fruits)",
    "Probiotic foods for gut health",
    "Adequate hydration",
    "Identify and avoid personal trigger foods"
  ],
  "Heart Attack": [
    "Low-sodium, heart-healthy diet",
    "Omega-3 rich fish (salmon, mackerel)",
    "Plenty of fruits and vegetables",
    "Whole grains and fiber-rich foods",
    "Limit saturated fats, trans fats, and cholesterol"
  ],
  "Pneumonia": [
    "Protein-rich foods for recovery (eggs, lean meats)",
    "Vitamin C-rich foods to support immunity",
    "Plenty of fluids to thin mucus",
    "Warm broths and soups for comfort",
    "Small, frequent meals if appetite is poor"
  ],
  "Allergic Reaction": [
    "Eliminate the allergen from diet completely",
    "Anti-inflammatory foods (turmeric, fatty fish)",
    "Quercetin-rich foods (apples, berries) to stabilize mast cells",
    "Vitamin C-rich foods to support immune function",
    "Stay well hydrated to support detoxification"
  ],
  "Psoriasis": [
    "Anti-inflammatory omega-3 foods (fatty fish)",
    "Colorful fruits and vegetables (antioxidants)",
    "Vitamin D-rich foods (fish, eggs)",
    "Turmeric and other anti-inflammatory spices",
    "Limit alcohol, tobacco, and processed foods"
  ],
  "Chickenpox": [
    "Soft, easy-to-eat foods if mouth sores present",
    "Vitamin A and E-rich foods for skin health",
    "Foods high in lysine (fish, chicken) and low in arginine (nuts, chocolate)",
    "Plenty of fluids to prevent dehydration",
    "Cold foods may help with fever and discomfort"
  ]
};

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<{ conditions: string[], medications: string[], dietRecommendations: Record<string, string[]> } | null>(null);
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
      
      // Get diet recommendations for each condition
      const conditionDietRecommendations: Record<string, string[]> = {};
      
      Array.from(possibleConditions).forEach(condition => {
        // Add medications
        if (medicationsDatabase[condition as keyof typeof medicationsDatabase]) {
          medicationsDatabase[condition as keyof typeof medicationsDatabase].forEach(medication => {
            possibleMedications.add(medication);
          });
        }
        
        // Add diet recommendations
        if (dietRecommendationsDatabase[condition as keyof typeof dietRecommendationsDatabase]) {
          conditionDietRecommendations[condition] = 
            dietRecommendationsDatabase[condition as keyof typeof dietRecommendationsDatabase];
        }
      });
      
      setResults({
        conditions: Array.from(possibleConditions),
        medications: Array.from(possibleMedications),
        dietRecommendations: conditionDietRecommendations
      });
      
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetChecker = () => {
    setSymptoms("");
    setResults(null);
  };

  return (
    <section id="symptom-checker" className="py-12 animate-fade-in">
      <div className="health-container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-health-primary mb-4">Symptom Checker</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Describe your symptoms in detail for the most accurate results. Our AI-powered system will analyze your input and suggest potential conditions, medications, and dietary recommendations.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Card className="transition-all duration-300 hover:shadow-lg">
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
                className="bg-health-primary hover:bg-blue-700 transition-all duration-300"
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
            <div className="mt-8 space-y-6 animate-fade-in">
              <Card className="transition-all duration-300 hover:shadow-lg">
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
                      <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100">
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
              
              <Card className="transition-all duration-300 hover:shadow-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
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
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100">
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
              
              <Card className="transition-all duration-300 hover:shadow-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <CardHeader className="bg-green-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Dietary Recommendations
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    These dietary suggestions may help manage symptoms for the identified conditions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {Object.entries(results.dietRecommendations).map(([condition, recommendations], index) => (
                      <div key={index} className="space-y-3">
                        <h4 className="font-semibold text-lg text-health-primary">{condition}</h4>
                        <ul className="space-y-2 pl-2">
                          {recommendations.map((recommendation, recIndex) => (
                            <li key={recIndex} className="flex items-center p-3 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100">
                              <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                              <span className="font-medium text-gray-900">{recommendation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Dietary Guidance</h4>
                        <p className="text-sm text-gray-600">
                          These dietary recommendations are general guidelines. Individual nutritional needs may vary, and you should consult with a healthcare professional or dietitian for personalized advice.
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
