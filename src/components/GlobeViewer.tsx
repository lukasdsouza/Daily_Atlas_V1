
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useTexture, Stars } from "@react-three/drei";
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

// Comet component
const Comet = () => {
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
const Sun = () => {
  const sunPosition = [50, 5, -30];
  
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
const Planet = ({ position, size, color, speed, rotationSpeed }: { 
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

// Aurora effect for Earth
const EarthAurora = () => {
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
const AnimatedClouds = ({ cloudMap }: { cloudMap: THREE.Texture }) => {
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

// Space Background
const SpaceEnvironment = () => {
  return (
    <>
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0.5} 
        fade 
        speed={1}
      />
      
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

// Pulse effect for selected country
const PulseMarker = () => {
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

interface GlobeViewerProps {
  onCountrySelect: (country: Country) => void;
  selectedCountry: Country | null;
}

const GlobeViewer: React.FC<GlobeViewerProps> = ({ onCountrySelect, selectedCountry }) => {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={canvasRef} className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        style={{ background: "transparent" }}
      >
        {/* Main ambient light reduced to make space feel darker */}
        <ambientLight intensity={0.2} />
        
        {/* Main directional light */}
        <directionalLight color="#ffffff" position={[1, 1, 1]} intensity={0.7} />
        <directionalLight color="#6E59A5" position={[-2, -2, -2]} intensity={0.2} />
        
        {/* Add space environment */}
        <SpaceEnvironment />
        
        {/* Globe */}
        <Globe onCountrySelect={onCountrySelect} selectedCountry={selectedCountry} />
        
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          rotateSpeed={0.5}
          zoomSpeed={0.5}
          minDistance={1.5}
          maxDistance={8} // Increased to allow viewing other planets
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
