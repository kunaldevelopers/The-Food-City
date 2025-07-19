import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { FullScreenLoader } from "../components/shared/LoadingSpinner.jsx";
import ErrorBoundary from "../components/shared/ErrorBoundary.jsx";

// Lazy load components for better performance
const CustomerLayout = React.lazy(() =>
  import("../components/customer/layout/CustomerLayout.jsx")
);
const AdminLayout = React.lazy(() =>
  import("../components/admin/layout/AdminLayout.jsx")
);

// Customer pages
const HomePage = React.lazy(() => import("../pages/customer/HomePage.jsx"));
const MenuPage = React.lazy(() => import("../pages/customer/MenuPage.jsx"));
const DealsPage = React.lazy(() => import("../pages/customer/DealsPage.jsx"));
const CartPage = React.lazy(() => import("../pages/customer/CartPage.jsx"));
const CheckoutPage = React.lazy(() =>
  import("../pages/customer/CheckoutPage.jsx")
);
const OrderTrackingPage = React.lazy(() =>
  import("../pages/customer/OrderTrackingPage.jsx")
);
const OrderHistoryPage = React.lazy(() =>
  import("../pages/customer/OrderHistoryPage.jsx")
);
const ProfilePage = React.lazy(() =>
  import("../pages/customer/ProfilePage.jsx")
);

// Legal pages
const AboutPage = React.lazy(() => import("../pages/legal/AboutPage.jsx"));
const ContactPage = React.lazy(() => import("../pages/legal/ContactPage.jsx"));
const TermsPage = React.lazy(() => import("../pages/legal/TermsPage.jsx"));
const PrivacyPage = React.lazy(() => import("../pages/legal/PrivacyPage.jsx"));
const RefundPage = React.lazy(() => import("../pages/legal/RefundPage.jsx"));

// Admin pages
const AdminDashboard = React.lazy(() => import("../pages/admin/Dashboard.jsx"));
const AdminOrders = React.lazy(() =>
  import("../pages/admin/OrderManagement.jsx")
);
const AdminMenu = React.lazy(() => import("../pages/admin/MenuManagement.jsx"));
const AdminPromos = React.lazy(() =>
  import("../pages/admin/PromoManagement.jsx")
);
const AdminDelivery = React.lazy(() =>
  import("../pages/admin/DeliveryManagement.jsx")
);
const AdminCustomers = React.lazy(() =>
  import("../pages/admin/CustomerManagement.jsx")
);
const AdminReports = React.lazy(() => import("../pages/admin/Reports.jsx"));

// Protected route wrapper
function ProtectedRoute({ children, requiredRole = null }) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <FullScreenLoader text="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function AppRouter() {
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<FullScreenLoader text="Loading page..." />}>
          <Routes>
            {/* Customer Routes */}
            <Route path="/" element={<CustomerLayout />}>
              <Route index element={<HomePage />} />
              <Route path="menu" element={<MenuPage />} />
              <Route path="deals" element={<DealsPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route
                path="checkout"
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="orders"
                element={
                  <ProtectedRoute>
                    <OrderHistoryPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="orders/:orderId"
                element={
                  <ProtectedRoute>
                    <OrderTrackingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* Legal Pages */}
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="refund" element={<RefundPage />} />
            </Route>

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="menu" element={<AdminMenu />} />
              <Route path="promos" element={<AdminPromos />} />
              <Route path="delivery" element={<AdminDelivery />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="reports" element={<AdminReports />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}
