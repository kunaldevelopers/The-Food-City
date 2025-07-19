import React from "react";
import { Container, Card } from "../../components/shared/Layout.jsx";

export default function PromoManagement() {
  return (
    <Container className="py-8">
      <Card>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-dark-red mb-4">
            Promo Management
          </h1>
          <p className="text-gray-600 mb-6">Manage promotions - Coming Soon!</p>
        </div>
      </Card>
    </Container>
  );
}
