
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-mobile";

// Define countries and their coordinates
interface Country {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

const countries: Country[] = [
  { id: "us", name: "United States", latitude: 37.0902, longitude: -95.7129 },
  { id: "br", name: "Brazil", latitude: -14.235, longitude: -51.9253 },
  { id: "gb", name: "United Kingdom", latitude: 55.3781, longitude: -3.4360 },
  { id: "fr", name: "France", latitude: 46.2276, longitude: 2.2137 },
  { id: "de", name: "Germany", latitude: 51.1657, longitude: 10.4515 },
  { id: "jp", name: "Japan", latitude: 36.2048, longitude: 138.2529 },
  { id: "au", name: "Australia", latitude: -25.2744, longitude: 133.7751 },
  { id: "za", name: "South Africa", latitude: -30.5595, longitude: 22.9375 },
  { id: "in", name: "India", latitude: 20.5937, longitude: 78.9629 },
  { id: "cn", name: "China", latitude: 35.8617, longitude: 104.1954 },
];

// Convert lat/long to 3D coordinates on a sphere
const latLongToVector3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

interface GlobeProps {
  onCountrySelect: (country: Country) => void;
  selectedCountry: Country | null;
}

const Globe: React.FC<GlobeProps> = ({ onCountrySelect, selectedCountry }) => {
  const groupRef = useRef<THREE.Group>(null);
  const isMobile = useIsMobile();
  
  // Load textures
  const [earthMap, earthBump, earthSpec, earthNormal, cloudMap] = useTexture([
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
  ]);

  // Auto-rotate but slower
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
      <mesh>
        <sphereGeometry args={[1.01, 64, 64]} />
        <meshPhongMaterial
          map={cloudMap}
          transparent={true}
          opacity={0.3}
          depthWrite={false}
        />
      </mesh>
      
      {/* Country markers */}
      {markers}
    </group>
  );
};

interface GlobeViewerProps {
  onCountrySelect: (country: Country) => void;
  selectedCountry: Country | null;
}

const GlobeViewer: React.FC<GlobeViewerProps> = ({ onCountrySelect, selectedCountry }) => {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={canvasRef} className="relative w-full h-64 sm:h-80 md:h-96">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight color="#ffffff" position={[1, 1, 1]} intensity={1} />
        <directionalLight color="#6E59A5" position={[-2, -2, -2]} intensity={0.3} />
        <Globe onCountrySelect={onCountrySelect} selectedCountry={selectedCountry} />
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          rotateSpeed={0.5}
          zoomSpeed={0.5}
          minDistance={1.5}
          maxDistance={4}
        />
      </Canvas>
      
      {selectedCountry && (
        <div className="absolute left-4 top-4 bg-space-dark/80 backdrop-blur-sm p-2 rounded-lg text-white border border-space-purple/30 text-sm">
          {selectedCountry.name}
        </div>
      )}
    </div>
  );
};

export type { Country };
export { countries };
export default GlobeViewer;
