
import React, { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import GlobeScene from "./globe/GlobeScene";
import { Country, countries } from "@/data/countries";

interface GlobeViewerProps {
  onCountrySelect: (country: Country) => void;
  selectedCountry: Country | null;
}

const GlobeViewer: React.FC<GlobeViewerProps> = ({ onCountrySelect, selectedCountry }) => {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={canvasRef} className="w-full h-full">
      <GlobeScene 
        onCountrySelect={onCountrySelect} 
        selectedCountry={selectedCountry}
        countries={countries}
        autoRotateToRio={true}
      />
      
      {selectedCountry && (
        <div className="absolute left-4 top-4 bg-space-dark/80 backdrop-blur-sm p-2 rounded-lg text-white border border-space-purple/30 text-sm">
          {selectedCountry.name}
        </div>
      )}
    </div>
  );
};

// Re-export the Country type and countries array
export type { Country };
export { countries };
export default GlobeViewer;
