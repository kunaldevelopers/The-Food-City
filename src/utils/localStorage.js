// Local storage utilities for The Food City

const STORAGE_KEYS = {
  USER_SESSION: "foodcity_user_session",
  CART_DATA: "foodcity_cart",
  MENU_ITEMS: "foodcity_menu_items",
  ORDERS: "foodcity_orders",
  PROMO_CODES: "foodcity_promo_codes",
  DELIVERY_BOYS: "foodcity_delivery_boys",
  REVIEWS: "foodcity_reviews",
  USERS: "foodcity_users",
  ANALYTICS: "foodcity_analytics",
};

class LocalStorageManager {
  // Generic methods
  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(
        "Error saving to localStorage:",
        error?.message || String(error)
      );
      return false;
    }
  }

  getItem(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(
        "Error reading from localStorage:",
        error?.message || String(error)
      );
      return null;
    }
  }

  removeItem(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(
        "Error removing from localStorage:",
        error?.message || String(error)
      );
      return false;
    }
  }

  // User session management
  setUserSession(user) {
    return this.setItem(STORAGE_KEYS.USER_SESSION, user);
  }

  getUserSession() {
    return this.getItem(STORAGE_KEYS.USER_SESSION);
  }

  clearUserSession() {
    return this.removeItem(STORAGE_KEYS.USER_SESSION);
  }

  // Cart management
  setCartData(cartData) {
    return this.setItem(STORAGE_KEYS.CART_DATA, cartData);
  }

  getCartData() {
    return this.getItem(STORAGE_KEYS.CART_DATA) || { items: [], total: 0 };
  }

  clearCartData() {
    return this.removeItem(STORAGE_KEYS.CART_DATA);
  }

  // Menu items management
  setMenuItems(menuItems) {
    return this.setItem(STORAGE_KEYS.MENU_ITEMS, menuItems);
  }

  getMenuItems() {
    return this.getItem(STORAGE_KEYS.MENU_ITEMS) || [];
  }

  // Orders management
  setOrders(orders) {
    return this.setItem(STORAGE_KEYS.ORDERS, orders);
  }

  getOrders() {
    return this.getItem(STORAGE_KEYS.ORDERS) || [];
  }

  addOrder(order) {
    const orders = this.getOrders();
    orders.push(order);
    return this.setOrders(orders);
  }

  updateOrder(orderId, updates) {
    const orders = this.getOrders();
    const orderIndex = orders.findIndex((order) => order.id === orderId);
    if (orderIndex !== -1) {
      orders[orderIndex] = { ...orders[orderIndex], ...updates };
      return this.setOrders(orders);
    }
    return false;
  }

  // Promo codes management
  setPromoCodes(promoCodes) {
    return this.setItem(STORAGE_KEYS.PROMO_CODES, promoCodes);
  }

  getPromoCodes() {
    return this.getItem(STORAGE_KEYS.PROMO_CODES) || [];
  }

  // Delivery boys management
  setDeliveryBoys(deliveryBoys) {
    return this.setItem(STORAGE_KEYS.DELIVERY_BOYS, deliveryBoys);
  }

  getDeliveryBoys() {
    return this.getItem(STORAGE_KEYS.DELIVERY_BOYS) || [];
  }

  // Reviews management
  setReviews(reviews) {
    return this.setItem(STORAGE_KEYS.REVIEWS, reviews);
  }

  getReviews() {
    return this.getItem(STORAGE_KEYS.REVIEWS) || [];
  }

  addReview(review) {
    const reviews = this.getReviews();
    reviews.push(review);
    return this.setReviews(reviews);
  }

  // Users management
  setUsers(users) {
    return this.setItem(STORAGE_KEYS.USERS, users);
  }

  getUsers() {
    return this.getItem(STORAGE_KEYS.USERS) || [];
  }

  // Analytics management
  setAnalytics(analytics) {
    return this.setItem(STORAGE_KEYS.ANALYTICS, analytics);
  }

  getAnalytics() {
    return this.getItem(STORAGE_KEYS.ANALYTICS) || {};
  }

  // Initialize with default data
  initializeDefaultData(defaultData) {
    // Always update menu items to get latest additions
    this.setMenuItems(defaultData.menuItems);

    // Check if users contain old data (John Doe) or missing new data (Mohit Kumar) and force update if so
    const currentUsers = this.getUsers();
    const hasOldData = currentUsers.some(
      (u) => u.name === "John Doe" || u.name === "Jane Smith"
    );
    const missingNewData = !currentUsers.some((u) => u.name === "Mohit Kumar");

    if (!currentUsers.length || hasOldData || missingNewData) {
      this.setUsers(defaultData.users);
      // Also reset orders if we reset users to avoid ID mismatches
      this.setOrders(defaultData.orders);
    }

    // Check for expired promo codes and force update
    const currentPromos = this.getPromoCodes();
    const hasExpiredPromos = currentPromos.some(
      (p) => new Date(p.expiryDate) < new Date()
    );

    if (!currentPromos.length || hasExpiredPromos) {
      this.setPromoCodes(defaultData.promoCodes);
    }
    if (!this.getDeliveryBoys().length) {
      this.setDeliveryBoys(defaultData.deliveryBoys);
    }

    // Check analytics for old data
    const analytics = this.getAnalytics();
    const hasOldAnalytics =
      analytics.topCustomers &&
      analytics.topCustomers.some((c) => c.name === "John Doe");

    if (!Object.keys(analytics).length || hasOldAnalytics) {
      this.setAnalytics(defaultData.analytics);
    }

    if (!this.getReviews().length) {
      this.setReviews(defaultData.reviews);
    }
  }

  // Clear all data (for testing/reset)
  clearAllData() {
    Object.values(STORAGE_KEYS).forEach((key) => {
      this.removeItem(key);
    });
  }
}

export const storageManager = new LocalStorageManager();
export { STORAGE_KEYS };
