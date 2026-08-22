import { ErrorBoundary } from '@/app/ErrorBoundary';
import { AppProfiler } from '@/app/performance';

import { AppBootstrap } from './AppBootstrap';

export function App() {
  return (
    <AppProfiler id="App">
      <ErrorBoundary>
        <AppBootstrap />
      </ErrorBoundary>
    </AppProfiler>
  );
}

App.displayName = 'App';
