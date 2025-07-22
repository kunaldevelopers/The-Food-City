import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Container } from "../../shared/Layout.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import {
  FaTachometerAlt,
  FaShoppingBag,
  FaUtensils,
  FaTruck,
  FaUsers,
  FaChartLine,
  FaUser,
  FaSignOutAlt,
  FaUserTie,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: "/admin", icon: FaTachometerAlt, label: "Dashboard", exact: true },
    { path: "/admin/orders", icon: FaShoppingBag, label: "Orders" },
    { path: "/admin/menu", icon: FaUtensils, label: "Menu Management" },
    { path: "/admin/delivery", icon: FaTruck, label: "Delivery" },
    { path: "/admin/customers", icon: FaUsers, label: "Customers" },
    {
      path: "/admin/delivery-staffs",
      icon: FaUserTie,
      label: "Delivery Staffs",
    },
    { path: "/admin/reports", icon: FaChartLine, label: "Reports" },
  ];

  const isActiveRoute = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm border-b">
        <Container>
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-dark-red"
              >
                {isMobileMenuOpen ? (
                  <FaTimes size={20} />
                ) : (
                  <FaBars size={20} />
                )}
              </button>

              <div className="text-lg lg:text-xl font-bold text-dark-red">
                The Food City
              </div>
              <div className="hidden sm:block text-xs lg:text-sm text-gray-500 bg-red-100 px-2 py-1 rounded">
                Admin Panel
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 lg:w-8 lg:h-8 bg-dark-red rounded-full flex items-center justify-center">
                  <FaUser className="text-white text-xs lg:text-sm" />
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
                className="flex items-center gap-1 lg:gap-2 text-gray-600 hover:text-red-600 transition-colors p-2"
                title="Logout"
              >
                <FaSignOutAlt className="text-sm lg:text-base" />
                <span className="hidden lg:inline text-sm">Logout</span>
              </button>
            </div>
          </div>
        </Container>
      </div>

      <div className="flex relative">
        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeMobileMenu}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white shadow-lg lg:shadow-sm 
          transform transition-transform duration-300 ease-in-out
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          min-h-screen lg:min-h-0
        `}
        >
          {/* Mobile Close Button */}
          <div className="lg:hidden flex justify-end p-4">
            <button
              onClick={closeMobileMenu}
              className="p-2 text-gray-600 hover:text-dark-red"
            >
              <FaTimes size={18} />
            </button>
          </div>

          <nav className="p-4 pt-0 lg:pt-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={closeMobileMenu}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActiveRoute(item.path, item.exact)
                          ? "bg-dark-red text-white"
                          : "text-gray-700 hover:bg-red-50 hover:text-dark-red"
                      }`}
                    >
                      <Icon className="text-lg flex-shrink-0" />
                      <span className="text-sm lg:text-base">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <main className="p-3 sm:p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
