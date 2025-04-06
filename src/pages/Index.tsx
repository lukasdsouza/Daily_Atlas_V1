
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import GlobeViewer, { Country, countries } from "@/components/GlobeViewer";
import NewsPanel from "@/components/NewsPanel";
import StarsBackground from "@/components/StarsBackground";
import PlaceDetails from "@/components/PlaceDetails";
import PlaceCard from "@/components/PlaceCard";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Info, ArrowRight, User, Settings, LogOut, MapPin, Utensils, Music, CalendarDays } from "lucide-react";
import { toast } from "sonner";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { rioPlaces, Place } from "@/data/countries";

const Index = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showCountryList, setShowCountryList] = useState(false);
  const [showPlaces, setShowPlaces] = useState(false);
  const [activePlaceFilter, setActivePlaceFilter] = useState<'all' | 'tourist' | 'restaurant' | 'nightclub' | 'event'>('all');
  const [preferredCountries, setPreferredCountries] = useState<Country[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Auto-select Rio de Janeiro on initial load
  useEffect(() => {
    const rio = countries.find(country => country.id === "rio");
    if (rio) {
      setSelectedCountry(rio);
      toast(`Explorando ${rio.name}`, {
        icon: "🏖️",
      });
    }
  }, []);

  // Check for login status and preferred countries
  useEffect(() => {
    const storedCountries = localStorage.getItem('preferredCountries');
    if (storedCountries) {
      try {
        const parsed = JSON.parse(storedCountries);
        setPreferredCountries(parsed);
        setIsLoggedIn(true);
      } catch (e) {
        console.error("Failed to parse preferred countries", e);
      }
    }
  }, []);

  const handleCountrySelect = (country: Country) => {
    toast(`Explorando ${country.name}`, {
      icon: "🌎",
    });
    setSelectedCountry(country);
    
    // Show places panel if it's Rio
    if (country.id === "rio") {
      setShowPlaces(true);
    } else {
      setShowPlaces(false);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('preferredCountries');
    setPreferredCountries([]);
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
    navigate('/login');
  };

  // Filter places based on the active filter
  const filteredPlaces = activePlaceFilter === 'all' 
    ? rioPlaces 
    : rioPlaces.filter(place => place.type === activePlaceFilter);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarsBackground />
      
      <Header />
      
      <main className="max-w-full mx-auto h-[calc(100vh-80px)]">
        <div className="flex flex-col h-full relative">
          <ErrorBoundary>
            <div className="w-full h-full relative flex-grow">
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <button 
                  onClick={() => setShowInfo(!showInfo)}
                  className="p-2 rounded-full bg-space-dark/60 hover:bg-space-dark/80 transition-colors"
                  aria-label="Show information"
                >
                  <Info className="w-4 h-4 text-space-blue" />
                </button>
                
                {isLoggedIn && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-full bg-space-dark/60 hover:bg-space-dark/80 transition-colors">
                        <User className="w-4 h-4 text-space-bright" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="glassmorphism border-space-purple/30">
                      <div className="px-2 py-1.5 text-sm font-medium text-space-bright">My Account</div>
                      <DropdownMenuSeparator className="bg-space-purple/30" />
                      <DropdownMenuItem 
                        className="cursor-pointer flex items-center gap-2 focus:bg-space-purple/30"
                        onClick={() => navigate('/login')}
                      >
                        <Settings className="w-4 h-4" />
                        Change Preferences
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer flex items-center gap-2 focus:bg-space-purple/30 text-red-400"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              
              {showInfo && (
                <div className="absolute top-14 right-4 z-10 cosmos-card w-64 text-xs">
                  <h4 className="font-medium text-space-bright mb-1">How to use the globe:</h4>
                  <ul className="text-muted-foreground list-disc list-inside">
                    <li>Drag to rotate</li>
                    <li>Pinch or scroll to zoom</li>
                    <li>Click on Rio de Janeiro to view places</li>
                    <li>Click on other markers to view news</li>
                  </ul>
                </div>
              )}
              
              <GlobeViewer 
                onCountrySelect={handleCountrySelect} 
                selectedCountry={selectedCountry}
              />
              
              {selectedCountry && !selectedCountry.isCity && (
                <div className="absolute left-4 top-4 bg-space-dark/80 backdrop-blur-sm p-2 rounded-lg text-white border border-space-purple/30 text-sm">
                  {selectedCountry.name}
                </div>
              )}
              
              {selectedCountry && selectedCountry.isCity && (
                <div className="absolute left-4 top-4 bg-space-dark/80 backdrop-blur-sm p-3 rounded-lg text-white border border-space-purple/30">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#33FFD0]" />
                    <div>
                      <h3 className="font-bold text-lg">{selectedCountry.name}</h3>
                      <p className="text-xs text-muted-foreground">{selectedCountry.description}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ErrorBoundary>
          
          {selectedCountry && selectedCountry.id === "rio" && (
            <button 
              onClick={() => setShowPlaces(!showPlaces)}
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 bg-space-dark/70 hover:bg-space-dark/90 backdrop-blur-sm px-4 py-2 rounded-full border border-space-purple/30 text-white text-sm flex items-center gap-2 transition-all"
            >
              {showPlaces ? "Esconder" : "Explorar Rio de Janeiro"} 
              <ArrowRight className={`w-4 h-4 transition-transform ${showPlaces ? "rotate-90" : ""}`} />
            </button>
          )}
          
          {showPlaces && selectedCountry && selectedCountry.id === "rio" && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 glassmorphism p-3 rounded-xl max-w-5xl w-full animate-in fade-in-50">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-space-bright">Explore Rio de Janeiro</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActivePlaceFilter('all')}
                    className={`px-3 py-1 text-xs rounded-full transition-colors flex items-center gap-1 ${
                      activePlaceFilter === 'all' 
                        ? "bg-space-bright text-primary-foreground" 
                        : "bg-space-dark/80 hover:bg-space-purple/70 text-white"
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setActivePlaceFilter('tourist')}
                    className={`px-3 py-1 text-xs rounded-full transition-colors flex items-center gap-1 ${
                      activePlaceFilter === 'tourist' 
                        ? "bg-blue-500 text-white" 
                        : "bg-space-dark/80 hover:bg-blue-500/70 text-white"
                    }`}
                  >
                    <MapPin className="h-3 w-3" /> Pontos Turísticos
                  </button>
                  <button
                    onClick={() => setActivePlaceFilter('restaurant')}
                    className={`px-3 py-1 text-xs rounded-full transition-colors flex items-center gap-1 ${
                      activePlaceFilter === 'restaurant' 
                        ? "bg-green-500 text-white" 
                        : "bg-space-dark/80 hover:bg-green-500/70 text-white"
                    }`}
                  >
                    <Utensils className="h-3 w-3" /> Restaurantes
                  </button>
                  <button
                    onClick={() => setActivePlaceFilter('nightclub')}
                    className={`px-3 py-1 text-xs rounded-full transition-colors flex items-center gap-1 ${
                      activePlaceFilter === 'nightclub' 
                        ? "bg-purple-500 text-white" 
                        : "bg-space-dark/80 hover:bg-purple-500/70 text-white"
                    }`}
                  >
                    <Music className="h-3 w-3" /> Baladas
                  </button>
                  <button
                    onClick={() => setActivePlaceFilter('event')}
                    className={`px-3 py-1 text-xs rounded-full transition-colors flex items-center gap-1 ${
                      activePlaceFilter === 'event' 
                        ? "bg-red-500 text-white" 
                        : "bg-space-dark/80 hover:bg-red-500/70 text-white"
                    }`}
                  >
                    <CalendarDays className="h-3 w-3" /> Eventos
                  </button>
                </div>
              </div>
              
              <div className="max-h-80 overflow-y-auto px-2 py-1 custom-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredPlaces.map(place => (
                    <PlaceCard 
                      key={place.id} 
                      place={place} 
                      onClick={() => setSelectedPlace(place)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <button 
            onClick={() => setShowCountryList(!showCountryList)}
            className={`absolute bottom-6 ${selectedCountry?.id === "rio" ? "left-6" : "left-1/2 transform -translate-x-1/2"} z-10 bg-space-dark/70 hover:bg-space-dark/90 backdrop-blur-sm px-4 py-2 rounded-full border border-space-purple/30 text-white text-sm flex items-center gap-2 transition-all`}
          >
            {showCountryList ? "Hide Countries" : "Select Country"} 
            <ArrowRight className={`w-4 h-4 transition-transform ${showCountryList ? "rotate-90" : ""}`} />
          </button>
          
          {showCountryList && (
            <div className={`absolute bottom-20 ${selectedCountry?.id === "rio" ? "left-6" : "left-1/2 transform -translate-x-1/2"} z-10 glassmorphism p-3 rounded-xl max-w-xl w-full`}>
              {preferredCountries.length > 0 && (
                <>
                  <h4 className="text-xs font-medium text-space-bright mb-2 px-2">Your Countries</h4>
                  <div className="flex flex-wrap gap-2 mb-3 px-2">
                    {preferredCountries.map((country) => (
                      <button
                        key={`preferred-${country.id}`}
                        onClick={() => {
                          handleCountrySelect(country);
                          setShowCountryList(false);
                        }}
                        className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                          selectedCountry?.id === country.id 
                            ? "bg-space-bright text-primary-foreground" 
                            : "bg-space-purple/70 hover:bg-space-purple text-white"
                        }`}
                      >
                        {country.name}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-space-purple/30 mb-2"></div>
                </>
              )}
              
              <h4 className="text-xs font-medium text-space-bright mb-2 px-2">All Countries</h4>
              <div className="flex flex-wrap justify-center gap-2 max-h-40 overflow-y-auto px-2 py-1 custom-scrollbar">
                {countries.map((country) => (
                  <button
                    key={country.id}
                    onClick={() => {
                      handleCountrySelect(country);
                      setShowCountryList(false);
                    }}
                    className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                      selectedCountry?.id === country.id 
                        ? "bg-space-bright text-primary-foreground" 
                        : "bg-space-dark hover:bg-space-purple text-white"
                    }`}
                  >
                    {country.name}
                  </button>
                ))}
              </div>
              
              {!isLoggedIn && (
                <div className="mt-3 pt-3 border-t border-space-purple/30 px-2">
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full py-2 text-sm bg-gradient-to-r from-space-purple to-space-bright rounded-lg hover:opacity-90 transition-opacity text-white"
                  >
                    Log in to save your preferences
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <footer className="text-center text-muted-foreground text-xs absolute bottom-2 w-full opacity-50 hover:opacity-100 transition-opacity">
        <p>Daily Atlas &copy; {new Date().getFullYear()}</p>
      </footer>
      
      {selectedCountry && !selectedCountry.isCity && (
        <NewsPanel 
          country={selectedCountry} 
          onClose={() => setSelectedCountry(null)} 
        />
      )}
      
      {selectedPlace && (
        <PlaceDetails 
          place={selectedPlace} 
          onClose={() => setSelectedPlace(null)} 
        />
      )}
    </div>
  );
};

export default Index;
