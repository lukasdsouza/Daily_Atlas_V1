
import React from "react";
import { Eye, Map } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="flex justify-center items-center py-3 px-4 bg-gradient-to-r from-blue-800 to-green-700">
      <div className="relative">
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
          <span className="inline-flex items-center gap-2">
            <Eye className="w-6 h-6 md:w-7 md:h-7" />
            <span>Olhos do Rio</span>
            <Map className="w-5 h-5 text-yellow-300" />
          </span>
        </h1>
        
        {/* Efeito de brilho atrás do título */}
        <div className="absolute -z-10 w-full h-full top-0 left-0 bg-blue-500/30 blur-3xl rounded-full"></div>
      </div>
    </header>
  );
};

export default Header;
