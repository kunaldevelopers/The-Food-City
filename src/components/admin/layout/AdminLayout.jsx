import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Card } from "../../shared/Layout.jsx";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-light-gray">
      <Container className="py-8">
        <Card>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-dark-red mb-4">
              Admin Panel
            </h1>
            <p className="text-gray-600 mb-6">Admin interface - Coming Soon!</p>
            <div className="bg-light-gray p-4 rounded-lg">
              <p className="text-sm text-gray-500">
                This will be the admin dashboard with sidebar navigation.
              </p>
            </div>
          </div>
        </Card>
      </Container>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
