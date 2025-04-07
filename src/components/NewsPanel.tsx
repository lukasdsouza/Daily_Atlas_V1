
import React from "react";
import { X } from "lucide-react";
import { Article } from "../data/countries";
import RioViewer from "./RioViewer";  // Updated import

interface NewsPanelProps {
  articles: Article[];
  onClose: () => void;
}

const NewsPanel: React.FC<NewsPanelProps> = ({ articles, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[80vh] overflow-auto bg-white dark:bg-gray-900 rounded-lg shadow-xl">
        <div className="sticky top-0 px-4 py-3 bg-white dark:bg-gray-900 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Notícias Recentes</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="px-4 py-3">
          {articles.length > 0 ? (
            <div className="space-y-4">
              {articles.map((article, index) => (
                <article key={index} className="border-b pb-4 last:border-b-0">
                  <h3 className="text-base font-medium mb-1">{article.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{article.summary}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{article.source}</span>
                    <span>{article.date}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-center py-8 text-gray-500">Nenhuma notícia encontrada para este país.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsPanel;
