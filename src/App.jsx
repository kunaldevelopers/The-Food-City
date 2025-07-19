import React from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import AppRouter from "./router/AppRouter.jsx";
import ErrorBoundary from "./components/shared/ErrorBoundary.jsx";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <AppRouter />
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
