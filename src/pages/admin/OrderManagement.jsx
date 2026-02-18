import React, { useState, useEffect } from "react";
import { Container, Card } from "../../components/shared/Layout.jsx";
import ConfirmDialog from "../../components/shared/ConfirmDialog.jsx";
import { useToast } from "../../components/shared/Toast.jsx";
import {
  FaSearch,
  FaFilter,
  FaClock,
  FaCheck,
  FaTruck,
  FaEye,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Professional confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
    type: "warning",
  });

  // Toast notifications
  const { addToast } = useToast();

  // Mock orders data
  useEffect(() => {
    const mockOrders = [
      {
        id: "ORD001",
        customerName: "Rahul Sharma",
        customerPhone: "+91-9876543210",
        items: [
          { name: "Butter Chicken", quantity: 2, price: 250 },
          { name: "Naan", quantity: 3, price: 60 },
        ],
        total: 680,
        status: "pending",
        orderTime: "2025-01-22T14:30:00",
        address: "123 MG Road, Bangalore",
        paymentMethod: "Online",
      },
      {
        id: "ORD002",
        customerName: "Priya Patel",
        customerPhone: "+91-9876543211",
        items: [
          { name: "Pizza Margherita", quantity: 1, price: 299 },
          { name: "Garlic Bread", quantity: 2, price: 120 },
        ],
        total: 539,
        status: "preparing",
        orderTime: "2025-01-22T14:15:00",
        address: "456 Brigade Road, Bangalore",
        paymentMethod: "Cash on Delivery",
      },
      {
        id: "ORD003",
        customerName: "Amit Kumar",
        customerPhone: "+91-9876543212",
        items: [
          { name: "Chicken Biryani", quantity: 1, price: 320 },
          { name: "Raita", quantity: 1, price: 80 },
        ],
        total: 400,
        status: "delivery",
        orderTime: "2025-01-22T13:45:00",
        address: "789 Koramangala, Bangalore",
        paymentMethod: "UPI",
      },
      {
        id: "ORD004",
        customerName: "Sneha Reddy",
        customerPhone: "+91-9876543213",
        items: [
          { name: "Paneer Tikka", quantity: 1, price: 220 },
          { name: "Dal Tadka", quantity: 1, price: 180 },
          { name: "Rice", quantity: 2, price: 120 },
        ],
        total: 520,
        status: "delivered",
        orderTime: "2025-01-22T12:30:00",
        address: "321 Whitefield, Bangalore",
        paymentMethod: "Credit Card",
      },
    ];

    setTimeout(() => {
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setLoading(false);
    }, 500);
  }, []);

  // Filter orders based on search and status
  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerPhone.includes(searchTerm)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, orders]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "preparing":
        return "bg-orange-100 text-orange-800";
      case "delivery":
        return "bg-red-100 text-red-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FaClock className="mr-1" />;
      case "preparing":
        return <FaClock className="mr-1" />;
      case "delivery":
        return <FaTruck className="mr-1" />;
      case "delivered":
        return <FaCheck className="mr-1" />;
      default:
        return <FaClock className="mr-1" />;
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleStatusUpdate = (orderId, newStatus, customerName) => {
    let dialogConfig = {};

    switch (newStatus) {
      case "preparing":
        dialogConfig = {
          title: "Mark Order as Preparing",
          message: `Are you sure you want to mark order ${orderId} (${customerName}) as "Preparing"?\n\nThis will indicate that the kitchen has started preparing the order.`,
          type: "info",
        };
        break;
      case "delivery":
        dialogConfig = {
          title: "Send Order for Delivery",
          message: `Are you sure you want to mark order ${orderId} (${customerName}) as "Out for Delivery"?\n\nThis will indicate that the order is ready and has been dispatched for delivery.`,
          type: "warning",
        };
        break;
      case "delivered":
        dialogConfig = {
          title: "Mark Order as Delivered",
          message: `Are you sure you want to mark order ${orderId} (${customerName}) as "Delivered"?\n\nThis action will complete the order and cannot be undone.`,
          type: "danger",
        };
        break;
      default:
        dialogConfig = {
          title: "Update Order Status",
          message: `Are you sure you want to update the status of order ${orderId}?`,
          type: "warning",
        };
    }

    setConfirmDialog({
      isOpen: true,
      ...dialogConfig,
      onConfirm: () => {
        updateOrderStatus(orderId, newStatus);

        // Show success toast
        const successMessages = {
          preparing: "Order marked as preparing successfully!",
          delivery: "Order sent for delivery successfully!",
          delivered: "Order marked as delivered successfully!",
        };

        addToast(
          successMessages[newStatus] || "Order status updated successfully!",
          "success",
          4000
        );
      },
    });
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <Container className="py-6">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Order Management
          </h1>
          <p className="text-gray-600">Manage and track all customer orders</p>
        </div>

        {/* Search and Filters */}
        <Card className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Order ID, Customer Name, or Phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {loading ? (
            <Card className="p-6 text-center">
              <p className="text-gray-600">Loading orders...</p>
            </Card>
          ) : filteredOrders.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-gray-600">No orders found</p>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="p-4 sm:p-6">
                <div className="space-y-4">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {order.id}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatTime(order.orderTime)}
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Customer Details
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p className="flex items-center gap-2">
                          <FaEye className="text-gray-400" />
                          {order.customerName}
                        </p>
                        <p className="flex items-center gap-2">
                          <FaPhoneAlt className="text-gray-400" />
                          {order.customerPhone}
                        </p>
                        <p className="flex items-start gap-2">
                          <FaMapMarkerAlt className="text-gray-400 mt-0.5" />
                          <span>{order.address}</span>
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Order Items
                      </h4>
                      <div className="space-y-1 text-sm">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center"
                          >
                            <span>
                              {item.name} x{item.quantity}
                            </span>
                            <span>₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                        <div className="border-t pt-1 mt-2 font-medium">
                          <div className="flex justify-between">
                            <span>Total Amount</span>
                            <span>₹{order.total}</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>Payment</span>
                            <span>{order.paymentMethod}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {order.status !== "delivered" && (
                    <div className="flex flex-wrap gap-2 pt-3 border-t">
                      {order.status !== "preparing" && (
                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              order.id,
                              "preparing",
                              order.customerName
                            )
                          }
                          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm flex items-center gap-1"
                        >
                          <FaClock />
                          Mark as Preparing
                        </button>
                      )}
                      {order.status !== "delivery" && (
                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              order.id,
                              "delivery",
                              order.customerName
                            )
                          }
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm flex items-center gap-1"
                        >
                          <FaTruck />
                          Out for Delivery
                        </button>
                      )}
                      <button
                        onClick={() =>
                          handleStatusUpdate(
                            order.id,
                            "delivered",
                            order.customerName
                          )
                        }
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center gap-1"
                      >
                        <FaCheck />
                        Mark as Delivered
                      </button>
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Professional Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        type={confirmDialog.type}
        confirmText="Yes, Update Status"
        cancelText="Cancel"
      />
    </Container>
  );
}
