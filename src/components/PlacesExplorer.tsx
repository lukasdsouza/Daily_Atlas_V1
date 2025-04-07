
import React, { useState } from "react";
import { ArrowRight, MapPin, Utensils, Music, CalendarDays, Map } from "lucide-react";
import { Place, getPlacesByNeighborhood } from "@/data/neighborhoods";
import PlaceCard from "./PlaceCard";

interface PlacesExplorerProps {
  showPlaces: boolean;
  setShowPlaces: (show: boolean) => void;
  activePlaceFilter: 'all' | 'tourist' | 'restaurant' | 'nightclub' | 'event';
  setActivePlaceFilter: (filter: 'all' | 'tourist' | 'restaurant' | 'nightclub' | 'event') => void;
  places: Place[];
  onPlaceSelect: (place: Place) => void;
  selectedNeighborhoodId: string | null;
}

const PlacesExplorer: React.FC<PlacesExplorerProps> = ({
  showPlaces,
  setShowPlaces,
  activePlaceFilter,
  setActivePlaceFilter,
  places,
  onPlaceSelect,
  selectedNeighborhoodId
}) => {
  // Filtrar lugares com base no filtro ativo
  const filteredPlaces = places.filter(place => {
    return activePlaceFilter === 'all' || place.type === activePlaceFilter;
  });

  return (
    <>
      <button 
        onClick={() => setShowPlaces(!showPlaces)}
        className="fixed bottom-6 right-6 z-10 bg-blue-600 text-white shadow-lg px-4 py-3 rounded-full text-sm flex items-center gap-2 transition-all hover:bg-blue-700 active:scale-95 touch-action-manipulation"
      >
        {showPlaces ? "Esconder Lugares" : "Explorar Lugares"} 
        <ArrowRight className={`w-4 h-4 transition-transform ${showPlaces ? "rotate-90" : ""}`} />
      </button>
      
      {showPlaces && (
        <div className="fixed inset-x-4 bottom-20 z-10 bg-white/95 backdrop-blur-md p-4 rounded-xl max-w-5xl mx-auto animate-in fade-in-50 shadow-xl border border-gray-300">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <h3 className="text-lg font-bold text-gray-900">
              {selectedNeighborhoodId 
                ? `Explore ${places.length > 0 ? places[0].name.split(',')[0] : "este bairro"}`
                : "Selecione um bairro"}
            </h3>
            
            <div className="flex gap-2 overflow-x-auto pb-1 touch-action-pan-x scrollbar-none">
              <button
                onClick={() => setActivePlaceFilter('all')}
                className={`px-3 py-2 text-xs rounded-full transition-colors flex items-center gap-1 min-w-max ${
                  activePlaceFilter === 'all' 
                    ? "bg-gray-800 text-white" 
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }`}
              >
                Todos os Tipos
              </button>
              <button
                onClick={() => setActivePlaceFilter('tourist')}
                className={`px-3 py-2 text-xs rounded-full transition-colors flex items-center gap-1 min-w-max ${
                  activePlaceFilter === 'tourist' 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-100 hover:bg-blue-100 text-gray-800"
                }`}
              >
                <MapPin className="h-3 w-3" /> Pontos Turísticos
              </button>
              <button
                onClick={() => setActivePlaceFilter('restaurant')}
                className={`px-3 py-2 text-xs rounded-full transition-colors flex items-center gap-1 min-w-max ${
                  activePlaceFilter === 'restaurant' 
                    ? "bg-green-500 text-white" 
                    : "bg-gray-100 hover:bg-green-100 text-gray-800"
                }`}
              >
                <Utensils className="h-3 w-3" /> Restaurantes
              </button>
              <button
                onClick={() => setActivePlaceFilter('nightclub')}
                className={`px-3 py-2 text-xs rounded-full transition-colors flex items-center gap-1 min-w-max ${
                  activePlaceFilter === 'nightclub' 
                    ? "bg-purple-500 text-white" 
                    : "bg-gray-100 hover:bg-purple-100 text-gray-800"
                }`}
              >
                <Music className="h-3 w-3" /> Baladas
              </button>
              <button
                onClick={() => setActivePlaceFilter('event')}
                className={`px-3 py-2 text-xs rounded-full transition-colors flex items-center gap-1 min-w-max ${
                  activePlaceFilter === 'event' 
                    ? "bg-red-500 text-white" 
                    : "bg-gray-100 hover:bg-red-100 text-gray-800"
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
                <div className="col-span-full text-center py-8 text-gray-500">
                  {selectedNeighborhoodId 
                    ? "Nenhum lugar encontrado para este filtro."
                    : "Selecione um bairro para ver as atrações disponíveis."}
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
