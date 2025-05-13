
import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Country } from "@/data/countries";
import { latLongToVector3 } from "@/utils/globeUtils";
import { EarthAurora, AnimatedClouds, PulseMarker } from "./EarthComponents";

interface GlobeProps {
  onCountrySelect: (country: Country) => void;
  selectedCountry: Country | null;
  countries: Country[];
}

/**
 * Earth component that renders a 3D globe with cloud layer
 */
const Earth: React.FC<GlobeProps> = ({ onCountrySelect, selectedCountry, countries }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load textures with proper error handling
  const earthTextures = useTexture(
    {
      map: '/textures/earth_daymap.jpg',
      bumpMap: '/textures/earth_bump.jpg',
      specularMap: '/textures/earth_specular.jpg',
      normalMap: '/textures/earth_normal.jpg',
      cloudsMap: '/textures/earth_clouds.jpg',
    },
    (textures) => {
      console.log("Textures loaded successfully:", textures);
    },
    (error) => {
      console.error("Error loading textures:", error);
    }
  );
  
  // Auto-rotate but slower when no interaction
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  // Handle country selection
  const handleCountrySelect = (e: THREE.Event) => {
    e.stopPropagation();
    // This is a placeholder - actual country selection would be based on raycasting 
    // and intersection with specific parts of the globe
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    onCountrySelect(randomCountry);
  };

  return (
    <group ref={groupRef} onClick={handleCountrySelect}>
      {/* Earth sphere */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial 
          map={earthTextures.map}
          bumpMap={earthTextures.bumpMap}
          bumpScale={0.05}
          specularMap={earthTextures.specularMap}
          specular={new THREE.Color('grey')}
          normalMap={earthTextures.normalMap}
          shininess={5}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh>
        <sphereGeometry args={[1.01, 64, 64]} />
        <meshPhongMaterial 
          map={earthTextures.cloudsMap}
          transparent={true}
          opacity={0.3}
          depthWrite={false}
        />
      </mesh>

      {/* Highlight for selected country */}
      {selectedCountry && (
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color="#ff0000" />
        </mesh>
      )}
    </group>
  );
};

export default Earth;
