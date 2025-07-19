// Form validation utilities

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return "";
};

// Password validation
export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters long";
  if (!/(?=.*[a-z])/.test(password))
    return "Password must contain at least one lowercase letter";
  if (!/(?=.*[A-Z])/.test(password))
    return "Password must contain at least one uppercase letter";
  if (!/(?=.*\d)/.test(password))
    return "Password must contain at least one number";
  if (!/(?=.*[!@#$%^&*])/.test(password))
    return "Password must contain at least one special character";
  return "";
};

// Phone validation
export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  if (!phone) return "Phone number is required";
  if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, "")))
    return "Please enter a valid phone number";
  return "";
};

// Name validation
export const validateName = (name) => {
  if (!name) return "Name is required";
  if (name.length < 2) return "Name must be at least 2 characters long";
  if (!/^[a-zA-Z\s]+$/.test(name))
    return "Name can only contain letters and spaces";
  return "";
};

// PIN code validation
export const validatePinCode = (pinCode) => {
  const pinRegex = /^[1-9][0-9]{5}$/;
  if (!pinCode) return "PIN code is required";
  if (!pinRegex.test(pinCode)) return "Please enter a valid 6-digit PIN code";
  return "";
};

// Address validation
export const validateAddress = (address) => {
  const errors = {};

  if (!address.street || address.street.trim().length < 5) {
    errors.street = "Street address must be at least 5 characters long";
  }

  if (!address.city || address.city.trim().length < 2) {
    errors.city = "City is required";
  }

  if (!address.state || address.state.trim().length < 2) {
    errors.state = "State is required";
  }

  const pinError = validatePinCode(address.pinCode);
  if (pinError) {
    errors.pinCode = pinError;
  }

  return errors;
};

// Price validation
export const validatePrice = (price) => {
  if (!price && price !== 0) return "Price is required";
  if (isNaN(price) || price < 0) return "Price must be a valid positive number";
  if (price > 10000) return "Price cannot exceed ₹10,000";
  return "";
};

// Quantity validation
export const validateQuantity = (quantity) => {
  if (!quantity && quantity !== 0) return "Quantity is required";
  if (isNaN(quantity) || quantity < 1) return "Quantity must be at least 1";
  if (quantity > 50) return "Quantity cannot exceed 50";
  return "";
};

// Promo code validation
export const validatePromoCode = (code) => {
  if (!code) return "Promo code is required";
  if (code.length < 3) return "Promo code must be at least 3 characters long";
  if (!/^[A-Z0-9]+$/.test(code))
    return "Promo code can only contain uppercase letters and numbers";
  return "";
};

// Generic required field validation
export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === "string" && value.trim() === "")) {
    return `${fieldName} is required`;
  }
  return "";
};

// Form validation helper
export const validateForm = (formData, validationRules) => {
  const errors = {};

  Object.keys(validationRules).forEach((field) => {
    const rules = validationRules[field];
    const value = formData[field];

    for (const rule of rules) {
      const error = rule(value);
      if (error) {
        errors[field] = error;
        break; // Stop at first error for this field
      }
    }
  });

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

// Common validation rule sets
export const validationRules = {
  login: {
    email: [validateEmail],
    password: [validateRequired],
  },
  register: {
    name: [validateName],
    email: [validateEmail],
    password: [validatePassword],
    phone: [validatePhone],
  },
  menuItem: {
    name: [(value) => validateRequired(value, "Item name")],
    description: [(value) => validateRequired(value, "Description")],
    price: [validatePrice],
    category: [(value) => validateRequired(value, "Category")],
  },
  address: {
    street: [(value) => validateRequired(value, "Street address")],
    city: [(value) => validateRequired(value, "City")],
    state: [(value) => validateRequired(value, "State")],
    pinCode: [validatePinCode],
  },
};
