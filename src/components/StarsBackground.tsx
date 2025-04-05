
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
    const starCount = isMobile ? 50 : 100; // Fewer stars on mobile
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star animate-star-twinkle";
      
      const size = Math.random() * 2 + 1;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.style.animationDelay = `${Math.random() * 4}s`;
      
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
    
    // Cleanup
    return () => {
      stars.forEach(star => {
        if (container.contains(star.element)) {
          container.removeChild(star.element);
        }
      });
    };
  }, [isMobile]);
  
  return <div ref={starsContainerRef} className="stars-container" />;
};

export default StarsBackground;
