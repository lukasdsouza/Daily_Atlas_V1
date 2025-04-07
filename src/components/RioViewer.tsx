
import React, { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import RioScene from "./rio/RioScene";
import { Neighborhood } from "@/data/neighborhoods";

interface RioViewerProps {
  onNeighborhoodSelect: (neighborhood: Neighborhood) => void;
  selectedNeighborhood: Neighborhood | null;
}

const RioViewer: React.FC<RioViewerProps> = ({ onNeighborhoodSelect, selectedNeighborhood }) => {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={canvasRef} className="w-full h-full">
      <RioScene 
        onNeighborhoodSelect={onNeighborhoodSelect} 
        selectedNeighborhood={selectedNeighborhood}
      />
      
      {selectedNeighborhood && (
        <div className="absolute left-4 top-4 bg-white/80 backdrop-blur-sm p-2 rounded-lg text-primary border border-gray-300 text-sm">
          {selectedNeighborhood.name}
        </div>
      )}
    </div>
  );
};

export default RioViewer;
