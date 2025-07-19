import React, { useState } from "react";

export default function FilterPanel({ filters, onFiltersChange, onClear }) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = ["Indian", "Chinese", "South", "Tandoor"];
  const types = ["Veg", "Non-Veg"];
  const priceRanges = [
    { label: "Under ₹100", min: 0, max: 100 },
    { label: "₹100 - ₹200", min: 100, max: 200 },
    { label: "₹200 - ₹300", min: 200, max: 300 },
    { label: "Above ₹300", min: 300, max: 10000 },
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters };

    if (filterType === "category") {
      newFilters.category = newFilters.category === value ? "" : value;
    } else if (filterType === "type") {
      newFilters.type = newFilters.type === value ? "" : value;
    } else if (filterType === "priceRange") {
      if (
        newFilters.minPrice === value.min &&
        newFilters.maxPrice === value.max
      ) {
        delete newFilters.minPrice;
        delete newFilters.maxPrice;
      } else {
        newFilters.minPrice = value.min;
        newFilters.maxPrice = value.max;
      }
    }

    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onClear();
    setIsOpen(false);
  };

  const activeFiltersCount = Object.keys(filters).filter(
    (key) => filters[key] !== "" && filters[key] !== undefined
  ).length;

  return (
    <div className="relative">
      {/* Filter Button */}
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
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
          />
        </svg>
        <span className="text-gray-700">Filters</span>
        {activeFiltersCount > 0 && (
          <span className="bg-dark-red text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {/* Filter Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 md:w-96">
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
                <div className="flex items-center space-x-2">
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-dark-red hover:text-hover-red transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
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
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Cuisine</h4>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleFilterChange("category", category)}
                      className={`
                        px-3 py-2 rounded-lg text-sm font-medium transition-colors
                        ${
                          filters.category === category
                            ? "bg-dark-red text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }
                      `}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Food Type</h4>
                <div className="flex space-x-2">
                  {types.map((type) => (
                    <button
                      key={type}
                      onClick={() => handleFilterChange("type", type)}
                      className={`
                        flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center
                        ${
                          filters.type === type
                            ? "bg-dark-red text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }
                      `}
                    >
                      <span
                        className={`
                        w-3 h-3 rounded-full mr-2
                        ${type === "Veg" ? "bg-success-green" : "bg-error-red"}
                      `}
                      ></span>
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <button
                      key={index}
                      onClick={() => handleFilterChange("priceRange", range)}
                      className={`
                        w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left
                        ${
                          filters.minPrice === range.min &&
                          filters.maxPrice === range.max
                            ? "bg-dark-red text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }
                      `}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-dark-red text-white py-2 px-4 rounded-lg hover:bg-hover-red transition-colors font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
