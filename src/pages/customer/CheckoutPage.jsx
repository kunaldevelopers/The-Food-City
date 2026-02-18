
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button } from "../../components/shared/Layout.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { mockAPI } from "../../services/mockApi.js";
import { InlineLoader } from "../../components/shared/LoadingSpinner.jsx";
import { FaCreditCard, FaLock, FaCheckCircle } from "react-icons/fa";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    items,
    itemCount,
    subtotal,
    discount,
    deliveryFee,
    total,
    promoCode,
    deliveryAddress,
    paymentMethod,
    setDeliveryAddress,
    setPaymentMethod,
    clearCart,
    getOrderSummary,
  } = useCart();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [newAddress, setNewAddress] = useState({
    label: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    landmark: "",
  });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const isOrderPlaced = React.useRef(false);

  const loadUserAddresses = useCallback(async () => {
    if (user?.addresses) {
      setAddresses(user.addresses);
      const defaultAddress = user.addresses.find((addr) => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
        setDeliveryAddress(defaultAddress);
      }
    }
  }, [user?.addresses, setDeliveryAddress]);

  useEffect(() => {
    if (itemCount === 0 && !isOrderPlaced.current) {
      navigate("/cart");
      return;
    }
    loadUserAddresses();
  }, [itemCount, navigate, loadUserAddresses]);

  const handleAddressChange = (addressId) => {
    setSelectedAddressId(addressId);
    const selectedAddress = addresses.find((addr) => addr.id === addressId);
    if (selectedAddress) {
      setDeliveryAddress(selectedAddress);
    }
  };

  const handleAddNewAddress = () => {
    if (!newAddress.street || !newAddress.city || !newAddress.pinCode) {
      alert("Please fill in all required fields");
      return;
    }

    const address = {
      id: Date.now().toString(),
      userId: user.id,
      ...newAddress,
      isDefault: addresses.length === 0,
    };

    setAddresses([...addresses, address]);
    setSelectedAddressId(address.id);
    setDeliveryAddress(address);
    setShowAddressForm(false);
    setNewAddress({
      label: "",
      street: "",
      city: "",
      state: "",
      pinCode: "",
      landmark: "",
    });
  };

  const processOrder = async () => {
    setOrderLoading(true);
    try {
      const orderData = {
        userId: user.id,
        ...getOrderSummary(),
        deliveryAddress,
        paymentMethod,
      };

      const response = await mockAPI.placeOrder(orderData);

      if (response.success) {
        isOrderPlaced.current = true;
        clearCart();
        // Force a full page load to ensure order data is fresh
        window.location.href = `/orders/${response.data.id}`;
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setOrderLoading(false);
    }
  };

  const handlePlaceOrder = () => {
    if (!deliveryAddress) {
      alert("Please select a delivery address");
      return;
    }

    if (paymentMethod === "online") {
      setShowPaymentModal(true);
    } else {
      processOrder();
    }
  };

  const handleOnlinePayment = async () => {
    setPaymentProcessing(true);
    // Simulate payment gateway delay
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentSuccess(true);
      // Process order after brief success message
      setTimeout(() => {
        setShowPaymentModal(false);
        processOrder();
      }, 1500);
    }, 2000);
  };

  if (itemCount === 0) {
    return null; // Will redirect to cart
  }

  return (
    <Container className="py-4 md:py-8 relative">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-dark-red mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            {/* Delivery Address */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Delivery Address
              </h2>

              {addresses.length > 0 && !showAddressForm && (
                <div className="space-y-3">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`
                        p-4 rounded-lg border-2 cursor-pointer transition-colors
                        ${selectedAddressId === address.id
                          ? "border-dark-red bg-red-50"
                          : "border-gray-200 hover:border-gray-300"
                        }
                      `}
                      onClick={() => handleAddressChange(address.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-800">
                              {address.label}
                            </span>
                            {address.isDefault && (
                              <span className="bg-success-green text-white text-xs px-2 py-1 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm">
                            {address.street}, {address.city}, {address.state} -{" "}
                            {address.pinCode}
                          </p>
                          {address.landmark && (
                            <p className="text-gray-500 text-xs mt-1">
                              Near {address.landmark}
                            </p>
                          )}
                        </div>
                        <div
                          className={`
                            w-5 h-5 rounded-full border-2 flex items-center justify-center
                            ${selectedAddressId === address.id
                              ? "border-dark-red bg-dark-red"
                              : "border-gray-300"
                            }
                          `}
                        >
                          {selectedAddressId === address.id && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showAddressForm && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Address Label (Home, Office, etc.)"
                      value={newAddress.label}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, label: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-red focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={newAddress.state}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, state: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-red focus:border-transparent"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Street Address *"
                    value={newAddress.street}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, street: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-red focus:border-transparent"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="City *"
                      value={newAddress.city}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, city: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-red focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="PIN Code *"
                      value={newAddress.pinCode}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          pinCode: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-red focus:border-transparent"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Landmark (Optional)"
                    value={newAddress.landmark}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, landmark: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-red focus:border-transparent"
                  />
                  <div className="flex space-x-3">
                    <Button onClick={handleAddNewAddress}>Save Address</Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowAddressForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {!showAddressForm && (
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="mt-4 w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-dark-red hover:text-dark-red transition-colors"
                >
                  + Add New Address
                </button>
              )}
            </Card>

            {/* Payment Method */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Payment Method
              </h2>

              <div className="space-y-3">
                <div
                  className={`
                    p-4 rounded-lg border-2 cursor-pointer transition-colors
                    ${paymentMethod === "cod"
                      ? "border-dark-red bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                  onClick={() => setPaymentMethod("cod")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-success-green rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          Cash on Delivery
                        </p>
                        <p className="text-sm text-gray-600">
                          Pay when you receive your order
                        </p>
                      </div>
                    </div>
                    <div
                      className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center
                        ${paymentMethod === "cod"
                          ? "border-dark-red bg-dark-red"
                          : "border-gray-300"
                        }
                      `}
                    >
                      {paymentMethod === "cod" && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className={`
                    p-4 rounded-lg border-2 cursor-pointer transition-colors
                    ${paymentMethod === "online"
                      ? "border-dark-red bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                  onClick={() => setPaymentMethod("online")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-info-blue rounded-full flex items-center justify-center">
                        <FaCreditCard className="text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          Online Payment
                        </p>
                        <p className="text-sm text-gray-600">
                          Card, UPI, Wallets
                        </p>
                      </div>
                    </div>
                    <div
                      className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center
                        ${paymentMethod === "online"
                          ? "border-dark-red bg-dark-red"
                          : "border-gray-300"
                        }
                      `}
                    >
                      {paymentMethod === "online" && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-gray-800">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 py-4 border-t border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-success-green">
                    <span>Discount ({promoCode?.code})</span>
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

              {/* Place Order Button */}
              <Button
                onClick={handlePlaceOrder}
                disabled={!deliveryAddress || orderLoading}
                loading={orderLoading}
                fullWidth
                size="lg"
                className="mt-6"
              >
                {orderLoading
                  ? "Placing Order..."
                  : `Place Order • ₹${total.toFixed(2)}`}
              </Button>

              {/* Delivery Info */}
              <div className="mt-4 p-3 bg-info-blue bg-opacity-10 border border-info-blue rounded-lg">
                <div className="flex items-center text-info-blue text-sm">
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Estimated delivery: 30-45 minutes</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Simulation Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="w-full max-w-md p-6 mx-4 relative">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              disabled={paymentProcessing || paymentSuccess}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FaLock className="text-green-600" /> Secure Payment
            </h2>

            {paymentSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 text-3xl">
                  <FaCheckCircle />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Payment Successful!
                </h3>
                <p className="text-gray-600">Redirecting to order confirmation...</p>
              </div>
            ) : paymentProcessing ? (
              <div className="text-center py-8">
                <InlineLoader text="Processing secure payment..." />
                <p className="text-sm text-gray-500 mt-4">
                  Please do not close this window
                </p>
              </div>
            ) : (
              <div>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-600 mb-1">Amount to Pay</p>
                  <p className="text-2xl font-bold text-gray-800">
                    ₹{total.toFixed(2)}
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="border rounded-lg p-3 flex items-center gap-3 border-dark-red bg-red-50">
                    <FaCreditCard className="text-dark-red" />
                    <span className="font-medium text-gray-800">
                      Credit / Debit Card
                    </span>
                  </div>
                  <div className="border rounded-lg p-3 flex items-center gap-3 text-gray-400 cursor-not-allowed">
                    <span className="font-medium">UPI (Coming Soon)</span>
                  </div>
                  <div className="border rounded-lg p-3 flex items-center gap-3 text-gray-400 cursor-not-allowed">
                    <span className="font-medium">Wallets (Coming Soon)</span>
                  </div>
                </div>

                <Button
                  onClick={handleOnlinePayment}
                  fullWidth
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                >
                  Pay Now
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}
    </Container>
  );
}
