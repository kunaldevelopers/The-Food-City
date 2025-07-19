import React, { useState } from "react";
import { useCart } from "../../context/CartContext.jsx";
import { mockAPI } from "../../services/mockApi.js";
import { Button } from "../shared/Layout.jsx";

export default function CartSummary({ onCheckout }) {
  const {
    subtotal,
    discount,
    deliveryFee,
    total,
    promoCode,
    applyPromo,
    removePromo,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState("");

  const handleApplyPromo = async () => {
    if (!promoInput.trim()) return;

    setPromoLoading(true);
    setPromoError("");

    try {
      const response = await mockAPI.validatePromoCode(
        promoInput.trim(),
        subtotal
      );

      if (response.success) {
        applyPromo(response.data.promoCode, response.data.discount);
        setPromoInput("");
      } else {
        setPromoError(response.message);
      }
    } catch (error) {
      setPromoError("Failed to apply promo code. Please try again.");
    } finally {
      setPromoLoading(false);
    }
  };

  const handleRemovePromo = () => {
    removePromo();
    setPromoError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleApplyPromo();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Order Summary
      </h3>

      {/* Promo Code Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Promo Code
        </label>

        {promoCode ? (
          <div className="flex items-center justify-between p-3 bg-success-green bg-opacity-10 border border-success-green rounded-lg">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-success-green mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-success-green font-medium">
                {promoCode.code} applied
              </span>
            </div>
            <button
              onClick={handleRemovePromo}
              className="text-success-green hover:text-green-700 transition-colors"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex space-x-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                onKeyPress={handleKeyPress}
                placeholder="Enter promo code"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-red focus:border-transparent"
              />
              <Button
                onClick={handleApplyPromo}
                disabled={!promoInput.trim() || promoLoading}
                loading={promoLoading}
                variant="outline"
                size="md"
              >
                Apply
              </Button>
            </div>

            {promoError && (
              <p className="text-sm text-error-red">{promoError}</p>
            )}

            {/* Quick Promo Suggestions */}
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                onClick={() => setPromoInput("FIRST50")}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
              >
                FIRST50
              </button>
              <button
                onClick={() => setPromoInput("WELCOME20")}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
              >
                WELCOME20
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-success-green">
            <span>Discount</span>
            <span>-₹{discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-gray-600">
          <span>Delivery Fee</span>
          <span>₹{deliveryFee.toFixed(2)}</span>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-semibold text-gray-800">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="mb-6 p-3 bg-info-blue bg-opacity-10 border border-info-blue rounded-lg">
        <div className="flex items-center text-info-blue">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm font-medium">
            Estimated delivery: 30-45 minutes
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <Button onClick={onCheckout} fullWidth size="lg" className="mb-4">
        Proceed to Checkout
      </Button>

      {/* Additional Info */}
      <div className="text-xs text-gray-500 text-center space-y-1">
        <p>Free delivery on orders above ₹299</p>
        <p>All prices are inclusive of taxes</p>
      </div>
    </div>
  );
}
