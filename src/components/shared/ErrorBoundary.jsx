import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error(
      "ErrorBoundary caught an error:",
      error?.message || String(error),
      errorInfo?.componentStack || "No stack trace"
    );

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-light-gray p-4">
          <div className="bg-white rounded-lg shadow-subtle p-8 max-w-md w-full text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-error-red rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⚠️</span>
              </div>
              <h2 className="text-2xl font-bold text-error-red mb-2">
                Oops! Something went wrong
              </h2>
              <p className="text-gray-600 mb-4">
                We're sorry, but something unexpected happened. Please try
                refreshing the page.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-dark-red text-white py-2 px-4 rounded-lg hover:bg-hover-red transition-colors"
              >
                Refresh Page
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Go to Home
              </button>
            </div>

            {/* Show error details in development */}
            {process.env.NODE_ENV === "development" && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Error Details (Development Only)
                </summary>
                <div className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-40">
                  <div className="mb-2">
                    <strong>Error:</strong>{" "}
                    {this.state.error && this.state.error.toString()}
                  </div>
                  <div>
                    <strong>Stack Trace:</strong>
                    <pre className="whitespace-pre-wrap">
                      {this.state.errorInfo?.componentStack ||
                        "No stack trace available"}
                    </pre>
                  </div>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    // No error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
