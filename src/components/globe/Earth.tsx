
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Country } from "@/data/countries";
import { latLongToVector3 } from "@/utils/globeUtils";
import { AnimatedClouds, EarthAurora, PulseMarker } from "./EarthComponents";

interface GlobeProps {
  onCountrySelect: (country: Country) => void;
  selectedCountry: Country | null;
  countries: Country[];
}

const Earth: React.FC<GlobeProps> = ({ onCountrySelect, selectedCountry, countries }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load textures from more reliable CDN URLs
  const [earthMap, earthBump, earthSpec, earthNormal, cloudMap] = useTexture([
    "https://assets.codepen.io/33787/earth_atmos_4k.jpg",
    "https://assets.codepen.io/33787/earth_specular_2k.jpg",
    "https://assets.codepen.io/33787/earth_specular_2k.jpg",
    "https://assets.codepen.io/33787/earth_normal_2k.jpg",
    "https://assets.codepen.io/33787/earth_clouds_1k.png",
  ]);

  // Auto-rotate but slower when no interaction
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005;
    }
  });

  // Enhanced markers for highlighted countries
  const markers = countries.map((country) => {
    const position = latLongToVector3(country.latitude, country.longitude, 1.02);
    const isSelected = selectedCountry?.id === country.id;
    const isRio = country.id === "rio";
    
    // Special larger marker for Rio de Janeiro
    const markerSize = isRio ? 0.04 : 0.025;
    const ringSize = isRio ? [0.05, 0.06] : [0.035, 0.045];
    const glowSize = isRio ? 0.08 : 0.05;
    const markerColor = isRio ? "#33FFD0" : (isSelected ? "#33C3F0" : "#9b87f5");
    const emissiveColor = isRio ? "#33FFD0" : (isSelected ? "#33C3F0" : "#6E59A5");
    const emissiveIntensity = isRio ? 3 : (isSelected ? 2 : 0.5);
    
    return (
      <group key={country.id} position={position} onClick={() => onCountrySelect(country)}>
        {/* Base marker for all countries */}
        <mesh>
          <sphereGeometry args={[markerSize, 16, 16]} />
          <meshStandardMaterial 
            color={markerColor} 
            emissive={emissiveColor}
            emissiveIntensity={emissiveIntensity}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
        
        {/* Ring around marker */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[ringSize[0], ringSize[1], 16]} />
          <meshStandardMaterial 
            color={markerColor} 
            emissive={emissiveColor}
            transparent={true}
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Glow effect */}
        <mesh>
          <sphereGeometry args={[glowSize, 16, 16]} />
          <meshStandardMaterial
            color={markerColor}
            transparent={true}
            opacity={0.3}
          />
        </mesh>
        
        {/* Light point */}
        <pointLight 
          color={markerColor} 
          intensity={isRio ? 0.8 : (isSelected ? 0.5 : 0.2)} 
          distance={isRio ? 0.5 : 0.3}
          decay={2}
        />
        
        {/* Add pulse effect for Rio or selected country */}
        {(isSelected || isRio) && (
          <PulseMarker color={markerColor} size={isRio ? 1.5 : 1} />
        )}
        
        {/* Add vertical beam for Rio or selected country */}
        {(isSelected || isRio) && (
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, isRio ? 0.5 : 0.3, 8]} />
            <meshStandardMaterial 
              color={markerColor} 
              transparent={true} 
              opacity={0.5}
              emissive={markerColor}
            />
          </mesh>
        )}
      </group>
    );
  });

  return (
    <group ref={groupRef}>
      {/* Earth */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={earthMap}
          bumpMap={earthBump}
          bumpScale={0.04}
          specularMap={earthSpec}
          normalMap={earthNormal}
          shininess={5}
        />
      </mesh>
      
      {/* Clouds */}
      <AnimatedClouds cloudMap={cloudMap} />
      
      {/* Aurora effect */}
      <EarthAurora />
      
      {/* Glowing atmosphere */}
      <mesh>
        <sphereGeometry args={[1.02, 32, 32]} />
        <meshStandardMaterial
          color="#4DF7B8"
          transparent={true}
          opacity={0.1}
          emissive="#4DF7B8"
          emissiveIntensity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Country markers */}
      {markers}
    </group>
  );
};

export default Earth;
