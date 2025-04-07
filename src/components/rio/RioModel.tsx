
import React, { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { Neighborhood, neighborhoods } from "@/data/neighborhoods";

interface RioModelProps {
  onNeighborhoodSelect: (neighborhood: Neighborhood) => void;
  selectedNeighborhood: Neighborhood | null;
}

const RioModel: React.FC<RioModelProps> = ({ onNeighborhoodSelect, selectedNeighborhood }) => {
  // Referência para o grupo do modelo do Rio
  const rioRef = React.useRef<THREE.Group>(null);
  
  // Efeito de hover para os bairros
  const [hoveredNeighborhood, setHoveredNeighborhood] = useState<string | null>(null);
  
  // Animação simples
  useFrame((state, delta) => {
    if (rioRef.current) {
      rioRef.current.rotation.y += delta * 0.05;
    }
  });

  // Cores para os diferentes bairros
  const getNeighborhoodColor = (id: string) => {
    if (selectedNeighborhood?.id === id) return "#f97316"; // Laranja para selecionado
    if (hoveredNeighborhood === id) return "#3b82f6"; // Azul para hover
    
    // Cores diferentes para cada zona
    switch (neighborhoods.find(n => n.id === id)?.zone) {
      case "sul": return "#10b981"; // Verde para Zona Sul
      case "norte": return "#8b5cf6"; // Roxo para Zona Norte
      case "oeste": return "#f59e0b"; // Âmbar para Zona Oeste
      case "central": return "#ef4444"; // Vermelho para Centro
      default: return "#6b7280"; // Cinza para outros
    }
  };

  return (
    <group ref={rioRef}>
      {/* Base do Rio (representação simplificada) */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#a5f3fc" />
      </mesh>

      {/* Bairros do Rio */}
      {neighborhoods.map((neighborhood) => (
        <group key={neighborhood.id} position={[neighborhood.x, 0, neighborhood.z]}>
          <mesh
            castShadow
            position={[0, 0.1, 0]}
            onClick={() => onNeighborhoodSelect(neighborhood)}
            onPointerOver={() => setHoveredNeighborhood(neighborhood.id)}
            onPointerOut={() => setHoveredNeighborhood(null)}
          >
            <boxGeometry args={[neighborhood.size, 0.2, neighborhood.size]} />
            <meshStandardMaterial 
              color={getNeighborhoodColor(neighborhood.id)} 
              roughness={0.7}
            />
          </mesh>
          
          <Text
            position={[0, 0.3, 0]}
            fontSize={0.2}
            color="#000000"
            anchorX="center"
            anchorY="middle"
          >
            {neighborhood.name}
          </Text>
        </group>
      ))}
    </group>
  );
};

export default RioModel;
