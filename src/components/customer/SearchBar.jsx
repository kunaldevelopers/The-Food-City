import React, { useState, useEffect, useRef } from "react";

export default function SearchBar({
  onSearch,
  placeholder = "Search for dishes, cuisines...",
  suggestions = [],
  showSuggestions = true,
}) {
  const [query, setQuery] = useState("");
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Filter suggestions based on query
  const filteredSuggestions = suggestions
    .filter((suggestion) =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 8);

  useEffect(() => {
    // Handle clicks outside to close suggestions
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestionsList(false);
        setActiveSuggestion(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setActiveSuggestion(-1);

    if (showSuggestions && value.length > 0) {
      setShowSuggestionsList(true);
    } else {
      setShowSuggestionsList(false);
    }

    // Debounced search
    if (onSearch) {
      const timeoutId = setTimeout(() => {
        onSearch(value);
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  };

  const handleKeyDown = (e) => {
    if (!showSuggestionsList || filteredSuggestions.length === 0) {
      if (e.key === "Enter") {
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveSuggestion((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (activeSuggestion >= 0) {
          selectSuggestion(filteredSuggestions[activeSuggestion]);
        } else {
          handleSearch();
        }
        break;
      case "Escape":
        setShowSuggestionsList(false);
        setActiveSuggestion(-1);
        break;
    }
  };

  const selectSuggestion = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestionsList(false);
    setActiveSuggestion(-1);
    if (onSearch) {
      onSearch(suggestion);
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
    setShowSuggestionsList(false);
  };

  const clearSearch = () => {
    setQuery("");
    setShowSuggestionsList(false);
    setActiveSuggestion(-1);
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (
              showSuggestions &&
              query.length > 0 &&
              filteredSuggestions.length > 0
            ) {
              setShowSuggestionsList(true);
            }
          }}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-red focus:border-transparent bg-white shadow-sm"
        />

        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Clear Button */}
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestionsList && filteredSuggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => selectSuggestion(suggestion)}
              className={`
                w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors
                ${index === activeSuggestion ? "bg-gray-50" : ""}
                ${
                  index === filteredSuggestions.length - 1
                    ? ""
                    : "border-b border-gray-100"
                }
              `}
            >
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-gray-400 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="text-gray-700">{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
