import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Grid } from "../../components/shared/Layout.jsx";
import { mockAPI } from "../../services/mockApi.js";
import SearchBar from "../../components/customer/SearchBar.jsx";
import FilterPanel from "../../components/customer/FilterPanel.jsx";
import SortOptions from "../../components/customer/SortOptions.jsx";
import FoodCard from "../../components/customer/FoodCard.jsx";
import { InlineLoader } from "../../components/shared/LoadingSpinner.jsx";

const CATEGORIES = ["All", "Indian", "Chinese", "South", "Tandoor"];

export default function MenuPage() {
  const [searchParams] = useSearchParams();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("relevance");
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    loadMenuItems();
  }, []);

  useEffect(() => {
    // Set category from URL parameter
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");

    if (categoryParam && CATEGORIES.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }

    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  const loadMenuItems = async () => {
    try {
      setLoading(true);
      const response = await mockAPI.getMenuItems();
      if (response.success) {
        setMenuItems(response.data);
      } else {
        setError("Failed to load menu items");
      }
    } catch (err) {
      setError("Something went wrong while loading menu items");
      console.error("Error loading menu items:", err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  // Generate search suggestions
  const searchSuggestions = useMemo(() => {
    const suggestions = new Set();

    menuItems.forEach((item) => {
      // Add item names
      suggestions.add(item.name);
      // Add categories
      suggestions.add(item.category);
      // Add tags
      if (item.tags) {
        item.tags.forEach((tag) => suggestions.add(tag));
      }
    });

    return Array.from(suggestions);
  }, [menuItems]);

  // Filter and sort menu items
  const filteredAndSortedItems = useMemo(() => {
    let filtered = [...menuItems];

    // Apply category filter from tabs
    if (activeCategory && activeCategory !== "All") {
      filtered = filtered.filter((item) => item.category === activeCategory);
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          (item.tags &&
            item.tags.some((tag) => tag.toLowerCase().includes(query)))
      );
    }

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter((item) => item.category === filters.category);
    }

    if (filters.type) {
      filtered = filtered.filter((item) => item.type === filters.type);
    }

    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      filtered = filtered.filter(
        (item) =>
          item.price >= filters.minPrice && item.price <= filters.maxPrice
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "delivery-time":
        filtered.sort((a, b) => a.preparationTime - b.preparationTime);
        break;
      default:
        // Relevance - keep original order or sort by rating
        filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [menuItems, searchQuery, filters, sortBy, activeCategory]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // Clear category filter when using tabs
    if (filters.category) {
      const newFilters = { ...filters };
      delete newFilters.category;
      setFilters(newFilters);
    }
  };

  if (loading) {
    return (
      <Container className="py-8">
        <InlineLoader text="Loading menu..." />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-8">
        <div className="text-center">
          <div className="bg-error-red text-white p-4 rounded-lg max-w-md mx-auto">
            <h3 className="font-semibold mb-2">Oops! Something went wrong</h3>
            <p className="text-sm">{error}</p>
            <button
              onClick={loadMenuItems}
              className="mt-3 bg-white text-error-red px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4 md:py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-dark-red mb-2">Our Menu</h1>
        <p className="text-gray-600">
          Discover delicious dishes from our kitchen
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <SearchBar
          onSearch={handleSearch}
          suggestions={searchSuggestions}
          placeholder="Search for dishes, cuisines, or ingredients..."
        />
      </div>

      {/* Category Tabs */}
      <div className="mb-6">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() =>
                handleCategoryChange(category === "All" ? "" : category)
              }
              className={`
                flex-shrink-0 px-4 py-2 rounded-full font-medium transition-colors
                ${
                  activeCategory === category ||
                  (category === "All" && !activeCategory)
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

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <FilterPanel
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClear={handleClearFilters}
          />
          <SortOptions sortBy={sortBy} onSortChange={handleSortChange} />
        </div>

        <div className="text-sm text-gray-600">
          {filteredAndSortedItems.length} item
          {filteredAndSortedItems.length !== 1 ? "s" : ""} found
        </div>
      </div>

      {/* Results */}
      {filteredAndSortedItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-12 h-12 text-gray-400"
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
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No items found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filters to find what you're looking
            for.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setFilters({});
              setActiveCategory("");
            }}
            className="bg-dark-red text-white px-6 py-2 rounded-lg hover:bg-hover-red transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <Grid cols={4} gap={6}>
          {filteredAndSortedItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </Grid>
      )}
    </Container>
  );
}
