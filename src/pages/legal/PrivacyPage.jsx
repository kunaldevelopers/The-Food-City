import React from "react";
import { Container, Card } from "../../components/shared/Layout.jsx";

export default function PrivacyPage() {
  return (
    <Container className="py-8">
      <Card>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-dark-red mb-6 text-center">
            Privacy Policy
          </h1>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-6">
              <strong>Last updated:</strong> July 19, 2024
            </p>

            <p className="mb-6">
              At The Food City, we are committed to protecting your privacy and
              ensuring the security of your personal information.
            </p>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              Information We Collect
            </h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Personal information (name, email, phone number, address)</li>
              <li>Order history and preferences</li>
              <li>Payment information (processed securely)</li>
              <li>Device and usage information</li>
            </ul>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders</li>
              <li>Improve our services and user experience</li>
              <li>Send promotional offers (with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              Information Sharing
            </h2>
            <p className="mb-6">
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except as
              described in this policy.
            </p>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              Data Security
            </h2>
            <p className="mb-6">
              We implement appropriate security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              Your Rights
            </h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              Contact Us
            </h2>
            <p className="mb-6">
              If you have any questions about this Privacy Policy, please
              contact us at privacy@thefoodcity.com or +91 98765 43210.
            </p>
          </div>
        </div>
      </Card>
    </Container>
  );
}
