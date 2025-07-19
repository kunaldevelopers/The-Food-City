import React from "react";
import { Container, Card } from "../../components/shared/Layout.jsx";

export default function Reports() {
  return (
    <Container className="py-8">
      <Card>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-dark-red mb-4">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 mb-6">View reports - Coming Soon!</p>
        </div>
      </Card>
    </Container>
  );
}
