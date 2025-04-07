
import React from "react";
import { Eye, Map, Building } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="flex justify-center items-center py-4 px-4 bg-gradient-to-r from-gray-800 to-gray-700 shadow-md">
      <div className="relative">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
          <span className="inline-flex items-center gap-3">
            <Eye className="w-7 h-7 md:w-8 md:h-8" />
            <span>Olhos do Rio</span>
            <Building className="w-6 h-6 text-gray-300" />
          </span>
        </h1>
        
        {/* Efeito de brilho atrás do título */}
        <div className="absolute -z-10 w-full h-full top-0 left-0 bg-gray-500/30 blur-3xl rounded-full"></div>
      </div>
    </header>
  );
};

export default Header;
