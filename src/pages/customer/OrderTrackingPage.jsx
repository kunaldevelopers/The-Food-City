import React from "react";
import { Container, Card } from "../../components/shared/Layout.jsx";

export default function OrderTrackingPage() {
  return (
    <Container className="py-8">
      <Card>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-dark-red mb-4">Track Order</h1>
          <p className="text-gray-600 mb-6">
            Real-time order tracking - Coming Soon!
          </p>
          <div className="bg-light-gray p-4 rounded-lg">
            <p className="text-sm text-gray-500">
              This page will show real-time order status updates.
            </p>
          </div>
        </div>
      </Card>
    </Container>
  );
}
