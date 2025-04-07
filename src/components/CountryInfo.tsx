
import React from "react";
import { MapPin, Globe, Info, Navigation } from "lucide-react";
import { Country } from "@/data/countries";

interface CountryInfoProps {
  selectedCountry: Country | null;
}

const CountryInfo: React.FC<CountryInfoProps> = ({ selectedCountry }) => {
  if (!selectedCountry) return null;
  
  return (
    <div 
      className="fixed left-4 bottom-16 md:left-6 md:bottom-6 bg-space-dark/90 backdrop-blur-sm p-4 rounded-xl text-white border border-space-purple/50 shadow-lg transition-all duration-300 ease-in-out max-w-[300px] transform hover:scale-[1.02] touch-action-manipulation"
    >
      {selectedCountry.isCity ? (
        <div className="flex gap-3">
          <div className="shrink-0">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#33FFD0] to-[#1E88E5] flex items-center justify-center">
              <MapPin className="h-5 w-5 text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg">{selectedCountry.name}</h3>
            <p className="text-sm text-space-bright/90 mt-1">{selectedCountry.description}</p>
            {selectedCountry.id === "rio" && (
              <div className="mt-2 p-2 bg-blue-500/20 rounded-lg">
                <p className="text-xs flex items-center gap-1 text-blue-300">
                  <Navigation className="h-3 w-3" />
                  <span>Explore os bairros e atrações do Rio de Janeiro</span>
                </p>
              </div>
            )}
            {selectedCountry.continent && (
              <p className="text-xs text-space-bright/70 mt-2 flex items-center gap-1">
                <Globe className="h-3 w-3" />
                <span>{selectedCountry.continent}</span>
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex gap-3">
          <div className="shrink-0">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] flex items-center justify-center">
              <Globe className="h-5 w-5 text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg">{selectedCountry.name}</h3>
            <p className="text-sm text-space-bright/90 mt-1">
              {selectedCountry.description || "Explore este local no mapa."}
            </p>
            {selectedCountry.continent && (
              <p className="text-xs text-space-bright/70 mt-2 flex items-center gap-1">
                <Info className="h-3 w-3" />
                <span>Continente: {selectedCountry.continent}</span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryInfo;
