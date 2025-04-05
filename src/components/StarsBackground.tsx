
import React, { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
  element: HTMLDivElement;
}

const StarsBackground: React.FC = () => {
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (!starsContainerRef.current) return;
    
    const container = starsContainerRef.current;
    const stars: Star[] = [];
    const starCount = isMobile ? 100 : 200; // More stars for immersive effect
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star animate-star-twinkle";
      
      const size = Math.random() * 2.5 + 0.5; // Slightly larger stars
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.style.animationDelay = `${Math.random() * 4}s`;
      star.style.opacity = `${Math.random() * 0.5 + 0.5}`;
      
      container.appendChild(star);
      
      stars.push({
        x,
        y,
        size,
        alpha: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 0.1,
        element: star
      });
    }
    
    // Add a few "nebula" effects
    for (let i = 0; i < 3; i++) {
      const nebula = document.createElement("div");
      nebula.className = "nebula";
      
      const size = Math.random() * 150 + 100;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const hue = Math.floor(Math.random() * 60) + 240; // Blue to purple hues
      
      nebula.style.width = `${size}px`;
      nebula.style.height = `${size}px`;
      nebula.style.left = `${x}px`;
      nebula.style.top = `${y}px`;
      nebula.style.background = `radial-gradient(circle, hsla(${hue}, 80%, 60%, 0.1) 0%, transparent 70%)`;
      nebula.style.borderRadius = '50%';
      nebula.style.opacity = '0.4';
      nebula.style.filter = 'blur(8px)';
      
      container.appendChild(nebula);
    }
    
    // Cleanup
    return () => {
      stars.forEach(star => {
        if (container.contains(star.element)) {
          container.removeChild(star.element);
        }
      });
      
      // Remove nebulas too
      const nebulas = container.querySelectorAll('.nebula');
      nebulas.forEach(nebula => {
        if (container.contains(nebula)) {
          container.removeChild(nebula);
        }
      });
    };
  }, [isMobile]);
  
  return <div ref={starsContainerRef} className="stars-container" />;
};

export default StarsBackground;
