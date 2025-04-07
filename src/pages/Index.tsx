
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import RioViewer from "@/components/RioViewer";
import ErrorBoundary from "@/components/ErrorBoundary";
import { toast } from "sonner";
import { Place, Neighborhood, neighborhoods, getPlacesByNeighborhood } from "@/data/neighborhoods";
import UserMenu from "@/components/UserMenu";
import NeighborhoodInfo from "@/components/NeighborhoodInfo";
import PlacesExplorer from "@/components/PlacesExplorer";
import PlaceDetails from "@/components/PlaceDetails";

const Index = () => {
  const navigate = useNavigate();
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Neighborhood | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showPlaces, setShowPlaces] = useState(false);
  const [activePlaceFilter, setActivePlaceFilter] = useState<'all' | 'tourist' | 'restaurant' | 'nightclub' | 'event'>('all');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPlaces, setCurrentPlaces] = useState<Place[]>([]);
  const [showInfo, setShowInfo] = useState(true);
  const [selectedContinent, setSelectedContinent] = useState("Todos");
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Verificar status de login
  useEffect(() => {
    const isLoggedInUser = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(isLoggedInUser);
  }, []);

  const handleNeighborhoodSelect = (neighborhood: Neighborhood) => {
    setSelectedNeighborhood(neighborhood);
    
    // Buscar lugares no bairro selecionado
    const places = getPlacesByNeighborhood(neighborhood.id);
    setCurrentPlaces(places);
    setShowPlaces(true);
    
    toast.success(`Explorando ${neighborhood.name}`, {
      icon: "🏙️",
    });
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    toast.success("Desconectado com sucesso");
    navigate('/login');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      <main className="max-w-full mx-auto h-[calc(100vh-80px)]">
        <div className="flex flex-col h-full relative">
          <ErrorBoundary>
            <div className="w-full h-full relative flex-grow">
              <UserMenu 
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                showInfo={showInfo}
                setShowInfo={setShowInfo}
                selectedContinent={selectedContinent}
                setSelectedContinent={setSelectedContinent}
                onCountrySelect={() => {}}
                countries={[]}
                selectedCountry={selectedCountry}
              />
              
              <RioViewer 
                onNeighborhoodSelect={handleNeighborhoodSelect} 
                selectedNeighborhood={selectedNeighborhood}
              />
              
              <NeighborhoodInfo selectedNeighborhood={selectedNeighborhood} />
            </div>
          </ErrorBoundary>
          
          <PlacesExplorer 
            showPlaces={showPlaces}
            setShowPlaces={setShowPlaces}
            activePlaceFilter={activePlaceFilter}
            setActivePlaceFilter={setActivePlaceFilter}
            places={currentPlaces}
            onPlaceSelect={setSelectedPlace}
            selectedNeighborhoodId={selectedNeighborhood?.id || null}
          />
        </div>
      </main>
      
      <footer className="text-center text-gray-500 text-xs absolute bottom-2 w-full opacity-50 hover:opacity-100 transition-opacity">
        <p>Olhos do Rio &copy; {new Date().getFullYear()}</p>
      </footer>
      
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
