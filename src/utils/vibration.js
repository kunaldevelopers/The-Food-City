// Vibration utility for mobile haptic feedback
export const vibrationUtils = {
  // Check if vibration is supported
  isSupported: () => {
    return "vibrate" in navigator || "webkitVibrate" in navigator;
  },

  // Basic vibration patterns
  patterns: {
    light: 50, // Light tap (50ms)
    medium: 100, // Medium tap (100ms)
    heavy: 200, // Heavy tap (200ms)
    success: [100, 50, 100], // Success pattern (vibrate-pause-vibrate)
    error: [200, 100, 200, 100, 200], // Error pattern
    addToCart: [75, 25, 75], // Add to cart pattern
    button: 25, // Button tap
  },

  // Vibrate with pattern
  vibrate: (pattern) => {
    if (!vibrationUtils.isSupported()) {
      console.log("Vibration not supported on this device");
      return false;
    }

    try {
      // Use standard vibrate or webkit fallback
      if (navigator.vibrate) {
        navigator.vibrate(pattern);
      } else if (navigator.webkitVibrate) {
        navigator.webkitVibrate(pattern);
      }
      return true;
    } catch (error) {
      console.warn("Vibration failed:", error);
      return false;
    }
  },

  // Convenience methods
  light: () => vibrationUtils.vibrate(vibrationUtils.patterns.light),
  medium: () => vibrationUtils.vibrate(vibrationUtils.patterns.medium),
  heavy: () => vibrationUtils.vibrate(vibrationUtils.patterns.heavy),
  success: () => vibrationUtils.vibrate(vibrationUtils.patterns.success),
  error: () => vibrationUtils.vibrate(vibrationUtils.patterns.error),
  addToCart: () => vibrationUtils.vibrate(vibrationUtils.patterns.addToCart),
  button: () => vibrationUtils.vibrate(vibrationUtils.patterns.button),

  // Stop all vibrations
  stop: () => {
    if (vibrationUtils.isSupported()) {
      navigator.vibrate(0);
    }
  },
};
