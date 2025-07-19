import React, { useRef } from "react";
import FoodCard from "./FoodCard.jsx";

export default function CategorySlider({ title, items, showAll = false }) {
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
        <h2 className="text-2xl font-bold text-dark-red">{title}</h2>

        <div className="flex items-center space-x-2">
          {!showAll && items.length > 8 && (
            <span className="text-sm text-gray-500">
              Showing {displayItems.length} of {items.length}
            </span>
          )}

          {/* Scroll Buttons - Hidden on mobile */}
          <div className="hidden md:flex space-x-1">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Scroll left"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Scroll right"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Items Container */}
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
              ${showAll ? "w-full sm:w-1/2 lg:w-1/3 xl:w-1/4" : "w-72 sm:w-80"}
            `}
          >
            <FoodCard item={item} />
          </div>
        ))}
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
