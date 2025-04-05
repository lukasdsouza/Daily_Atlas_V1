
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";  // Changed import from fiber to drei
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
  
  // Load textures
  const [earthMap, earthBump, earthSpec, earthNormal, cloudMap] = useTexture([
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
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
    
    return (
      <group key={country.id} position={position} onClick={() => onCountrySelect(country)}>
        {/* Base marker for all countries */}
        <mesh>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshStandardMaterial 
            color={isSelected ? "#33C3F0" : "#9b87f5"} 
            emissive={isSelected ? "#33C3F0" : "#6E59A5"}
            emissiveIntensity={isSelected ? 2 : 0.5}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
        
        {/* Ring around marker */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.035, 0.045, 16]} />
          <meshStandardMaterial 
            color={isSelected ? "#33C3F0" : "#9b87f5"} 
            emissive={isSelected ? "#33C3F0" : "#6E59A5"}
            transparent={true}
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Glow effect */}
        <mesh>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial
            color={isSelected ? "#33C3F0" : "#9b87f5"}
            transparent={true}
            opacity={0.3}
          />
        </mesh>
        
        {/* Light point */}
        <pointLight 
          color={isSelected ? "#33C3F0" : "#9b87f5"} 
          intensity={isSelected ? 0.5 : 0.2} 
          distance={0.3}
        />
        
        {/* Add pulse effect for selected country */}
        {isSelected && (
          <PulseMarker />
        )}
        
        {/* Add vertical beam for selected country */}
        {isSelected && (
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
            <meshStandardMaterial 
              color="#33C3F0" 
              transparent={true} 
              opacity={0.5}
              emissive="#33C3F0"
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
