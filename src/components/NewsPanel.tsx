
import React, { useState, useEffect } from "react";
import { X, RotateCcw, Globe, Newspaper, ArrowUpRight } from "lucide-react";
import { type Country } from "./GlobeViewer";
import { toast } from "sonner";

interface NewsItem {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
}

interface NewsPanelProps {
  country: Country | null;
  onClose: () => void;
}

const NewsPanel: React.FC<NewsPanelProps> = ({ country, onClose }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        }, 1000);
      } catch (err) {
        setError("Failed to fetch news. Please try again.");
        setLoading(false);
        toast.error("Failed to load news data");
      }
    };
    
    fetchNews();
  }, [country]);
  
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
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="glassmorphism w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col relative z-10 animate-in fade-in">
        <div className="flex items-center justify-between p-4 border-b border-space-purple/30">
          <div className="flex items-center gap-2">
            <Globe className="text-space-bright h-5 w-5" />
            <h3 className="font-title text-lg text-white">
              {country.name} News
            </h3>
          </div>
          
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-space-purple/30 transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <RotateCcw className="h-8 w-8 text-space-bright animate-spin mb-4" />
              <p>Loading top stories from {country.name}...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-400 mb-2">{error}</p>
              <button 
                className="space-button"
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
          ) : news.length === 0 ? (
            <div className="text-center py-10">
              <Newspaper className="h-8 w-8 text-space-bright mx-auto mb-4" />
              <p>No news available for {country.name} at the moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {news.map((item, index) => (
                <div key={index} className="cosmos-card hover:bg-card/80 transition-colors">
                  <h4 className="font-semibold text-space-bright">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                    <span>{item.source}</span>
                    <span>{formatDate(item.publishedAt)}</span>
                  </div>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-space-blue mt-2 text-sm font-medium hover:underline"
                  >
                    Read full story <ArrowUpRight className="h-3 w-3" />
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

// Mock news generator function
const generateMockNews = (countryName: string): NewsItem[] => {
  const currentDate = new Date();
  
  // Predefined news topics and sources for more realistic headlines
  const topics = [
    { topic: "politics", headline: "Political tensions rise as new bill enters parliament" },
    { topic: "technology", headline: "Tech companies announce major investments in AI research" },
    { topic: "environment", headline: "New climate agreement signed by government officials" },
    { topic: "economy", headline: "Economic growth exceeds expectations in quarterly report" },
    { topic: "health", headline: "Healthcare initiative aims to improve national wellbeing" },
    { topic: "sports", headline: "National team secures dramatic victory in international tournament" },
    { topic: "culture", headline: "Cultural festival celebrates diversity and heritage" },
    { topic: "science", headline: "Scientists discover breakthrough in renewable energy research" },
  ];
  
  const newsSources = [
    `${countryName} Today`,
    `${countryName} Chronicle`,
    `${countryName} Herald`,
    `${countryName} Post`,
    "Global News Network",
    "World Press Agency"
  ];
  
  // Generate a random number of news items (3-6)
  const numberOfNews = Math.floor(Math.random() * 4) + 3;
  
  // Shuffle topics and pick the first few for our mock news
  const shuffledTopics = [...topics].sort(() => Math.random() - 0.5).slice(0, numberOfNews);
  
  return shuffledTopics.map((item, index) => {
    // Generate a random time within the last 24 hours
    const publishedDate = new Date(currentDate);
    publishedDate.setHours(publishedDate.getHours() - Math.floor(Math.random() * 24));
    
    const source = newsSources[Math.floor(Math.random() * newsSources.length)];
    
    return {
      title: `${countryName}: ${item.headline}`,
      description: `Latest developments in ${item.topic} from ${countryName} show significant changes that could impact citizens across the nation. Experts weigh in on what this means for the future.`,
      url: "https://example.com/news",
      source: source,
      publishedAt: publishedDate.toISOString(),
    };
  });
};

export default NewsPanel;
