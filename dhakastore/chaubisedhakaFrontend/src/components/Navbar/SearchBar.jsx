import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import debounce from "lodash/debounce";
import api from "../../api/api";

const SearchBar = ({ isMobile = false }) => {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      setSearchHistory(JSON.parse(history).slice(0, 5));
    }
  }, []);

  const saveToHistory = (searchTerm) => {
    if (!searchTerm.trim()) return;

    const updatedHistory = [
      searchTerm,
      ...searchHistory.filter((item) => item !== searchTerm),
    ].slice(0, 5);

    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  const fetchSuggestions = useCallback(
    debounce(async (searchTerm) => {
      if (!searchTerm.trim() || searchTerm.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await api.get(
          `/user/public/search/suggestions?keyword=${encodeURIComponent(searchTerm)}&limit=5`,
        );
        setSuggestions(response.data.suggestions || []);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
        setSuggestions([]);
      }
    }, 300),
    [],
  );

  const performSearch = useCallback(
    debounce(async (searchTerm) => {
      if (!searchTerm.trim() || searchTerm.length < 2) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await api.get(
          `/user/public/search?keyword=${encodeURIComponent(searchTerm)}&page=0&size=10`,
        );
        setResults(response.data.content || []);
        setShowDropdown(true);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    [],
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    setShowDropdown(true);

    if (value.length >= 2) {
      fetchSuggestions(value);
      performSearch(value);
    } else {
      setSuggestions([]);
      setResults([]);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) return;

    saveToHistory(searchTerm);
    setKeyword(searchTerm);
    setShowDropdown(false);
    navigate(`/products?keyword=${encodeURIComponent(searchTerm)}`);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSearch(suggestion);
  };

  const handleResultClick = (productId) => {
    setShowDropdown(false);
    navigate(`/product/${productId}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(keyword);
    }
  };

  const clearSearch = () => {
    setKeyword("");
    setSuggestions([]);
    setResults([]);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={searchRef}
      className={`relative w-full ${isMobile ? "mobile-search" : ""}`}
    >
      <div className="relative">
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => keyword && setShowDropdown(true)}
          placeholder={
            isMobile
              ? "Search products..."
              : "Search for your favorite products..."
          }
          className="w-full px-5 py-3 pl-12 pr-12 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />

        {keyword && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-zinc-400" />
          </button>
        )}

        {loading && (
          <div className="absolute right-12 top-1/2 -translate-y-1/2">
            <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
          </div>
        )}
      </div>

      {/* Dropdown Results */}
      <AnimatePresence>
        {showDropdown &&
          (keyword.length >= 2 ||
            results.length > 0 ||
            suggestions.length > 0 ||
            searchHistory.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden z-50 max-h-[500px] overflow-y-auto"
            >
              {/* Search History */}
              {!keyword && searchHistory.length > 0 && (
                <div className="p-3 border-b border-zinc-200 dark:border-zinc-800">
                  <div className="flex justify-between items-center mb-2 px-2">
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      Recent Searches
                    </span>
                    <button
                      onClick={clearHistory}
                      className="text-xs text-blue-600 hover:text-blue-700"
                    >
                      Clear All
                    </button>
                  </div>
                  {searchHistory.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(item)}
                      className="w-full text-left px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-3"
                    >
                      <Search className="w-4 h-4 text-zinc-400" />
                      <span className="text-sm">{item}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Suggestions */}
              {keyword && suggestions.length > 0 && (
                <div className="p-3 border-b border-zinc-200 dark:border-zinc-800">
                  <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-2">
                    Suggestions
                  </div>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-3"
                    >
                      <Search className="w-4 h-4 text-zinc-400" />
                      <span className="text-sm">{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Search Results */}
              {results.length > 0 && (
                <div className="p-3">
                  <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-2">
                    Products ({results.length})
                  </div>
                  {results.map((product) => (
                    <div
                      key={product.productId}
                      onClick={() => handleResultClick(product.productId)}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
                    >
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.productName}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold truncate">
                          {product.productName}
                        </h4>
                        <p className="text-xs text-zinc-500 truncate">
                          {product.description?.substring(0, 60)}
                        </p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-sm font-bold text-blue-600">
                            ${product.specialPrice?.toFixed(2)}
                          </span>
                          {product.discount > 0 && (
                            <>
                              <span className="text-xs line-through text-zinc-400">
                                ${product.price?.toFixed(2)}
                              </span>
                              <span className="text-xs text-green-600">
                                {product.discount}% off
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => handleSearch(keyword)}
                    className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    View All Results
                  </button>
                </div>
              )}

              {/* No Results */}
              {keyword &&
                keyword.length >= 2 &&
                results.length === 0 &&
                !loading && (
                  <div className="p-8 text-center">
                    <Search className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
                    <p className="text-zinc-500">
                      No products found for "{keyword}"
                    </p>
                    <p className="text-sm text-zinc-400 mt-1">
                      Try searching with different keywords
                    </p>
                  </div>
                )}
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
