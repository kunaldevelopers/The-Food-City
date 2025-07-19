import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const FOOD_NAMES = [
  "Biryani",
  "Butter Chicken",
  "Paneer Tikka",
  "Pizza",
  "Burger",
  "Dosa",
  "Samosa",
  "Pasta",
  "Noodles",
  "Fried Rice",
  "Tandoori Chicken",
  "Fish Curry",
  "Dal Makhani",
  "Chole Bhature",
  "Masala Dosa",
  "Pav Bhaji",
  "Chinese",
  "South Indian",
  "North Indian",
  "Desserts",
];

export default function SimpleSearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFoodIndex, setCurrentFoodIndex] = useState(0);
  const navigate = useNavigate();

  // Rotate food names every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFoodIndex((prevIndex) => (prevIndex + 1) % FOOD_NAMES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSearch} className="flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder=""
            className="w-full h-12 md:h-14 px-4 md:px-6 text-base border-2 border-gray-300 rounded-xl focus:border-dark-red focus:outline-none transition-colors duration-200"
          />
          {/* Custom Placeholder */}
          {!searchTerm && (
            <div className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 text-base">
              Search for delicious{" "}
              <span className="font-bold text-dark-red">
                {FOOD_NAMES[currentFoodIndex]}
              </span>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="h-12 md:h-14 px-4 md:px-8 bg-dark-red hover:bg-hover-red text-white rounded-xl font-medium transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
        >
          <FaSearch className="w-4 h-4" />
          <span className="hidden md:inline">Search Now</span>
        </button>
      </form>
    </div>
  );
}
