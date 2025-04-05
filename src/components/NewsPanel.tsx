
import React, { useState, useEffect } from "react";
import { X, RotateCcw, Globe, Newspaper, ArrowUpRight, Calendar, Clock, User } from "lucide-react";
import { type Country } from "./GlobeViewer";
import { toast } from "sonner";

interface NewsItem {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  category?: string;
}

interface NewsPanelProps {
  country: Country | null;
  onClose: () => void;
}

const NewsPanel: React.FC<NewsPanelProps> = ({ country, onClose }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!country) return;
    
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulating news API call with mock data since we don't have a real API key
        setTimeout(() => {
          const mockNews = generateMockNews(country.name);
          setNews(mockNews);
          setLoading(false);
          
          // Extract unique categories
          const categories = [...new Set(mockNews.map(item => item.category))];
          if (categories.length > 0) {
            setActiveCategory(categories[0]);
          }
        }, 1000);
      } catch (err) {
        setError("Failed to fetch news. Please try again.");
        setLoading(false);
        toast.error("Failed to load news data");
      }
    };
    
    fetchNews();
  }, [country]);
  
  // Get unique categories from news
  const categories = [...new Set(news.map(item => item.category))].filter(Boolean) as string[];
  
  // Filter news by category
  const filteredNews = activeCategory 
    ? news.filter(item => item.category === activeCategory)
    : news;
  
  if (!country) return null;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto" onClick={onClose}></div>
      
      <div className="glassmorphism w-full max-w-xl max-h-[80vh] overflow-hidden flex flex-col relative z-10 animate-in fade-in pointer-events-auto shadow-lg shadow-space-bright/20">
        <div className="flex items-center justify-between p-4 border-b border-space-purple/30 bg-gradient-to-r from-space-dark to-space-purple/50">
          <div className="flex items-center gap-2">
            <Globe className="text-space-bright h-6 w-6" />
            <h3 className="font-title text-xl text-white">
              {country.name} News
            </h3>
          </div>
          
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-space-purple/30 transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>
        
        {/* Categories tabs */}
        {categories.length > 0 && (
          <div className="flex gap-2 px-4 pt-3 pb-1 overflow-x-auto scrollbar-thin scrollbar-thumb-space-purple scrollbar-track-transparent">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeCategory === category 
                    ? "bg-space-bright text-space-dark" 
                    : "bg-space-dark/50 text-white hover:bg-space-purple/40"
                }`}
              >
                {category}
              </button>
            ))}
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                activeCategory === null 
                  ? "bg-space-bright text-space-dark" 
                  : "bg-space-dark/50 text-white hover:bg-space-purple/40"
              }`}
            >
              All
            </button>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="relative h-16 w-16">
                <RotateCcw className="h-16 w-16 text-space-bright animate-spin absolute" />
                <div className="w-16 h-16 rounded-full border-4 border-space-bright/20 absolute"></div>
              </div>
              <p className="mt-6 text-white font-title">Loading news from {country.name}...</p>
              <p className="text-muted-foreground text-sm mt-2">Getting the latest updates</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-400 mb-4 font-medium">{error}</p>
              <button 
                className="space-button px-6 py-2 bg-gradient-to-r from-space-purple to-space-bright"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    const mockNews = generateMockNews(country.name);
                    setNews(mockNews);
                    setLoading(false);
                    setError(null);
                  }, 1000);
                }}
              >
                Try Again
              </button>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-10">
              <Newspaper className="h-16 w-16 text-space-bright mx-auto mb-4" />
              <p className="text-white text-lg mb-2">No news available</p>
              <p className="text-muted-foreground">No {activeCategory || ""} news available for {country.name} at the moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNews.map((item, index) => (
                <div 
                  key={index} 
                  className="cosmos-card hover:bg-card/80 transition-colors p-4 border border-space-purple/30 group"
                >
                  {item.category && (
                    <span className="text-xs font-medium px-2 py-0.5 bg-space-purple/30 rounded-full text-space-bright mb-2 inline-block">
                      {item.category}
                    </span>
                  )}
                  <h4 className="font-semibold text-space-bright text-lg">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  
                  <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {item.source}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(item.publishedAt).split(',')[0]}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(item.publishedAt).split(',')[1]}
                      </span>
                    </div>
                  </div>
                  
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-space-blue mt-3 text-sm font-medium hover:underline group"
                  >
                    Read full story <ArrowUpRight className="h-3 w-3 group-hover:transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced mock news generator function
const generateMockNews = (countryName: string): NewsItem[] => {
  const currentDate = new Date();
  
  // Predefined news categories
  const categories = ["Politics", "Economy", "Technology", "Science", "Culture", "Sports", "Health"];
  
  // Predefined news topics and sources for more realistic headlines
  const topics = [
    { topic: "politics", headline: "Political tensions rise as new bill enters parliament", category: "Politics" },
    { topic: "politics", headline: "Government announces major policy shift", category: "Politics" },
    { topic: "technology", headline: "Tech companies announce major investments in AI research", category: "Technology" },
    { topic: "technology", headline: "New smartphones unveiled at tech conference", category: "Technology" },
    { topic: "environment", headline: "New climate agreement signed by government officials", category: "Science" },
    { topic: "environment", headline: "Renewable energy projects receive major funding", category: "Science" },
    { topic: "economy", headline: "Economic growth exceeds expectations in quarterly report", category: "Economy" },
    { topic: "economy", headline: "Central bank announces interest rate decision", category: "Economy" },
    { topic: "health", headline: "Healthcare initiative aims to improve national wellbeing", category: "Health" },
    { topic: "health", headline: "Breakthrough in medical research announced by scientists", category: "Health" },
    { topic: "sports", headline: "National team secures dramatic victory in international tournament", category: "Sports" },
    { topic: "sports", headline: "Star athlete breaks record in championship event", category: "Sports" },
    { topic: "culture", headline: "Cultural festival celebrates diversity and heritage", category: "Culture" },
    { topic: "culture", headline: "Famous artist's exhibition opens to critical acclaim", category: "Culture" },
    { topic: "science", headline: "Scientists discover breakthrough in renewable energy research", category: "Science" },
    { topic: "science", headline: "Space agency announces plans for new mission", category: "Science" },
  ];
  
  const newsSources = [
    `${countryName} Today`,
    `${countryName} Chronicle`,
    `${countryName} Herald`,
    `${countryName} Post`,
    "Global News Network",
    "World Press Agency"
  ];
  
  // Generate 6-10 news items for more content
  const numberOfNews = Math.floor(Math.random() * 5) + 6;
  
  // Shuffle topics and pick the first few for our mock news
  const shuffledTopics = [...topics].sort(() => Math.random() - 0.5).slice(0, numberOfNews);
  
  return shuffledTopics.map((item, index) => {
    // Generate a random time within the last 24 hours
    const publishedDate = new Date(currentDate);
    publishedDate.setHours(publishedDate.getHours() - Math.floor(Math.random() * 24));
    
    const source = newsSources[Math.floor(Math.random() * newsSources.length)];
    
    return {
      title: `${item.headline} in ${countryName}`,
      description: `Latest developments in ${item.topic} from ${countryName} show significant changes that could impact citizens across the nation. Officials have commented on the importance of these developments for the future.`,
      url: "https://example.com/news",
      source: source,
      publishedAt: publishedDate.toISOString(),
      category: item.category
    };
  });
};

export default NewsPanel;
