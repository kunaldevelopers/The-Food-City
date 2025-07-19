import React from "react";
import { useCart } from "../../context/CartContext.jsx";
import { Button } from "../shared/Layout.jsx";

export default function FoodCard({ item }) {
  const { addItem, getItemQuantity, updateQuantity } = useCart();
  const quantity = getItemQuantity(item.id);

  const handleAddToCart = () => {
    addItem(item);
  };

  const handleIncrement = () => {
    updateQuantity(item.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(item.id, quantity - 1);
    } else {
      updateQuantity(item.id, 0);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-subtle overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />

        {/* Type Badge */}
        <div className="absolute top-2 left-2">
          <span
            className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${
              item.type === "Veg"
                ? "bg-success-green text-white"
                : "bg-error-red text-white"
            }
          `}
          >
            {item.type}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs flex items-center">
          <span className="text-golden-yellow mr-1">★</span>
          {item.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {item.name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-light-gray text-gray-600 px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-dark-red">
              ₹{item.price}
            </span>
            {item.preparationTime && (
              <p className="text-xs text-gray-500 mt-1">
                {item.preparationTime} mins
              </p>
            )}
          </div>

          {/* Add to Cart / Quantity Controls */}
          <div className="flex items-center">
            {quantity === 0 ? (
              <Button
                onClick={handleAddToCart}
                variant="primary"
                size="sm"
                className="px-4"
              >
                Add
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDecrement}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 transition-colors"
                >
                  −
                </button>
                <span className="font-medium text-dark-red min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="w-8 h-8 rounded-full bg-dark-red hover:bg-hover-red flex items-center justify-center text-white transition-colors"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        {item.reviewCount > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              {item.reviewCount} review{item.reviewCount !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
