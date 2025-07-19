import React from "react";
import { Container, Card } from "../../components/shared/Layout.jsx";

export default function ContactPage() {
  return (
    <Container className="py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-dark-red mb-8 text-center">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <Card>
            <h2 className="text-2xl font-semibold text-dark-red mb-6">
              Get in Touch
            </h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-dark-red rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
                  <p className="text-gray-600">
                    123 Food Street
                    <br />
                    Mumbai, Maharashtra 400001
                    <br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-dark-red rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                  <p className="text-gray-600">
                    +91 98765 43210
                    <br />
                    <span className="text-sm">Available 24/7</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-dark-red rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                  <p className="text-gray-600">
                    info@thefoodcity.com
                    <br />
                    support@thefoodcity.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-dark-red rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Business Hours
                  </h3>
                  <p className="text-gray-600">
                    Monday - Sunday
                    <br />
                    11:00 AM - 11:00 PM
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Form */}
          <Card>
            <h2 className="text-2xl font-semibold text-dark-red mb-6">
              Send us a Message
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-red focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-red focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-red focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-red focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Issue</option>
                  <option value="delivery">Delivery Problem</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-red focus:border-transparent resize-vertical"
                  placeholder="Enter your message"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-dark-red text-white py-2 px-4 rounded-lg hover:bg-hover-red transition-colors"
              >
                Send Message
              </button>
            </form>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="mt-8">
          <h2 className="text-2xl font-semibold text-dark-red mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                What are your delivery hours?
              </h3>
              <p className="text-gray-600">
                We deliver from 11:00 AM to 11:00 PM, 7 days a week.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                How long does delivery take?
              </h3>
              <p className="text-gray-600">
                Typical delivery time is 30-45 minutes, depending on your
                location and order complexity.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                Yes, we offer refunds for valid reasons. Please check our refund
                policy for more details.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                How can I track my order?
              </h3>
              <p className="text-gray-600">
                You can track your order in real-time through our website or by
                logging into your account.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
}
