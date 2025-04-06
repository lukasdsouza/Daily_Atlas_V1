
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { countries, Country } from "@/data/countries";
import { Check, X, Globe } from "lucide-react";
import { toast } from "sonner";
import StarsBackground from "@/components/StarsBackground";

const Login = () => {
  const navigate = useNavigate();
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const storedCountries = localStorage.getItem('preferredCountries');
    if (storedCountries) {
      try {
        const parsed = JSON.parse(storedCountries);
        if (parsed.length > 0) {
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error("Failed to parse stored countries", e);
      }
    }
  }, []);

  const handleCountrySelect = (country: Country) => {
    const isSelected = selectedCountries.some(c => c.id === country.id);
    
    if (isSelected) {
      setSelectedCountries(selectedCountries.filter(c => c.id !== country.id));
    } else {
      if (selectedCountries.length < 5) {
        setSelectedCountries([...selectedCountries, country]);
      } else {
        toast.error("Você pode selecionar até 5 países");
      }
    }
  };

  const handleLogin = () => {
    if (selectedCountries.length === 0) {
      toast.error("Selecione pelo menos um país");
      return;
    }

    if (!email) {
      toast.error("Digite seu email");
      return;
    }

    // In a real app, we would send this to a server
    // For now, just store in localStorage
    localStorage.setItem('preferredCountries', JSON.stringify(selectedCountries));
    
    toast.success("Login realizado com sucesso!");
    navigate('/');
  };

  // Mock Google login
  const handleGoogleLogin = () => {
    // In a real app, we would use OAuth
    setEmail('user@example.com');
    toast.success("Login com Google realizado com sucesso!");
    
    // Give a brief moment to show the toast
    setTimeout(() => {
      setIsLoggedIn(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <StarsBackground />
      
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="h-[400px] w-[400px] rounded-full bg-space-purple/5 blur-[100px]"></div>
      </div>
      
      <div className="w-full max-w-md z-10">
        {!isLoggedIn ? (
          <Card className="glassmorphism border-space-purple/30">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-space-purple to-space-bright rounded-full flex items-center justify-center mb-2">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-space-bright text-2xl font-title">Daily Atlas</CardTitle>
              <CardDescription>Entre para acompanhar as notícias de seus países favoritos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-2 p-2 rounded-lg border border-space-purple/30 hover:bg-space-dark/30 transition-colors"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Entrar com Google
                </button>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-space-purple/30"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">ou continue por email</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-space-bright">
                  Email
                </label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded-lg border border-space-purple/30 bg-card/50 focus:border-space-bright outline-none transition-colors"
                  placeholder="seu@email.com"
                />
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <div className="w-full">
                <h3 className="text-sm font-medium text-space-bright mb-2">Selecione seus países de interesse (até 5)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[180px] overflow-y-auto custom-scrollbar">
                  {countries.map((country) => {
                    const isSelected = selectedCountries.some(c => c.id === country.id);
                    return (
                      <button
                        key={country.id}
                        onClick={() => handleCountrySelect(country)}
                        className={`px-3 py-2 rounded-lg flex items-center justify-between transition-all text-left ${
                          isSelected 
                            ? "bg-space-bright/20 border border-space-bright/40" 
                            : "bg-space-dark/20 border border-space-purple/20 hover:bg-space-dark/40"
                        }`}
                      >
                        <span className="text-sm truncate">{country.name}</span>
                        {isSelected ? (
                          <Check className="h-4 w-4 text-space-bright" />
                        ) : (
                          <span className="h-4 w-4 rounded-full border border-space-purple/40"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <button
                onClick={handleLogin}
                className="w-full py-2 bg-gradient-to-r from-space-purple to-space-bright rounded-lg hover:opacity-90 transition-opacity text-white"
              >
                Entrar
              </button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="glassmorphism border-space-purple/30">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-500/30 rounded-full flex items-center justify-center mb-2">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <CardTitle className="text-space-bright text-2xl">Você já está logado!</CardTitle>
              <CardDescription>Você pode retornar à página principal ou sair da sua conta</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between gap-4">
              <button
                onClick={() => {
                  localStorage.removeItem('preferredCountries');
                  setIsLoggedIn(false);
                  toast.success("Logout realizado com sucesso!");
                }}
                className="flex-1 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 flex items-center justify-center gap-1"
              >
                <X className="h-4 w-4" /> Sair
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex-1 py-2 bg-gradient-to-r from-space-purple to-space-bright rounded-lg hover:opacity-90 transition-opacity text-white"
              >
                Continuar
              </button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Login;
