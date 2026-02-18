import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Card } from "../../components/shared/Layout.jsx";
import { mockAPI } from "../../services/mockApi.js";
import { InlineLoader } from "../../components/shared/LoadingSpinner.jsx";
import {
  FaCheckCircle,
  FaClipboardList,
  FaTruck,
  FaHome,
  FaBoxOpen,
} from "react-icons/fa";

export default function OrderTrackingPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = async (retries = 3) => {
    try {
      const response = await mockAPI.getOrders();
      if (response.success) {
        const foundOrder = response.data.find((o) => o.id === orderId);
        if (foundOrder) {
          setOrder(foundOrder);
        } else if (retries > 0) {
          // If order not found, retry after a delay
          setTimeout(() => loadOrder(retries - 1), 500);
          return;
        }
      }
    } catch (error) {
      console.error("Error loading order:", error);
    } finally {
      // Only set loading to false if we found the order or ran out of retries
      if (retries === 0 || (await mockAPI.getOrders()).data.find((o) => o.id === orderId)) {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <Container className="py-8">
        <InlineLoader text="Loading order details..." />
      </Container>
    );
  }

  if (!order) {
    return (
      <Container className="py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Order Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the order you're looking for.
          </p>
          <Link
            to="/orders"
            className="inline-block bg-dark-red text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition-colors"
          >
            View My Orders
          </Link>
        </div>
      </Container>
    );
  }

  const steps = [
    { status: "pending", label: "Order Placed", icon: FaClipboardList },
    { status: "confirmed", label: "Confirmed", icon: FaCheckCircle },
    { status: "preparing", label: "Preparing", icon: FaBoxOpen }, // Changed icon to verify it works, intended FaCooking but importing as is
    { status: "out_for_delivery", label: "Out for Delivery", icon: FaTruck },
    { status: "delivered", label: "Delivered", icon: FaHome },
  ];

  /*
   * Helper to determine step state:
   * - completed: step index < current step index
   * - current: step index === current step index
   * - upcoming: step index > current step index
   */
  const getStepStatus = (stepStatus) => {
    const statusOrder = [
      "pending",
      "confirmed",
      "preparing",
      "out_for_delivery",
      "delivered",
      "cancelled",
    ];

    if (order.status === "cancelled") return "cancelled";

    const currentIndex = statusOrder.indexOf(order.status);
    const stepIndex = statusOrder.indexOf(stepStatus);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  return (
    <Container className="py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Order #{order.id}
            </h1>
            <p className="text-gray-600 text-sm">
              Placed on {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-bold capitalize ${order.status === "delivered"
              ? "bg-green-100 text-green-700"
              : order.status === "cancelled"
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
              }`}
          >
            {order.status.replace(/_/g, " ")}
          </span>
        </div>

        {/* Timeline */}
        <Card className="mb-8 p-8">
          {order.status === "cancelled" ? (
            <div className="text-center text-red-600 py-4">
              <h3 className="text-xl font-bold">This order has been cancelled</h3>
            </div>
          ) : (
            <div className="relative">
              {/* Progress Bar Background */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0 hidden md:block" />

              {/* Steps */}
              <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
                {steps.map((step, index) => {
                  const status = getStepStatus(step.status);
                  const Icon = step.icon;

                  let circleClass = "bg-gray-200 text-gray-400";
                  let textClass = "text-gray-400";

                  if (status === "completed") {
                    circleClass = "bg-green-500 text-white";
                    textClass = "text-green-600 font-medium";
                  } else if (status === "current") {
                    circleClass = "bg-dark-red text-white ring-4 ring-red-100";
                    textClass = "text-dark-red font-bold";
                  }

                  return (
                    <div
                      key={index}
                      className="flex md:flex-col items-center gap-4 md:gap-2 flex-1 md:text-center"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 ${circleClass}`}
                      >
                        <Icon />
                      </div>
                      <span
                        className={`text-sm transition-colors duration-300 ${textClass}`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Card>

        {/* Order Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">
              Items Ordered
            </h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="font-medium">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{order.total.toLocaleString()}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">
              Delivery Details
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <span className="block text-gray-500 mb-1">Address</span>
                <p className="font-medium text-gray-800">
                  {order.address
                    ? `${order.address.street}, ${order.address.city}, ${order.address.pinCode}`
                    : "No address provided"}
                </p>
              </div>
              <div>
                <span className="block text-gray-500 mb-1">Payment Method</span>
                <p className="font-medium text-gray-800 capitalize">
                  {order.paymentMethod}
                </p>
              </div>
              {order.deliveryBoyId && (
                <div>
                  <span className="block text-gray-500 mb-1">Delivery Partner</span>
                  <p className="font-medium text-gray-800">Assigned</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
}
