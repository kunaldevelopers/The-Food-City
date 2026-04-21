import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useCart } from "../../../context/CartContext.jsx";

import logo from "../../../assets/logo.png";

export default function Header({ onOpenAuth }) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setIsProfileDropdownOpen(false);
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="The Food City"
              className="h-10 w-10 object-contain"
            />
            <span className="text-xl font-bold text-dark-red hidden sm:block">
              The Food City
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-dark-red transition-colors"
            >
              Home
            </Link>
            <Link
              to="/menu"
              className="text-gray-700 hover:text-dark-red transition-colors"
            >
              Menu
            </Link>
            <Link
              to="/deals"
              className="text-gray-700 hover:text-dark-red transition-colors"
            >
              Deals
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-dark-red transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-dark-red transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon - Hidden on mobile since it's in bottom nav */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-dark-red transition-colors hidden md:block"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-dark-red rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden sm:block text-gray-700">
                    {user?.name}
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Orders
                    </Link>
                    {user?.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onOpenAuth("login")}
                  className="text-gray-700 hover:text-dark-red transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => onOpenAuth("register")}
                  className="bg-dark-red text-white px-4 py-2 rounded-lg hover:bg-hover-red transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
