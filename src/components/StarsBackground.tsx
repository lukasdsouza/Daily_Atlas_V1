
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
    const starCount = isMobile ? 200 : 400; // More stars for immersive effect
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star";
      
      const size = Math.random() * 3 + 0.5; // Slightly larger stars
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.style.animationDelay = `${Math.random() * 4}s`;
      star.style.opacity = `${Math.random() * 0.5 + 0.5}`;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;
      
      // Add different colors to some stars
      if (Math.random() > 0.8) {
        const hues = [200, 270, 180, 30]; // Blue, Purple, Teal, Gold
        const hue = hues[Math.floor(Math.random() * hues.length)];
        star.style.backgroundColor = `hsl(${hue}, 80%, 80%)`;
        star.style.boxShadow = `0 0 10px hsl(${hue}, 80%, 70%), 0 0 20px hsl(${hue}, 80%, 60%)`;
      }
      
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
    
    // Add nebulas (colorful gas clouds)
    for (let i = 0; i < 8; i++) {
      const nebula = document.createElement("div");
      nebula.className = "nebula";
      
      const size = Math.random() * 300 + 150;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      
      // Choose between blue, purple, and teal hues
      const hueOptions = [220, 280, 180, 330]; // Blue, Purple, Teal, Pink
      const hue = hueOptions[Math.floor(Math.random() * hueOptions.length)];
      const saturation = 70 + Math.random() * 20;
      const lightness = 50 + Math.random() * 20;
      
      nebula.style.width = `${size}px`;
      nebula.style.height = `${size}px`;
      nebula.style.left = `${x}px`;
      nebula.style.top = `${y}px`;
      nebula.style.background = `radial-gradient(circle, hsla(${hue}, ${saturation}%, ${lightness}%, 0.1) 0%, transparent 70%)`;
      nebula.style.borderRadius = '50%';
      nebula.style.opacity = '0.4';
      nebula.style.filter = 'blur(30px)';
      nebula.style.animation = `pulse-subtle ${Math.random() * 5 + 8}s ease-in-out infinite`;
      
      container.appendChild(nebula);
    }
    
    // Add shooting stars
    const createShootingStar = () => {
      const shootingStar = document.createElement("div");
      shootingStar.className = "shooting-star";
      
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * (window.innerHeight / 2); // Start in upper half
      
      shootingStar.style.left = `${startX}px`;
      shootingStar.style.top = `${startY}px`;
      shootingStar.style.width = `${Math.random() * 100 + 50}px`;
      shootingStar.style.height = `3px`;
      
      // Random angle between 30 and 60 degrees
      const angle = Math.random() * 30 + 30;
      shootingStar.style.transform = `rotate(${angle}deg)`;
      
      // Random colors for shooting stars
      const hueOptions = [180, 220, 270, 330]; // Teal, Blue, Purple, Pink
      const hue = hueOptions[Math.floor(Math.random() * hueOptions.length)];
      shootingStar.style.background = `linear-gradient(90deg, transparent, hsl(${hue}, 80%, 70%), transparent)`;
      shootingStar.style.boxShadow = `0 0 15px 2px hsla(${hue}, 80%, 70%, 0.7)`;
      
      container.appendChild(shootingStar);
      
      // Remove after animation completes
      setTimeout(() => {
        if (container.contains(shootingStar)) {
          container.removeChild(shootingStar);
        }
      }, 1000);
    };
    
    // Create shooting star periodically
    const shootingStarInterval = setInterval(() => {
      if (Math.random() > 0.6) { // 40% chance each interval
        createShootingStar();
      }
    }, 2000);
    
    // Create initial shooting stars
    for (let i = 0; i < 3; i++) {
      setTimeout(() => createShootingStar(), Math.random() * 2000);
    }
    
    // Cleanup
    return () => {
      clearInterval(shootingStarInterval);
      
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
      
      // Remove any shooting stars
      const shootingStars = container.querySelectorAll('.shooting-star');
      shootingStars.forEach(star => {
        if (container.contains(star)) {
          container.removeChild(star);
        }
      });
    };
  }, [isMobile]);
  
  return <div ref={starsContainerRef} className="stars-container" />;
};

export default StarsBackground;
