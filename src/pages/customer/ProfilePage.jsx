import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "../../components/shared/Layout.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { FormInput } from "../../components/shared/FormInput.jsx";
import ConfirmDialog from "../../components/shared/ConfirmDialog.jsx";
import Toast from "../../components/shared/Toast.jsx";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

export default function ProfilePage() {
  const { user } = useAuth(); // Removed updateProfile as it's not implemented yet
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [addressData, setAddressData] = useState({
    label: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    landmark: "",
    isDefault: false,
  });

  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
      setAddresses(user.addresses || []);
    }
  }, [user]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update user context (you'll need to implement updateProfile in AuthContext)
      // await updateProfile(profileData);

      setIsEditing(false);
      showToast("Profile updated successfully!");
    } catch {
      showToast("Failed to update profile", "error");
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      const newAddress = {
        id: editingAddressId || Date.now().toString(),
        userId: user.id,
        ...addressData,
      };

      if (editingAddressId) {
        // Update existing address
        setAddresses((prev) =>
          prev.map((addr) => (addr.id === editingAddressId ? newAddress : addr))
        );
        showToast("Address updated successfully!");
      } else {
        // Add new address
        setAddresses((prev) => [...prev, newAddress]);
        showToast("Address added successfully!");
      }

      // Reset form
      setAddressData({
        label: "",
        street: "",
        city: "",
        state: "",
        pinCode: "",
        landmark: "",
        isDefault: false,
      });
      setIsEditingAddress(false);
      setEditingAddressId(null);
    } catch {
      showToast("Failed to save address", "error");
    }
  };

  const handleEditAddress = (address) => {
    setAddressData({
      label: address.label || "",
      street: address.street || "",
      city: address.city || "",
      state: address.state || "",
      pinCode: address.pinCode || "",
      landmark: address.landmark || "",
      isDefault: address.isDefault || false,
    });
    setEditingAddressId(address.id);
    setIsEditingAddress(true);
  };

  const handleDeleteAddress = (addressId) => {
    setAddressToDelete(addressId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAddress = () => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== addressToDelete));
    setShowDeleteConfirm(false);
    setAddressToDelete(null);
    showToast("Address deleted successfully!");
  };

  const handleSetDefaultAddress = (addressId) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      }))
    );
    showToast("Default address updated!");
  };

  if (!user) {
    return (
      <Container className="py-8">
        <Card>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-dark-red mb-4">Profile</h1>
            <p className="text-gray-600">Please log in to view your profile.</p>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-4 md:py-8">
      <div className="max-w-4xl mx-auto px-2 md:px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-dark-red mb-6">
          Profile
        </h1>

        <div className="max-w-2xl mx-auto">
          {/* Personal Information */}
          <Card className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FaUser className="text-dark-red" />
                Personal Information
              </h2>
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="text-dark-red border-dark-red hover:bg-red-50"
              >
                <FaEdit className="w-4 h-4 mr-2" />
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </div>

            {isEditing ? (
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <FormInput
                  label="Name"
                  type="text"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  required
                  icon={<FaUser />}
                />
                <FormInput
                  label="Email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  required
                  icon={<FaEnvelope />}
                />
                <FormInput
                  label="Phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  required
                  icon={<FaPhoneAlt />}
                />
                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-light-gray rounded-lg">
                  <FaUser className="text-dark-red" />
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-light-gray rounded-lg">
                  <FaEnvelope className="text-dark-red" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-light-gray rounded-lg">
                  <FaPhoneAlt className="text-dark-red" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Addresses Section */}
        <Card className="p-4 md:p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FaMapMarkerAlt className="text-dark-red" />
              Saved Addresses
            </h2>
            <Button
              onClick={() => {
                setIsEditingAddress(true);
                setEditingAddressId(null);
                setAddressData({
                  label: "",
                  street: "",
                  city: "",
                  state: "",
                  pinCode: "",
                  landmark: "",
                  isDefault: false,
                });
              }}
              className="flex items-center gap-2"
            >
              <FaPlus className="w-4 h-4" />
              Add Address
            </Button>
          </div>

          {isEditingAddress && (
            <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-lg font-medium mb-4">
                {editingAddressId ? "Edit Address" : "Add New Address"}
              </h3>
              <form
                onSubmit={handleAddressSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <FormInput
                  label="Address Label"
                  type="text"
                  value={addressData.label}
                  onChange={(e) =>
                    setAddressData((prev) => ({
                      ...prev,
                      label: e.target.value,
                    }))
                  }
                  placeholder="Home, Work, etc."
                  required
                />
                <FormInput
                  label="Street Address"
                  type="text"
                  value={addressData.street}
                  onChange={(e) =>
                    setAddressData((prev) => ({
                      ...prev,
                      street: e.target.value,
                    }))
                  }
                  required
                  className="md:col-span-2"
                />
                <FormInput
                  label="City"
                  type="text"
                  value={addressData.city}
                  onChange={(e) =>
                    setAddressData((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                  required
                />
                <FormInput
                  label="State"
                  type="text"
                  value={addressData.state}
                  onChange={(e) =>
                    setAddressData((prev) => ({
                      ...prev,
                      state: e.target.value,
                    }))
                  }
                  required
                />
                <FormInput
                  label="PIN Code"
                  type="text"
                  value={addressData.pinCode}
                  onChange={(e) =>
                    setAddressData((prev) => ({
                      ...prev,
                      pinCode: e.target.value,
                    }))
                  }
                  required
                />
                <FormInput
                  label="Landmark (Optional)"
                  type="text"
                  value={addressData.landmark}
                  onChange={(e) =>
                    setAddressData((prev) => ({
                      ...prev,
                      landmark: e.target.value,
                    }))
                  }
                />
                <div className="md:col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={addressData.isDefault}
                    onChange={(e) =>
                      setAddressData((prev) => ({
                        ...prev,
                        isDefault: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-dark-red border-gray-300 rounded focus:ring-dark-red"
                  />
                  <label htmlFor="isDefault" className="text-sm text-gray-700">
                    Set as default address
                  </label>
                </div>
                <div className="md:col-span-2 flex gap-2">
                  <Button type="submit">
                    {editingAddressId ? "Update Address" : "Add Address"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditingAddress(false);
                      setEditingAddressId(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-3">
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <div
                  key={address.id}
                  className={`p-4 border rounded-lg ${address.isDefault
                      ? "border-dark-red bg-red-50"
                      : "border-gray-200"
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-gray-800">
                          {address.label}
                        </h4>
                        {address.isDefault && (
                          <span className="px-2 py-1 text-xs bg-dark-red text-white rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">
                        {address.street}
                        {address.landmark && `, ${address.landmark}`}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {address.city}, {address.state} - {address.pinCode}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!address.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetDefaultAddress(address.id)}
                          className="text-xs"
                        >
                          Set Default
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditAddress(address)}
                        className="text-dark-red border-dark-red hover:bg-red-50"
                      >
                        <FaEdit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteAddress(address.id)}
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <FaTrash className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <FaMapMarkerAlt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No addresses saved yet.</p>
                <p className="text-sm text-gray-500">
                  Add an address to get started.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDeleteAddress}
        title="Delete Address"
        message="Are you sure you want to delete this address? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />

      {/* Toast */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: "", type: "" })}
        />
      )}
    </Container>
  );
}
