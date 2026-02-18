import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "../../components/shared/Layout.jsx";
import { mockAPI } from "../../services/mockApi.js";
import { InlineLoader } from "../../components/shared/LoadingSpinner.jsx";
import { FaMotorcycle, FaStar, FaPhoneAlt, FaPlus } from "react-icons/fa";

export default function DeliveryManagement() {
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newBoy, setNewBoy] = useState({
    name: "",
    phone: "",
  });

  useEffect(() => {
    loadDeliveryBoys();
  }, []);

  const loadDeliveryBoys = async () => {
    try {
      const response = await mockAPI.getDeliveryBoys();
      if (response.success) {
        setDeliveryBoys(response.data);
      }
    } catch (error) {
      console.error("Error loading delivery boys:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await mockAPI.updateDeliveryBoyStatus(id, !currentStatus);
      loadDeliveryBoys();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await mockAPI.addDeliveryBoy(newBoy);
      setShowForm(false);
      setNewBoy({ name: "", phone: "" });
      loadDeliveryBoys();
    } catch (error) {
      console.error("Error creating delivery boy:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !deliveryBoys.length) {
    return (
      <Container className="py-8">
        <InlineLoader text="Loading delivery personnel..." />
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark-red mb-2">
            Delivery Management
          </h1>
          <p className="text-gray-600">
            Manage your delivery fleet and availability
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <FaPlus className="mr-2" />
          {showForm ? "Cancel" : "Add Delivery Personnel"}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8 p-6 bg-gray-50 border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Register New Personnel
          </h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="p-2 border rounded"
                value={newBoy.name}
                onChange={(e) => setNewBoy({ ...newBoy, name: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="p-2 border rounded"
                value={newBoy.phone}
                onChange={(e) => setNewBoy({ ...newBoy, phone: e.target.value })}
                required
              />
            </div>
            <div className="pt-4">
              <Button type="submit">Register</Button>
            </div>
          </form>
        </Card>
      )}

      {/* Delivery Boys Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deliveryBoys.map((boy) => (
          <Card key={boy.id} className="p-0 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl ${boy.isAvailable ? "bg-green-500" : "bg-gray-400"}`}>
                  <FaMotorcycle />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {boy.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{boy.rating}</span>
                    <span className="mx-2">•</span>
                    <span>{boy.totalDeliveries} deliveries</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center text-gray-600 mb-6">
                <FaPhoneAlt className="mr-2" />
                <span>{boy.phone}</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span
                  className={`text-sm font-medium ${boy.isAvailable ? "text-green-600" : "text-gray-500"
                    }`}
                >
                  {boy.isAvailable ? "Available" : "Unavailable"}
                </span>
                <button
                  onClick={() => handleToggleStatus(boy.id, boy.isAvailable)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${boy.isAvailable
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                >
                  {boy.isAvailable ? "Set Unavailable" : "Set Available"}
                </button>
              </div>
            </div>
            {boy.currentOrders.length > 0 && (
              <div className="bg-blue-50 px-6 py-3 border-t border-blue-100">
                <p className="text-xs text-blue-700">
                  Currently handling {boy.currentOrders.length} order(s)
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {deliveryBoys.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">
          No delivery personnel found. Add one to get started!
        </div>
      )}
    </Container>
  );
}
