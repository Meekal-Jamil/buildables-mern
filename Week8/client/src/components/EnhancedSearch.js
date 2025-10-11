import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, DollarSign } from 'lucide-react';

const SearchDropdown = ({ isOpen, onClose, onSearch, searchHistory = [] }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      onClose();
    }
  };

  const handleHistoryClick = (historyItem) => {
    onSearch(historyItem);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <form onSubmit={handleSubmit} className="p-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search transactions by description, amount, or category..."
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      {searchHistory.length > 0 && (
        <div className="p-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Recent Searches
          </h4>
          <div className="space-y-1">
            {searchHistory.slice(0, 5).map((item, index) => (
              <button
                key={index}
                onClick={() => handleHistoryClick(item)}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="px-4 py-3 bg-gray-50 rounded-b-lg">
        <div className="flex items-center text-xs text-gray-500">
          <DollarSign className="h-3 w-3 mr-1" />
          <span>Tip: You can search by amount (e.g., "$50" or "50"), category, or description</span>
        </div>
      </div>
    </div>
  );
};

const EnhancedSearch = ({ onSearch, searchHistory = [], placeholder = "Search..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
      >
        <Search className="h-5 w-5 text-gray-400 mr-3" />
        <span className="text-gray-500">{placeholder}</span>
      </button>

      <SearchDropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSearch={onSearch}
        searchHistory={searchHistory}
      />
    </div>
  );
};

export default EnhancedSearch;