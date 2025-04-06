
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Moon, 
  Sun, 
  Globe, 
  Bell, 
  Palette, 
  MapPin, 
  User,
  Save
} from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { continents, Country, countries } from "@/data/countries";
import StarsBackground from "@/components/StarsBackground";

const Settings = () => {
  const navigate = useNavigate();
  
  // Estado para as configurações
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("pt");
  const [preferredContinent, setPreferredContinent] = useState("Todos");
  const [favoriteCountries, setFavoriteCountries] = useState<string[]>([]);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  
  // Carregar configurações salvas ao iniciar
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setDarkMode(settings.darkMode ?? true);
        setNotifications(settings.notifications ?? true);
        setLanguage(settings.language ?? "pt");
        setPreferredContinent(settings.preferredContinent ?? "Todos");
        setFavoriteCountries(settings.favoriteCountries ?? []);
        setUserName(settings.userName ?? "");
        setEmail(settings.email ?? "");
      } catch (e) {
        console.error("Erro ao carregar configurações:", e);
      }
    }
    
    // Verificar países preferidos
    const storedCountries = localStorage.getItem('preferredCountries');
    if (storedCountries) {
      try {
        const parsed = JSON.parse(storedCountries);
        setFavoriteCountries(parsed.map((c: Country) => c.id));
      } catch (e) {
        console.error("Erro ao carregar países preferidos:", e);
      }
    }
  }, []);
  
  // Salvar configurações
  const saveSettings = () => {
    const settings = {
      darkMode,
      notifications,
      language,
      preferredContinent,
      favoriteCountries,
      userName,
      email
    };
    
    localStorage.setItem('userSettings', JSON.stringify(settings));
    
    // Atualizar países preferidos
    const preferredCountries = countries.filter(c => favoriteCountries.includes(c.id));
    localStorage.setItem('preferredCountries', JSON.stringify(preferredCountries));
    
    toast.success("Configurações salvas com sucesso!");
  };
  
  // Filtrar países por continente
  const filteredCountries = preferredContinent === "Todos" 
    ? countries 
    : countries.filter(c => c.continent === preferredContinent);
  
  // Alternar país como favorito
  const toggleFavoriteCountry = (countryId: string) => {
    setFavoriteCountries(prev => 
      prev.includes(countryId)
        ? prev.filter(id => id !== countryId)
        : [...prev, countryId]
    );
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarsBackground />
      
      <header className="fixed top-0 left-0 right-0 z-40 bg-space-dark/80 backdrop-blur-md p-4 flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-space-dark/80 hover:bg-space-dark/90 transition-colors"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5 text-space-bright" />
        </button>
        <h1 className="text-xl font-bold text-space-bright ml-4">Configurações</h1>
      </header>
      
      <main className="max-w-2xl mx-auto pt-20 pb-12 px-4">
        <div className="space-y-8">
          {/* Perfil */}
          <section className="cosmos-card">
            <h2 className="text-lg font-semibold text-space-bright mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Perfil
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-space-bright/70 mb-1 block">Nome de usuário</label>
                <input 
                  type="text" 
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-2 rounded-md bg-space-dark border border-space-purple/30 text-white"
                  placeholder="Digite seu nome"
                />
              </div>
              
              <div>
                <label className="text-sm text-space-bright/70 mb-1 block">E-mail</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded-md bg-space-dark border border-space-purple/30 text-white"
                  placeholder="seuemail@exemplo.com"
                />
              </div>
            </div>
          </section>
          
          {/* Aparência */}
          <section className="cosmos-card">
            <h2 className="text-lg font-semibold text-space-bright mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Aparência
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  <span>Modo escuro</span>
                </div>
                <Switch 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode}
                />
              </div>
              
              <div>
                <label className="text-sm text-space-bright/70 mb-1 block">Idioma</label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt">Português</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>
          
          {/* Preferências */}
          <section className="cosmos-card">
            <h2 className="text-lg font-semibold text-space-bright mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Preferências
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <span>Notificações</span>
                </div>
                <Switch 
                  checked={notifications} 
                  onCheckedChange={setNotifications}
                />
              </div>
              
              <div>
                <label className="text-sm text-space-bright/70 mb-1 block">Continente preferido</label>
                <Select value={preferredContinent} onValueChange={setPreferredContinent}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o continente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    {continents.map(continent => (
                      <SelectItem key={continent} value={continent}>{continent}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>
          
          {/* Países Favoritos */}
          <section className="cosmos-card">
            <h2 className="text-lg font-semibold text-space-bright mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Países Favoritos
            </h2>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                {filteredCountries.map(country => (
                  <button
                    key={country.id}
                    onClick={() => toggleFavoriteCountry(country.id)}
                    className={`px-3 py-1.5 text-sm rounded-full transition-colors flex items-center gap-1 ${
                      favoriteCountries.includes(country.id)
                        ? "bg-space-purple text-white"
                        : "bg-space-dark hover:bg-space-purple/50 text-white"
                    }`}
                  >
                    {country.name}
                  </button>
                ))}
              </div>
            </div>
          </section>
          
          {/* Botão Salvar */}
          <Button 
            onClick={saveSettings}
            className="w-full bg-gradient-to-r from-space-purple to-space-bright text-white py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Salvar Configurações
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Settings;
