import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "../../components/shared/Layout.jsx";
import {
  FaShoppingBag,
  FaRupeeSign,
  FaCalendarAlt,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaHistory,
  FaClock,
  FaUsers,
  FaUtensils,
  FaHourglassHalf,
  FaCheckCircle,
  FaStar,
  FaTrophy,
  FaEye,
  FaTruck,
} from "react-icons/fa";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [stats, setStats] = useState({
    todayOrders: 0,
    todayRevenue: 0,
    allTimeOrders: 0,
    allTimeRevenue: 0,
    selectedDayOrders: 0,
    selectedDayRevenue: 0,
    totalCustomers: 0,
    menuItems: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    averageRating: 0,
    totalDeliveryStaffs: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [topSellingItems, setTopSellingItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = React.useCallback(() => {
    setLoading(true);

    // Mock data - replace with actual API calls
    setTimeout(() => {
      const today = new Date().toISOString().split("T")[0];
      const isToday = selectedDate === today;

      setStats({
        todayOrders: 43,
        todayRevenue: 12850,
        allTimeOrders: 2847,
        allTimeRevenue: 485600,
        selectedDayOrders: isToday ? 43 : Math.floor(Math.random() * 60) + 10,
        selectedDayRevenue: isToday
          ? 12850
          : Math.floor(Math.random() * 20000) + 5000,
        totalCustomers: 856,
        menuItems: 124,
        pendingOrders: 12,
        deliveredOrders: 2835,
        averageRating: 4.6,
        totalDeliveryStaffs: 18,
      });

      // Mock recent orders
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
        {
          id: "ORD004",
          customerName: "Sarah Wilson",
          items: 1,
          total: 320,
          status: "pending",
          time: "45 mins ago",
        },
        {
          id: "ORD005",
          customerName: "David Brown",
          items: 4,
          total: 980,
          status: "delivered",
          time: "1 hour ago",
        },
      ]);

      // Mock top selling items
      setTopSellingItems([
        { name: "Butter Chicken", orders: 45, revenue: 11250, image: "🍛" },
        { name: "Pizza Margherita", orders: 38, revenue: 9500, image: "🍕" },
        { name: "Chicken Biryani", orders: 32, revenue: 8000, image: "🍚" },
        { name: "Paneer Tikka", orders: 28, revenue: 5600, image: "🧀" },
        { name: "Masala Dosa", orders: 25, revenue: 3750, image: "🥞" },
      ]);

      setLoading(false);
    }, 500);
  }, [selectedDate]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateString === today.toISOString().split("T")[0]) {
      return "Today";
    } else if (dateString === yesterday.toISOString().split("T")[0]) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-800";
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

  const StatCard = ({
    title,
    value,
    icon: IconComponent,
    color,
    subtext,
    trend,
  }) => (
    <Card className="p-6 hover:shadow-md transition-all duration-200 border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-lg ${color} flex-shrink-0`}>
              {IconComponent && (
                <IconComponent className="text-lg text-white" />
              )}
            </div>
            <p className="text-sm font-medium text-gray-600 leading-tight">
              {title}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900 leading-none">
              {value}
            </p>
            {subtext && (
              <p className="text-xs text-gray-500 leading-relaxed">{subtext}</p>
            )}
          </div>
          {trend && (
            <div
              className={`flex items-center mt-3 text-xs font-medium ${
                trend > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend > 0 ? (
                <FaArrowUp className="mr-1.5" />
              ) : (
                <FaArrowDown className="mr-1.5" />
              )}
              +{Math.abs(trend)}% this month
            </div>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Monitor your restaurant's orders and revenue
        </p>
      </div>

      {/* Date Selector */}
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-red-600 text-xl" />
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Select Date
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                View orders and revenue for any specific day
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <label
              htmlFor="date-picker"
              className="text-sm font-medium text-gray-700"
            >
              Choose Date:
            </label>
            <input
              id="date-picker"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
            />
            <span className="text-sm font-medium text-red-600">
              {formatDate(selectedDate)}
            </span>
          </div>
        </div>
      </Card>

      {/* Today's Stats */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FaClock className="text-red-600" />
          Today's Performance
        </h2>
        <div className="grid grid-cols-2 gap-3 md:gap-6">
          <StatCard
            title="Today's Orders"
            value={loading ? "..." : stats.todayOrders}
            icon={FaShoppingBag}
            color="bg-blue-500"
            subtext={`Orders received today (${new Date().toLocaleDateString(
              "en-IN"
            )})`}
          />
          <StatCard
            title="Today's Revenue"
            value={loading ? "..." : formatCurrency(stats.todayRevenue)}
            icon={FaRupeeSign}
            color="bg-green-500"
            subtext="Total earnings today"
          />
        </div>
      </div>

      {/* Selected Day Stats */}
      {selectedDate !== new Date().toISOString().split("T")[0] && (
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FaCalendarAlt className="text-red-600" />
            {formatDate(selectedDate)} Performance
          </h2>
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            <StatCard
              title={`${formatDate(selectedDate)} Orders`}
              value={loading ? "..." : stats.selectedDayOrders}
              icon={FaShoppingBag}
              color="bg-purple-500"
              subtext={`Orders on ${new Date(selectedDate).toLocaleDateString(
                "en-IN"
              )}`}
            />
            <StatCard
              title={`${formatDate(selectedDate)} Revenue`}
              value={loading ? "..." : formatCurrency(stats.selectedDayRevenue)}
              icon={FaRupeeSign}
              color="bg-orange-500"
              subtext="Total earnings for selected day"
            />
          </div>
        </div>
      )}

      {/* All Time Stats */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FaHistory className="text-red-600" />
          All Time Performance
        </h2>
        <div className="grid grid-cols-2 gap-3 md:gap-6">
          <StatCard
            title="Total Orders"
            value={
              loading ? "..." : stats.allTimeOrders.toLocaleString("en-IN")
            }
            icon={FaChartLine}
            color="bg-red-600"
            subtext="All orders since restaurant started"
          />
          <StatCard
            title="Total Revenue"
            value={loading ? "..." : formatCurrency(stats.allTimeRevenue)}
            icon={FaRupeeSign}
            color="bg-emerald-600"
            subtext="Total earnings since inception"
          />
        </div>
      </div>

      {/* Additional Business Metrics */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FaChartLine className="text-red-600" />
          Business Metrics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <StatCard
            title="Total Customers"
            value={
              loading ? "..." : stats.totalCustomers.toLocaleString("en-IN")
            }
            icon={FaUsers}
            color="bg-blue-600"
            subtext="Registered customers"
          />
          <StatCard
            title="Total Delivery Staffs"
            value={loading ? "..." : stats.totalDeliveryStaffs}
            icon={FaTruck}
            color="bg-indigo-600"
            subtext="Active delivery personnel"
          />
          <StatCard
            title="Menu Items"
            value={loading ? "..." : stats.menuItems}
            icon={FaUtensils}
            color="bg-orange-500"
            subtext="Available dishes"
          />
          <StatCard
            title="Pending Orders"
            value={loading ? "..." : stats.pendingOrders}
            icon={FaHourglassHalf}
            color="bg-yellow-500"
            subtext="Awaiting preparation"
          />
          <StatCard
            title="Delivered Orders"
            value={
              loading ? "..." : stats.deliveredOrders.toLocaleString("en-IN")
            }
            icon={FaCheckCircle}
            color="bg-green-600"
            subtext="Successfully completed"
          />
          <StatCard
            title="Average Rating"
            value={loading ? "..." : `${stats.averageRating}⭐`}
            icon={FaStar}
            color="bg-amber-500"
            subtext="Customer satisfaction"
            trend={5}
          />
        </div>
      </div>

      {/* Recent Orders and Top Selling Items */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Orders */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FaShoppingBag className="text-red-600" />
              Recent Orders
            </h3>
            <Link
              to="/admin/orders"
              className="text-red-600 hover:text-red-700 text-xs sm:text-sm font-medium flex items-center gap-1"
            >
              <FaEye />
              <span className="hidden sm:inline">View All</span>
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                    {order.customerName}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {order.items} items • ₹{order.total}
                  </p>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{order.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Selling Items */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FaTrophy className="text-red-600" />
              Top Selling Items
            </h3>
            <Link
              to="/admin/menu"
              className="text-red-600 hover:text-red-700 text-xs sm:text-sm font-medium flex items-center gap-1"
            >
              <FaEye />
              <span className="hidden sm:inline">View Menu</span>
            </Link>
          </div>
          <div className="space-y-3">
            {topSellingItems.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs sm:text-sm font-bold text-red-600">
                      #{index + 1}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                      <span className="text-base sm:text-lg">{item.image}</span>
                      <span className="truncate">{item.name}</span>
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {item.orders} orders
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <p className="font-medium text-gray-900 text-sm sm:text-base">
                    ₹{item.revenue.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-gray-500">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
