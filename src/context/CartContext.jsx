import React, { createContext, useContext, useReducer, useEffect } from "react";
import { storageManager } from "../utils/localStorage.js";
import { vibrationUtils } from "../utils/vibration.js";

// Cart context
const CartContext = createContext();

// Cart actions
const CART_ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
  APPLY_PROMO: "APPLY_PROMO",
  REMOVE_PROMO: "REMOVE_PROMO",
  SET_DELIVERY_ADDRESS: "SET_DELIVERY_ADDRESS",
  SET_PAYMENT_METHOD: "SET_PAYMENT_METHOD",
  LOAD_CART: "LOAD_CART",
};

// Initial state
const initialState = {
  items: [],
  subtotal: 0,
  discount: 0,
  deliveryFee: 30,
  total: 0,
  promoCode: null,
  deliveryAddress: null,
  paymentMethod: "cod",
  itemCount: 0,
};

// Cart reducer
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let newItems;
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      return calculateTotals({ ...state, items: newItems });
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const newItems = state.items.filter((item) => item.id !== action.payload);
      return calculateTotals({ ...state, items: newItems });
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { itemId, quantity } = action.payload;

      if (quantity <= 0) {
        const newItems = state.items.filter((item) => item.id !== itemId);
        return calculateTotals({ ...state, items: newItems });
      }

      const newItems = state.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      return calculateTotals({ ...state, items: newItems });
    }

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...initialState,
        deliveryAddress: state.deliveryAddress,
        paymentMethod: state.paymentMethod,
      };

    case CART_ACTIONS.APPLY_PROMO:
      return calculateTotals({
        ...state,
        promoCode: action.payload.promoCode,
        discount: action.payload.discount,
      });

    case CART_ACTIONS.REMOVE_PROMO:
      return calculateTotals({
        ...state,
        promoCode: null,
        discount: 0,
      });

    case CART_ACTIONS.SET_DELIVERY_ADDRESS:
      return { ...state, deliveryAddress: action.payload };

    case CART_ACTIONS.SET_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };

    case CART_ACTIONS.LOAD_CART:
      return calculateTotals(action.payload);

    default:
      return state;
  }
}

// Helper function to calculate totals
function calculateTotals(state) {
  // Ensure items is an array
  const items = Array.isArray(state.items) ? state.items : [];

  const subtotal = items.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + price * quantity;
  }, 0);

  const itemCount = items.reduce((sum, item) => {
    const quantity = Number(item.quantity) || 0;
    return sum + quantity;
  }, 0);

  const discount = Number(state.discount) || 0;
  const deliveryFee = Number(state.deliveryFee) || 0;
  const total = subtotal - discount + deliveryFee;

  return {
    ...state,
    items,
    subtotal: Number(subtotal.toFixed(2)),
    total: Number(Math.max(0, total).toFixed(2)),
    itemCount,
    discount,
    deliveryFee,
  };
}

// Cart provider component
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = storageManager.getCartData();
    if (savedCart && savedCart.items && savedCart.items.length > 0) {
      dispatch({ type: CART_ACTIONS.LOAD_CART, payload: savedCart });
    }
  }, []);

  // Save cart to localStorage whenever state changes
  useEffect(() => {
    storageManager.setCartData(state);
  }, [state]);

  // Add item to cart
  const addItem = (item) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: item });

    // Trigger vibration on mobile for haptic feedback
    vibrationUtils.addToCart();
  };

  // Remove item from cart
  const removeItem = (itemId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: itemId });

    // Light vibration for remove action
    vibrationUtils.light();
  };

  // Update item quantity
  const updateQuantity = (itemId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { itemId, quantity },
    });
  };

  // Clear entire cart
  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  // Apply promo code
  const applyPromo = (promoCode, discount) => {
    dispatch({
      type: CART_ACTIONS.APPLY_PROMO,
      payload: { promoCode, discount },
    });

    // Success vibration for promo code applied
    vibrationUtils.success();
  };

  // Remove promo code
  const removePromo = () => {
    dispatch({ type: CART_ACTIONS.REMOVE_PROMO });
  };

  // Set delivery address
  const setDeliveryAddress = (address) => {
    dispatch({ type: CART_ACTIONS.SET_DELIVERY_ADDRESS, payload: address });
  };

  // Set payment method
  const setPaymentMethod = (method) => {
    dispatch({ type: CART_ACTIONS.SET_PAYMENT_METHOD, payload: method });
  };

  // Get item quantity in cart
  const getItemQuantity = (itemId) => {
    const item = state.items.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  };

  // Check if item is in cart
  const isItemInCart = (itemId) => {
    return state.items.some((item) => item.id === itemId);
  };

  // Get cart summary for order
  const getOrderSummary = () => {
    return {
      items: state.items.map((item) => ({
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        specialInstructions: item.specialInstructions || "",
      })),
      subtotal: state.subtotal,
      discount: state.discount,
      deliveryFee: state.deliveryFee,
      total: state.total,
      promoCode: state.promoCode?.code || "",
      deliveryAddress: state.deliveryAddress,
      paymentMethod: state.paymentMethod,
    };
  };

  const value = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyPromo,
    removePromo,
    setDeliveryAddress,
    setPaymentMethod,
    getItemQuantity,
    isItemInCart,
    getOrderSummary,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
