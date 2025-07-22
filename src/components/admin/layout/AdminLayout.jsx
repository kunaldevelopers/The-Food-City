import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Container } from "../../shared/Layout.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import {
  FaDashboard,
  FaShoppingBag,
  FaUtensils,
  FaTag,
  FaTruck,
  FaUsers,
  FaChartLine,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: "/admin", icon: FaDashboard, label: "Dashboard", exact: true },
    { path: "/admin/orders", icon: FaShoppingBag, label: "Orders" },
    { path: "/admin/menu", icon: FaUtensils, label: "Menu Management" },
    { path: "/admin/promos", icon: FaTag, label: "Promotions" },
    { path: "/admin/delivery", icon: FaTruck, label: "Delivery" },
    { path: "/admin/customers", icon: FaUsers, label: "Customers" },
    { path: "/admin/reports", icon: FaChartLine, label: "Reports" },
  ];

  const isActiveRoute = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm border-b">
        <Container>
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="text-xl font-bold text-dark-red">
                The Food City
              </div>
              <div className="text-sm text-gray-500 bg-red-100 px-2 py-1 rounded">
                Admin Panel
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-dark-red rounded-full flex items-center justify-center">
                  <FaUser className="text-white text-sm" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-800">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.role}
                  </p>
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <FaSignOutAlt />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </Container>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActiveRoute(item.path, item.exact)
                          ? "bg-dark-red text-white"
                          : "text-gray-700 hover:bg-red-50 hover:text-dark-red"
                      }`}
                    >
                      <Icon className="text-lg" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
