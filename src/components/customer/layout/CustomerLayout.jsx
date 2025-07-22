import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import BottomNavigation from "./BottomNavigation.jsx";
import Footer from "./Footer.jsx";
import AuthModal from "../../auth/AuthModal.jsx";
import { ToastProvider } from "../../shared/Toast.jsx";

export default function CustomerLayout() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const openAuthModal = (mode = "login") => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-light-gray flex flex-col">
        {/* Header */}
        <Header onOpenAuth={openAuthModal} />

        {/* Main Content */}
        <main className="flex-1 pb-20 md:pb-8">
          <Outlet />
        </main>

        {/* Footer - Hidden on mobile, shown on desktop */}
        <div className="hidden md:block">
          <Footer />
        </div>

        {/* Bottom Navigation - Mobile only */}
        <div className="md:hidden">
          <BottomNavigation onOpenAuth={openAuthModal} />
        </div>

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode={authMode}
        />
      </div>
    </ToastProvider>
  );
}
