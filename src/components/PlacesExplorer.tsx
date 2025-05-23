
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

  // Get the name of the current city from the places
  const cityName = places.length > 0 && places[0].address 
    ? places[0].address.split(',')[0] 
    : "esta cidade";

  return (
    <>
      <button 
        onClick={() => setShowPlaces(!showPlaces)}
        className="fixed bottom-6 right-6 z-10 bg-space-purple text-white shadow-lg px-4 py-3 rounded-full text-sm flex items-center gap-2 transition-all hover:bg-space-purple/90 active:scale-95 touch-action-manipulation"
      >
        {showPlaces ? "Esconder" : "Explorar Lugares"} 
        <ArrowRight className={`w-4 h-4 transition-transform ${showPlaces ? "rotate-90" : ""}`} />
      </button>
      
      {showPlaces && (
        <div className="fixed inset-x-4 bottom-20 z-10 glassmorphism p-4 rounded-xl max-w-5xl mx-auto animate-in fade-in-50 shadow-xl border border-space-purple/30">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <h3 className="text-lg font-bold text-space-bright">Explore {cityName}</h3>
            <div className="flex gap-2 overflow-x-auto pb-1 touch-action-pan-x scrollbar-none">
              <button
                onClick={() => setActivePlaceFilter('all')}
                className={`px-3 py-2 text-xs rounded-full transition-colors flex items-center gap-1 min-w-max ${
                  activePlaceFilter === 'all' 
                    ? "bg-space-bright text-primary-foreground" 
                    : "bg-space-dark/80 hover:bg-space-purple/70 text-white"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setActivePlaceFilter('tourist')}
                className={`px-3 py-2 text-xs rounded-full transition-colors flex items-center gap-1 min-w-max ${
                  activePlaceFilter === 'tourist' 
                    ? "bg-blue-500 text-white" 
                    : "bg-space-dark/80 hover:bg-blue-500/70 text-white"
                }`}
              >
                <MapPin className="h-3 w-3" /> Pontos Turísticos
              </button>
              <button
                onClick={() => setActivePlaceFilter('restaurant')}
                className={`px-3 py-2 text-xs rounded-full transition-colors flex items-center gap-1 min-w-max ${
                  activePlaceFilter === 'restaurant' 
                    ? "bg-green-500 text-white" 
                    : "bg-space-dark/80 hover:bg-green-500/70 text-white"
                }`}
              >
                <Utensils className="h-3 w-3" /> Restaurantes
              </button>
              <button
                onClick={() => setActivePlaceFilter('nightclub')}
                className={`px-3 py-2 text-xs rounded-full transition-colors flex items-center gap-1 min-w-max ${
                  activePlaceFilter === 'nightclub' 
                    ? "bg-purple-500 text-white" 
                    : "bg-space-dark/80 hover:bg-purple-500/70 text-white"
                }`}
              >
                <Music className="h-3 w-3" /> Baladas
              </button>
              <button
                onClick={() => setActivePlaceFilter('event')}
                className={`px-3 py-2 text-xs rounded-full transition-colors flex items-center gap-1 min-w-max ${
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
