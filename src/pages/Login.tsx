
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import StarsBackground from "@/components/StarsBackground";
import { Globe, ChevronRight, LogIn, CheckCircle2 } from "lucide-react";
import { countries, Country } from "@/data/countries";

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"welcome" | "selectCountries">("welcome");
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const handleGoogleLogin = () => {
    setIsLoggingIn(true);
    
    // Simulate login delay
    setTimeout(() => {
      toast.success("Successfully logged in!");
      setIsLoggingIn(false);
      setStep("selectCountries");
    }, 1500);
  };
  
  const toggleCountry = (country: Country) => {
    if (selectedCountries.some(c => c.id === country.id)) {
      setSelectedCountries(selectedCountries.filter(c => c.id !== country.id));
    } else {
      // Limit to maximum 5 countries
      if (selectedCountries.length < 5) {
        setSelectedCountries([...selectedCountries, country]);
      } else {
        toast.warning("You can select up to 5 countries of interest");
      }
    }
  };
  
  const handleContinue = () => {
    if (selectedCountries.length === 0) {
      toast.warning("Please select at least one country of interest");
      return;
    }
    
    // Store selected countries in localStorage
    localStorage.setItem('preferredCountries', JSON.stringify(selectedCountries));
    
    toast.success("Preferences saved! Redirecting to dashboard...");
    
    // Navigate to main app
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      <StarsBackground />
      
      <div className="absolute top-0 left-0 w-full p-6">
        <div className="flex items-center gap-2">
          <Globe className="w-8 h-8 text-space-bright" />
          <h1 className="text-2xl font-title text-white">Daily Atlas</h1>
        </div>
      </div>
      
      <div className="flex flex-1 items-center justify-center">
        <div className="glassmorphism max-w-md w-full p-6 animate-in fade-in">
          {step === "welcome" ? (
            <>
              <div className="flex items-center justify-center mb-6">
                <div className="h-20 w-20 bg-space-purple/30 rounded-full flex items-center justify-center">
                  <Globe className="h-12 w-12 text-space-bright" />
                </div>
              </div>
              
              <h2 className="text-2xl font-title text-center text-white mb-2">Welcome to Daily Atlas</h2>
              <p className="text-muted-foreground text-sm text-center mb-8">
                Your interactive gateway to global news and information
              </p>
              
              <div className="space-y-4">
                <Button 
                  className="w-full bg-gradient-to-r from-space-purple to-space-bright hover:opacity-90 transition-opacity text-white"
                  size="lg"
                  onClick={handleGoogleLogin}
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      Sign in with Google
                    </span>
                  )}
                </Button>
                
                <div className="flex items-center gap-2">
                  <hr className="flex-1 border-space-purple/30" />
                  <span className="text-xs text-muted-foreground">or</span>
                  <hr className="flex-1 border-space-purple/30" />
                </div>
                
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={() => navigate('/')}
                >
                  Continue as Guest
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-title text-white mb-1">Select Your Interests</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Choose up to 5 countries you'd like to follow for news updates
              </p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                  {countries.map(country => (
                    <button
                      key={country.id}
                      onClick={() => toggleCountry(country)}
                      className={`
                        text-sm py-2 px-3 rounded-lg flex items-center gap-1 transition-colors relative
                        ${selectedCountries.some(c => c.id === country.id) 
                          ? "bg-space-purple text-white" 
                          : "bg-space-dark/50 text-white hover:bg-space-purple/40"}
                      `}
                    >
                      {country.name}
                      {selectedCountries.some(c => c.id === country.id) && (
                        <CheckCircle2 className="h-4 w-4 absolute right-2" />
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-space-purple/30">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">
                      {selectedCountries.length} of 5 selected
                    </span>
                    {selectedCountries.length > 0 && (
                      <button 
                        className="text-xs text-space-bright hover:underline"
                        onClick={() => setSelectedCountries([])}
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-space-purple to-space-bright hover:opacity-90 transition-opacity"
                    onClick={handleContinue}
                  >
                    <span className="flex items-center gap-1">
                      Continue to Dashboard
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      <footer className="text-center text-muted-foreground text-xs py-4">
        <p>Daily Atlas &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Login;
