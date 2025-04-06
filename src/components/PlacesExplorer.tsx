
import React from "react";
import { ArrowRight, MapPin, Utensils, Music, CalendarDays } from "lucide-react";
import { Place } from "@/data/countries";
import PlaceCard from "./PlaceCard";

interface PlacesExplorerProps {
  showPlaces: boolean;
  setShowPlaces: (show: boolean) => void;
  activePlaceFilter: 'all' | 'tourist' | 'restaurant' | 'nightclub' | 'event';
  setActivePlaceFilter: (filter: 'all' | 'tourist' | 'restaurant' | 'nightclub' | 'event') => void;
  places: Place[];
  onPlaceSelect: (place: Place) => void;
  isRio: boolean;
}

const PlacesExplorer: React.FC<PlacesExplorerProps> = ({
  showPlaces,
  setShowPlaces,
  activePlaceFilter,
  setActivePlaceFilter,
  places,
  onPlaceSelect,
  isRio
}) => {
  // Filter places based on the active filter
  const filteredPlaces = activePlaceFilter === 'all' 
    ? places 
    : places.filter(place => place.type === activePlaceFilter);

  if (!isRio) return null;

  // Obter o nome da cidade atual a partir dos lugares
  const cityName = places.length > 0 && places[0].address 
    ? places[0].address.split(',')[0] 
    : "esta cidade";

  return (
    <>
      <button 
        onClick={() => setShowPlaces(!showPlaces)}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 bg-space-dark/70 hover:bg-space-dark/90 backdrop-blur-sm px-4 py-2 rounded-full border border-space-purple/30 text-white text-sm flex items-center gap-2 transition-all"
      >
        {showPlaces ? "Esconder" : "Explorar Lugares"} 
        <ArrowRight className={`w-4 h-4 transition-transform ${showPlaces ? "rotate-90" : ""}`} />
      </button>
      
      {showPlaces && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 glassmorphism p-3 rounded-xl max-w-5xl w-full animate-in fade-in-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-space-bright">Explore {cityName}</h3>
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
              {filteredPlaces.length > 0 ? (
                filteredPlaces.map(place => (
                  <PlaceCard 
                    key={place.id} 
                    place={place} 
                    onClick={() => onPlaceSelect(place)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-space-bright/70">
                  Nenhum lugar encontrado para este filtro.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlacesExplorer;
