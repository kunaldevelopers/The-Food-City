import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "../../components/shared/Layout.jsx";
import { mockAPI } from "../../services/mockApi.js";
import { InlineLoader } from "../../components/shared/LoadingSpinner.jsx";
import { FaTrash, FaPlus, FaTag } from "react-icons/fa";

export default function PromoManagement() {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newPromo, setNewPromo] = useState({
    code: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    minOrderValue: "",
    maxDiscount: "",
    expiryDate: "",
    usageLimit: 100,
  });

  useEffect(() => {
    loadPromos();
  }, []);

  const loadPromos = async () => {
    try {
      const response = await mockAPI.getAllPromoCodes();
      if (response.success) {
        setPromos(response.data);
      }
    } catch (error) {
      console.error("Error loading promos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this promo code?")) {
      try {
        await mockAPI.deletePromoCode(id);
        loadPromos();
      } catch (error) {
        console.error("Error deleting promo:", error);
      }
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await mockAPI.addPromoCode({
        ...newPromo,
        discountValue: Number(newPromo.discountValue),
        minOrderValue: Number(newPromo.minOrderValue),
        maxDiscount: Number(newPromo.maxDiscount),
        usageLimit: Number(newPromo.usageLimit),
      });
      setShowForm(false);
      setNewPromo({
        code: "",
        description: "",
        discountType: "percentage",
        discountValue: "",
        minOrderValue: "",
        maxDiscount: "",
        expiryDate: "",
        usageLimit: 100,
      });
      loadPromos();
    } catch (error) {
      console.error("Error creating promo:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !promos.length) {
    return (
      <Container className="py-8">
        <InlineLoader text="Loading promotions..." />
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark-red mb-2">
            Promo Management
          </h1>
          <p className="text-gray-600">Create and manage promotional codes</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <FaPlus className="mr-2" />
          {showForm ? "Cancel" : "Create New Promo"}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8 p-6 bg-gray-50 border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            New Promo Code
          </h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Promo Code (e.g., SUMMER50)"
                className="p-2 border rounded"
                value={newPromo.code}
                onChange={(e) =>
                  setNewPromo({ ...newPromo, code: e.target.value.toUpperCase() })
                }
                required
              />
              <input
                type="text"
                placeholder="Description"
                className="p-2 border rounded"
                value={newPromo.description}
                onChange={(e) =>
                  setNewPromo({ ...newPromo, description: e.target.value })
                }
                required
              />
              <select
                className="p-2 border rounded"
                value={newPromo.discountType}
                onChange={(e) =>
                  setNewPromo({ ...newPromo, discountType: e.target.value })
                }
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₹)</option>
              </select>
              <input
                type="number"
                placeholder="Discount Value"
                className="p-2 border rounded"
                value={newPromo.discountValue}
                onChange={(e) =>
                  setNewPromo({ ...newPromo, discountValue: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Min Order Value (₹)"
                className="p-2 border rounded"
                value={newPromo.minOrderValue}
                onChange={(e) =>
                  setNewPromo({ ...newPromo, minOrderValue: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Max Discount (₹)"
                className="p-2 border rounded"
                value={newPromo.maxDiscount}
                onChange={(e) =>
                  setNewPromo({ ...newPromo, maxDiscount: e.target.value })
                }
              />
              <input
                type="date"
                className="p-2 border rounded"
                value={newPromo.expiryDate}
                onChange={(e) =>
                  setNewPromo({ ...newPromo, expiryDate: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Usage Limit"
                className="p-2 border rounded"
                value={newPromo.usageLimit}
                onChange={(e) =>
                  setNewPromo({ ...newPromo, usageLimit: e.target.value })
                }
              />
            </div>
            <div className="pt-4">
              <Button type="submit" fullWidth>
                Create Promo
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Promos List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {promos.map((promo) => (
          <Card key={promo.id} className="p-0 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-dark-red">
                    <FaTag />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-800">
                      {promo.code}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${promo.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      {promo.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(promo.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>

              <p className="text-gray-600 mb-4">{promo.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <span className="text-gray-500 block">Discount</span>
                  <span className="font-semibold text-gray-800">
                    {promo.discountType === "percentage"
                      ? `${promo.discountValue}%`
                      : `₹${promo.discountValue}`}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Min Order</span>
                  <span className="font-semibold text-gray-800">
                    ₹{promo.minOrderValue}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Expires</span>
                  <span className="font-semibold text-gray-800">
                    {new Date(promo.expiryDate).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Usage</span>
                  <span className="font-semibold text-gray-800">
                    {promo.usedCount} / {promo.usageLimit}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-xs text-gray-500 flex justify-between">
              <span>ID: {promo.id}</span>
              <span>
                {promo.maxDiscount > 0
                  ? `Max discount ₹${promo.maxDiscount}`
                  : "No limit"}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {promos.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">
          No active promotions found. Create one to get started!
        </div>
      )}
    </Container>
  );
}
