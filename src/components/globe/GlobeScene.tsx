
import React from "react";
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
}

const GlobeScene: React.FC<GlobeSceneProps> = ({ 
  onCountrySelect, 
  selectedCountry,
  countries 
}) => {
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
        enableZoom={true}
        enablePan={false}
        rotateSpeed={0.5}
        zoomSpeed={0.5}
        minDistance={1.5}
        maxDistance={8} // Increased to allow viewing other planets
      />
    </Canvas>
  );
};

export default GlobeScene;
