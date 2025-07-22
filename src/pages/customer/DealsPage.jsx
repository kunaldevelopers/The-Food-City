import React, { useState, useEffect } from "react";
import { Container, Grid, Card } from "../../components/shared/Layout.jsx";
import { mockAPI } from "../../services/mockApi.js";
import { InlineLoader } from "../../components/shared/LoadingSpinner.jsx";
import { FaFire, FaGift, FaPercent } from "react-icons/fa";

export default function DealsPage() {
  const [promoCodes, setPromoCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedCode, setCopiedCode] = useState("");

  useEffect(() => {
    loadPromoCodes();
  }, []);

  const loadPromoCodes = async () => {
    try {
      setLoading(true);
      const response = await mockAPI.getPromoCodes();
      if (response.success) {
        setPromoCodes(response.data);
      } else {
        setError("Failed to load promotional offers");
      }
    } catch (err) {
      setError("Something went wrong while loading offers");
      console.error("Error loading promo codes:", err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(""), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err?.message || String(err));
    }
  };

  const formatExpiryDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getDaysUntilExpiry = (date) => {
    const today = new Date();
    const expiry = new Date(date);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <Container className="py-8">
        <InlineLoader text="Loading amazing deals..." />
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
              onClick={loadPromoCodes}
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
    <Container className="py-3 md:py-8">
      {/* Header - Mobile Optimized */}
      <div className="text-center mb-6 md:mb-8 px-2">
        <h1 className="text-2xl md:text-4xl font-bold text-dark-red mb-3 md:mb-4 flex items-center justify-center gap-2 md:gap-3">
          <FaPercent className="text-dark-red text-xl md:text-3xl" />
          <span className="leading-tight">Special Deals & Offers</span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Save big on your favorite meals! Use these exclusive promo codes and
          enjoy amazing discounts on your orders.
        </p>
      </div>

      {/* Featured Banner - Mobile Enhanced */}
      <div className="mb-6 md:mb-8">
        <div className="bg-gradient-to-r from-dark-red to-deep-red text-white rounded-xl p-4 md:p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-4 -right-4 w-16 md:w-32 h-16 md:h-32 rounded-full border-2 md:border-4 border-white"></div>
            <div className="absolute -bottom-4 -left-4 w-12 md:w-24 h-12 md:h-24 rounded-full border-2 md:border-4 border-white"></div>
          </div>
          <div className="relative z-10 text-center">
            <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 flex items-center justify-center gap-2 md:gap-3">
              <FaFire className="text-golden-yellow text-lg md:text-2xl" />
              <span className="leading-tight">Limited Time Offers!</span>
            </h2>
            <p className="text-lg md:text-xl mb-4 md:mb-6">
              Get up to 50% OFF on your first order
            </p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              <div className="bg-white bg-opacity-20 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-base">
                <span className="font-semibold">Free Delivery</span>
              </div>
              <div className="bg-white bg-opacity-20 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-base">
                <span className="font-semibold">Quick Service</span>
              </div>
              <div className="bg-white bg-opacity-20 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-base">
                <span className="font-semibold">Fresh Food</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Codes Grid */}
      {promoCodes.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaGift className="text-4xl text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No active offers right now
          </h3>
          <p className="text-gray-600">
            Check back soon for amazing deals and discounts!
          </p>
        </div>
      ) : (
        <Grid
          cols={1}
          gap={4}
          className="md:grid-cols-2 lg:grid-cols-3 md:gap-6"
        >
          {promoCodes.map((promo) => {
            const daysLeft = getDaysUntilExpiry(promo.expiryDate);
            const isExpiringSoon = daysLeft <= 7;
            const isExpired = daysLeft < 0;

            return (
              <Card
                key={promo.id}
                className="relative overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Mobile-Optimized Badges */}
                <div className="absolute top-3 right-3 z-20">
                  <div className="bg-success-green text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold shadow-lg">
                    {promo.discountType === "percentage"
                      ? `${promo.discountValue}% OFF`
                      : `₹${promo.discountValue} OFF`}
                  </div>
                </div>

                {/* Expiry Warning - Mobile Optimized */}
                {isExpiringSoon && !isExpired && (
                  <div className="absolute top-3 left-3 z-20">
                    <div className="bg-warm-yellow text-black px-2 py-1 rounded-full text-xs font-medium shadow-lg animate-pulse">
                      {daysLeft === 0
                        ? "Expires Today!"
                        : `${daysLeft} days left`}
                    </div>
                  </div>
                )}

                {isExpired && (
                  <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-10">
                    <div className="bg-error-red text-white px-4 py-2 rounded-lg font-bold">
                      EXPIRED
                    </div>
                  </div>
                )}

                <div className="p-4 md:p-6">
                  {/* Promo Code */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Promo Code
                      </span>
                      <button
                        onClick={() => copyToClipboard(promo.code)}
                        className="text-dark-red hover:text-hover-red transition-colors"
                        disabled={isExpired}
                      >
                        {copiedCode === promo.code ? (
                          <span className="text-success-green text-sm">
                            Copied!
                          </span>
                        ) : (
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
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-2.5 md:p-3 text-center hover:border-dark-red transition-colors">
                      <span className="text-lg md:text-2xl font-bold text-dark-red font-mono select-all">
                        {promo.code}
                      </span>
                    </div>
                  </div>

                  {/* Description - Mobile Optimized */}
                  <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 leading-tight">
                    {promo.description}
                  </h3>

                  {/* Terms - Mobile Compact */}
                  <div className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
                    <div className="flex items-center text-xs md:text-sm text-gray-600">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2 flex-shrink-0"
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
                      <span>Min order: ₹{promo.minOrderValue}</span>
                    </div>

                    {promo.maxDiscount && (
                      <div className="flex items-center text-xs md:text-sm text-gray-600">
                        <svg
                          className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                        <span>Max discount: ₹{promo.maxDiscount}</span>
                      </div>
                    )}

                    <div className="flex items-center text-xs md:text-sm text-gray-600">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10a2 2 0 002 2h4a2 2 0 002-2V11m-6 0h8m-8 0V7a2 2 0 012-2h4a2 2 0 012 2v4"
                        />
                      </svg>
                      <span>
                        Valid until: {formatExpiryDate(promo.expiryDate)}
                      </span>
                    </div>
                  </div>

                  {/* Usage Stats - Mobile Enhanced */}
                  <div className="mb-3 md:mb-4">
                    <div className="flex justify-between text-xs md:text-sm text-gray-600 mb-1.5">
                      <span>Usage Progress</span>
                      <span className="font-medium">
                        {promo.usedCount} / {promo.usageLimit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
                      <div
                        className="bg-gradient-to-r from-dark-red to-hover-red h-1.5 md:h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            (promo.usedCount / promo.usageLimit) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Button - Mobile Enhanced */}
                  <button
                    onClick={() => copyToClipboard(promo.code)}
                    disabled={isExpired}
                    className={`
                      w-full py-2.5 md:py-3 px-4 rounded-lg font-semibold transition-all duration-200 text-sm md:text-base
                      ${
                        isExpired
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-dark-red to-hover-red text-white hover:shadow-lg transform"
                      }
                    `}
                  >
                    {isExpired
                      ? "Expired"
                      : copiedCode === promo.code
                      ? "Copied! ✓"
                      : "Copy Code"}
                  </button>
                </div>
              </Card>
            );
          })}
        </Grid>
      )}

      {/* How to Use Section - Mobile Optimized */}
      <div className="mt-8 md:mt-12">
        <Card className="p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-dark-red mb-4 md:mb-6 text-center">
            How to Use Promo Codes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-dark-red to-hover-red rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg">
                <span className="text-white text-lg md:text-2xl font-bold">
                  1
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
                Copy Code
              </h3>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                Click on any promo code above to copy it to your clipboard
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-dark-red to-hover-red rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg">
                <span className="text-white text-lg md:text-2xl font-bold">
                  2
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
                Add to Cart
              </h3>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                Add your favorite items to cart and proceed to checkout
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-dark-red to-hover-red rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg">
                <span className="text-white text-lg md:text-2xl font-bold">
                  3
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
                Apply & Save
              </h3>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                Paste the code at checkout and enjoy your discount!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
}
