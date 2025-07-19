import React from "react";
import { Container, Card } from "../../components/shared/Layout.jsx";

export default function ProfilePage() {
  return (
    <Container className="py-8">
      <Card>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-dark-red mb-4">Profile</h1>
          <p className="text-gray-600 mb-6">
            Manage your profile - Coming Soon!
          </p>
          <div className="bg-light-gray p-4 rounded-lg">
            <p className="text-sm text-gray-500">
              This page will allow users to edit profile and manage addresses.
            </p>
          </div>
        </div>
      </Card>
    </Container>
  );
}
