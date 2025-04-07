
import React from "react";
import { MapPin, Info, Navigation } from "lucide-react";
import { Neighborhood } from "@/data/neighborhoods";

interface NeighborhoodInfoProps {
  selectedNeighborhood: Neighborhood | null;
}

const NeighborhoodInfo: React.FC<NeighborhoodInfoProps> = ({ selectedNeighborhood }) => {
  if (!selectedNeighborhood) return null;
  
  return (
    <div 
      className="fixed left-4 bottom-16 md:left-6 md:bottom-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl text-gray-800 border border-gray-300 shadow-lg transition-all duration-300 ease-in-out max-w-[300px] transform hover:scale-[1.02] touch-action-manipulation"
    >
      <div className="flex gap-3">
        <div className="shrink-0">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <MapPin className="h-5 w-5 text-white" />
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg">{selectedNeighborhood.name}</h3>
          <p className="text-sm text-gray-700 mt-1">{selectedNeighborhood.description}</p>
          
          <div className="mt-2 p-2 bg-blue-100 rounded-lg">
            <p className="text-xs flex items-center gap-1 text-blue-700">
              <Navigation className="h-3 w-3" />
              <span>Explore as atrações em {selectedNeighborhood.name}</span>
            </p>
          </div>
          
          <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
            <Info className="h-3 w-3" />
            <span>Zona: {getZoneName(selectedNeighborhood.zone)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

function getZoneName(zone: string): string {
  switch (zone) {
    case 'sul': return 'Zona Sul';
    case 'norte': return 'Zona Norte';
    case 'oeste': return 'Zona Oeste';
    case 'central': return 'Zona Central';
    default: return zone;
  }
}

export default NeighborhoodInfo;
