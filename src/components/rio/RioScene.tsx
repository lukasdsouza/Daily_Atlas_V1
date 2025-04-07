
import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Neighborhood } from "@/data/neighborhoods";
import RioModel from "./RioModel";

interface RioSceneProps {
  onNeighborhoodSelect: (neighborhood: Neighborhood) => void;
  selectedNeighborhood: Neighborhood | null;
}

const RioScene: React.FC<RioSceneProps> = ({ 
  onNeighborhoodSelect,
  selectedNeighborhood
}) => {
  const controlsRef = useRef(null);

  // Adjust camera when a neighborhood is selected
  useEffect(() => {
    if (controlsRef.current && selectedNeighborhood) {
      // Disable autoRotate when a neighborhood is selected
      controlsRef.current.autoRotate = false;
    }
  }, [selectedNeighborhood]);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 7, 7], fov: 45 }}
        gl={{ antialias: true }}
        shadows
      >
        {/* Ambient light */}
        <ambientLight intensity={0.6} />
        
        {/* Main directional light (sun) */}
        <directionalLight 
          color="#ffffff" 
          position={[5, 10, 5]} 
          intensity={1.5} 
          castShadow 
        />
        
        {/* Secondary fill light */}
        <directionalLight color="#e0c080" position={[-2, 8, -2]} intensity={0.4} />
        
        {/* Rio model */}
        <RioModel 
          onNeighborhoodSelect={onNeighborhoodSelect} 
          selectedNeighborhood={selectedNeighborhood} 
        />
        
        <OrbitControls 
          ref={controlsRef}
          enableZoom={true}
          enablePan={true}
          rotateSpeed={0.5}
          zoomSpeed={0.7}
          minDistance={4}
          maxDistance={15} 
          maxPolarAngle={Math.PI / 2.1}
          autoRotate={!selectedNeighborhood}
          autoRotateSpeed={0.5}
          enableDamping={true}
          dampingFactor={0.1}
        />
        
        {/* Simple blue background gradient */}
        <color attach="background" args={['#87CEEB']} />
        <fog attach="fog" args={['#87CEEB', 15, 30]} />
      </Canvas>
    </div>
  );
};

export default RioScene;
