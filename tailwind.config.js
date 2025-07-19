/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "dark-red": "#7B1E1E",
        "deep-red": "#8B0000",
        "hover-red": "#B71C1C",
        "golden-yellow": "#FFD700",
        "warm-yellow": "#FFC107",
        "spicy-orange": "#FF9800",
        "light-gray": "#F5F5F5",
        "medium-gray": "#CCCCCC",
        "success-green": "#4CAF50",
        "info-blue": "#2196F3",
        "error-red": "#F44336",
        "leafy-green": "#7BB661",
        "lettuce-green": "#AED581",
        "meat-brown": "#6D4C41",
        "golden-brown": "#D2691E",
        "chili-red": "#D32F2F",
        "border-gray": "#DDDDDD",
      },
      boxShadow: {
        subtle: "0 4px 6px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
