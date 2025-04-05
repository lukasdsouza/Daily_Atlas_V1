
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Comet component
export const Comet = () => {
  const cometRef = useRef<THREE.Mesh>(null);
  const speed = Math.random() * 0.02 + 0.01;
  const distance = Math.random() * 20 + 30;
  const angle = Math.random() * Math.PI * 2;
  const yPos = Math.random() * 10 - 5;
  
  useFrame(({ clock }) => {
    if (cometRef.current) {
      const time = clock.getElapsedTime();
      cometRef.current.position.x = Math.cos(time * speed + angle) * distance;
      cometRef.current.position.z = Math.sin(time * speed + angle) * distance;
      cometRef.current.position.y = yPos;
      
      // Point in direction of travel
      cometRef.current.lookAt(0, yPos, 0);
    }
  });
  
  return (
    <mesh ref={cometRef} position={[distance, yPos, 0]}>
      <coneGeometry args={[0.2, 1, 16]} />
      <meshPhongMaterial color="#68e0ff" emissive="#38c0ff" />
      <pointLight color="#68e0ff" intensity={1} distance={5} />
    </mesh>
  );
};

// Sun component
export const Sun = () => {
  // Fixed: Ensure sunPosition is a tuple with exactly 3 elements
  const sunPosition: [number, number, number] = [50, 5, -30];
  
  return (
    <group position={sunPosition}>
      <mesh>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial color="#FDB813" />
      </mesh>
      <pointLight color="#FFF5D4" intensity={1} distance={100} decay={1} />
      <ambientLight intensity={0.1} />
    </group>
  );
};

// Planet component
export const Planet = ({ position, size, color, speed, rotationSpeed }: { 
  position: [number, number, number], 
  size: number, 
  color: string,
  speed: number,
  rotationSpeed: number
}) => {
  const planetRef = useRef<THREE.Mesh>(null);
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
    }
  });
  
  return (
    <mesh ref={planetRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshPhongMaterial color={color} />
    </mesh>
  );
};

// Space Background
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
      />
      
      {/* Venus */}
      <Planet 
        position={[-30, -5, -10]} 
        size={0.9} 
        color="#e39e1c" 
        speed={0.03} 
        rotationSpeed={0.007}
      />
      
      {/* Distant Saturn with rings would require more complex mesh */}
      <group position={[45, 10, -25]}>
        <mesh rotation={[Math.PI / 5, 0, 0]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshPhongMaterial color="#cbac80" />
        </mesh>
        <mesh rotation={[Math.PI / 5, 0, 0]}>
          <ringGeometry args={[2, 3, 32]} />
          <meshPhongMaterial color="#cbac80" side={THREE.DoubleSide} transparent opacity={0.7} />
        </mesh>
      </group>
      
      {/* Add comets */}
      {Array(5).fill(null).map((_, i) => (
        <Comet key={`comet-${i}`} />
      ))}
    </>
  );
};

// Stars component
export const Stars = () => {
  return (
    <></>
  );
};
