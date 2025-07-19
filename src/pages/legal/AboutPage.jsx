import React from "react";
import { Container, Card } from "../../components/shared/Layout.jsx";

export default function AboutPage() {
  return (
    <Container className="py-8">
      <Card>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-dark-red mb-6 text-center">
            About The Food City
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Welcome to The Food City, your premier destination for delicious
              food delivered right to your doorstep. We are passionate about
              bringing you the finest culinary experiences from around the
              world.
            </p>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-6">
              To connect food lovers with their favorite restaurants and
              cuisines, making quality food accessible and convenient for
              everyone. We believe that great food brings people together and
              creates memorable experiences.
            </p>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              What We Offer
            </h2>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>
                Wide variety of cuisines: Indian, Chinese, South Indian, and
                Tandoor specialties
              </li>
              <li>
                Fresh, high-quality ingredients sourced from trusted suppliers
              </li>
              <li>Fast and reliable delivery service</li>
              <li>User-friendly online ordering platform</li>
              <li>Competitive prices and regular deals</li>
              <li>Excellent customer service</li>
            </ul>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              Our Story
            </h2>
            <p className="text-gray-600 mb-6">
              Founded in 2024, The Food City started as a small initiative to
              bring restaurant-quality food to homes across the city. What began
              as a simple idea has grown into a comprehensive food delivery
              platform serving thousands of satisfied customers.
            </p>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-light-gray p-4 rounded-lg">
                <h3 className="font-semibold text-dark-red mb-2">
                  Quality Assurance
                </h3>
                <p className="text-gray-600 text-sm">
                  Every dish is prepared with care and attention to quality
                  standards.
                </p>
              </div>
              <div className="bg-light-gray p-4 rounded-lg">
                <h3 className="font-semibold text-dark-red mb-2">
                  Fast Delivery
                </h3>
                <p className="text-gray-600 text-sm">
                  Quick and reliable delivery to ensure your food arrives fresh
                  and hot.
                </p>
              </div>
              <div className="bg-light-gray p-4 rounded-lg">
                <h3 className="font-semibold text-dark-red mb-2">
                  Customer Support
                </h3>
                <p className="text-gray-600 text-sm">
                  Dedicated customer service team ready to help with any
                  queries.
                </p>
              </div>
              <div className="bg-light-gray p-4 rounded-lg">
                <h3 className="font-semibold text-dark-red mb-2">
                  Secure Payments
                </h3>
                <p className="text-gray-600 text-sm">
                  Safe and secure payment options for your peace of mind.
                </p>
              </div>
            </div>

            <div className="text-center bg-dark-red text-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Ready to Order?</h3>
              <p className="mb-4">
                Experience the best food delivery service in the city!
              </p>
              <a
                href="/menu"
                className="inline-block bg-white text-dark-red px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Browse Menu
              </a>
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
}
