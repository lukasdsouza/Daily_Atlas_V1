
import React from "react";
import { MapPin, Info, Navigation, AlertTriangle, Building, Users, Map } from "lucide-react";
import { Neighborhood } from "@/data/neighborhoods";

interface NeighborhoodInfoProps {
  selectedNeighborhood: Neighborhood | null;
}

const NeighborhoodInfo: React.FC<NeighborhoodInfoProps> = ({ selectedNeighborhood }) => {
  if (!selectedNeighborhood) return null;
  
  return (
    <div 
      className="fixed left-4 bottom-16 md:left-6 md:bottom-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl text-gray-800 border border-blue-300 shadow-lg transition-all duration-300 ease-in-out max-w-[300px] transform hover:scale-[1.02] touch-action-manipulation"
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
          
          <div className="flex gap-2 mt-2">
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center gap-1">
              <Map className="h-3 w-3" />
              <span>{getZoneName(selectedNeighborhood.zone)}</span>
            </span>
            
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center gap-1">
              <Building className="h-3 w-3" />
              <span>{getNeighborhoodSize(selectedNeighborhood.size)}</span>
            </span>
          </div>
          
          <div className="mt-3 p-2 bg-blue-100 rounded-lg">
            <p className="text-xs flex items-center gap-1 text-blue-700">
              <Navigation className="h-3 w-3" />
              <span>Explore as atrações em {selectedNeighborhood.name}</span>
            </p>
          </div>
          
          {selectedNeighborhood.subNeighborhoods && selectedNeighborhood.subNeighborhoods.length > 0 && (
            <div className="mt-2">
              <p className="text-xs font-medium text-gray-600">Sub-bairros:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedNeighborhood.subNeighborhoods.map(sub => (
                  <span key={sub.id} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {sub.name}
                  </span>
                ))}
              </div>
            </div>
          )}
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

function getNeighborhoodSize(size: number): string {
  if (size >= 1.0) return 'Grande';
  if (size >= 0.7) return 'Médio';
  return 'Pequeno';
}

export default NeighborhoodInfo;
