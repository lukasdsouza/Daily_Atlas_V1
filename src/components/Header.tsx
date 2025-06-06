
import React from "react";
import { GlobeIcon, Moon, Sun, Stars } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="flex justify-center items-center py-4 px-4">
      <div className="relative">
        <h1 className="text-3xl md:text-4xl font-title font-bold text-white text-center">
          <span className="text-space-bright animate-pulse-glow inline-flex items-center gap-2">
            <GlobeIcon className="w-7 h-7 md:w-8 md:h-8 animate-rotate-globe" />
            <span className="text-yellow-200">Daily Atlas</span>
            <Stars className="w-5 h-5 text-yellow-300 animate-star-twinkle" />
          </span>
        </h1>
        
        {/* Planetas pequenos decorativos */}
        <div className="absolute -right-8 -top-2">
          <Moon className="w-3 h-3 text-gray-300 opacity-70" />
        </div>
        <div className="absolute -left-10 top-3">
          <Sun className="w-4 h-4 text-yellow-200 opacity-75" />
        </div>
        
        {/* Efeito de brilho atrás do título */}
        <div className="absolute -z-10 w-full h-full top-0 left-0 bg-space-purple/30 blur-3xl rounded-full"></div>
      </div>
    </header>
  );
};

export default Header;
