import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaMicrophone } from "react-icons/fa";

const FOOD_NAMES = [
  "Biryani",
  "Butter Chicken",
  "Paneer Tikka",
  "Samosa",
  "Dosa",
  "Pizza",
  "Burger",
  "Pasta",
  "Noodles",
  "Fried Rice",
  "Tandoori Chicken",
  "Fish Curry",
  "Mutton Curry",
  "Veg Pulao",
  "Chole Bhature",
  "Rajma Rice",
  "Dal Makhani",
  "Palak Paneer",
  "Aloo Gobi",
  "Kadai Paneer",
  "Chicken Tikka",
  "Seekh Kebab",
  "Malai Kofta",
  "Hyderabadi Biryani",
  "Masala Dosa",
  "Idli Sambar",
  "Pav Bhaji",
  "Vada Pav",
  "Misal Pav",
  "Poha",
];

export default function PremiumSearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFoodIndex, setCurrentFoodIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
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

  const handleVoiceSearch = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert("Speech recognition not supported in this browser.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Find Everything You Need in{" "}
            <span className="text-dark-red">SlingShot</span>
          </h3>
          <p className="text-gray-600 text-sm md:text-base">
            Search from thousands of delicious dishes and get them delivered
            fast
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative">
          <div className="relative flex items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search for nearby ${FOOD_NAMES[currentFoodIndex]}`}
                className="w-full h-14 md:h-16 pl-6 pr-20 text-base md:text-lg border-2 border-gray-200 rounded-xl focus:border-dark-red focus:outline-none transition-all duration-300 placeholder-gray-400"
              />

              {/* Voice Search Button */}
              <button
                type="button"
                onClick={handleVoiceSearch}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }`}
                title="Voice Search"
              >
                <FaMicrophone className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="ml-4 h-14 md:h-16 px-6 md:px-8 bg-dark-red hover:bg-hover-red text-white rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <FaSearch className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Search Now</span>
            </button>
          </div>

          {/* Search Suggestions */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <span className="text-sm text-gray-500 mb-2 w-full text-center">
              Popular searches:
            </span>
            {["Biryani", "Pizza", "Burger", "Chinese", "Indian"].map(
              (suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setSearchTerm(suggestion)}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-dark-red hover:text-white rounded-full transition-colors duration-200"
                >
                  {suggestion}
                </button>
              )
            )}
          </div>
        </form>

        {/* Features */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Fast Delivery
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Fresh Food
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            Best Prices
          </div>
        </div>
      </div>
    </div>
  );
}
