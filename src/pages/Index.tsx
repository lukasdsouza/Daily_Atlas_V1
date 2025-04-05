
import React, { useState } from "react";
import Header from "@/components/Header";
import GlobeViewer, { Country, countries } from "@/components/GlobeViewer";
import NewsPanel from "@/components/NewsPanel";
import StarsBackground from "@/components/StarsBackground";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Info, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showCountryList, setShowCountryList] = useState(false);

  const handleCountrySelect = (country: Country) => {
    toast(`Exploring ${country.name}`, {
      icon: "🌎",
    });
    setSelectedCountry(country);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarsBackground />
      
      <Header />
      
      <main className="max-w-full mx-auto h-[calc(100vh-80px)]">
        <div className="flex flex-col h-full relative">
          <ErrorBoundary>
            <div className="w-full h-full relative flex-grow">
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
          
          <button 
            onClick={() => setShowCountryList(!showCountryList)}
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 bg-space-dark/70 hover:bg-space-dark/90 backdrop-blur-sm px-4 py-2 rounded-full border border-space-purple/30 text-white text-sm flex items-center gap-2 transition-all"
          >
            {showCountryList ? "Hide Countries" : "Select Country"} 
            <ArrowRight className={`w-4 h-4 transition-transform ${showCountryList ? "rotate-90" : ""}`} />
          </button>
          
          {showCountryList && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 glassmorphism p-3 rounded-xl max-w-xs w-full">
              <div className="flex flex-wrap justify-center gap-2 max-h-40 overflow-y-auto px-2 py-1">
                {countries.map((country) => (
                  <button
                    key={country.id}
                    onClick={() => {
                      handleCountrySelect(country);
                      setShowCountryList(false);
                    }}
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
          )}
        </div>
      </main>
      
      <footer className="text-center text-muted-foreground text-xs absolute bottom-2 w-full opacity-50 hover:opacity-100 transition-opacity">
        <p>Daily Atlas &copy; {new Date().getFullYear()}</p>
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
