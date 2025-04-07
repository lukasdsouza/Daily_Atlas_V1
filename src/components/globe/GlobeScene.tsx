
import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Country } from "@/data/countries";
import Earth from "./Earth";
import { SpaceEnvironment } from "./SpaceElements";
import Stars from "./Stars";

interface GlobeSceneProps {
  onCountrySelect: (country: Country) => void;
  selectedCountry: Country | null;
  countries: Country[];
  autoRotateToRio?: boolean;
}

const GlobeScene: React.FC<GlobeSceneProps> = ({ 
  onCountrySelect, 
  selectedCountry,
  countries,
  autoRotateToRio = true
}) => {
  const controlsRef = useRef(null);

  // Auto-focus on Rio de Janeiro on initial load
  useEffect(() => {
    if (autoRotateToRio && controlsRef.current) {
      // Find Rio in countries
      const rio = countries.find(country => country.id === "rio");
      if (rio) {
        // Wait a moment before focusing to allow the scene to render
        const timer = setTimeout(() => {
          // Convert Rio's latitude/longitude to spherical coordinates
          // This is a simplified approach - for exact positioning would need more complex math
          const phi = (90 - rio.latitude) * (Math.PI / 180); // Convert latitude to phi
          const theta = (rio.longitude + 180) * (Math.PI / 180); // Convert longitude to theta
          
          // Position camera to look at Rio
          if (controlsRef.current) {
            // @ts-ignore - TypeScript doesn't know about these properties
            controlsRef.current.target.set(
              -Math.sin(phi) * Math.cos(theta) * 0.1,
              Math.cos(phi) * 0.1,
              Math.sin(phi) * Math.sin(theta) * 0.1
            );
            // @ts-ignore
            controlsRef.current.update();
          }
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [countries, autoRotateToRio]);

  return (
    <Canvas
      camera={{ position: [0, 0, 2.5], fov: 45 }}
      style={{ background: "transparent" }}
    >
      {/* Main ambient light reduced to make space feel darker */}
      <ambientLight intensity={0.2} />
      
      {/* Main directional light */}
      <directionalLight color="#ffffff" position={[1, 1, 1]} intensity={0.7} />
      <directionalLight color="#6E59A5" position={[-2, -2, -2]} intensity={0.2} />
      
      {/* Add space environment with stars */}
      <Stars />
      <SpaceEnvironment />
      
      {/* Globe */}
      <Earth 
        onCountrySelect={onCountrySelect} 
        selectedCountry={selectedCountry} 
        countries={countries}
      />
      
      <OrbitControls 
        ref={controlsRef}
        enableZoom={true}
        enablePan={false}
        rotateSpeed={0.5}
        zoomSpeed={0.5}
        minDistance={1.5}
        maxDistance={8} // Increased to allow viewing other planets
        autoRotate={false}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};

export default GlobeScene;
