import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Card, Button } from "../../components/shared/Layout.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import CartItem from "../../components/customer/CartItem.jsx";
import CartSummary from "../../components/customer/CartSummary.jsx";
import FoodCard from "../../components/customer/FoodCard.jsx";
import ConfirmDialog from "../../components/shared/ConfirmDialog.jsx";
import { mockAPI } from "../../services/mockApi.js";
import { FaShieldAlt, FaClock, FaStar } from "react-icons/fa";

export default function CartPage() {
  const { items, itemCount, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [trendingItems, setTrendingItems] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);

  // Scrolling states for trending items
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Fetch trending items (top rated items with high review count)
  useEffect(() => {
    const fetchTrendingItems = async () => {
      try {
        const response = await mockAPI.getMenuItems();
        if (response.success) {
          // Filter out items already in cart and get trending items
          const cartItemIds = items.map((item) => item.id);
          const trending = response.data
            .filter((item) => !cartItemIds.includes(item.id)) // Exclude items already in cart
            .sort((a, b) => {
              // Sort by rating * reviewCount to get truly trending items
              const scoreA = a.rating * a.reviewCount;
              const scoreB = b.rating * b.reviewCount;
              return scoreB - scoreA;
            })
            .slice(0, 6); // Get top 6 trending items

          setTrendingItems(trending);
        }
      } catch (error) {
        console.error("Error fetching trending items:", error);
      } finally {
        setLoadingTrending(false);
      }
    };

    fetchTrendingItems();
  }, [items]); // Re-fetch when cart items change

  // Scroll function for trending items
  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const isMobile = window.innerWidth < 640; // sm breakpoint
      const cardWidth = isMobile
        ? container.clientWidth
        : container.children[0]?.offsetWidth || 320;
      const gap = 16; // 1rem gap
      const scrollAmount = isMobile ? cardWidth : cardWidth + gap;

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
            Math.min(prev + 1, trendingItems.length - 1)
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
          setCurrentIndex(trendingItems.length - 1);
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

  // Auto-slide functionality for trending items
  useEffect(() => {
    if (!isAutoPlaying || trendingItems.length === 0) return;

    const interval = setInterval(() => {
      const container = scrollRef.current;
      if (container) {
        const isMobile = window.innerWidth < 640; // sm breakpoint
        const cardWidth = isMobile
          ? container.clientWidth
          : container.children[0]?.offsetWidth || 320;
        const gap = 16; // 1rem gap
        const scrollAmount = isMobile ? cardWidth : cardWidth + gap;
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
            Math.min(prev + 1, trendingItems.length - 1)
          );
        }
      }
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, trendingItems.length]);

  // Pause auto-slide on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Touch/swipe support for mobile
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

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      // You could show auth modal here or redirect to login
      alert("Please login to proceed to checkout");
      return;
    }
    navigate("/checkout");
  };

  const handleClearCart = () => {
    setShowClearConfirm(true);
  };

  const confirmClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  if (itemCount === 0) {
    return (
      <Container className="py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5M7 13l-1.1 5m0 0h9.2M16 18a2 2 0 11-4 0 2 2 0 014 0zM9 18a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet. Start
            exploring our delicious menu!
          </p>
          <div className="space-y-4">
            <Link
              to="/menu"
              className="inline-block bg-dark-red text-white px-8 py-3 rounded-lg hover:bg-hover-red transition-colors font-medium"
            >
              Browse Menu
            </Link>
            <div className="text-sm text-gray-500">
              <Link to="/deals" className="text-dark-red hover:underline">
                Check out our deals
              </Link>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4 md:py-8">
      <div className="max-w-6xl mx-auto px-2 md:px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-dark-red mb-1 md:mb-2">
              Your Cart
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              {itemCount} item{itemCount !== 1 ? "s" : ""} in your cart
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleClearCart}
            className="text-error-red border-error-red hover:bg-red-50 text-sm md:text-base px-3 md:px-4 py-2 self-start sm:self-auto"
          >
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-3 md:space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-6 md:mt-8 p-3 md:p-4 bg-light-gray rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">
                    Want to add more items?
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm">
                    Continue browsing our menu for more delicious options
                  </p>
                </div>
                <Link
                  to="/menu"
                  className="bg-dark-red text-white px-4 md:px-6 py-2 rounded-lg hover:bg-hover-red transition-colors font-medium text-sm md:text-base text-center sm:whitespace-nowrap"
                >
                  Add More Items
                </Link>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1 order-first lg:order-last">
            <div className="lg:sticky lg:top-4">
              <CartSummary onCheckout={handleProceedToCheckout} />
            </div>
          </div>
        </div>

        {/* Recommended Items */}
        <div className="mt-8 md:mt-12">
          <Card className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                You might also like
              </h3>
              {trendingItems.length > 0 && (
                <Link
                  to="/menu"
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

            {loadingTrending ? (
              <div className="flex gap-4 overflow-hidden">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-80 bg-light-gray p-4 rounded-lg animate-pulse"
                  >
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                ))}
              </div>
            ) : trendingItems.length > 0 ? (
              <div className="relative group">
                {/* Scroll Buttons */}
                <button
                  onClick={() => {
                    setIsAutoPlaying(false);
                    scroll("left");
                    setTimeout(() => setIsAutoPlaying(true), 2000);
                  }}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 rounded-full bg-dark-red text-white shadow-lg hover:shadow-xl hover:bg-hover-red flex items-center justify-center transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 translate-x-0 md:-translate-x-2 hover:translate-x-0"
                  style={{ marginLeft: "0.25rem" }}
                  aria-label="Previous item"
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
                  aria-label="Next item"
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
                  className="flex gap-4 sm:gap-4 overflow-x-auto scrollbar-hide pb-2"
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
                  {trendingItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex-shrink-0 w-full sm:w-80 md:w-80 lg:w-80 px-1 sm:px-0"
                    >
                      <FoodCard item={item} />
                    </div>
                  ))}
                </div>

                {/* Mobile indicators */}
                <div className="flex justify-center mt-4 md:hidden">
                  <div className="flex space-x-1">
                    {trendingItems.slice(0, 5).map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentIndex % 5
                            ? "bg-dark-red"
                            : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-light-gray p-4 rounded-lg text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3"></div>
                <p className="text-gray-600 text-sm">
                  No recommendations available
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
          <div className="flex items-center space-x-2 md:space-x-3 p-3 md:p-4 bg-red-50 rounded-lg border border-red-100">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-red-900 rounded-full flex items-center justify-center flex-shrink-0">
              <FaShieldAlt className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-800 text-sm md:text-base">
                Safe & Secure
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                100% secure payment
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-3 p-3 md:p-4 bg-red-50 rounded-lg border border-red-100">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-red-900 rounded-full flex items-center justify-center flex-shrink-0">
              <FaClock className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-800 text-sm md:text-base">
                Fast Delivery
              </p>
              <p className="text-xs md:text-sm text-gray-600">30-45 minutes</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-3 p-3 md:p-4 bg-red-50 rounded-lg border border-red-100">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-red-900 rounded-full flex items-center justify-center flex-shrink-0">
              <FaStar className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-800 text-sm md:text-base">
                Quality Food
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                Fresh ingredients
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Clear Cart Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={confirmClearCart}
        title="Clear Cart"
        message="Are you sure you want to remove all items from your cart? This action cannot be undone."
        confirmText="Clear Cart"
        cancelText="Keep Items"
        type="danger"
      />
    </Container>
  );
}
