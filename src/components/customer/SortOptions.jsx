import React, { useState } from "react";

export default function SortOptions({ sortBy, onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: "relevance", label: "Relevance", icon: "🎯" },
    { value: "rating", label: "Rating: High to Low", icon: "⭐" },
    { value: "price-low", label: "Price: Low to High", icon: "💰" },
    { value: "price-high", label: "Price: High to Low", icon: "💸" },
    { value: "name", label: "Name: A to Z", icon: "🔤" },
    { value: "delivery-time", label: "Delivery Time", icon: "⚡" },
  ];

  const currentSort =
    sortOptions.find((option) => option.value === sortBy) || sortOptions[0];

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Sort Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-white"
      >
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
          />
        </svg>
        <span className="text-gray-700">Sort: {currentSort.label}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Sort Options Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="py-2">
              <div className="px-4 py-2 text-sm font-medium text-gray-500 border-b border-gray-100">
                Sort by
              </div>
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortSelect(option.value)}
                  className={`
                    w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center space-x-3
                    ${
                      sortBy === option.value
                        ? "bg-gray-50 text-dark-red"
                        : "text-gray-700"
                    }
                  `}
                >
                  <span className="text-lg">{option.icon}</span>
                  <span className="flex-1">{option.label}</span>
                  {sortBy === option.value && (
                    <svg
                      className="w-4 h-4 text-dark-red"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
