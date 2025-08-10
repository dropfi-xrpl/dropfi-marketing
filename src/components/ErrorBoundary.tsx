import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl p-8 max-w-md w-full text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-red-500/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-medium">Oops! Something went wrong</h2>
              <p className="text-muted-foreground">We encountered an unexpected error. Please try refreshing the page.</p>
            </div>

            {this.state.error && (
              <details className="text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">Error details</summary>
                <pre className="mt-2 text-xs bg-muted/20 p-3 rounded-lg overflow-auto">{this.state.error.toString()}</pre>
              </details>
            )}

            <Button onClick={this.handleReset} className="w-full" size="lg">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
