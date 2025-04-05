
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

// Enhanced Comet component
export const Comet = () => {
  const cometRef = useRef<THREE.Group>(null);
  const cometBodyRef = useRef<THREE.Mesh>(null);
  const tailRef = useRef<THREE.Mesh>(null);
  const speed = Math.random() * 0.02 + 0.01;
  const distance = Math.random() * 20 + 30;
  const angle = Math.random() * Math.PI * 2;
  const yPos = Math.random() * 10 - 5;
  const cometSize = Math.random() * 0.2 + 0.1;
  const tailLength = Math.random() * 2 + 1;
  
  // Random colors for comets (blue, cyan, purple hues)
  const colors = ["#68e0ff", "#a68eff", "#ff7efd"];
  const cometColor = colors[Math.floor(Math.random() * colors.length)];
  
  useFrame(({ clock }) => {
    if (!cometRef.current) return;
    
    const time = clock.getElapsedTime();
    cometRef.current.position.x = Math.cos(time * speed + angle) * distance;
    cometRef.current.position.z = Math.sin(time * speed + angle) * distance;
    cometRef.current.position.y = yPos;
    
    // Point in direction of travel
    cometRef.current.lookAt(0, yPos, 0);
    
    // Pulsating effect
    if (cometBodyRef.current && tailRef.current) {
      const pulseFactor = Math.sin(time * 5) * 0.1 + 1;
      cometBodyRef.current.scale.set(pulseFactor, pulseFactor, pulseFactor);
      
      // Make tail glow/flicker
      if (tailRef.current.material instanceof THREE.Material) {
        const material = tailRef.current.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = 1 + Math.sin(time * 10) * 0.3;
      }
    }
  });
  
  return (
    <group ref={cometRef} position={[distance, yPos, 0]}>
      {/* Comet body */}
      <mesh ref={cometBodyRef}>
        <sphereGeometry args={[cometSize, 16, 16]} />
        <meshStandardMaterial 
          color={cometColor} 
          emissive={cometColor} 
          emissiveIntensity={1.5}
        />
        <pointLight color={cometColor} intensity={2} distance={8} decay={2} />
      </mesh>
      
      {/* Comet tail */}
      <mesh ref={tailRef} position={[tailLength/2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[cometSize*0.7, tailLength, 16]} />
        <meshStandardMaterial 
          color={cometColor} 
          emissive={cometColor} 
          emissiveIntensity={1.5}
          transparent={true}
          opacity={0.7}
        />
      </mesh>
    </group>
  );
};

// Enhanced Sun component
export const Sun = () => {
  const sunRef = useRef<THREE.Group>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  
  // Fixed: Ensure sunPosition is a tuple with exactly 3 elements
  const sunPosition: [number, number, number] = [50, 5, -30];
  
  useFrame(({ clock }) => {
    if (sunRef.current && coronaRef.current) {
      const time = clock.getElapsedTime();
      
      // Subtle pulsating effect for the corona
      const pulseFactor = 1 + Math.sin(time * 0.5) * 0.05;
      coronaRef.current.scale.set(pulseFactor, pulseFactor, pulseFactor);
      
      // Slow rotation
      sunRef.current.rotation.y = time * 0.05;
      coronaRef.current.rotation.z = time * 0.03;
      coronaRef.current.rotation.x = time * 0.02;
    }
  });
  
  return (
    <group ref={sunRef} position={sunPosition}>
      {/* Sun core */}
      <mesh>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial color="#FDB813" />
        <pointLight color="#FFF5D4" intensity={1.5} distance={100} decay={1} />
      </mesh>
      
      {/* Sun corona */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[7, 32, 32]} />
        <meshBasicMaterial 
          color="#FF7B00" 
          transparent={true} 
          opacity={0.3}
        />
      </mesh>
      
      {/* Sun flares - random positions */}
      {Array(8).fill(null).map((_, i) => {
        const size = Math.random() * 1.5 + 0.5;
        const angle = (i / 8) * Math.PI * 2;
        const radius = 5;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = (Math.random() - 0.5) * 2;
        return (
          <mesh key={`flare-${i}`} position={[x, y, z]}>
            <sphereGeometry args={[size, 16, 16]} />
            <meshBasicMaterial 
              color="#FFF5D4" 
              transparent={true} 
              opacity={0.7}
            />
          </mesh>
        );
      })}
      
      <ambientLight intensity={0.1} />
    </group>
  );
};

// Textures for planets
const useTexturedPlanet = (size: number, position: [number, number, number], speed: number, rotationSpeed: number, texturePath: string) => {
  const planetRef = useRef<THREE.Mesh>(null);
  const distance = Math.sqrt(position[0] * position[0] + position[2] * position[2]);
  const initialAngle = Math.atan2(position[2], position[0]);
  
  const texture = useTexture(texturePath);
  
  useFrame(({ clock }) => {
    if (planetRef.current) {
      const time = clock.getElapsedTime();
      
      // Orbit around center
      planetRef.current.position.x = Math.cos(time * speed + initialAngle) * distance;
      planetRef.current.position.z = Math.sin(time * speed + initialAngle) * distance;
      
      // Rotate planet
      planetRef.current.rotation.y += rotationSpeed;
    }
  });
  
  return (
    <mesh ref={planetRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

// Enhanced Planet component
export const Planet = ({ position, size, color, speed, rotationSpeed, hasRings = false, hasMoons = false }: { 
  position: [number, number, number], 
  size: number, 
  color: string,
  speed: number,
  rotationSpeed: number,
  hasRings?: boolean,
  hasMoons?: boolean
}) => {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh>(null);
  const distance = Math.sqrt(position[0] * position[0] + position[2] * position[2]);
  const initialAngle = Math.atan2(position[2], position[0]);
  
  useFrame(({ clock }) => {
    if (planetRef.current) {
      const time = clock.getElapsedTime();
      
      // Orbit around center
      planetRef.current.position.x = Math.cos(time * speed + initialAngle) * distance;
      planetRef.current.position.z = Math.sin(time * speed + initialAngle) * distance;
      
      // Rotate planet
      planetRef.current.rotation.y += rotationSpeed;
      
      // Update rings if they exist
      if (hasRings && ringsRef.current) {
        ringsRef.current.position.x = planetRef.current.position.x;
        ringsRef.current.position.y = planetRef.current.position.y;
        ringsRef.current.position.z = planetRef.current.position.z;
        ringsRef.current.rotation.y += rotationSpeed * 0.5;
      }
    }
  });
  
  return (
    <>
      <mesh ref={planetRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshPhongMaterial 
          color={color} 
          shininess={10}
          specular={new THREE.Color("#444444")}
        />
        
        {/* Add atmosphere glow */}
        <mesh>
          <sphereGeometry args={[size * 1.05, 32, 32]} />
          <meshBasicMaterial 
            color={color} 
            transparent={true} 
            opacity={0.2}
          />
        </mesh>
        
        {/* Add moons if specified */}
        {hasMoons && Array(Math.floor(Math.random() * 2) + 1).fill(null).map((_, i) => {
          const moonSize = size * 0.3;
          const moonDistance = size * 3;
          const moonSpeed = 0.05;
          return (
            <mesh key={`moon-${i}`}>
              <sphereGeometry args={[moonSize, 16, 16]} />
              <meshPhongMaterial color="#AAAAAA" />
              <group position={[moonDistance, 0, 0]}>
                <mesh>
                  <sphereGeometry args={[moonSize, 16, 16]} />
                  <meshPhongMaterial color="#AAAAAA" />
                </mesh>
              </group>
            </mesh>
          );
        })}
      </mesh>
      
      {/* Add rings if specified */}
      {hasRings && (
        <mesh ref={ringsRef} rotation={[Math.PI / 5, 0, 0]} position={position}>
          <ringGeometry args={[size * 1.5, size * 2.5, 32]} />
          <meshPhongMaterial 
            color={color} 
            side={THREE.DoubleSide} 
            transparent 
            opacity={0.7} 
          />
        </mesh>
      )}
    </>
  );
};

// Enhanced Space Background
export const SpaceEnvironment = () => {
  return (
    <>
      <Stars />
      
      <Sun />
      
      {/* Mars */}
      <Planet 
        position={[25, 0, 15]} 
        size={0.8} 
        color="#cf3a09" 
        speed={0.05} 
        rotationSpeed={0.01}
        hasMoons={true}
      />
      
      {/* Venus */}
      <Planet 
        position={[-30, -5, -10]} 
        size={0.9} 
        color="#e39e1c" 
        speed={0.03} 
        rotationSpeed={0.007}
      />
      
      {/* Saturn with rings */}
      <Planet 
        position={[45, 10, -25]} 
        size={1.5} 
        color="#cbac80" 
        speed={0.02} 
        rotationSpeed={0.005}
        hasRings={true}
      />
      
      {/* Additional planets */}
      <Planet 
        position={[-40, 8, 20]} 
        size={1.2} 
        color="#3498db" 
        speed={0.015} 
        rotationSpeed={0.008}
        hasMoons={true}
      />
      
      {/* Add comets */}
      {Array(8).fill(null).map((_, i) => (
        <Comet key={`comet-${i}`} />
      ))}
    </>
  );
};

// Enhanced Stars component with nebula effects
export const Stars = () => {
  const nebulaRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (nebulaRef.current) {
      const time = clock.getElapsedTime();
      nebulaRef.current.rotation.y = time * 0.01;
      nebulaRef.current.rotation.z = time * 0.005;
    }
  });
  
  return (
    <>
      {/* Star particles */}
      {Array(500).fill(null).map((_, i) => {
        const position: [number, number, number] = [
          (Math.random() - 0.5) * 200,
          (Math.random() - 0.5) * 200,
          (Math.random() - 0.5) * 200
        ];
        const size = Math.random() * 0.5 + 0.1;
        
        // Add more variation to star colors
        const starColors = [
          "#ffffff", // white
          "#fffae0", // warm white
          "#e0f8ff", // cool white
          "#fff7d0", // yellow tint
          "#d0e8ff", // blue tint
        ];
        const color = starColors[Math.floor(Math.random() * starColors.length)];
        
        return (
          <mesh key={`star-${i}`} position={position}>
            <sphereGeometry args={[size, 8, 8]} />
            <meshBasicMaterial color={color} />
          </mesh>
        );
      })}
      
      {/* Nebula effects - distant colorful clouds */}
      <mesh ref={nebulaRef} position={[0, 0, -100]}>
        <sphereGeometry args={[80, 32, 32]} />
        <meshBasicMaterial 
          color="#7E69AB" 
          transparent={true} 
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Additional nebula in different color */}
      <mesh position={[100, 20, 0]} rotation={[0.5, 0.5, 0]}>
        <sphereGeometry args={[60, 32, 32]} />
        <meshBasicMaterial 
          color="#33C3F0" 
          transparent={true} 
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
};
