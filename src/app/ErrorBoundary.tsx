import type { ErrorInfo, ReactNode } from 'react';

import { Component } from 'react';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  static displayName = 'ErrorBoundary';

  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <main style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>500</h1>
          <p>Ошибка сервера. Попробуйте позже.</p>
          <a href="/">На главную</a>
        </main>
      );
    }
    return this.props.children;
  }
}
