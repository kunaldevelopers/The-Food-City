import React from "react";
import { Container, Card } from "../../components/shared/Layout.jsx";

export default function RefundPage() {
  return (
    <Container className="py-8">
      <Card>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-dark-red mb-6 text-center">
            Refund Policy
          </h1>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-6">
              <strong>Last updated:</strong> July 19, 2024
            </p>

            <p className="mb-6">
              At The Food City, we want you to be completely satisfied with your
              order. This refund policy outlines the circumstances under which
              refunds are available.
            </p>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              Refund Eligibility
            </h2>
            <p className="mb-4">
              You may be eligible for a refund in the following cases:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Order was cancelled by the restaurant</li>
              <li>
                Food quality issues (spoiled, contaminated, or incorrect items)
              </li>
              <li>
                Significant delivery delays (over 60 minutes from estimated
                time)
              </li>
              <li>Order was not delivered</li>
              <li>Billing errors or duplicate charges</li>
            </ul>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              Refund Process
            </h2>
            <ol className="list-decimal list-inside mb-6 space-y-2">
              <li>Contact our customer support within 24 hours of delivery</li>
              <li>Provide order details and reason for refund request</li>
              <li>
                Our team will review your request within 2-3 business days
              </li>
              <li>
                If approved, refund will be processed to your original payment
                method
              </li>
            </ol>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              Refund Timeline
            </h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>
                <strong>Credit/Debit Cards:</strong> 5-7 business days
              </li>
              <li>
                <strong>Digital Wallets:</strong> 2-3 business days
              </li>
              <li>
                <strong>Cash on Delivery:</strong> Bank transfer within 3-5
                business days
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              Non-Refundable Items
            </h2>
            <p className="mb-4">Refunds are not available for:</p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>
                Orders cancelled by the customer after preparation has started
              </li>
              <li>Subjective taste preferences</li>
              <li>
                Orders delivered to incorrect address provided by customer
              </li>
              <li>Promotional or discounted items (unless defective)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              Partial Refunds
            </h2>
            <p className="mb-6">
              In some cases, we may offer partial refunds for missing items or
              minor issues. The refund amount will be proportional to the issue
              experienced.
            </p>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              Alternative Solutions
            </h2>
            <p className="mb-4">Instead of refunds, we may offer:</p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Store credit for future orders</li>
              <li>Replacement items</li>
              <li>Discount coupons</li>
            </ul>

            <h2 className="text-2xl font-semibold text-dark-red mb-4">
              Contact Information
            </h2>
            <p className="mb-6">
              For refund requests or questions about this policy, please contact
              us:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>
                <strong>Email:</strong> refunds@thefoodcity.com
              </li>
              <li>
                <strong>Phone:</strong> +91 98765 43210
              </li>
              <li>
                <strong>Hours:</strong> 11:00 AM - 11:00 PM (7 days a week)
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </Container>
  );
}
