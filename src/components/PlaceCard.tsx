
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MapPin, Clock, DollarSign, CalendarDays, Users, MapPinOff } from "lucide-react";
import { Place } from "@/data/neighborhoods";

interface PlaceCardProps {
  place: Place;
  onClick: () => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, onClick }) => {
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

  // Format price to dollar signs
  const formatPrice = (price?: string) => {
    if (!price) return "N/A";
    return price;
  };

  // Icon based on place type
  const getTypeIcon = () => {
    switch (place.type) {
      case "tourist":
        return <MapPin className="h-4 w-4 text-blue-500" />;
      case "restaurant":
        return <DollarSign className="h-4 w-4 text-green-500" />;
      case "nightclub":
        return <Users className="h-4 w-4 text-purple-500" />;
      case "event":
        return <CalendarDays className="h-4 w-4 text-red-500" />;
      default:
        return <MapPin className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full cursor-pointer hover:scale-[1.02] border-gray-200 bg-white backdrop-blur-md"
      onClick={onClick}
    >
      <div className="h-36 overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center" 
          style={{ 
            backgroundImage: `url(https://source.unsplash.com/400x300/?${encodeURIComponent(place.name.toLowerCase()+',rio')})`
          }}
        />
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold text-gray-800">{place.name}</CardTitle>
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 flex items-center gap-1">
            {getTypeIcon()}
            {place.type.charAt(0).toUpperCase() + place.type.slice(1)}
          </span>
        </div>
        <CardDescription className="text-sm line-clamp-2 text-gray-600">
          {place.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2 pb-2">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <div className="flex mr-1">{renderStars(place.rating)}</div>
            <span className="text-sm font-semibold text-gray-700">{place.rating.toFixed(1)}</span>
          </div>
          {place.price && (
            <div className="text-sm text-gray-600">{formatPrice(place.price)}</div>
          )}
        </div>
        
        {/* Exibir bairro */}
        {place.neighborhood && (
          <div className="flex items-center gap-1 text-xs font-medium bg-amber-100 rounded-full px-2 py-1 mb-2 text-amber-700">
            <MapPin className="h-3 w-3" />
            <span>{place.neighborhood}</span>
          </div>
        )}
        
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <MapPinOff className="h-3 w-3" />
          <span className="truncate">{place.address}</span>
        </div>
        {place.openingHours && (
          <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
            <Clock className="h-3 w-3" />
            <span>{place.openingHours}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-2 border-t border-gray-100">
        <div className="w-full">
          <p className="text-xs text-gray-500">
            {place.reviews.length} avaliações
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PlaceCard;
