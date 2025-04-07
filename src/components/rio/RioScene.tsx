
import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
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
        camera={{ position: [0, 5, 5], fov: 45 }}
        gl={{ antialias: true }}
        shadows
      >
        {/* Ambient light */}
        <ambientLight intensity={0.7} />
        
        {/* Directional light with shadow - coming from top-right */}
        <directionalLight 
          color="#ffffff" 
          position={[5, 10, 5]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* Secondary light for better 3D effect - from bottom-left */}
        <directionalLight color="#e0e0e0" position={[-5, 3, -5]} intensity={0.6} />
        
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
          autoRotateSpeed={0.3}
          enableDamping={true}
          dampingFactor={0.1}
        />
        
        {/* Light gray background like in the reference image */}
        <color attach="background" args={['#d1d1d1']} />
        <fog attach="fog" args={['#d1d1d1', 15, 30]} />
      </Canvas>
    </div>
  );
};

export default RioScene;
