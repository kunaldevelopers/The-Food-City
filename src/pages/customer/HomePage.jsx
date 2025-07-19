import React, { useState, useEffect } from "react";
import { Container } from "../../components/shared/Layout.jsx";
import { mockAPI } from "../../services/mockApi.js";
import HeroSection from "../../components/customer/HeroSection.jsx";
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
import { FaPepperHot } from "react-icons/fa";

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

      {/* Special Offers Slider */}
      <SpecialOffersSlider />

      {/* Trending Items */}
      {trendingItems.length > 0 && (
        <CategorySlider
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
            <div className="w-16 h-16 bg-success-green rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-sm">
              Get your food delivered in 30-45 minutes, hot and fresh.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-golden-yellow rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Quality Food</h3>
            <p className="text-gray-600 text-sm">
              Fresh ingredients and authentic recipes for the best taste.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-info-blue rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
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
