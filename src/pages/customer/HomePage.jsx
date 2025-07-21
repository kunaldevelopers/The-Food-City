import React, { useState, useEffect } from "react";
import { Container } from "../../components/shared/Layout.jsx";
import { mockAPI } from "../../services/mockApi.js";
import HeroSection from "../../components/customer/HeroSection.jsx";
import SimpleSearchBox from "../../components/customer/SimpleSearchBox.jsx";
import SpecialOffersSlider from "../../components/customer/SpecialOffersSlider.jsx";
import CategorySlider from "../../components/customer/CategorySlider.jsx";
import { InlineLoader } from "../../components/shared/LoadingSpinner.jsx";
import {
  FaFire,
  FaBowlFood,
  FaHotjar,
  FaDrumstickBite,
  FaUtensils,
} from "react-icons/fa6";
import { FaPepperHot, FaClock, FaStar, FaDollarSign } from "react-icons/fa";

export default function HomePage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMenuItems();
  }, []);

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

  // Group items by category
  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  // Get trending items (highest rated items)
  const trendingItems = menuItems
    .filter((item) => item.rating >= 4.3)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  if (loading) {
    return (
      <Container className="py-8">
        <InlineLoader text="Loading delicious food..." />
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
      {/* Hero Section */}
      <HeroSection />

      {/* Simple Search Box */}
      <SimpleSearchBox />

      {/* Special Offers Slider */}
      <SpecialOffersSlider />

      {/* Trending Items */}
      {trendingItems.length > 0 && (
        <CategorySlider
          category="trending"
          title={
            <span className="flex items-center gap-2">
              <FaFire className="text-dark-red" />
              Trending Now
            </span>
          }
          items={trendingItems}
        />
      )}

      {/* Category Sections */}
      {Object.entries(groupedItems).map(([category, items]) => {
        // Category icons
        const categoryIcons = {
          Indian: <FaBowlFood className="text-dark-red" />,
          Chinese: <FaHotjar className="text-dark-red" />,
          South: <FaPepperHot className="text-dark-red" />,
          Tandoor: <FaDrumstickBite className="text-dark-red" />,
        };

        return (
          <CategorySlider
            key={category}
            category={category}
            title={
              <span className="flex items-center gap-2">
                {categoryIcons[category] || (
                  <FaUtensils className="text-dark-red" />
                )}
                {category} Cuisine
              </span>
            }
            items={items}
          />
        );
      })}

      {/* Quick Actions */}
      <div className="mt-12 bg-white rounded-lg shadow-subtle p-6">
        <h2 className="text-2xl font-bold text-dark-red mb-4 text-center">
          Why Choose The Food City?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaClock className="text-2xl text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-sm">
              Get your food delivered in 30-45 minutes, hot and fresh.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaStar className="text-2xl text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Quality Food</h3>
            <p className="text-gray-600 text-sm">
              Fresh ingredients and authentic recipes for the best taste.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaDollarSign className="text-2xl text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Great Prices</h3>
            <p className="text-gray-600 text-sm">
              Affordable prices with regular deals and discounts.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
