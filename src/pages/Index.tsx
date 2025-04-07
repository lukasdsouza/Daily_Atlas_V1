
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import GlobeViewer, { Country, countries } from "@/components/GlobeViewer";
import NewsPanel from "@/components/NewsPanel";
import StarsBackground from "@/components/StarsBackground";
import PlaceDetails from "@/components/PlaceDetails";
import ErrorBoundary from "@/components/ErrorBoundary";
import { toast } from "sonner";
import { rioPlaces, Place, getPlacesByCity } from "@/data/countries";
import UserMenu from "@/components/UserMenu";
import CountryInfo from "@/components/CountryInfo";
import PlacesExplorer from "@/components/PlacesExplorer";

const Index = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showPlaces, setShowPlaces] = useState(false);
  const [activePlaceFilter, setActivePlaceFilter] = useState<'all' | 'tourist' | 'restaurant' | 'nightclub' | 'event'>('all');
  const [preferredCountries, setPreferredCountries] = useState<Country[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState("Todos");
  const [currentPlaces, setCurrentPlaces] = useState<Place[]>(rioPlaces);

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
        console.error("Falha ao analisar países preferidos", e);
      }
    }
  }, []);

  const handleCountrySelect = (country: Country) => {
    toast(`Explorando ${country.name}`, {
      icon: "🌎",
    });
    setSelectedCountry(country);
    
    // Mostrar painel de lugares se for uma cidade
    if (country.isCity) {
      const places = getPlacesByCity(country.id);
      setCurrentPlaces(places);
      setShowPlaces(true);
    } else {
      setShowPlaces(false);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('preferredCountries');
    setPreferredCountries([]);
    setIsLoggedIn(false);
    toast.success("Desconectado com sucesso");
    navigate('/login');
  };

  const isSelectedCityWithPlaces = selectedCountry?.isCity && getPlacesByCity(selectedCountry.id).length > 0;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarsBackground />
      
      <Header />
      
      <main className="max-w-full mx-auto h-[calc(100vh-80px)]">
        <div className="flex flex-col h-full relative">
          <ErrorBoundary>
            <div className="w-full h-full relative flex-grow">
              <UserMenu 
                showInfo={showInfo}
                setShowInfo={setShowInfo}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                selectedContinent={selectedContinent}
                setSelectedContinent={setSelectedContinent}
                onCountrySelect={handleCountrySelect}
                countries={countries}
                selectedCountry={selectedCountry}
              />
              
              <GlobeViewer 
                onCountrySelect={handleCountrySelect} 
                selectedCountry={selectedCountry}
              />
              
              <CountryInfo selectedCountry={selectedCountry} />
            </div>
          </ErrorBoundary>
          
          <PlacesExplorer 
            showPlaces={showPlaces}
            setShowPlaces={setShowPlaces}
            activePlaceFilter={activePlaceFilter}
            setActivePlaceFilter={setActivePlaceFilter}
            places={currentPlaces}
            onPlaceSelect={setSelectedPlace}
            isRio={isSelectedCityWithPlaces}
          />
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
