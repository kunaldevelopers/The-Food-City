import React from "react";
import { Link } from "react-router-dom";

export default function PromoBanner() {
  const promos = [
    {
      id: 1,
      title: "50% OFF",
      subtitle: "On Your First Order",
      description: "Use code FIRST50 and save big on your first order",
      code: "FIRST50",
      bgColor: "bg-gradient-to-r from-dark-red to-hover-red",
      textColor: "text-white",
      buttonColor: "bg-white text-dark-red hover:bg-gray-100",
    },
    {
      id: 2,
      title: "Free Delivery",
      subtitle: "On Orders Above ₹299",
      description: "No delivery charges for orders above ₹299",
      bgColor: "bg-gradient-to-r from-success-green to-leafy-green",
      textColor: "text-white",
      buttonColor: "bg-white text-success-green hover:bg-gray-100",
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
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-dark-red mb-4">Special Offers</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promos.map((promo) => (
          <div
            key={promo.id}
            className={`
              ${promo.bgColor} ${promo.textColor}
              rounded-lg p-6 relative overflow-hidden
              hover:scale-105 transition-transform duration-300
              cursor-pointer
            `}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-2 border-current"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full border-2 border-current"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="mb-2">
                <h3 className="text-2xl font-bold mb-1">{promo.title}</h3>
                <p className="text-lg font-medium opacity-90">
                  {promo.subtitle}
                </p>
              </div>

              <p className="text-sm opacity-80 mb-4">{promo.description}</p>

              {promo.code && (
                <div className="mb-4">
                  <div className="inline-block bg-black bg-opacity-20 px-3 py-1 rounded-full">
                    <span className="text-sm font-mono font-bold">
                      {promo.code}
                    </span>
                  </div>
                </div>
              )}

              <Link
                to="/deals"
                className={`
                  inline-block px-4 py-2 rounded-lg font-medium transition-colors
                  ${promo.buttonColor}
                `}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
