import React, { useRef } from "react";
import { Link } from "react-router-dom";
import FoodCard from "./FoodCard.jsx";

export default function CategorySlider({
  title,
  items,
  showAll = false,
  category = "",
}) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  const displayItems = showAll ? items : items.slice(0, 8);

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-dark-red">{title}</h2>
        </div>

        <div className="flex items-center space-x-3">
          {!showAll && items.length > 8 && (
            <span className="text-sm text-gray-500 hidden sm:block">
              Showing {displayItems.length} of {items.length}
            </span>
          )}

          {/* View All Button - Always show unless showAll is true */}
          {!showAll && (
            <Link
              to={`/menu${
                category && category !== "trending"
                  ? `?category=${category}`
                  : ""
              }`}
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
          )}
        </div>
      </div>

      {/* Items Container with Navigation Arrows */}
      <div className="relative">
        {/* Scroll Buttons - Positioned over the slider */}
        {!showAll && items.length > 1 && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-dark-red hover:bg-hover-red shadow-lg hover:shadow-xl border border-dark-red hover:border-hover-red flex items-center justify-center transition-all duration-200 hover:scale-105"
              aria-label="Scroll left"
            >
              <svg
                className="w-5 h-5 text-white"
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
              onClick={() => scroll("right")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-dark-red hover:bg-hover-red shadow-lg hover:shadow-xl border border-dark-red hover:border-hover-red flex items-center justify-center transition-all duration-200 hover:scale-105"
              aria-label="Scroll right"
            >
              <svg
                className="w-5 h-5 text-white"
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
          </>
        )}

        <div
          ref={scrollRef}
          className={`
            flex gap-4 overflow-x-auto scrollbar-hide pb-2
            ${showAll ? "flex-wrap" : ""}
          `}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitScrollbar: { display: "none" },
          }}
        >
          {displayItems.map((item) => (
            <div
              key={item.id}
              className={`
                flex-shrink-0
                ${
                  showAll
                    ? "w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mb-4"
                    : "w-72 sm:w-80 md:w-72 lg:w-80"
                }
              `}
            >
              <FoodCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile scroll indicator */}
      {!showAll && items.length > 1 && (
        <div className="flex justify-center mt-4 md:hidden">
          <div className="flex space-x-1">
            {Array.from({
              length: Math.min(5, Math.ceil(items.length / 2)),
            }).map((_, index) => (
              <div key={index} className="w-2 h-2 rounded-full bg-gray-300" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
