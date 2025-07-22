import React, { useState, useEffect } from "react";
import { Card } from "../../components/shared/Layout.jsx";
import { Link } from "react-router-dom";
import {
  FaShoppingBag,
  FaUtensils,
  FaUsers,
  FaRupeeSign,
  FaClock,
  FaTruck,
  FaStar,
  FaArrowUp,
  FaChartLine,
  FaEye,
} from "react-icons/fa";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalMenuItems: 0,
    pendingOrders: 0,
    deliveryInProgress: 0,
    avgRating: 0,
    todaysOrders: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [topItems, setTopItems] = useState([]);

  useEffect(() => {
    // Simulate loading dashboard data
    const loadDashboardData = () => {
      // Mock data - replace with actual API calls
      setStats({
        totalOrders: 1247,
        totalRevenue: 248500,
        totalCustomers: 856,
        totalMenuItems: 89,
        pendingOrders: 12,
        deliveryInProgress: 8,
        avgRating: 4.6,
        todaysOrders: 43,
      });

      setRecentOrders([
        {
          id: "ORD001",
          customerName: "John Doe",
          items: 3,
          total: 850,
          status: "preparing",
          time: "10 mins ago",
        },
        {
          id: "ORD002",
          customerName: "Jane Smith",
          items: 2,
          total: 650,
          status: "delivered",
          time: "25 mins ago",
        },
        {
          id: "ORD003",
          customerName: "Mike Johnson",
          items: 5,
          total: 1200,
          status: "delivery",
          time: "32 mins ago",
        },
      ]);

      setTopItems([
        { name: "Butter Chicken", orders: 45, revenue: 11250 },
        { name: "Pizza Margherita", orders: 38, revenue: 9500 },
        { name: "Biryani", orders: 32, revenue: 8000 },
        { name: "Paneer Tikka", orders: 28, revenue: 5600 },
      ]);
    };

    loadDashboardData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-100 text-yellow-800";
      case "delivery":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your restaurant.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalOrders}
              </p>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <FaArrowUp />
                +12% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaShoppingBag className="text-blue-600 text-xl" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(stats.totalRevenue)}
              </p>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <FaArrowUp />
                +18% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FaRupeeSign className="text-green-600 text-xl" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalCustomers}
              </p>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <FaArrowUp />
                +8% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FaUsers className="text-purple-600 text-xl" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Menu Items</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalMenuItems}
              </p>
              <p className="text-xs text-gray-500">Active items</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FaUtensils className="text-orange-600 text-xl" />
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <FaClock className="text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {stats.pendingOrders}
          </p>
          <p className="text-sm text-gray-600">Pending Orders</p>
        </Card>

        <Card className="p-4 text-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <FaTruck className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {stats.deliveryInProgress}
          </p>
          <p className="text-sm text-gray-600">Out for Delivery</p>
        </Card>

        <Card className="p-4 text-center">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <FaStar className="text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.avgRating}</p>
          <p className="text-sm text-gray-600">Average Rating</p>
        </Card>

        <Card className="p-4 text-center">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <FaChartLine className="text-red-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {stats.todaysOrders}
          </p>
          <p className="text-sm text-gray-600">Today's Orders</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Orders
            </h3>
            <Link
              to="/admin/orders"
              className="text-dark-red hover:text-hover-red text-sm font-medium flex items-center gap-1"
            >
              <FaEye />
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 bg-light-gray rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-800">#{order.id}</p>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{order.customerName}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{order.items} items</span>
                    <span>{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Selling Items */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Top Selling Items
            </h3>
            <Link
              to="/admin/reports"
              className="text-dark-red hover:text-hover-red text-sm font-medium flex items-center gap-1"
            >
              <FaChartLine />
              View Reports
            </Link>
          </div>
          <div className="space-y-3">
            {topItems.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-3 bg-light-gray rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-dark-red text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.orders} orders
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">
                    {formatCurrency(item.revenue)}
                  </p>
                  <p className="text-sm text-gray-600">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/orders"
            className="flex flex-col items-center p-4 bg-light-gray rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FaShoppingBag className="text-2xl text-dark-red mb-2" />
            <span className="text-sm font-medium">Manage Orders</span>
          </Link>
          <Link
            to="/admin/menu"
            className="flex flex-col items-center p-4 bg-light-gray rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FaUtensils className="text-2xl text-dark-red mb-2" />
            <span className="text-sm font-medium">Update Menu</span>
          </Link>
          <Link
            to="/admin/customers"
            className="flex flex-col items-center p-4 bg-light-gray rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FaUsers className="text-2xl text-dark-red mb-2" />
            <span className="text-sm font-medium">View Customers</span>
          </Link>
          <Link
            to="/admin/reports"
            className="flex flex-col items-center p-4 bg-light-gray rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FaChartLine className="text-2xl text-dark-red mb-2" />
            <span className="text-sm font-medium">View Reports</span>
          </Link>
        </div>
      </Card>
    </div>
  );
}
