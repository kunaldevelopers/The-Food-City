import React, { useState } from "react";
import { useCart } from "../../context/CartContext.jsx";

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();
  const [specialInstructions, setSpecialInstructions] = useState(
    item.specialInstructions || ""
  );
  const [showInstructions, setShowInstructions] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleInstructionsChange = (instructions) => {
    setSpecialInstructions(instructions);
    // Update the item with special instructions
    // This would typically be handled by the cart context
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4 mb-3 md:mb-4">
      <div className="flex items-start space-x-3 md:space-x-4">
        {/* Item Image */}
        <div className="flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
          />
        </div>

        {/* Item Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1 truncate">
                {item.name}
              </h3>

              {/* Type Badge */}
              <div className="flex items-center space-x-1 md:space-x-2 mb-2">
                <span
                  className={`
                  inline-flex items-center px-1.5 md:px-2 py-1 rounded-full text-xs font-medium
                  ${
                    item.type === "Veg"
                      ? "bg-success-green text-white"
                      : "bg-error-red text-white"
                  }
                `}
                >
                  <span
                    className={`
                    w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mr-1
                    ${item.type === "Veg" ? "bg-white" : "bg-white"}
                  `}
                  ></span>
                  {item.type}
                </span>

                {item.category && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-1.5 md:px-2 py-1 rounded-full truncate">
                    {item.category}
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2 mb-2 md:mb-3">
                <span className="text-lg md:text-xl font-bold text-dark-red">
                  ₹{item.price}
                </span>
                <span className="text-xs md:text-sm text-gray-500">each</span>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeItem(item.id)}
              className="text-gray-400 hover:text-error-red transition-colors p-1 flex-shrink-0"
              title="Remove item"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>

          {/* Quantity Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center space-x-2 md:space-x-3">
              <span className="text-xs md:text-sm font-medium text-gray-700">
                Quantity:
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 transition-colors text-sm"
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className="font-medium text-dark-red min-w-[30px] text-center text-sm md:text-base">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-dark-red hover:bg-hover-red flex items-center justify-center text-white transition-colors text-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Subtotal */}
            <div className="text-left sm:text-right">
              <div className="text-base md:text-lg font-bold text-dark-red">
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">
                {item.quantity} × ₹{item.price}
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="text-xs md:text-sm text-dark-red hover:text-hover-red transition-colors flex items-center"
            >
              <svg
                className="w-3 h-3 md:w-4 md:h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              {showInstructions ? "Hide" : "Add"} special instructions
            </button>

            {showInstructions && (
              <div className="mt-2">
                <textarea
                  value={specialInstructions}
                  onChange={(e) => handleInstructionsChange(e.target.value)}
                  placeholder="Any special requests for this item? (e.g., less spicy, extra sauce)"
                  className="w-full px-2 md:px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-red focus:border-transparent resize-none text-sm"
                  rows={2}
                />
              </div>
            )}

            {specialInstructions && !showInstructions && (
              <div className="mt-2 text-xs md:text-sm text-gray-600 bg-gray-50 p-2 rounded">
                <strong>Note:</strong> {specialInstructions}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
