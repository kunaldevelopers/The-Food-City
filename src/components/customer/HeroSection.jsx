import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function HeroSection() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="relative bg-gradient-to-r from-dark-red to-deep-red text-white rounded-lg overflow-hidden mb-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full border-2 border-white"></div>
          <div className="absolute top-20 right-20 w-16 h-16 rounded-full border-2 border-white"></div>
          <div className="absolute bottom-10 left-1/4 w-12 h-12 rounded-full border-2 border-white"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full border-2 border-white"></div>
        </div>
      </div>

      <div className="relative z-10 px-6 py-12 md:px-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Welcome Message */}
          <div className="mb-6">
            {isAuthenticated ? (
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Welcome back, {user?.name?.split(" ")[0]}! 👋
              </h1>
            ) : (
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Delicious Food, Delivered Fast! 🍽️
              </h1>
            )}

            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Discover amazing flavors from Indian, Chinese, South Indian, and
              Tandoor cuisines. Fresh ingredients, authentic recipes, delivered
              to your doorstep.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-golden-yellow">
                50+
              </div>
              <div className="text-sm opacity-80">Menu Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-golden-yellow">
                4.5★
              </div>
              <div className="text-sm opacity-80">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-golden-yellow">
                30min
              </div>
              <div className="text-sm opacity-80">Avg Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-golden-yellow">
                1000+
              </div>
              <div className="text-sm opacity-80">Happy Customers</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/menu"
              className="bg-white text-dark-red px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              <span>Browse Menu</span>
              <svg
                className="w-5 h-5 ml-2"
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
            </Link>

            <Link
              to="/deals"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-dark-red transition-colors inline-flex items-center"
            >
              <span>View Offers</span>
              <svg
                className="w-5 h-5 ml-2"
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
            </Link>
          </div>

          {/* Quick Info */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm opacity-80">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Open 11 AM - 11 PM
            </div>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +91 98765 43210
            </div>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Mumbai & Delhi
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
