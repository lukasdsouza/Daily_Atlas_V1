
import React, { useState } from "react";
import Header from "@/components/Header";
import GlobeViewer, { Country, countries } from "@/components/GlobeViewer";
import NewsPanel from "@/components/NewsPanel";
import StarsBackground from "@/components/StarsBackground";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Rocket, Info } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const handleCountrySelect = (country: Country) => {
    toast(`Exploring news from ${country.name}`, {
      icon: "🌎",
    });
    setSelectedCountry(country);
  };

  return (
    <div className="min-h-screen px-4 py-6 relative overflow-hidden">
      <StarsBackground />
      
      <Header />
      
      <main className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="cosmos-card w-full max-w-xl mb-6">
            <div className="flex items-start gap-3">
              <Rocket className="w-6 h-6 text-space-bright shrink-0 mt-1" />
              <p className="text-muted-foreground">
                Welcome to <span className="text-space-bright font-medium">Daily Atlas</span>, 
                your cosmic portal to global news. Rotate the interactive globe and select any 
                highlighted country to explore its current headlines. The universe of information 
                is at your fingertips!
              </p>
            </div>
          </div>
          
          <ErrorBoundary>
            <div className="w-full glassmorphism p-4 relative">
              <button 
                onClick={() => setShowInfo(!showInfo)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-space-dark/60 hover:bg-space-dark/80 transition-colors"
                aria-label="Show information"
              >
                <Info className="w-4 h-4 text-space-blue" />
              </button>
              
              {showInfo && (
                <div className="absolute top-14 right-4 z-10 cosmos-card w-64 text-xs">
                  <h4 className="font-medium text-space-bright mb-1">How to use the globe:</h4>
                  <ul className="text-muted-foreground list-disc list-inside">
                    <li>Drag to rotate</li>
                    <li>Pinch or scroll to zoom</li>
                    <li>Click on a purple marker to view news</li>
                  </ul>
                </div>
              )}
              
              <GlobeViewer 
                onCountrySelect={handleCountrySelect} 
                selectedCountry={selectedCountry} 
              />
            </div>
          </ErrorBoundary>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {countries.map((country) => (
              <button
                key={country.id}
                onClick={() => handleCountrySelect(country)}
                className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                  selectedCountry?.id === country.id 
                    ? "bg-space-bright text-primary-foreground" 
                    : "bg-space-dark hover:bg-space-purple text-white"
                }`}
              >
                {country.name}
              </button>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="text-center text-muted-foreground text-sm mt-10">
        <p>Daily Atlas &copy; {new Date().getFullYear()} - Explore the world's news from space</p>
      </footer>
      
      {selectedCountry && (
        <NewsPanel 
          country={selectedCountry} 
          onClose={() => setSelectedCountry(null)} 
        />
      )}
    </div>
  );
};

export default Index;
