import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaGift,
  FaPercentage,
  FaTruck,
  FaStar,
  FaUsers,
  FaGraduationCap,
  FaMoon,
  FaUtensils,
  FaBirthdayCake,
} from "react-icons/fa";

export default function SpecialOffersSlider() {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const specialOffers = [
    {
      id: 1,
      title: "50% OFF",
      subtitle: "On Your First Order",
      description: "Use code FIRST50 and save big on your first order",
      code: "FIRST50",
      bgColor: "bg-gradient-to-r from-dark-red to-hover-red",
      textColor: "text-white",
      buttonColor: "bg-white text-dark-red hover:bg-gray-100",
      icon: FaPercentage,
    },
    {
      id: 2,
      title: "Free Delivery",
      subtitle: "On Orders Above ₹299",
      description: "No delivery charges for orders above ₹299",
      bgColor: "bg-gradient-to-r from-success-green to-leafy-green",
      textColor: "text-white",
      buttonColor: "bg-white text-success-green hover:bg-gray-100",
      icon: FaTruck,
    },
    {
      id: 3,
      title: "Weekend Special",
      subtitle: "20% OFF on All Items",
      description: "Every Saturday & Sunday - Limited time offer",
      code: "WEEKEND20",
      bgColor: "bg-gradient-to-r from-spicy-orange to-warm-yellow",
      textColor: "text-white",
      buttonColor: "bg-white text-spicy-orange hover:bg-gray-100",
      icon: FaStar,
    },
    {
      id: 4,
      title: "Family Pack",
      subtitle: "Buy 3 Get 1 Free",
      description: "Perfect for family dinners and gatherings",
      code: "FAMILY3",
      bgColor: "bg-gradient-to-r from-purple-600 to-pink-600",
      textColor: "text-white",
      buttonColor: "bg-white text-purple-600 hover:bg-gray-100",
      icon: FaUsers,
    },
    {
      id: 5,
      title: "Student Special",
      subtitle: "30% OFF with Student ID",
      description: "Show your student ID and get instant discount",
      code: "STUDENT30",
      bgColor: "bg-gradient-to-r from-blue-600 to-indigo-600",
      textColor: "text-white",
      buttonColor: "bg-white text-blue-600 hover:bg-gray-100",
      icon: FaGraduationCap,
    },
    {
      id: 6,
      title: "Midnight Hunger",
      subtitle: "25% OFF After 10 PM",
      description: "Late night cravings? We've got you covered!",
      code: "MIDNIGHT25",
      bgColor: "bg-gradient-to-r from-gray-800 to-gray-900",
      textColor: "text-white",
      buttonColor: "bg-white text-gray-800 hover:bg-gray-100",
      icon: FaMoon,
    },
    {
      id: 7,
      title: "Combo Delight",
      subtitle: "₹199 for Any 2 Items",
      description: "Mix and match any two items from our menu",
      code: "COMBO199",
      bgColor: "bg-gradient-to-r from-teal-600 to-cyan-600",
      textColor: "text-white",
      buttonColor: "bg-white text-teal-600 hover:bg-gray-100",
      icon: FaUtensils,
    },
    {
      id: 8,
      title: "Birthday Treat",
      subtitle: "Free Dessert on Birthday",
      description: "Celebrate your special day with us!",
      bgColor: "bg-gradient-to-r from-pink-500 to-rose-500",
      textColor: "text-white",
      buttonColor: "bg-white text-pink-500 hover:bg-gray-100",
      icon: FaBirthdayCake,
    },
  ];

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const cardWidth = container.children[0]?.offsetWidth || 320;
      const gap = 16; // 1rem gap
      const scrollAmount = cardWidth + gap;

      if (direction === "right") {
        const maxScrollLeft = container.scrollWidth - container.clientWidth;

        if (container.scrollLeft >= maxScrollLeft - 50) {
          // Reset to beginning
          container.scrollTo({
            left: 0,
            behavior: "smooth",
          });
          setCurrentIndex(0);
        } else {
          // Normal scroll to next
          container.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          });
          setCurrentIndex((prev) =>
            Math.min(prev + 1, specialOffers.length - 1)
          );
        }
      } else {
        // Left scroll
        if (container.scrollLeft <= 50) {
          // Go to end
          const maxScrollLeft = container.scrollWidth - container.clientWidth;
          container.scrollTo({
            left: maxScrollLeft,
            behavior: "smooth",
          });
          setCurrentIndex(specialOffers.length - 1);
        } else {
          // Normal scroll to previous
          container.scrollBy({
            left: -scrollAmount,
            behavior: "smooth",
          });
          setCurrentIndex((prev) => Math.max(prev - 1, 0));
        }
      }
    }
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      const container = scrollRef.current;
      if (container) {
        const cardWidth = container.children[0]?.offsetWidth || 320;
        const gap = 16; // 1rem gap
        const scrollAmount = cardWidth + gap;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;

        // Check if we're at or near the end
        if (container.scrollLeft >= maxScrollLeft - 50) {
          // Reset to beginning smoothly
          container.scrollTo({
            left: 0,
            behavior: "smooth",
          });
          setCurrentIndex(0);
        } else {
          // Normal scroll to next
          container.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          });
          setCurrentIndex((prev) =>
            Math.min(prev + 1, specialOffers.length - 1)
          );
        }
      }
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, specialOffers.length]);

  // Pause auto-slide on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Touch/swipe support for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      scroll("right");
    }
    if (isRightSwipe) {
      scroll("left");
    }

    // Reset touch values
    setTouchStart(0);
    setTouchEnd(0);
    setIsAutoPlaying(true);
  };

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-dark-red flex items-center gap-2">
            <FaGift className="text-dark-red" />
            Special Offers
          </h2>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500 hidden sm:block">
            {specialOffers.length} offers available
          </span>

          {/* View All Offers Button */}
          <Link
            to="/deals"
            className="bg-dark-red hover:bg-hover-red text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            View All
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Offers Container with Navigation Arrows */}
      <div className="relative group">
        {/* Scroll Buttons - Better positioning and z-index */}
        <button
          onClick={() => {
            setIsAutoPlaying(false);
            scroll("left");
            setTimeout(() => setIsAutoPlaying(true), 2000);
          }}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 rounded-full bg-dark-red text-white shadow-lg hover:shadow-xl hover:bg-hover-red flex items-center justify-center transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 translate-x-0 md:-translate-x-2 hover:translate-x-0"
          style={{ marginLeft: "0.25rem" }}
          aria-label="Previous offer"
        >
          <svg
            className="w-3 h-3 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={() => {
            setIsAutoPlaying(false);
            scroll("right");
            setTimeout(() => setIsAutoPlaying(true), 2000);
          }}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 rounded-full bg-dark-red text-white shadow-lg hover:shadow-xl hover:bg-hover-red flex items-center justify-center transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 translate-x-0 md:translate-x-2 hover:translate-x-0"
          style={{ marginRight: "0.25rem" }}
          aria-label="Next offer"
        >
          <svg
            className="w-3 h-3 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitScrollbar: { display: "none" },
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {specialOffers.map((offer) => (
            <div
              key={offer.id}
              className={`
              flex-shrink-0 w-80 sm:w-88 md:w-80 lg:w-96 h-64
              ${offer.bgColor} ${offer.textColor}
              rounded-lg p-6 relative overflow-hidden
              transition-transform duration-300
              cursor-pointer shadow-lg flex flex-col
            `}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-2 border-current"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full border-2 border-current"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
                  <offer.icon className="text-8xl" />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 line-clamp-1">
                      {offer.title}
                    </h3>
                    <p className="text-base font-medium opacity-90 line-clamp-1">
                      {offer.subtitle}
                    </p>
                  </div>
                  <div className="text-2xl ml-3">
                    <offer.icon />
                  </div>
                </div>

                <p className="text-sm opacity-80 mb-4 flex-1 line-clamp-2">
                  {offer.description}
                </p>

                <div className="mt-auto">
                  {offer.code && (
                    <div className="mb-3">
                      <div className="inline-block bg-black bg-opacity-20 px-3 py-1 rounded-full">
                        <span className="text-sm font-mono font-bold">
                          {offer.code}
                        </span>
                      </div>
                    </div>
                  )}

                  <Link
                    to="/deals"
                    className={`
                    inline-block px-4 py-2 rounded-lg font-medium transition-colors text-sm
                    ${offer.buttonColor}
                  `}
                  >
                    Claim Offer
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile indicators */}
      <div className="flex justify-center mt-4 md:hidden">
        <div className="flex space-x-1">
          {specialOffers.slice(0, 5).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex % 5 ? "bg-dark-red" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
