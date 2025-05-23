
import React from "react";
import { X, Star, MapPin, Clock, DollarSign, User, Calendar } from "lucide-react";
import { Place } from "@/data/countries";
import { toast } from "sonner";

interface PlaceDetailsProps {
  place: Place;
  onClose: () => void;
}

const PlaceDetails: React.FC<PlaceDetailsProps> = ({ place, onClose }) => {
  // Generate stars based on rating
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : i < rating
              ? "text-yellow-400 fill-yellow-400 opacity-50"
              : "text-gray-300"
          }`}
        />
      ));
  };

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  const handleBookmark = () => {
    toast.success(`${place.name} adicionado aos favoritos!`);
  };

  const handleShare = () => {
    toast.success(`Link de ${place.name} copiado!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto" onClick={onClose}></div>
      
      <div className="glassmorphism w-full max-w-xl max-h-[80vh] overflow-hidden flex flex-col relative z-10 animate-in fade-in pointer-events-auto shadow-lg shadow-space-bright/20">
        <div className="h-48 overflow-hidden relative">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ 
              backgroundImage: `url(https://source.unsplash.com/800x400/?${encodeURIComponent(place.name.toLowerCase())})`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h2 className="text-xl font-bold text-white">{place.name}</h2>
            <div className="flex items-center mt-1">
              <div className="flex mr-2">{renderStars(place.rating)}</div>
              <span className="text-white font-medium">{place.rating.toFixed(1)}</span>
              <span className="text-white/80 text-sm ml-2">({place.reviews.length} avaliações)</span>
            </div>
            <div className="flex items-center gap-1 text-white/80 text-sm mt-1">
              <MapPin className="h-3 w-3" />
              <span>{place.address}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 rounded-full p-1.5 bg-black/50 hover:bg-black/70 transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              {place.type === "nightclub" && (
                <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300">Balada</span>
              )}
              {place.type === "restaurant" && (
                <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-300">Restaurante</span>
              )}
              {place.type === "tourist" && (
                <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300">Ponto Turístico</span>
              )}
              {place.type === "event" && (
                <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-300">Evento</span>
              )}
              {place.price && (
                <span className="flex items-center text-muted-foreground">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {place.price}
                </span>
              )}
              {place.openingHours && (
                <span className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {place.openingHours}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleBookmark} 
                className="px-3 py-1.5 text-xs bg-space-purple/30 hover:bg-space-purple/50 rounded-full text-white transition-colors"
              >
                Salvar
              </button>
              <button 
                onClick={handleShare} 
                className="px-3 py-1.5 text-xs bg-space-bright/30 hover:bg-space-bright/50 rounded-full text-white transition-colors"
              >
                Compartilhar
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-md font-semibold text-space-bright mb-2">Sobre</h3>
            <p className="text-muted-foreground">{place.description}</p>
          </div>
          
          <div>
            <h3 className="text-md font-semibold text-space-bright mb-2">Avaliações</h3>
            <div className="space-y-4">
              {place.reviews.map((review, idx) => (
                <div key={idx} className="cosmos-card">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-space-purple/30 flex items-center justify-center">
                        <User className="h-4 w-4 text-space-bright" />
                      </div>
                      <div>
                        <p className="font-medium text-space-bright">{review.user}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(review.date)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex mr-1">{renderStars(review.rating)}</div>
                      <span className="text-sm font-medium text-space-bright">{review.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
