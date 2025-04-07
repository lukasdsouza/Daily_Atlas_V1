
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

  // Foco automático no Rio de Janeiro ao carregar
  useEffect(() => {
    if (controlsRef.current) {
      // Encontrar Rio nos países
      const rio = countries.find(country => country.id === "rio");
      if (rio) {
        // Aguarde um momento antes de focar para permitir que a cena seja renderizada
        const timer = setTimeout(() => {
          // Converter latitude/longitude do Rio para coordenadas esféricas
          const phi = (90 - rio.latitude) * (Math.PI / 180); // Converter latitude para phi
          const theta = (rio.longitude + 180) * (Math.PI / 180); // Converter longitude para theta
          
          // Posicionar câmera para olhar para o Rio
          if (controlsRef.current) {
            // @ts-ignore - TypeScript não conhece essas propriedades
            controlsRef.current.target.set(
              -Math.sin(phi) * Math.cos(theta) * 0.1,
              Math.cos(phi) * 0.1,
              Math.sin(phi) * Math.sin(theta) * 0.1
            );
            // @ts-ignore
            controlsRef.current.object.position.set(
              -Math.sin(phi) * Math.cos(theta) * 1.8,
              Math.cos(phi) * 1.8,
              Math.sin(phi) * Math.sin(theta) * 1.8
            );
            // @ts-ignore
            controlsRef.current.update();
          }
        }, 500);
        
        return () => clearTimeout(timer);
      }
    }
  }, [countries]);

  return (
    <Canvas
      camera={{ position: [0, 0, 2.5], fov: 45 }}
      style={{ background: "transparent" }}
    >
      {/* Luz ambiente principal reduzida para fazer o espaço parecer mais escuro */}
      <ambientLight intensity={0.2} />
      
      {/* Luz direcional principal */}
      <directionalLight color="#ffffff" position={[1, 1, 1]} intensity={0.7} />
      <directionalLight color="#6E59A5" position={[-2, -2, -2]} intensity={0.2} />
      
      {/* Adicionar ambiente espacial com estrelas */}
      <Stars />
      <SpaceEnvironment />
      
      {/* Globo */}
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
        maxDistance={5} 
        autoRotate={false}
        enableDamping={true}
        dampingFactor={0.1}
      />
    </Canvas>
  );
};

export default GlobeScene;
