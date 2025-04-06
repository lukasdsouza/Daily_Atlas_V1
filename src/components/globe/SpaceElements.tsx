import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

// Enhanced Comet component with more realistic effects
export const Comet = () => {
  const cometRef = useRef<THREE.Group>(null);
  const cometBodyRef = useRef<THREE.Mesh>(null);
  const tailRef = useRef<THREE.Mesh>(null);
  const speed = Math.random() * 0.02 + 0.01;
  const distance = Math.random() * 20 + 30;
  const angle = Math.random() * Math.PI * 2;
  const yPos = Math.random() * 10 - 5;
  const cometSize = Math.random() * 0.2 + 0.1;
  const tailLength = Math.random() * 2 + 1;
  
  // Random colors for comets (blue, cyan, purple hues)
  const colors = ["#68e0ff", "#a68eff", "#ff7efd"];
  const cometColor = colors[Math.floor(Math.random() * colors.length)];
  
  useFrame(({ clock }) => {
    if (!cometRef.current) return;
    
    const time = clock.getElapsedTime();
    cometRef.current.position.x = Math.cos(time * speed + angle) * distance;
    cometRef.current.position.z = Math.sin(time * speed + angle) * distance;
    cometRef.current.position.y = yPos;
    
    // Point in direction of travel
    cometRef.current.lookAt(0, yPos, 0);
    
    // Pulsating effect
    if (cometBodyRef.current && tailRef.current) {
      const pulseFactor = Math.sin(time * 5) * 0.1 + 1;
      cometBodyRef.current.scale.set(pulseFactor, pulseFactor, pulseFactor);
      
      // Make tail glow/flicker
      if (tailRef.current.material instanceof THREE.Material) {
        const material = tailRef.current.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = 1 + Math.sin(time * 10) * 0.3;
      }
    }
  });
  
  return (
    <group ref={cometRef} position={[distance, yPos, 0]}>
      {/* Comet body - enhanced with more complex material */}
      <mesh ref={cometBodyRef}>
        <sphereGeometry args={[cometSize, 16, 16]} />
        <meshStandardMaterial 
          color={cometColor} 
          emissive={cometColor} 
          emissiveIntensity={1.8}
          metalness={0.7}
          roughness={0.3}
        />
        <pointLight color={cometColor} intensity={2.5} distance={10} decay={2} />
      </mesh>
      
      {/* Comet tail - improved with better shape and glow */}
      <mesh ref={tailRef} position={[tailLength/2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[cometSize*0.8, tailLength * 1.5, 16]} />
        <meshStandardMaterial 
          color={cometColor} 
          emissive={cometColor} 
          emissiveIntensity={2}
          transparent={true}
          opacity={0.8}
        />
      </mesh>
      
      {/* Add particle trail effect */}
      {Array(5).fill(null).map((_, i) => {
        const particleSize = cometSize * 0.4 * (1 - i / 5);
        const particleDistance = (i + 1) * tailLength / 6;
        return (
          <mesh key={`particle-${i}`} position={[particleDistance, 0, 0]}>
            <sphereGeometry args={[particleSize, 8, 8]} />
            <meshBasicMaterial
              color={cometColor}
              transparent={true}
              opacity={(1 - i / 5) * 0.7}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Enhanced Sun component
export const Sun = () => {
  const sunRef = useRef<THREE.Group>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  
  // Fixed: Ensure sunPosition is a tuple with exactly 3 elements
  const sunPosition: [number, number, number] = [50, 5, -30];
  
  useFrame(({ clock }) => {
    if (sunRef.current && coronaRef.current) {
      const time = clock.getElapsedTime();
      
      // Enhanced pulsating effect with more complex patterns
      const pulseFactor = 1 + Math.sin(time * 0.5) * 0.05 + Math.sin(time * 0.3) * 0.03;
      coronaRef.current.scale.set(pulseFactor, pulseFactor, pulseFactor);
      
      // More dynamic rotation
      sunRef.current.rotation.y = time * 0.05;
      coronaRef.current.rotation.z = time * 0.03;
      coronaRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }
  });
  
  return (
    <group ref={sunRef} position={sunPosition}>
      {/* Sun core with improved texture */}
      <mesh>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial color="#FDB813">
          {/* If adding noise texture were possible, it would go here */}
        </meshBasicMaterial>
        <pointLight color="#FFF5D4" intensity={1.8} distance={120} decay={1} />
      </mesh>
      
      {/* Multi-layered corona for more realistic sun */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[7, 32, 32]} />
        <meshBasicMaterial 
          color="#FF7B00" 
          transparent={true} 
          opacity={0.4}
        />
      </mesh>
      
      {/* Secondary corona layer */}
      <mesh>
        <sphereGeometry args={[9, 32, 32]} />
        <meshBasicMaterial 
          color="#FF9D00" 
          transparent={true} 
          opacity={0.2}
        />
      </mesh>
      
      {/* Enhanced sun flares - more dynamic positioning */}
      {Array(12).fill(null).map((_, i) => {
        const size = Math.random() * 2 + 0.8;
        const angle = (i / 12) * Math.PI * 2;
        const radius = 5 + Math.random() * 1.5;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = (Math.random() - 0.5) * 3;
        return (
          <mesh key={`flare-${i}`} position={[x, y, z]}>
            <sphereGeometry args={[size, 16, 16]} />
            <meshBasicMaterial 
              color={i % 2 === 0 ? "#FFF5D4" : "#FFCC00"} 
              transparent={true} 
              opacity={0.7 + Math.random() * 0.3}
            />
          </mesh>
        );
      })}
      
      <ambientLight intensity={0.1} />
    </group>
  );
};

// Textures for planets
const useTexturedPlanet = (size: number, position: [number, number, number], speed: number, rotationSpeed: number, texturePath: string) => {
  const planetRef = useRef<THREE.Mesh>(null);
  const distance = Math.sqrt(position[0] * position[0] + position[2] * position[2]);
  const initialAngle = Math.atan2(position[2], position[0]);
  
  const texture = useTexture(texturePath);
  
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
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

// Enhanced Planet component
export const Planet = ({ position, size, color, speed, rotationSpeed, hasRings = false, hasMoons = false }: { 
  position: [number, number, number], 
  size: number, 
  color: string,
  speed: number,
  rotationSpeed: number,
  hasRings?: boolean,
  hasMoons?: boolean
}) => {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh>(null);
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
      
      // Update rings if they exist
      if (hasRings && ringsRef.current) {
        ringsRef.current.position.x = planetRef.current.position.x;
        ringsRef.current.position.y = planetRef.current.position.y;
        ringsRef.current.position.z = planetRef.current.position.z;
        ringsRef.current.rotation.y += rotationSpeed * 0.5;
      }
    }
  });
  
  return (
    <>
      <mesh ref={planetRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshPhongMaterial 
          color={color} 
          shininess={10}
          specular={new THREE.Color("#444444")}
        />
        
        {/* Add atmosphere glow */}
        <mesh>
          <sphereGeometry args={[size * 1.05, 32, 32]} />
          <meshBasicMaterial 
            color={color} 
            transparent={true} 
            opacity={0.2}
          />
        </mesh>
        
        {/* Add moons if specified */}
        {hasMoons && Array(Math.floor(Math.random() * 2) + 1).fill(null).map((_, i) => {
          const moonSize = size * 0.3;
          const moonDistance = size * 3;
          const moonSpeed = 0.05;
          return (
            <mesh key={`moon-${i}`}>
              <sphereGeometry args={[moonSize, 16, 16]} />
              <meshPhongMaterial color="#AAAAAA" />
              <group position={[moonDistance, 0, 0]}>
                <mesh>
                  <sphereGeometry args={[moonSize, 16, 16]} />
                  <meshPhongMaterial color="#AAAAAA" />
                </mesh>
              </group>
            </mesh>
          );
        })}
      </mesh>
      
      {/* Add rings if specified */}
      {hasRings && (
        <mesh ref={ringsRef} rotation={[Math.PI / 5, 0, 0]} position={position}>
          <ringGeometry args={[size * 1.5, size * 2.5, 32]} />
          <meshPhongMaterial 
            color={color} 
            side={THREE.DoubleSide} 
            transparent 
            opacity={0.7} 
          />
        </mesh>
      )}
    </>
  );
};

// Enhanced Space Background
export const SpaceEnvironment = () => {
  return (
    <>
      <Stars />
      
      <Sun />
      
      {/* Mars - enhanced with better coloring */}
      <Planet 
        position={[25, 0, 15]} 
        size={0.8} 
        color="#cf3a09" 
        speed={0.05} 
        rotationSpeed={0.01}
        hasMoons={true}
      />
      
      {/* Venus - enhanced with brighter appearance */}
      <Planet 
        position={[-30, -5, -10]} 
        size={0.9} 
        color="#e39e1c" 
        speed={0.03} 
        rotationSpeed={0.007}
      />
      
      {/* Saturn with rings - improved ring system */}
      <Planet 
        position={[45, 10, -25]} 
        size={1.5} 
        color="#cbac80" 
        speed={0.02} 
        rotationSpeed={0.005}
        hasRings={true}
      />
      
      {/* Neptune - added with distinctive blue color */}
      <Planet 
        position={[-40, 8, 20]} 
        size={1.2} 
        color="#3498db" 
        speed={0.015} 
        rotationSpeed={0.008}
        hasMoons={true}
      />
      
      {/* Jupiter - new massive gas giant */}
      <Planet 
        position={[35, -8, -30]} 
        size={2.2} 
        color="#e0ae6f" 
        speed={0.01} 
        rotationSpeed={0.012}
        hasRings={false}
        hasMoons={true}
      />
      
      {/* Add more comets for a livelier space environment */}
      {Array(12).fill(null).map((_, i) => (
        <Comet key={`comet-${i}`} />
      ))}
    </>
  );
};

// Enhanced Stars component with nebula effects
export const Stars = () => {
  const nebulaRef = useRef<THREE.Mesh>(null);
  const nebulaTwoRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (nebulaRef.current && nebulaTwoRef.current) {
      const time = clock.getElapsedTime();
      // More complex rotation patterns
      nebulaRef.current.rotation.y = time * 0.01;
      nebulaRef.current.rotation.z = time * 0.005;
      nebulaTwoRef.current.rotation.z = time * 0.008;
      nebulaTwoRef.current.rotation.x = time * 0.003;
      
      // Pulsating opacity for nebulas
      if (nebulaRef.current.material instanceof THREE.Material) {
        const material = nebulaRef.current.material as THREE.MeshBasicMaterial;
        material.opacity = 0.2 + Math.sin(time * 0.2) * 0.05;
      }
      if (nebulaTwoRef.current.material instanceof THREE.Material) {
        const material = nebulaTwoRef.current.material as THREE.MeshBasicMaterial;
        material.opacity = 0.15 + Math.sin(time * 0.17) * 0.05;
      }
    }
  });
  
  return (
    <>
      {/* Enhanced star particles with more variety */}
      {Array(800).fill(null).map((_, i) => {
        const position: [number, number, number] = [
          (Math.random() - 0.5) * 300,
          (Math.random() - 0.5) * 300,
          (Math.random() - 0.5) * 300
        ];
        const size = Math.random() * 0.6 + 0.1;
        
        // Enhanced star colors with more variety
        const starColors = [
          "#ffffff", // white
          "#fffae0", // warm white
          "#e0f8ff", // cool white
          "#fff7d0", // yellow tint
          "#d0e8ff", // blue tint
          "#ffddf0", // pink tint
          "#e0ffed", // green tint
        ];
        const color = starColors[Math.floor(Math.random() * starColors.length)];
        
        // Some stars twinkle
        const twinkle = i % 5 === 0;
        
        return (
          <mesh key={`star-${i}`} position={position}>
            <sphereGeometry args={[size, 8, 8]} />
            <meshBasicMaterial color={color} />
            {twinkle && (
              <pointLight 
                color={color} 
                intensity={0.2} 
                distance={5} 
                decay={2}
              />
            )}
          </mesh>
        );
      })}
      
      {/* Main purple nebula cloud */}
      <mesh ref={nebulaRef} position={[0, 0, -100]}>
        <sphereGeometry args={[80, 32, 32]} />
        <meshBasicMaterial 
          color="#7E69AB" 
          transparent={true} 
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Cyan nebula cloud */}
      <mesh ref={nebulaTwoRef} position={[100, 20, 0]} rotation={[0.5, 0.5, 0]}>
        <sphereGeometry args={[60, 32, 32]} />
        <meshBasicMaterial 
          color="#33C3F0" 
          transparent={true} 
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Orange/red nebula */}
      <mesh position={[-90, -30, 50]} rotation={[-0.3, 0.2, 0.1]}>
        <sphereGeometry args={[45, 32, 32]} />
        <meshBasicMaterial 
          color="#FF5733" 
          transparent={true} 
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Distant galaxy */}
      <mesh position={[-150, 70, -50]} rotation={[1.2, 0.5, 0.7]}>
        <ringGeometry args={[20, 40, 32]} />
        <meshBasicMaterial 
          color="#FFEB3B" 
          transparent={true} 
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};
