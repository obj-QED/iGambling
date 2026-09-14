import type { ErrorInfo, ReactNode } from 'react';

import { Component } from 'react';

import { ServerErrorPage } from './ServerErrorPage';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<Props, State> {
  static displayName = 'ErrorBoundary';

  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <ServerErrorPage
            detail={
              import.meta.env.DEV && this.state.error != null ? this.state.error.message : undefined
            }
          />
        )
      );
    }
    return this.props.children;
  }
}
