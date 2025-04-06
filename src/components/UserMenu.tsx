
import React, { useState } from "react";
import { Info, User, Settings, LogOut, Menu, Globe, MapPin, Home } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { continents, Country } from "@/data/countries";

interface UserMenuProps {
  showInfo: boolean;
  setShowInfo: (show: boolean) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  selectedContinent: string;
  setSelectedContinent: (continent: string) => void;
  onCountrySelect: (country: Country) => void;
  countries: Country[];
  selectedCountry: Country | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ 
  showInfo, 
  setShowInfo, 
  isLoggedIn, 
  onLogout,
  selectedContinent,
  setSelectedContinent,
  onCountrySelect,
  countries,
  selectedCountry
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  
  // Filter countries by continent
  const filteredCountries = selectedContinent === "Todos" 
    ? countries
    : countries.filter(country => country.continent === selectedContinent);
  
  return (
    <>
      {/* Top bar with menu and user profile */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-3 bg-space-dark/80 backdrop-blur-md">
        {/* Menu Hambúrguer */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button 
              className="p-2 rounded-full bg-space-dark/80 hover:bg-space-dark/90 transition-colors"
              aria-label="Menu principal"
            >
              <Menu className="w-5 h-5 text-space-bright" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-space-dark/95 border-space-purple/30 text-space-bright w-[280px] sm:w-[350px] backdrop-blur-lg">
            <SheetHeader>
              <SheetTitle className="text-space-bright flex items-center gap-2">
                <User className="w-5 h-5" />
                Daily Atlas
              </SheetTitle>
            </SheetHeader>
            <div className="py-6">
              <nav className="flex flex-col gap-4">
                <a 
                  href="/" 
                  className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-space-purple/20 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Home className="w-4 h-4" />
                  <span className="text-sm">Página Inicial</span>
                </a>
                
                {/* Dropdown de Continentes */}
                <div className="px-4">
                  <h3 className="text-xs font-medium mb-2 text-space-bright/70">Continentes</h3>
                  <div className="flex flex-col gap-1">
                    {continents.map((continent) => (
                      <button
                        key={continent}
                        onClick={() => {
                          setSelectedContinent(continent);
                          setOpen(false);
                        }}
                        className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-md transition-colors ${
                          selectedContinent === continent 
                            ? "bg-space-purple/30 text-white" 
                            : "hover:bg-space-purple/20"
                        }`}
                      >
                        <Globe className="w-3.5 h-3.5" />
                        {continent}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Países por Continente */}
                <div className="px-4 mt-2">
                  <h3 className="text-xs font-medium mb-2 text-space-bright/70">Países e Cidades</h3>
                  <div className="max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="flex flex-col gap-1">
                      {filteredCountries.map((country) => (
                        <button
                          key={country.id}
                          onClick={() => {
                            onCountrySelect(country);
                            setOpen(false);
                          }}
                          className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-md hover:bg-space-purple/20 transition-colors ${
                            selectedCountry?.id === country.id 
                              ? "bg-space-purple/30 text-white" 
                              : ""
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          {country.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Configurações e Login */}
                <div className="mt-4 border-t border-space-purple/20 pt-4 px-4">
                  <a 
                    href="/settings" 
                    className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-space-purple/20 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Configurações</span>
                  </a>
                  
                  {isLoggedIn ? (
                    <button 
                      onClick={() => {
                        onLogout();
                        setOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-space-purple/20 transition-colors text-red-400 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Sair</span>
                    </button>
                  ) : (
                    <a 
                      href="/login" 
                      className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-space-purple/20 transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">Entrar / Cadastrar</span>
                    </a>
                  )}
                </div>
              </nav>
              
              <div className="mt-8 px-4">
                <button 
                  onClick={() => {
                    setShowInfo(!showInfo);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 text-xs text-space-bright/80 hover:text-space-bright transition-colors"
                >
                  <Info className="w-4 h-4" />
                  <span>{showInfo ? "Ocultar" : "Mostrar"} Informações</span>
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        {/* User profile on top right */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full bg-space-dark/60 hover:bg-space-dark/80 transition-colors">
                  <User className="w-4 h-4 text-space-bright" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glassmorphism border-space-purple/30">
                <div className="px-2 py-1.5 text-sm font-medium text-space-bright">Minha Conta</div>
                <DropdownMenuSeparator className="bg-space-purple/30" />
                <DropdownMenuItem 
                  className="cursor-pointer flex items-center gap-2 focus:bg-space-purple/30"
                  onClick={() => navigate('/settings')}
                >
                  <Settings className="w-4 h-4" />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer flex items-center gap-2 focus:bg-space-purple/30 text-red-400"
                  onClick={onLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="p-2 rounded-full bg-space-dark/60 hover:bg-space-dark/80 transition-colors"
            >
              <User className="w-4 h-4 text-space-bright" />
            </button>
          )}
        </div>
      </div>
      
      {/* Help information */}
      {showInfo && (
        <div className="fixed top-16 right-4 z-10 cosmos-card w-64 text-xs">
          <h4 className="font-medium text-space-bright mb-1">Como usar o globo:</h4>
          <ul className="text-muted-foreground list-disc list-inside">
            <li>Arraste para girar</li>
            <li>Use o scroll para ampliar</li>
            <li>Clique nas cidades para ver lugares</li>
            <li>Clique nos países para ver notícias</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default UserMenu;
