import React from "react";

// Main layout wrapper
export function Layout({ children, className = "" }) {
  return (
    <div className={`min-h-screen bg-light-gray ${className}`}>{children}</div>
  );
}

// Container component
export function Container({ children, size = "default", className = "" }) {
  const sizeClasses = {
    sm: "max-w-2xl",
    default: "max-w-6xl",
    lg: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <div className={`container mx-auto px-4 ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
}

// Card component
export function Card({ children, className = "", padding = "default" }) {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    default: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-subtle ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
}

// Section component
export function Section({ children, className = "", padding = "default" }) {
  const paddingClasses = {
    none: "",
    sm: "py-4",
    default: "py-8",
    lg: "py-12",
  };

  return (
    <section className={`${paddingClasses[padding]} ${className}`}>
      {children}
    </section>
  );
}

// Grid component
export function Grid({ children, cols = 1, gap = 4, className = "" }) {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
    6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
  };

  const gapClasses = {
    2: "gap-2",
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
  };

  return (
    <div className={`grid ${colClasses[cols]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
}

// Flex component
export function Flex({
  children,
  direction = "row",
  align = "start",
  justify = "start",
  wrap = false,
  gap = 0,
  className = "",
}) {
  const directionClasses = {
    row: "flex-row",
    col: "flex-col",
    "row-reverse": "flex-row-reverse",
    "col-reverse": "flex-col-reverse",
  };

  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };

  const gapClasses = {
    0: "",
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
  };

  return (
    <div
      className={`
      flex 
      ${directionClasses[direction]} 
      ${alignClasses[align]} 
      ${justifyClasses[justify]}
      ${wrap ? "flex-wrap" : ""}
      ${gapClasses[gap]}
      ${className}
    `}
    >
      {children}
    </div>
  );
}

// Button component
export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) {
  const baseClasses =
    "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-dark-red text-white hover:bg-hover-red focus:ring-dark-red",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
    success:
      "bg-success-green text-white hover:bg-green-600 focus:ring-success-green",
    danger: "bg-error-red text-white hover:bg-red-600 focus:ring-error-red",
    warning:
      "bg-warm-yellow text-black hover:bg-yellow-600 focus:ring-warm-yellow",
    outline:
      "border-2 border-dark-red text-dark-red hover:bg-dark-red hover:text-white focus:ring-dark-red",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
}
