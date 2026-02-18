import React, { createContext, useContext, useReducer, useEffect } from "react";
import { mockAPI } from "../services/mockApi.js";
import { storageManager } from "../utils/localStorage.js";

// Auth context
const AuthContext = createContext();

// Auth actions
const AUTH_ACTIONS = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  REGISTER_START: "REGISTER_START",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILURE: "REGISTER_FAILURE",
  LOGOUT: "LOGOUT",
  CLEAR_ERROR: "CLEAR_ERROR",
  SET_USER: "SET_USER",
  INIT_COMPLETE: "INIT_COMPLETE",
};

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading true
  error: null,
};

// Auth reducer
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };

    case AUTH_ACTIONS.INIT_COMPLETE:
      return {
        ...state,
        isLoading: false,
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

// Auth provider component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const savedUser = storageManager.getUserSession();
        if (savedUser) {
          dispatch({ type: AUTH_ACTIONS.SET_USER, payload: savedUser });
        } else {
          dispatch({ type: AUTH_ACTIONS.INIT_COMPLETE });
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        dispatch({ type: AUTH_ACTIONS.INIT_COMPLETE });
      }
    };

    // Add a small delay to ensure localStorage is ready
    setTimeout(initializeAuth, 100);
  }, []);

  // Login function
  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });

    try {
      const response = await mockAPI.login(credentials);

      if (response.success) {
        storageManager.setUserSession(response.user);
        dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: response.user });
        return { success: true, message: response.message };
      } else {
        dispatch({
          type: AUTH_ACTIONS.LOGIN_FAILURE,
          payload: response.message,
        });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = "Login failed. Please try again.";
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: errorMessage });
      return { success: false, message: errorMessage };
    }
  };

  // Register function
  const register = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.REGISTER_START });

    try {
      const response = await mockAPI.register(userData);

      if (response.success) {
        storageManager.setUserSession(response.user);
        dispatch({
          type: AUTH_ACTIONS.REGISTER_SUCCESS,
          payload: response.user,
        });
        return { success: true, message: response.message };
      } else {
        dispatch({
          type: AUTH_ACTIONS.REGISTER_FAILURE,
          payload: response.message,
        });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = "Registration failed. Please try again.";
      dispatch({ type: AUTH_ACTIONS.REGISTER_FAILURE, payload: errorMessage });
      return { success: false, message: errorMessage };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await mockAPI.logout();
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error?.message || String(error));
      // Force logout even if API call fails
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      return { success: true };
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Update user function
  const updateUser = (userData) => {
    const updatedUser = { ...state.user, ...userData };
    storageManager.setUserSession(updatedUser);
    dispatch({ type: AUTH_ACTIONS.SET_USER, payload: updatedUser });
  };

  // Check if user is admin
  const isAdmin = () => {
    return state.user?.role === "admin";
  };

  // Check if user is customer
  const isCustomer = () => {
    return state.user?.role === "customer";
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
    updateUser,
    isAdmin,
    isCustomer,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// HOC for protected routes
export function withAuth(Component, requiredRole = null) {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated, user, isLoading } = useAuth();

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark-red"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-light-gray">
          <div className="bg-white p-8 rounded-lg shadow-subtle max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-dark-red text-center mb-4">
              Access Denied
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Please log in to access this page.
            </p>
            <button
              onClick={() => (window.location.href = "/login")}
              className="w-full bg-dark-red text-white py-2 px-4 rounded-lg hover:bg-hover-red transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      );
    }

    if (requiredRole && user?.role !== requiredRole) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-light-gray">
          <div className="bg-white p-8 rounded-lg shadow-subtle max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-error-red text-center mb-4">
              Unauthorized
            </h2>
            <p className="text-gray-600 text-center mb-6">
              You don't have permission to access this page.
            </p>
            <button
              onClick={() => window.history.back()}
              className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
