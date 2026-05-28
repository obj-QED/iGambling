import type { ErrorInfo, ReactNode } from 'react';

import { Component } from 'react';

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
          <main style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Ошибка интерфейса</h1>
            <p>Приложение столкнулось с непредвиденной ошибкой. Попробуйте обновить страницу или зайти позже.</p>
            {import.meta.env.DEV && this.state.error != null ? (
              <pre
                style={{
                  marginTop: '1rem',
                  textAlign: 'left',
                  overflow: 'auto',
                  maxWidth: '48rem',
                  marginInline: 'auto',
                  padding: '1rem',
                  background: 'var(--color-bg-body, #f5f5f5)',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                }}
              >
                {this.state.error.message}
              </pre>
            ) : null}
            <p style={{ marginTop: '1.5rem' }}>
              <a href="/auth">Вход</a>
            </p>
          </main>
        )
      );
    }
    return this.props.children;
  }
}
