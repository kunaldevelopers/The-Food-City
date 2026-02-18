import React, { useState, useEffect } from "react";
import { Container, Card } from "../../components/shared/Layout.jsx";
import { mockAPI } from "../../services/mockApi.js";
import { InlineLoader } from "../../components/shared/LoadingSpinner.jsx";
import { FaUser, FaEnvelope, FaPhoneAlt, FaBan, FaCheck } from "react-icons/fa";

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [usersResponse, ordersResponse] = await Promise.all([
        mockAPI.getUsers(),
        mockAPI.getOrders(),
      ]);

      if (usersResponse.success) {
        // Filter only customers, not admins
        const customerList = usersResponse.data.filter(
          (u) => u.role === "customer"
        );
        setCustomers(customerList);
      }

      if (ordersResponse.success) {
        setOrders(ordersResponse.data);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBlock = async (id) => {
    try {
      await mockAPI.toggleUserBlock(id);
      loadData();
    } catch (error) {
      console.error("Error toggling block status:", error);
    }
  };

  const getCustomerStats = (customerId) => {
    const customerOrders = orders.filter(
      (o) => o.customerId === customerId || o.userId === customerId
    );
    const totalSpent = customerOrders.reduce((sum, o) => sum + o.total, 0);
    return {
      orderCount: customerOrders.length,
      totalSpent,
      lastOrder:
        customerOrders.length > 0 ? customerOrders[0].createdAt : null,
    };
  };

  if (loading) {
    return (
      <Container className="py-8">
        <InlineLoader text="Loading customers..." />
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-dark-red mb-2">
          Customer Management
        </h1>
        <p className="text-gray-600">View and manage registered customers</p>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                  Customer
                </th>
                <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                  Contact
                </th>
                <th className="text-center py-4 px-6 text-gray-500 font-semibold">
                  Orders
                </th>
                <th className="text-right py-4 px-6 text-gray-500 font-semibold">
                  Total Spent
                </th>
                <th className="text-center py-4 px-6 text-gray-500 font-semibold">
                  Status
                </th>
                <th className="text-right py-4 px-6 text-gray-500 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((customer) => {
                const stats = getCustomerStats(customer.id);
                return (
                  <tr
                    key={customer.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                          <FaUser />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {customer.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            Joined {new Date(customer.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center gap-2">
                          <FaEnvelope className="text-gray-400" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <FaPhoneAlt className="text-gray-400" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm font-medium">
                        {stats.orderCount}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-medium text-gray-800">
                      ₹{stats.totalSpent.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${customer.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                          }`}
                      >
                        {customer.isActive ? (
                          <>
                            <FaCheck size={10} /> Active
                          </>
                        ) : (
                          <>
                            <FaBan size={10} /> Blocked
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleToggleBlock(customer.id)}
                        className={`text-sm font-medium px-3 py-1 rounded transition-colors ${customer.isActive
                          ? "text-red-600 hover:bg-red-50"
                          : "text-green-600 hover:bg-green-50"
                          }`}
                      >
                        {customer.isActive ? "Block" : "Unblock"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {customers.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No customers found.
          </div>
        )}
      </Card>
    </Container>
  );
}
