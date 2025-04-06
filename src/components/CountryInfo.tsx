
import React from "react";
import { MapPin } from "lucide-react";
import { Country } from "@/data/countries";

interface CountryInfoProps {
  selectedCountry: Country | null;
}

const CountryInfo: React.FC<CountryInfoProps> = ({ selectedCountry }) => {
  if (!selectedCountry) return null;
  
  return (
    <>
      {!selectedCountry.isCity && (
        <div className="fixed left-4 bottom-16 md:left-6 md:bottom-6 bg-space-dark/90 backdrop-blur-sm p-3 rounded-lg text-white border border-space-purple/50 text-sm shadow-lg transition-all duration-300 ease-in-out max-w-[250px]">
          <h3 className="font-bold mb-1">{selectedCountry.name}</h3>
          <p className="text-xs text-space-bright/70">{selectedCountry.description || "Explore este local no mapa."}</p>
          {selectedCountry.continent && (
            <p className="text-xs text-space-bright/70 mt-1">
              <span className="font-medium">Continente:</span> {selectedCountry.continent}
            </p>
          )}
        </div>
      )}
      
      {selectedCountry.isCity && (
        <div className="fixed left-4 bottom-16 md:left-6 md:bottom-6 bg-space-dark/90 backdrop-blur-sm p-3 rounded-lg text-white border border-space-purple/50 shadow-lg transition-all duration-300 ease-in-out max-w-[250px]">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#33FFD0] shrink-0" />
            <div>
              <h3 className="font-bold text-lg">{selectedCountry.name}</h3>
              <p className="text-xs text-space-bright/70">{selectedCountry.description}</p>
              {selectedCountry.continent && (
                <p className="text-xs text-space-bright/70 mt-1">
                  <span className="font-medium">Continente:</span> {selectedCountry.continent}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CountryInfo;
