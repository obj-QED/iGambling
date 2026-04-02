import { BrowserRouter } from 'react-router-dom';

import { GlobalPreloaderRemover } from '@/app/bootstrap/GlobalPreloaderRemover';
import { AppRoutes } from '@/app/routing/AppRoutes';

export function App() {
  return (
    <BrowserRouter>
      <GlobalPreloaderRemover />
      <AppRoutes />
    </BrowserRouter>
  );
}

App.displayName = 'App';
