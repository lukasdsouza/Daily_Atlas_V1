
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Aurora effect for Earth
export const EarthAurora = () => {
  const auroraRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (auroraRef.current) {
      const time = clock.getElapsedTime();
      auroraRef.current.rotation.y = time * 0.05;
    }
  });
  
  return (
    <mesh ref={auroraRef}>
      <sphereGeometry args={[1.03, 64, 64]} />
      <meshPhongMaterial 
        color="#4DF7B8" 
        transparent={true} 
        opacity={0.15} 
        emissive="#4DF7B8"
        emissiveIntensity={0.4}
        depthWrite={false}
      />
    </mesh>
  );
};

// Animated clouds
export const AnimatedClouds = ({ cloudMap }: { cloudMap: THREE.Texture }) => {
  const cloudsRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = clock.getElapsedTime() * 0.01;
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

// Pulse effect for selected country
export const PulseMarker = () => {
  const pulseRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (pulseRef.current) {
      const time = clock.getElapsedTime();
      const scale = 1 + Math.sin(time * 3) * 0.2;
      pulseRef.current.scale.set(scale, scale, scale);
      
      // Adjust opacity based on scale
      if (pulseRef.current.material instanceof THREE.Material) {
        const material = pulseRef.current.material as THREE.MeshStandardMaterial;
        material.opacity = 0.5 - Math.sin(time * 3) * 0.3;
      }
    }
  });
  
  return (
    <mesh ref={pulseRef}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshStandardMaterial
        color="#33C3F0"
        transparent={true}
        opacity={0.5}
      />
    </mesh>
  );
};
