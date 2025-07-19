import React, { useState } from "react";
import { mockAPI } from "../../services/mockApi.js";

export default function PromoCodeInput({
  onApply,
  currentPromo,
  onRemove,
  orderValue,
}) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleApply = async () => {
    if (!code.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await mockAPI.validatePromoCode(code.trim(), orderValue);

      if (response.success) {
        onApply(response.data.promoCode, response.data.discount);
        setCode("");
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("Failed to apply promo code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    onRemove();
    setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleApply();
    }
  };

  if (currentPromo) {
    return (
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
            {currentPromo.code} applied
          </span>
        </div>
        <button
          onClick={handleRemove}
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
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyPress={handleKeyPress}
          placeholder="Enter promo code"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-red focus:border-transparent"
        />
        <button
          onClick={handleApply}
          disabled={!code.trim() || loading}
          className="px-4 py-2 bg-dark-red text-white rounded-lg hover:bg-hover-red transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Applying..." : "Apply"}
        </button>
      </div>

      {error && <p className="text-sm text-error-red">{error}</p>}

      {/* Quick Promo Suggestions */}
      <div className="flex flex-wrap gap-2 mt-2">
        <button
          onClick={() => setCode("FIRST50")}
          className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
        >
          FIRST50
        </button>
        <button
          onClick={() => setCode("WELCOME20")}
          className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
        >
          WELCOME20
        </button>
      </div>
    </div>
  );
}
