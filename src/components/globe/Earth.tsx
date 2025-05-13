
import React, { useRef, useState } from "react";
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
  const [texturesLoaded, setTexturesLoaded] = useState(false);
  const [textureError, setTextureError] = useState<string | null>(null);
  
  // Define fallback colors for when textures aren't available
  const fallbackColor = new THREE.Color(0x1a33cc); // Deep blue
  const fallbackCloudColor = new THREE.Color(0xffffff); // White
  
  // Try to load textures with proper error handling
  const textures = useTexture(
    {
      map: '/textures/earth_daymap.jpg',
      bumpMap: '/textures/earth_bump.jpg',
      specularMap: '/textures/earth_specular.jpg',
      normalMap: '/textures/earth_normal.jpg',
      cloudsMap: '/textures/earth_clouds.jpg',
    },
    (loadedTextures) => {
      console.log("Textures loaded successfully");
      setTexturesLoaded(true);
      setTextureError(null);
    }
  );
  
  // Handle texture loading errors separately
  React.useEffect(() => {
    const handleTextureError = (event: ErrorEvent) => {
      if (event.message.includes('textures')) {
        console.error("Error loading texture:", event);
        setTextureError("Failed to load Earth textures. Using simplified version.");
      }
    };
    
    window.addEventListener('error', handleTextureError);
    return () => window.removeEventListener('error', handleTextureError);
  }, []);

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
          map={textures.map}
          bumpMap={textures.bumpMap}
          bumpScale={0.05}
          specularMap={textures.specularMap}
          specular={new THREE.Color('grey')}
          normalMap={textures.normalMap}
          color={textureError ? fallbackColor : undefined}
          shininess={5}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh>
        <sphereGeometry args={[1.01, 64, 64]} />
        <meshPhongMaterial 
          map={textures.cloudsMap}
          transparent={true}
          opacity={0.3}
          depthWrite={false}
          color={textureError ? fallbackCloudColor : undefined}
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
