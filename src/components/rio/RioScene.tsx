
import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
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

  return (
    <Canvas
      camera={{ position: [0, 2, 4], fov: 45 }}
      style={{ background: "linear-gradient(to bottom, #87CEEB, #f0f9ff)" }}
    >
      {/* Luz ambiente principal */}
      <ambientLight intensity={0.5} />
      
      {/* Luz direcional simulando o sol */}
      <directionalLight color="#ffffff" position={[5, 10, 5]} intensity={1} />
      <directionalLight color="#f9e076" position={[-2, 8, -2]} intensity={0.3} />
      
      {/* Modelo do Rio */}
      <RioModel 
        onNeighborhoodSelect={onNeighborhoodSelect} 
        selectedNeighborhood={selectedNeighborhood} 
      />
      
      <OrbitControls 
        ref={controlsRef}
        enableZoom={true}
        enablePan={false}
        rotateSpeed={0.5}
        zoomSpeed={0.5}
        minDistance={3}
        maxDistance={10} 
        autoRotate={false}
        enableDamping={true}
        dampingFactor={0.1}
      />
    </Canvas>
  );
};

export default RioScene;
