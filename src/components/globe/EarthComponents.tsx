
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Enhanced Aurora effect for Earth
export const EarthAurora = () => {
  const auroraRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (auroraRef.current) {
      const time = clock.getElapsedTime();
      auroraRef.current.rotation.y = time * 0.05;
      
      // Modulate the aurora's opacity for a pulsating effect
      if (auroraRef.current.material instanceof THREE.Material) {
        const material = auroraRef.current.material as THREE.MeshPhongMaterial;
        material.opacity = 0.15 + Math.sin(time * 0.5) * 0.05;
      }
    }
  });
  
  return (
    <mesh ref={auroraRef}>
      <sphereGeometry args={[1.05, 64, 64]} />
      <meshPhongMaterial 
        color="#4DF7B8" 
        transparent={true} 
        opacity={0.15} 
        emissive="#4DF7B8"
        emissiveIntensity={0.4}
        depthWrite={false}
        side={THREE.BackSide}
      />
    </mesh>
  );
};

// Enhanced Animated clouds
export const AnimatedClouds = ({ cloudMap }: { cloudMap: THREE.Texture }) => {
  const cloudsRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (cloudsRef.current) {
      const time = clock.getElapsedTime();
      cloudsRef.current.rotation.y = time * 0.01;
      
      // Subtle pulsating effect
      if (cloudsRef.current.material instanceof THREE.Material) {
        const material = cloudsRef.current.material as THREE.MeshPhongMaterial;
        material.opacity = 0.4 + Math.sin(time * 0.2) * 0.05;
      }
    }
  });
  
  return (
    <mesh ref={cloudsRef}>
      <sphereGeometry args={[1.01, 64, 64]} />
      <meshPhongMaterial
        map={cloudMap}
        transparent={true}
        opacity={0.4}
        depthWrite={false}
      />
    </mesh>
  );
};

// Enhanced Pulse effect for selected country with customizable color
export const PulseMarker = ({ color = "#33C3F0", size = 1 }: { color?: string, size?: number }) => {
  const pulseRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (pulseRef.current && ringRef.current) {
      const time = clock.getElapsedTime();
      const scale = (1 + Math.sin(time * 3) * 0.3) * size;
      pulseRef.current.scale.set(scale, scale, scale);
      
      // Adjust opacity based on scale
      if (pulseRef.current.material instanceof THREE.Material) {
        const material = pulseRef.current.material as THREE.MeshStandardMaterial;
        material.opacity = 0.5 - Math.sin(time * 3) * 0.3;
      }
      
      // Animate ring
      const ringScale = (1 + Math.sin(time * 3 + 1) * 0.3) * size; // Offset phase
      ringRef.current.scale.set(ringScale, ringScale, ringScale);
      
      if (ringRef.current.material instanceof THREE.Material) {
        const material = ringRef.current.material as THREE.MeshStandardMaterial;
        material.opacity = 0.4 - Math.sin(time * 3 + 1) * 0.2;
      }
    }
  });
  
  return (
    <>
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color={color}
          transparent={true}
          opacity={0.5}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
      
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.06, 0.08, 16]} />
        <meshStandardMaterial
          color={color}
          transparent={true}
          opacity={0.4}
          emissive={color}
          emissiveIntensity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};
