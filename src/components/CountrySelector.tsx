
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Country } from "@/data/countries";

interface CountrySelectorProps {
  countries: Country[];
  selectedCountry: Country | null;
  preferredCountries: Country[];
  isLoggedIn: boolean;
  showCountryList: boolean;
  setShowCountryList: (show: boolean) => void;
  onCountrySelect: (country: Country) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  countries,
  selectedCountry,
  preferredCountries,
  isLoggedIn,
  showCountryList,
  setShowCountryList,
  onCountrySelect,
}) => {
  const navigate = useNavigate();
  
  const handleCountrySelect = (country: Country) => {
    onCountrySelect(country);
    setShowCountryList(false);
  };

  return (
    <>
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
                    onClick={() => handleCountrySelect(country)}
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
                onClick={() => handleCountrySelect(country)}
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
    </>
  );
};

export default CountrySelector;
