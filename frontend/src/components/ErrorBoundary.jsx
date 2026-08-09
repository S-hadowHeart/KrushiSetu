import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // In a production app this would report to an error-tracking service.
    console.error('Unhandled UI error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen flex-col items-center justify-center gap-3 bg-paper text-center">
          <AlertTriangle className="h-10 w-10 text-mustard-500" />
          <h1 className="font-display text-xl font-semibold text-field-900">Something went wrong</h1>
          <p className="max-w-sm text-sm text-field-500">
            Please refresh the page. If the problem continues, try again later.
          </p>
          <button className="btn-primary" onClick={() => window.location.reload()}>
            Refresh
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
