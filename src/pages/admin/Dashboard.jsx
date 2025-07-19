import React from "react";
import { Container, Card } from "../../components/shared/Layout.jsx";

export default function Dashboard() {
  return (
    <Container className="py-8">
      <Card>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-dark-red mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mb-6">
            Dashboard with analytics - Coming Soon!
          </p>
          <div className="bg-light-gray p-4 rounded-lg">
            <p className="text-sm text-gray-500">
              This page will display key metrics, sales charts, and quick stats.
            </p>
          </div>
        </div>
      </Card>
    </Container>
  );
}
