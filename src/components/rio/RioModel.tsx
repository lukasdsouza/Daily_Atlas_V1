
import React, { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { Neighborhood, neighborhoods } from "@/data/neighborhoods";

interface RioModelProps {
  onNeighborhoodSelect: (neighborhood: Neighborhood) => void;
  selectedNeighborhood: Neighborhood | null;
}

const RioModel: React.FC<RioModelProps> = ({ onNeighborhoodSelect, selectedNeighborhood }) => {
  // Reference for the Rio model group
  const rioRef = useRef<THREE.Group>(null);
  
  // Hover effect for neighborhoods
  const [hoveredNeighborhood, setHoveredNeighborhood] = useState<string | null>(null);
  
  // Disable auto-rotation when user interacts with the model
  const autoRotate = useRef(true);
  
  // Smooth, slow animation
  useFrame((state, delta) => {
    if (rioRef.current && autoRotate.current) {
      rioRef.current.rotation.y += delta * 0.05;
    }
  });

  // Colors for different neighborhoods based on the reference image
  const getNeighborhoodColor = (id: string, hovered: boolean = false, selected: boolean = false) => {
    if (selected) return "#f97316"; // Orange for selected
    if (hovered) return "#3b82f6"; // Blue for hover
    
    // Colors based on the reference image (earthy tones and water)
    switch (neighborhoods.find(n => n.id === id)?.zone) {
      case "sul": return "#6fb179"; // Blue-green for coastal zone
      case "norte": return "#b29b67"; // Earthy tones for north zone
      case "oeste": return "#9d8844"; // Darker earthy tones for west zone
      case "central": return "#78a399"; // Lighter blue-green for center
      default: return "#909090"; // Gray for others
    }
  };

  // Height based on zone to create topographic effect
  const getNeighborhoodHeight = (zone: string) => {
    switch (zone) {
      case "sul": return 0.15; // Lower height for coastal zone
      case "norte": return 0.4; // Higher height for north zone (mountainous)
      case "oeste": return 0.25; // Medium height for west zone
      case "central": return 0.2; // Medium-low height for center
      default: return 0.2;
    }
  };

  return (
    <group ref={rioRef} position={[0, -0.5, 0]}>
      {/* Base of Rio (water/ocean) */}
      <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#3a8dc1" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Neighborhoods of Rio */}
      {neighborhoods.map((neighborhood) => {
        const height = getNeighborhoodHeight(neighborhood.zone);
        const isSelected = selectedNeighborhood?.id === neighborhood.id;
        const isHovered = hoveredNeighborhood === neighborhood.id;
        
        return (
          <group 
            key={neighborhood.id} 
            position={[neighborhood.x, 0, neighborhood.z]}
            onClick={(e) => {
              e.stopPropagation();
              autoRotate.current = false;
              onNeighborhoodSelect(neighborhood);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredNeighborhood(neighborhood.id);
            }}
            onPointerOut={() => setHoveredNeighborhood(null)}
          >
            {/* Neighborhood - represented with extruded shape for 3D effect */}
            <mesh
              castShadow
              receiveShadow
              position={[0, height/2, 0]}
            >
              <boxGeometry args={[neighborhood.size, height, neighborhood.size]} />
              <meshStandardMaterial 
                color={getNeighborhoodColor(neighborhood.id, isHovered, isSelected)} 
                metalness={0.1}
                roughness={0.8}
                // Slightly raise the selected neighborhood
                emissive={isSelected ? "#ff4000" : isHovered ? "#4080ff" : "#000000"}
                emissiveIntensity={isSelected ? 0.2 : isHovered ? 0.1 : 0}
              />
            </mesh>
            
            <Text
              position={[0, height + 0.15, 0]}
              fontSize={0.18}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#000000"
            >
              {neighborhood.name}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

export default RioModel;
