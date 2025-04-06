
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
        <div className="absolute left-4 top-4 bg-space-dark/80 backdrop-blur-sm p-2 rounded-lg text-white border border-space-purple/30 text-sm">
          {selectedCountry.name}
        </div>
      )}
      
      {selectedCountry.isCity && (
        <div className="absolute left-4 top-4 bg-space-dark/80 backdrop-blur-sm p-3 rounded-lg text-white border border-space-purple/30">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#33FFD0]" />
            <div>
              <h3 className="font-bold text-lg">{selectedCountry.name}</h3>
              <p className="text-xs text-muted-foreground">{selectedCountry.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CountryInfo;
