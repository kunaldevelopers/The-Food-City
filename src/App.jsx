import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ToastProvider } from "./components/shared/Toast.jsx";
import AppRouter from "./router/AppRouter.jsx";
import ErrorBoundary from "./components/shared/ErrorBoundary.jsx";
import ScrollToTop from "./components/shared/ScrollToTop.jsx";
import { FullScreenLoader } from "./components/shared/LoadingSpinner.jsx";

// App content component that waits for auth initialization
function AppContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <FullScreenLoader text="Initializing application..." />;
  }

  return (
    <CartProvider>
      <AppRouter />
      <ScrollToTop />
    </CartProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
