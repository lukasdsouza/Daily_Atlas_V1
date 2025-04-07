
import React, { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Extrude } from "@react-three/drei";
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
  
  // Desabilitar a rotação automática quando o usuário interagir com o modelo
  const autoRotate = useRef(true);
  
  // Animação suave e lenta
  useFrame((state, delta) => {
    if (rioRef.current && autoRotate.current) {
      rioRef.current.rotation.y += delta * 0.05;
    }
  });

  // Cores para os diferentes bairros com tonalidades baseadas na imagem de referência
  const getNeighborhoodColor = (id: string, hovered: boolean = false, selected: boolean = false) => {
    if (selected) return "#f97316"; // Laranja para selecionado
    if (hovered) return "#3b82f6"; // Azul para hover
    
    // Cores baseadas na imagem de referência (tons terrosos e água)
    switch (neighborhoods.find(n => n.id === id)?.zone) {
      case "sul": return "#6fb179"; // Verde azulado para zona costeira
      case "norte": return "#b29b67"; // Tons terrosos para a zona norte
      case "oeste": return "#9d8844"; // Tons terrosos mais escuros para zona oeste
      case "central": return "#78a399"; // Verde-azulado mais claro para centro
      default: return "#909090"; // Cinza para outros
    }
  };

  // Altura baseada na zona para criar efeito topográfico
  const getNeighborhoodHeight = (zone: string) => {
    switch (zone) {
      case "sul": return 0.15; // Altura menor para zona costeira
      case "norte": return 0.4; // Altura maior para zona norte (montanhosa)
      case "oeste": return 0.25; // Altura média para zona oeste
      case "central": return 0.2; // Altura média-baixa para o centro
      default: return 0.2;
    }
  };

  // Criação de forma para extrusão, simulando a topografia do Rio
  const createNeighborhoodShape = (neighborhood: Neighborhood) => {
    const shape = new THREE.Shape();
    
    // Criar formas mais orgânicas para os bairros
    const radius = neighborhood.size / 2;
    const segments = 6 + Math.floor(neighborhood.size * 4); // Mais segmentos para bairros maiores
    
    // Criar um polígono irregular com variações
    const angleStep = (Math.PI * 2) / segments;
    
    // Definir o primeiro ponto
    const seed = neighborhood.id.charCodeAt(0); // Usar o ID como semente para aleatoriedade consistente
    let angle = 0;
    const initialRadius = radius * (0.8 + (seed % 5) * 0.1);
    shape.moveTo(initialRadius * Math.cos(angle), initialRadius * Math.sin(angle));
    
    // Adicionar os outros pontos com variações
    for (let i = 1; i <= segments; i++) {
      angle = i * angleStep;
      // Variar o raio para criar formato irregular
      const radiusVar = radius * (0.7 + ((seed + i) % 10) * 0.06);
      shape.lineTo(
        radiusVar * Math.cos(angle),
        radiusVar * Math.sin(angle)
      );
    }
    
    shape.closePath();
    return shape;
  };

  return (
    <group ref={rioRef} position={[0, -0.5, 0]}>
      {/* Base do Rio (água/oceano) */}
      <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#3a8dc1" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Bairros do Rio */}
      {neighborhoods.map((neighborhood) => {
        const height = getNeighborhoodHeight(neighborhood.zone);
        const isSelected = selectedNeighborhood?.id === neighborhood.id;
        const isHovered = hoveredNeighborhood === neighborhood.id;
        
        // Criar forma personalizada para o bairro
        const shape = createNeighborhoodShape(neighborhood);
        
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
            {/* Bairro extrudado para efeito 3D topográfico */}
            <Extrude
              args={[shape, {
                steps: 2,
                depth: height, 
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.05,
                bevelSegments: 2
              }]}
              castShadow
              receiveShadow
            >
              <meshStandardMaterial 
                color={getNeighborhoodColor(neighborhood.id, isHovered, isSelected)} 
                metalness={0.1}
                roughness={0.8}
                // Elevar ligeiramente o bairro selecionado
                emissive={isSelected ? "#ff4000" : isHovered ? "#4080ff" : "#000000"}
                emissiveIntensity={isSelected ? 0.2 : isHovered ? 0.1 : 0}
              />
            </Extrude>
            
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
