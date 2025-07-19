import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function ProtectedRoute({
  children,
  requiredRole = null,
  fallback = null,
}) {
  const { isAuthenticated, user, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark-red mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-light-gray">
          <div className="bg-white p-8 rounded-lg shadow-subtle max-w-md w-full mx-4 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-error-red rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🔒</span>
              </div>
              <h2 className="text-2xl font-bold text-dark-red mb-2">
                Access Denied
              </h2>
              <p className="text-gray-600">
                Please log in to access this page.
              </p>
            </div>
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full bg-dark-red text-white py-2 px-4 rounded-lg hover:bg-hover-red transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      )
    );
  }

  // Check role-based access
  if (requiredRole && user?.role !== requiredRole) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-light-gray">
          <div className="bg-white p-8 rounded-lg shadow-subtle max-w-md w-full mx-4 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-warn-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⚠️</span>
              </div>
              <h2 className="text-2xl font-bold text-error-red mb-2">
                Unauthorized Access
              </h2>
              <p className="text-gray-600">
                You don't have permission to access this page.
              </p>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => window.history.back()}
                className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="w-full bg-dark-red text-white py-2 px-4 rounded-lg hover:bg-hover-red transition-colors"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      )
    );
  }

  // User is authenticated and authorized
  return children;
}
