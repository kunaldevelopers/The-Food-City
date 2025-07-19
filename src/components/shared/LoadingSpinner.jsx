import React from "react";

export default function LoadingSpinner({
  size = "md",
  color = "dark-red",
  text = "",
}) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const colorClasses = {
    "dark-red": "border-dark-red",
    white: "border-white",
    gray: "border-gray-500",
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`animate-spin rounded-full border-b-2 ${sizeClasses[size]} ${colorClasses[color]}`}
      ></div>
      {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
    </div>
  );
}

// Full screen loading component
export function FullScreenLoader({ text = "Loading..." }) {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
}

// Inline loading component
export function InlineLoader({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center py-8">
      <LoadingSpinner size="md" text={text} />
    </div>
  );
}
