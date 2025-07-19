import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Card } from "../../components/shared/Layout.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { mockAPI } from "../../services/mockApi.js";
import { InlineLoader } from "../../components/shared/LoadingSpinner.jsx";

export default function OrderHistoryPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOrders();
  }, [user]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await mockAPI.getOrders(user.id);
      if (response.success) {
        setOrders(response.data);
      } else {
        setError("Failed to load order history");
      }
    } catch (err) {
      setError("Something went wrong while loading orders");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-success-green text-white";
      case "cancelled":
        return "bg-error-red text-white";
      case "pending":
        return "bg-warm-yellow text-black";
      default:
        return "bg-info-blue text-white";
    }
  };

  if (loading) {
    return (
      <Container className="py-8">
        <InlineLoader text="Loading your orders..." />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-8">
        <div className="text-center">
          <div className="bg-error-red text-white p-4 rounded-lg max-w-md mx-auto">
            <h3 className="font-semibold mb-2">Error Loading Orders</h3>
            <p className="text-sm">{error}</p>
            <button
              onClick={loadOrders}
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
    <Container className="py-4 md:py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-dark-red mb-8">Order History</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No orders yet
            </h2>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet. Start exploring our delicious
              menu!
            </p>
            <Link
              to="/menu"
              className="bg-dark-red text-white px-6 py-3 rounded-lg hover:bg-hover-red transition-colors inline-block"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card
                key={order.id}
                className="hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Order #{order.id}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 md:mt-0">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                    <span className="text-lg font-bold text-dark-red">
                      ₹{order.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      Items Ordered
                    </h4>
                    <div className="space-y-2">
                      {order.items.slice(0, 3).map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-600">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="text-gray-800">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <p className="text-sm text-gray-500">
                          +{order.items.length - 3} more items
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      Delivery Details
                    </h4>
                    <p className="text-sm text-gray-600">
                      {order.deliveryAddress.street},{" "}
                      {order.deliveryAddress.city}
                    </p>
                    <p className="text-sm text-gray-600">
                      Payment:{" "}
                      {order.paymentMethod === "cod"
                        ? "Cash on Delivery"
                        : "Online"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-gray-200">
                  <Link
                    to={`/orders/${order.id}`}
                    className="bg-dark-red text-white px-4 py-2 rounded-lg hover:bg-hover-red transition-colors text-center"
                  >
                    View Details
                  </Link>

                  {order.status === "delivered" && (
                    <button className="border border-dark-red text-dark-red px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">
                      Rate Order
                    </button>
                  )}

                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    Reorder
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
