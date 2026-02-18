import React, { useState, useEffect } from "react";
import { Container, Card, Grid } from "../../components/shared/Layout.jsx";
import { mockAPI } from "../../services/mockApi.js";
import { InlineLoader } from "../../components/shared/LoadingSpinner.jsx";
import {
  FaChartLine,
  FaShoppingCart,
  FaUsers,
  FaRupeeSign,
} from "react-icons/fa";

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const response = await mockAPI.getAnalytics();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error("Error loading analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-8">
        <InlineLoader text="Loading reports..." />
      </Container>
    );
  }

  if (!stats) return null;

  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-red mb-2">
          Reports & Analytics
        </h1>
        <p className="text-gray-600">Overview of your store's performance</p>
      </div>

      {/* Stats Grid */}
      <Grid cols={1} gap={6} className="md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          icon={<FaRupeeSign />}
          color="bg-green-500"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<FaShoppingCart />}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Views"
          value={stats.totalViews.toLocaleString()}
          icon={<FaUsers />}
          color="bg-purple-500"
        />
        <StatCard
          title="Avg Rating"
          value={`${stats.averageRating} ★`}
          icon={<FaChartLine />}
          color="bg-orange-500"
        />
      </Grid>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Revenue by Time
          </h2>
          <div className="flex items-end justify-between h-64 space-x-2">
            {stats.revenueByTime.map((item, index) => {
              const maxRevenue = Math.max(
                ...stats.revenueByTime.map((d) => d.revenue)
              );
              const height = (item.revenue / maxRevenue) * 100;
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-dark-red rounded-t-sm hover:opacity-80 transition-opacity relative group"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      ₹{item.revenue}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">
                    {item.time}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Top Items */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Top Performing Items
          </h2>
          <div className="space-y-4">
            {stats.topItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full font-bold text-dark-red shadow-sm">
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-800">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">
                    ₹{item.revenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.orders} orders
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Customers */}
      <Card className="mt-8 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Top Customers</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="text-left py-3 text-gray-500 font-semibold">
                  Name
                </th>
                <th className="text-center py-3 text-gray-500 font-semibold">
                  Orders
                </th>
                <th className="text-right py-3 text-gray-500 font-semibold">
                  Total Spent
                </th>
              </tr>
            </thead>
            <tbody>
              {stats.topCustomers.map((customer, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 font-medium text-gray-800">
                    {customer.name}
                  </td>
                  <td className="text-center py-3 text-gray-600">
                    {customer.orders}
                  </td>
                  <td className="text-right py-3 font-bold text-success-green">
                    ₹{customer.spent.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Container>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <Card className="p-6 flex items-center justify-between overflow-hidden relative">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl shadow-lg ${color}`}
      >
        {icon}
      </div>
    </Card>
  );
}
