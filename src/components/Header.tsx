
import React from "react";
import { GlobeIcon } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="flex justify-center items-center p-4 mb-4">
      <div className="relative">
        <h1 className="text-3xl md:text-4xl font-title font-bold text-white text-center">
          <span className="text-space-bright animate-pulse-glow inline-flex items-center gap-2">
            <GlobeIcon className="w-7 h-7 md:w-8 md:h-8 animate-rotate-globe" />
            Daily Atlas
          </span>
        </h1>
        <div className="absolute -z-10 w-full h-full top-0 left-0 bg-space-purple/20 blur-3xl rounded-full"></div>
      </div>
    </header>
  );
};

export default Header;
