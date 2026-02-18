import React, { useState, useEffect } from "react";
import { Container, Card } from "../../components/shared/Layout.jsx";
import ConfirmDialog from "../../components/shared/ConfirmDialog.jsx";
import { useToast } from "../../components/shared/Toast.jsx";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaToggleOn,
  FaToggleOff,
  FaRupeeSign,
  FaClock,
  FaUtensils,
} from "react-icons/fa";

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
    type: "warning",
  });

  const { addToast } = useToast();

  // Mock data for menu items
  useEffect(() => {
    const mockCategories = [
      { id: 1, name: "Trending Now", items: 8 },
      { id: 2, name: "Indian Cuisine", items: 15 },
      { id: 3, name: "Chinese Cuisine", items: 10 },
      { id: 4, name: "South Cuisine", items: 6 },
      { id: 5, name: "Tandoor Cuisine", items: 4 },
    ];

    const mockMenuItems = [
      {
        id: 1,
        name: "Butter Chicken",
        category: "Indian Cuisine",
        price: 250,
        description: "Creamy tomato-based curry with tender chicken pieces",
        prepTime: 25,
        isAvailable: true,
        isVeg: false,
        tags: ["comfort food", "creamy", "popular"],
        image:
          "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=150&h=150&fit=crop",
      },
      {
        id: 2,
        name: "Paneer Tikka",
        category: "Tandoor Cuisine",
        price: 180,
        description: "Grilled cottage cheese cubes with aromatic spices",
        prepTime: 15,
        isAvailable: true,
        isVeg: true,
        tags: ["vegetarian", "healthy", "grilled"],
        image:
          "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=150&h=150&fit=crop",
      },
      {
        id: 3,
        name: "Chicken Manchurian",
        category: "Chinese Cuisine",
        price: 220,
        description: "Spicy chicken balls in tangy sauce",
        prepTime: 20,
        isAvailable: true,
        isVeg: false,
        tags: ["spicy", "tangy", "chinese"],
        image:
          "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=150&h=150&fit=crop",
      },
      {
        id: 4,
        name: "Masala Dosa",
        category: "South Cuisine",
        price: 120,
        description: "Crispy rice crepe with spiced potato filling",
        prepTime: 15,
        isAvailable: false,
        isVeg: true,
        tags: ["healthy", "vegetarian", "south indian"],
        image:
          "https://vismaifood.com/storage/app/uploads/public/45a/29b/a17/thumb__700_0_0_0_auto.jpg",
      },
      {
        id: 5,
        name: "Chicken Biryani",
        category: "Trending Now",
        price: 320,
        description: "Aromatic basmati rice with spiced chicken",
        prepTime: 35,
        isAvailable: true,
        isVeg: false,
        tags: ["trending", "aromatic", "biryani"],
        image:
          "https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg",
      },
    ];

    setTimeout(() => {
      setCategories(mockCategories);
      setMenuItems(mockMenuItems);
      setLoading(false);
    }, 500);
  }, []);

  // Filter menu items
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Toggle item availability
  const toggleAvailability = (itemId) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );

    const item = menuItems.find((item) => item.id === itemId);
    const newStatus = !item.isAvailable;
    addToast(
      `${item.name} ${newStatus ? "enabled" : "disabled"} successfully!`,
      "success"
    );
  };

  // Delete item with confirmation
  const handleDeleteItem = (item) => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Menu Item",
      message: `Are you sure you want to delete "${item.name}"?\n\nThis action cannot be undone and the item will be removed from all orders.`,
      type: "danger",
      onConfirm: () => {
        setMenuItems((prev) =>
          prev.filter((menuItem) => menuItem.id !== item.id)
        );
        addToast(`${item.name} deleted successfully!`, "success");
      },
    });
  };

  // Handle save item (add or edit)
  const handleSaveItem = (itemData) => {
    if (editingItem) {
      // Edit existing item
      setMenuItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id ? { ...item, ...itemData } : item
        )
      );
      addToast(`${itemData.name} updated successfully!`, "success");
    } else {
      // Add new item
      const newItem = {
        ...itemData,
        id: Math.max(...menuItems.map((item) => item.id), 0) + 1,
      };
      setMenuItems((prev) => [...prev, newItem]);
      addToast(`${itemData.name} added successfully!`, "success");
    }

    // Close form
    setShowAddForm(false);
    setEditingItem(null);
  };

  return (
    <Container className="py-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Menu Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your restaurant menu items and categories
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
          >
            <FaPlus />
            Add New Item
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaUtensils className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-xl font-bold text-gray-900">
                  {menuItems.length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FaToggleOn className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-xl font-bold text-gray-900">
                  {menuItems.filter((item) => item.isAvailable).length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <FaToggleOff className="text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Unavailable</p>
                <p className="text-xl font-bold text-gray-900">
                  {menuItems.filter((item) => !item.isAvailable).length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <FaFilter className="text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-xl font-bold text-gray-900">
                  {categories.length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white min-w-[150px]"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Menu Items List */}
        <div className="space-y-4">
          {loading ? (
            <Card className="p-6 text-center">
              <p className="text-gray-600">Loading menu items...</p>
            </Card>
          ) : filteredItems.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-gray-600">No menu items found</p>
            </Card>
          ) : (
            filteredItems.map((item) => (
              <Card key={item.id} className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Item Image */}
                  <div className="w-full sm:w-24 h-48 sm:h-24 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=150&h=150&fit=crop";
                      }}
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.name}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${item.isVeg
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                              }`}
                          >
                            {item.isVeg ? "Veg" : "Non-Veg"}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${item.isAvailable
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                              }`}
                          >
                            {item.isAvailable ? "Available" : "Unavailable"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <FaRupeeSign />₹{item.price}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaClock />
                            {item.prepTime} mins
                          </span>
                          <span className="px-2 py-1 bg-gray-100 rounded">
                            {item.category}
                          </span>
                          {item.spiceLevel !== "None" && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
                              {item.spiceLevel}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleAvailability(item.id)}
                          className={`p-2 rounded-lg ${item.isAvailable
                              ? "bg-green-100 text-green-600 hover:bg-green-200"
                              : "bg-red-100 text-red-600 hover:bg-red-200"
                            }`}
                          title={
                            item.isAvailable ? "Disable Item" : "Enable Item"
                          }
                        >
                          {item.isAvailable ? <FaToggleOn /> : <FaToggleOff />}
                        </button>
                        <button
                          onClick={() => setEditingItem(item)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                          title="Edit Item"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                          title="Delete Item"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Add/Edit Item Modal */}
      {(showAddForm || editingItem) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
                </h2>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingItem(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <ItemForm
                item={editingItem}
                categories={categories}
                onSave={handleSaveItem}
                onCancel={() => {
                  setShowAddForm(false);
                  setEditingItem(null);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        type={confirmDialog.type}
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />
    </Container>
  );
}

// ItemForm component for adding/editing menu items
function ItemForm({ item, categories, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: item?.name || "",
    category: item?.category || "Trending Now",
    price: item?.price || "",
    description: item?.description || "",
    prepTime: item?.prepTime || "",
    isVeg: item?.isVeg || false,
    isAvailable: item?.isAvailable !== undefined ? item.isAvailable : true,
    image: item?.image || "",
    tags: item?.tags || [],
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(item?.image || "");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [newTag, setNewTag] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === "checkbox" ? checked : value;

    // Limit description to 60 characters
    if (name === "description" && newValue.length > 60) {
      newValue = newValue.substring(0, 60);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle tag operations
  const addTag = () => {
    if (
      newTag.trim() &&
      formData.tags.length < 3 &&
      !formData.tags.includes(newTag.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleTagInput = (e) => {
    const value = e.target.value;
    if (value.length <= 12) {
      setNewTag(value);
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        image: "Please select a valid image file",
      }));
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "Image size must be less than 2MB",
      }));
      return;
    }

    setUploadingImage(true);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      setImagePreview(imageUrl);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
      setUploadingImage(false);

      // Clear any previous errors
      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: "" }));
      }
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.prepTime || formData.prepTime <= 0)
      newErrors.prepTime = "Valid prep time is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...formData,
        price: parseFloat(formData.price),
        prepTime: parseInt(formData.prepTime),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Item Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${errors.name ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="Enter item name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${errors.category ? "border-red-500" : "border-gray-300"
              }`}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price (₹) *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${errors.price ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="Enter price"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>

        {/* Prep Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prep Time (minutes) *
          </label>
          <input
            type="number"
            name="prepTime"
            value={formData.prepTime}
            onChange={handleChange}
            min="1"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${errors.prepTime ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="Enter prep time"
          />
          {errors.prepTime && (
            <p className="text-red-500 text-sm mt-1">{errors.prepTime}</p>
          )}
        </div>

        {/* Tags Management */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (Max 3 tags, 12 chars each)
          </label>
          <div className="space-y-3">
            {/* Add Tag Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={handleTagInput}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
                maxLength={12}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Enter tag (max 12 chars)"
                disabled={formData.tags.length >= 3}
              />
              <button
                type="button"
                onClick={addTag}
                disabled={
                  !newTag.trim() ||
                  formData.tags.length >= 3 ||
                  formData.tags.includes(newTag.trim())
                }
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>

            {/* Character Counter */}
            <div className="text-sm text-gray-400">
              {newTag.length}/12 characters • {formData.tags.length}/3 tags
            </div>

            {/* Display Tags */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Image
          </label>
          <div className="space-y-4">
            {/* Upload Button */}
            <div className="flex items-center gap-4">
              <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="flex items-center gap-2 text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  {uploadingImage ? "Uploading..." : "Choose Image"}
                </div>
              </label>
              <span className="text-sm text-gray-500">
                Max 2MB • JPG, PNG, GIF
              </span>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview("");
                    setFormData((prev) => ({ ...prev, image: "" }));
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}

            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image}</p>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description * (Max 60 characters)
        </label>
        <div className="relative">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            maxLength={60}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${errors.description ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="Enter item description (max 60 characters)"
          />
          <div className="absolute bottom-2 right-2 text-sm text-gray-400">
            {formData.description.length}/60
          </div>
        </div>
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      {/* Checkboxes */}
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isVeg"
            checked={formData.isVeg}
            onChange={handleChange}
            className="rounded text-red-600 focus:ring-red-500"
          />
          <span className="text-sm font-medium text-gray-700">Vegetarian</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={handleChange}
            className="rounded text-red-600 focus:ring-red-500"
          />
          <span className="text-sm font-medium text-gray-700">Available</span>
        </label>
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 pt-4 border-t">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
        >
          {item ? "Update Item" : "Add Item"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
