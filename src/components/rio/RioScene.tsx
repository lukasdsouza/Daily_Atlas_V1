
import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
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

  // Ajustar a câmera quando um bairro for selecionado
  useEffect(() => {
    if (controlsRef.current && selectedNeighborhood) {
      // Desabilitar autoRotate quando um bairro for selecionado
      controlsRef.current.autoRotate = false;
    }
  }, [selectedNeighborhood]);

  return (
    <Canvas
      camera={{ position: [0, 7, 7], fov: 45 }}
      style={{ background: "linear-gradient(to bottom, #87CEEB, #f0f9ff)" }}
      shadows
    >
      {/* Iluminação ambiente */}
      <ambientLight intensity={0.6} />
      
      {/* Luz direcional principal (sol) */}
      <directionalLight 
        color="#ffffff" 
        position={[5, 10, 5]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Luz secundária para fill */}
      <directionalLight color="#e0c080" position={[-2, 8, -2]} intensity={0.4} />
      
      {/* Adiciona sombras de contato para efeito realista */}
      <ContactShadows 
        position={[0, -0.02, 0]} 
        opacity={0.6} 
        width={15} 
        height={15} 
        blur={1} 
        far={0.8} 
      />
      
      {/* Ambiente para reflexões realistas */}
      <Environment preset="sunset" />
      
      {/* Modelo do Rio */}
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
    </Canvas>
  );
};

export default RioScene;
