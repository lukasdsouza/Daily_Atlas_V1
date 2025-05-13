
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center h-[50vh] p-4 text-center">
          <div className="cosmos-card w-full max-w-md">
            <h2 className="text-xl font-title text-space-bright mb-4">
              Houston, We Have a Problem!
            </h2>
            <p className="mb-4 text-muted-foreground">
              Something went wrong with this component. Try refreshing the page or using a different browser.
            </p>
            {this.state.error && (
              <div className="mb-4 mt-2 p-2 bg-black/40 rounded-md text-left overflow-auto max-h-32 text-xs text-red-400">
                <p>Error: {this.state.error.toString()}</p>
              </div>
            )}
            <button
              className="space-button"
              onClick={() => this.setState({ hasError: false })}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
