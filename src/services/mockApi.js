// Mock API service for The Food City platform

import { storageManager } from "../utils/localStorage.js";
import {
  mockUsers,
  mockMenuItems,
  mockPromoCodes,
  mockDeliveryBoys,
  mockOrders,
  mockReviews,
  mockAnalytics,
} from "../data/mockData.js";

class MockAPIService {
  constructor() {
    this.initializeData();
  }

  // Initialize mock data in localStorage
  initializeData() {
    storageManager.initializeDefaultData({
      users: mockUsers,
      menuItems: mockMenuItems,
      promoCodes: mockPromoCodes,
      deliveryBoys: mockDeliveryBoys,
      orders: mockOrders,
      reviews: mockReviews,
      analytics: mockAnalytics,
    });
  }

  // Simulate API delay
  async delay(ms = 500) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Authentication methods
  async login(credentials) {
    await this.delay(800);

    const users = storageManager.getUsers();
    const user = users.find(
      (u) =>
        u.email === credentials.email &&
        u.password === credentials.password &&
        u.isActive
    );

    if (user) {
      const { password, ...userWithoutPassword } = user;
      storageManager.setUserSession(userWithoutPassword);
      return {
        success: true,
        user: userWithoutPassword,
        message: "Login successful",
      };
    }

    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  async register(userData) {
    await this.delay(1000);

    const users = storageManager.getUsers();
    const existingUser = users.find((u) => u.email === userData.email);

    if (existingUser) {
      return {
        success: false,
        message: "User with this email already exists",
      };
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      role: "customer",
      addresses: [],
      createdAt: new Date(),
      isActive: true,
    };

    users.push(newUser);
    storageManager.setUsers(users);

    const { password, ...userWithoutPassword } = newUser;
    return {
      success: true,
      user: userWithoutPassword,
      message: "Registration successful",
    };
  }

  async logout() {
    await this.delay(300);
    storageManager.clearUserSession();
    return { success: true, message: "Logged out successfully" };
  }

  // Menu methods
  async getMenuItems(filters = {}) {
    await this.delay(400);

    let menuItems = storageManager.getMenuItems();

    // Apply filters
    if (filters.category) {
      menuItems = menuItems.filter(
        (item) => item.category === filters.category
      );
    }

    if (filters.type) {
      menuItems = menuItems.filter((item) => item.type === filters.type);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      menuItems = menuItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    }

    if (filters.minPrice || filters.maxPrice) {
      menuItems = menuItems.filter((item) => {
        const price = item.price;
        return (
          (!filters.minPrice || price >= filters.minPrice) &&
          (!filters.maxPrice || price <= filters.maxPrice)
        );
      });
    }

    return {
      success: true,
      data: menuItems.filter((item) => item.isAvailable),
    };
  }

  async addMenuItem(item) {
    await this.delay(600);

    const menuItems = storageManager.getMenuItems();
    const newItem = {
      id: Date.now().toString(),
      ...item,
      rating: 0,
      reviewCount: 0,
      isAvailable: true,
      createdAt: new Date(),
    };

    menuItems.push(newItem);
    storageManager.setMenuItems(menuItems);

    return {
      success: true,
      data: newItem,
      message: "Menu item added successfully",
    };
  }

  async updateMenuItem(id, updates) {
    await this.delay(500);

    const menuItems = storageManager.getMenuItems();
    const itemIndex = menuItems.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return {
        success: false,
        message: "Menu item not found",
      };
    }

    menuItems[itemIndex] = { ...menuItems[itemIndex], ...updates };
    storageManager.setMenuItems(menuItems);

    return {
      success: true,
      data: menuItems[itemIndex],
      message: "Menu item updated successfully",
    };
  }

  async deleteMenuItem(id) {
    await this.delay(400);

    const menuItems = storageManager.getMenuItems();
    const itemIndex = menuItems.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return {
        success: false,
        message: "Menu item not found",
      };
    }

    // Soft delete - mark as unavailable instead of removing
    menuItems[itemIndex].isAvailable = false;
    storageManager.setMenuItems(menuItems);

    return {
      success: true,
      message: "Menu item deleted successfully",
    };
  }

  // Order methods
  async createOrder(orderData) {
    await this.delay(800);

    const orders = storageManager.getOrders();
    const newOrder = {
      id: `order_${Date.now()}`,
      ...orderData,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    orders.push(newOrder);
    storageManager.setOrders(orders);

    // Simulate delivery assignment
    setTimeout(() => {
      this.simulateDeliveryAssignment(newOrder.id);
    }, 2000);

    return {
      success: true,
      data: newOrder,
      message: "Order placed successfully",
    };
  }

  // Alias for createOrder with proper field mapping
  async placeOrder(orderData) {
    // Map userId to customerId for consistency with existing data structure
    const mappedOrderData = {
      ...orderData,
      customerId: orderData.userId,
    };
    delete mappedOrderData.userId;

    return await this.createOrder(mappedOrderData);
  }

  async getOrders(userId, filters = {}) {
    await this.delay(400);

    let orders = storageManager.getOrders();

    if (userId) {
      orders = orders.filter(
        (order) => order.customerId === userId || order.userId === userId
      );
    }

    if (filters.status) {
      orders = orders.filter((order) => order.status === filters.status);
    }

    return {
      success: true,
      data: orders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ),
    };
  }

  async updateOrderStatus(orderId, status) {
    await this.delay(300);

    const success = storageManager.updateOrder(orderId, {
      status,
      updatedAt: new Date(),
    });

    return {
      success,
      message: success ? "Order status updated" : "Order not found",
    };
  }

  // Promo code methods
  async getPromoCodes() {
    await this.delay(300);

    const promoCodes = storageManager.getPromoCodes();
    const activePromoCodes = promoCodes.filter(
      (promo) => promo.isActive && new Date(promo.expiryDate) > new Date()
    );

    return {
      success: true,
      data: activePromoCodes,
    };
  }

  async validatePromoCode(code, orderValue) {
    await this.delay(400);

    const promoCodes = storageManager.getPromoCodes();
    const promoCode = promoCodes.find(
      (promo) =>
        promo.code === code &&
        promo.isActive &&
        new Date(promo.expiryDate) > new Date()
    );

    if (!promoCode) {
      return {
        success: false,
        message: "Invalid or expired promo code",
      };
    }

    if (orderValue < promoCode.minOrderValue) {
      return {
        success: false,
        message: `Minimum order value should be ₹${promoCode.minOrderValue}`,
      };
    }

    let discount = 0;
    if (promoCode.discountType === "percentage") {
      discount = Math.min(
        (orderValue * promoCode.discountValue) / 100,
        promoCode.maxDiscount
      );
    } else {
      discount = promoCode.discountValue;
    }

    return {
      success: true,
      data: {
        discount,
        promoCode,
      },
      message: `Promo code applied! You saved ₹${discount}`,
    };
  }

  // Delivery methods
  async getDeliveryBoys() {
    await this.delay(300);

    const deliveryBoys = storageManager.getDeliveryBoys();
    return {
      success: true,
      data: deliveryBoys,
    };
  }

  async assignDelivery(orderId) {
    await this.delay(600);

    const deliveryBoys = storageManager.getDeliveryBoys();
    const availableBoys = deliveryBoys.filter((boy) => boy.isAvailable);

    if (availableBoys.length === 0) {
      return {
        success: false,
        message: "No delivery boys available",
      };
    }

    // Assign to random available delivery boy
    const assignedBoy =
      availableBoys[Math.floor(Math.random() * availableBoys.length)];

    // Update delivery boy status
    assignedBoy.currentOrders.push(orderId);
    if (assignedBoy.currentOrders.length >= 3) {
      assignedBoy.isAvailable = false;
    }

    storageManager.setDeliveryBoys(deliveryBoys);

    // Update order with delivery boy
    storageManager.updateOrder(orderId, {
      deliveryBoyId: assignedBoy.id,
      status: "accepted",
    });

    return {
      success: true,
      data: assignedBoy,
      message: "Delivery assigned successfully",
    };
  }

  // Simulate delivery assignment with timeout
  async simulateDeliveryAssignment(orderId) {
    // Wait 2 minutes, then auto-assign if not manually assigned
    setTimeout(async () => {
      const orders = storageManager.getOrders();
      const order = orders.find((o) => o.id === orderId);

      if (order && order.status === "pending") {
        await this.assignDelivery(orderId);
      }
    }, 120000); // 2 minutes
  }

  // Review methods
  async addReview(reviewData) {
    await this.delay(500);

    const reviews = storageManager.getReviews();
    const newReview = {
      id: Date.now().toString(),
      ...reviewData,
      createdAt: new Date(),
      isModerated: false,
    };

    reviews.push(newReview);
    storageManager.setReviews(reviews);

    // Update menu item rating
    this.updateMenuItemRating(reviewData.menuItemId);

    return {
      success: true,
      data: newReview,
      message: "Review added successfully",
    };
  }

  async getReviews(menuItemId) {
    await this.delay(300);

    let reviews = storageManager.getReviews();

    if (menuItemId) {
      reviews = reviews.filter((review) => review.menuItemId === menuItemId);
    }

    return {
      success: true,
      data: reviews,
    };
  }

  // Update menu item rating based on reviews
  updateMenuItemRating(menuItemId) {
    const reviews = storageManager.getReviews();
    const itemReviews = reviews.filter(
      (review) => review.menuItemId === menuItemId
    );

    if (itemReviews.length > 0) {
      const avgRating =
        itemReviews.reduce((sum, review) => sum + review.rating, 0) /
        itemReviews.length;

      this.updateMenuItem(menuItemId, {
        rating: Math.round(avgRating * 10) / 10,
        reviewCount: itemReviews.length,
      });
    }
  }

  // Analytics methods
  async getAnalytics(dateRange) {
    await this.delay(400);

    const analytics = storageManager.getAnalytics();

    // In a real app, this would filter by date range
    return {
      success: true,
      data: analytics,
    };
  }

  // User management methods
  async getUsers() {
    await this.delay(300);

    const users = storageManager.getUsers();
    // Remove passwords from response
    const safeUsers = users.map(({ password, ...user }) => user);

    return {
      success: true,
      data: safeUsers,
    };
  }

  async updateUser(userId, updates) {
    await this.delay(400);

    const users = storageManager.getUsers();
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return {
        success: false,
        message: "User not found",
      };
    }

    users[userIndex] = { ...users[userIndex], ...updates };
    storageManager.setUsers(users);

    const { password, ...userWithoutPassword } = users[userIndex];
    return {
      success: true,
      data: userWithoutPassword,
      message: "User updated successfully",
    };
  }
}

export const mockAPI = new MockAPIService();
