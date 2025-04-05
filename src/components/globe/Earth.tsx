
import React, { useRef } from "react";
import { useFrame, useTexture } from "@react-three/fiber";
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
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005;
    }
  });

  // Markers for highlighted countries
  const markers = countries.map((country) => {
    const position = latLongToVector3(country.latitude, country.longitude, 1.02);
    const isSelected = selectedCountry?.id === country.id;
    
    return (
      <group key={country.id} position={position} onClick={() => onCountrySelect(country)}>
        <mesh>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial 
            color={isSelected ? "#33C3F0" : "#9b87f5"} 
            emissive={isSelected ? "#33C3F0" : "#6E59A5"}
            emissiveIntensity={isSelected ? 2 : 0.5}
          />
        </mesh>
        {isSelected && (
          <mesh>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial
              color="#33C3F0"
              transparent={true}
              opacity={0.4}
            />
          </mesh>
        )}
        
        {/* Add pulse effect for selected country */}
        {isSelected && (
          <PulseMarker />
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
      
      {/* Country markers */}
      {markers}
    </group>
  );
};

export default Earth;
