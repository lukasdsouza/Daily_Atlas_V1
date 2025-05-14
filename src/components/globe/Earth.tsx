
import React, { useRef, useState, useEffect } from "react";
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

  // Create a default texture to use while loading or if loading fails
  const createFallbackTexture = (color: THREE.Color): THREE.Texture => {
    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 2;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = `rgb(${Math.floor(color.r * 255)},${Math.floor(color.g * 255)},${Math.floor(color.b * 255)})`;
      ctx.fillRect(0, 0, 2, 2);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  // Create fallback textures
  const defaultEarthTexture = createFallbackTexture(fallbackColor);
  const defaultCloudTexture = createFallbackTexture(fallbackCloudColor);
  
  // Default textures object
  const [textures, setTextures] = useState({
    map: defaultEarthTexture,
    bumpMap: defaultEarthTexture,
    specularMap: defaultEarthTexture,
    normalMap: defaultEarthTexture,
    cloudsMap: defaultCloudTexture
  });

  // Try to load textures
  useEffect(() => {
    const loadTextures = async () => {
      try {
        const textureLoader = new THREE.TextureLoader();
        const loadTexture = (path: string): Promise<THREE.Texture> => {
          return new Promise((resolve, reject) => {
            textureLoader.load(
              path, 
              (texture) => resolve(texture),
              undefined,
              (err) => reject(err)
            );
          });
        };

        const [mapTexture, bumpMapTexture, specularMapTexture, normalMapTexture, cloudsMapTexture] = 
          await Promise.all([
            loadTexture('/textures/earth_daymap.jpg'),
            loadTexture('/textures/earth_bump.jpg'),
            loadTexture('/textures/earth_specular.jpg'),
            loadTexture('/textures/earth_normal.jpg'),
            loadTexture('/textures/earth_clouds.jpg')
          ]);

        setTextures({
          map: mapTexture,
          bumpMap: bumpMapTexture,
          specularMap: specularMapTexture,
          normalMap: normalMapTexture,
          cloudsMap: cloudsMapTexture
        });
        
        setTexturesLoaded(true);
        setTextureError(null);
        console.log("Earth textures loaded successfully");
      } catch (error) {
        console.error("Error loading textures:", error);
        setTextureError("Failed to load Earth textures. Using simplified version.");
      }
    };

    loadTextures();
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
      {/* Simplified Earth if textures failed to load */}
      {textureError && (
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhongMaterial color={fallbackColor} shininess={5} />
        </mesh>
      )}
      
      {/* Full Earth with textures */}
      {!textureError && (
        <>
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
            />
          </mesh>
        </>
      )}

      {/* Highlight for selected country */}
      {selectedCountry && (
        <mesh position={latLongToVector3(
          selectedCountry.latitude || 0, 
          selectedCountry.longitude || 0, 
          1.02
        )}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color="#ff0000" />
        </mesh>
      )}
    </group>
  );
};

export default Earth;
