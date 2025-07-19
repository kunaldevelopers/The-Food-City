import React from "react";
import { Container, Card } from "../../components/shared/Layout.jsx";

export default function TermsPage() {
  return (
    <Container className="py-8">
      <Card>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-dark-red mb-6 text-center">
            Terms & Conditions
          </h1>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-6">
              <strong>Last updated:</strong> July 19, 2024
            </p>

            <p className="mb-6">
              Welcome to The Food City. These terms and conditions outline the
              rules and regulations for the use of our website and services.
            </p>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="mb-6">
              By accessing and using this website, you accept and agree to be
              bound by the terms and provision of this agreement.
            </p>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              2. Use License
            </h2>
            <p className="mb-6">
              Permission is granted to temporarily download one copy of the
              materials on The Food City's website for personal, non-commercial
              transitory viewing only.
            </p>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              3. Ordering and Payment
            </h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>All orders are subject to availability and confirmation</li>
              <li>Prices are subject to change without notice</li>
              <li>Payment must be made at the time of ordering</li>
              <li>
                We accept various payment methods including cash on delivery
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              4. Delivery
            </h2>
            <p className="mb-6">
              We strive to deliver orders within the estimated time frame.
              However, delivery times may vary due to factors beyond our
              control.
            </p>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              5. Cancellation and Refunds
            </h2>
            <p className="mb-6">
              Orders can be cancelled within 5 minutes of placement. Refunds
              will be processed according to our refund policy.
            </p>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              6. User Accounts
            </h2>
            <p className="mb-6">
              Users are responsible for maintaining the confidentiality of their
              account information and for all activities that occur under their
              account.
            </p>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              7. Limitation of Liability
            </h2>
            <p className="mb-6">
              The Food City shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages resulting from your
              use of our services.
            </p>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              8. Contact Information
            </h2>
            <p className="mb-6">
              If you have any questions about these Terms & Conditions, please
              contact us at info@thefoodcity.com or +91 98765 43210.
            </p>
          </div>
        </div>
      </Card>
    </Container>
  );
}
