import { BrowserRouter } from 'react-router-dom';

import { GlobalPreloaderRemover } from '@/app/bootstrap/GlobalPreloaderRemover';
import { ErrorBoundary } from '@/app/ErrorBoundary';
import { AppRoutes } from '@/app/routing/AppRoutes';

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <GlobalPreloaderRemover />
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

App.displayName = 'App';
