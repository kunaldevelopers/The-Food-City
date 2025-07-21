import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Card, Button } from "../../components/shared/Layout.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import CartItem from "../../components/customer/CartItem.jsx";
import CartSummary from "../../components/customer/CartSummary.jsx";
import ConfirmDialog from "../../components/shared/ConfirmDialog.jsx";
import { FaShieldAlt, FaClock, FaStar } from "react-icons/fa";

export default function CartPage() {
  const { items, itemCount, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-dark-red mb-2">Your Cart</h1>
            <p className="text-gray-600">
              {itemCount} item{itemCount !== 1 ? "s" : ""} in your cart
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleClearCart}
            className="text-error-red border-error-red hover:bg-red-50"
          >
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-8 p-4 bg-light-gray rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Want to add more items?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Continue browsing our menu for more delicious options
                  </p>
                </div>
                <Link
                  to="/menu"
                  className="bg-dark-red text-white px-6 py-2 rounded-lg hover:bg-hover-red transition-colors font-medium whitespace-nowrap ml-4"
                >
                  Add More Items
                </Link>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <CartSummary onCheckout={handleProceedToCheckout} />
            </div>
          </div>
        </div>

        {/* Recommended Items */}
        <div className="mt-12">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              You might also like
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* This could be populated with recommended items */}
              <div className="bg-light-gray p-4 rounded-lg text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3"></div>
                <p className="text-gray-600 text-sm">
                  Recommended items will appear here
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg border border-red-100">
            <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center">
              <FaShieldAlt className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Safe & Secure</p>
              <p className="text-sm text-gray-600">100% secure payment</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg border border-red-100">
            <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center">
              <FaClock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Fast Delivery</p>
              <p className="text-sm text-gray-600">30-45 minutes</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg border border-red-100">
            <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center">
              <FaStar className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Quality Food</p>
              <p className="text-sm text-gray-600">Fresh ingredients</p>
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
