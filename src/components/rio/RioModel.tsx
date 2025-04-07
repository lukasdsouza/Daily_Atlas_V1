
import React, { useState, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
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
  
  // Shape of Rio - creating a more complex path to mimic the actual geography
  // This uses the coordinates from neighborhoods.ts but arranges them in a more geographical way
  const rioShape = useMemo(() => {
    // Create a base shape for Rio
    const shape = new THREE.Shape();
    
    // Define the outline of Rio based on the extreme neighborhoods
    // Starting point
    shape.moveTo(-3, 0);
    
    // Top outline (north)
    shape.bezierCurveTo(-2.5, 2, 0, 2.5, 2, 2);
    
    // Right outline (east)
    shape.bezierCurveTo(3, 1.5, 3, 0, 2.5, -1);
    
    // Bottom outline (south)
    shape.bezierCurveTo(2, -2, 0, -3, -2, -2.5);
    
    // Left outline (west)
    shape.bezierCurveTo(-3, -2, -3.5, -1, -3, 0);
    
    return shape;
  }, []);
  
  // Smooth, slow animation
  useFrame((state, delta) => {
    if (rioRef.current && autoRotate.current) {
      rioRef.current.rotation.y += delta * 0.05;
    }
  });

  // Colors for different neighborhoods
  const getNeighborhoodColor = (id: string, hovered: boolean = false, selected: boolean = false) => {
    if (selected) return "#f97316"; // Orange for selected
    if (hovered) return "#3b82f6"; // Blue for hover
    
    return "#ffffff"; // White as in the reference image
  };

  // Height for 3D effect
  const getNeighborhoodHeight = () => {
    return 0.1; // Constant height for all neighborhoods to match reference image
  };

  return (
    <group ref={rioRef} position={[0, -0.5, 0]} rotation={[0, 0, 0]}>
      {/* Base of Rio - light gray as in the reference image */}
      <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#d1d1d1" metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Main Rio shape - this creates the entire landmass */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <extrudeGeometry 
          args={[
            rioShape, 
            { 
              depth: 0.2, 
              bevelEnabled: true, 
              bevelThickness: 0.05, 
              bevelSize: 0.05, 
              bevelSegments: 3 
            }
          ]} 
        />
        <meshStandardMaterial color="#f0f0f0" metalness={0.1} roughness={0.7} />
      </mesh>

      {/* Individual neighborhoods of Rio */}
      {neighborhoods.map((neighborhood) => {
        const isSelected = selectedNeighborhood?.id === neighborhood.id;
        const isHovered = hoveredNeighborhood === neighborhood.id;
        const height = getNeighborhoodHeight();
        
        return (
          <group 
            key={neighborhood.id} 
            position={[neighborhood.x, 0.21, neighborhood.z]} // Position slightly above the base
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
            {/* Neighborhood - with extruded border for 3D effect */}
            <RoundedBox
              args={[neighborhood.size * 0.9, height, neighborhood.size * 0.9]}
              radius={0.05}
              smoothness={4}
              castShadow
              receiveShadow
            >
              <meshStandardMaterial 
                color={getNeighborhoodColor(neighborhood.id, isHovered, isSelected)}
                metalness={0.1}
                roughness={0.7}
                emissive={isSelected ? "#ff4000" : isHovered ? "#4080ff" : "#000000"}
                emissiveIntensity={isSelected ? 0.2 : isHovered ? 0.1 : 0}
              />
            </RoundedBox>
            
            {/* Border lines between neighborhoods */}
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(neighborhood.size * 0.9, height, neighborhood.size * 0.9)]} />
              <lineBasicMaterial color="#999999" linewidth={1} />
            </lineSegments>
            
            {/* Neighborhood name */}
            <Text
              position={[0, height + 0.15, 0]}
              fontSize={0.15}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#ffffff"
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
