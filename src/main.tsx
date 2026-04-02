import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/app/bootstrap/App';
import { Providers } from '@/app/providers/Providers';
import { setInitialPath } from '@/app/routing/state/initialPath';

import { prefetchInitData } from '@/api/lobby';
import { queryClient } from '@/api/queryClient';
import { getBrowserLanguage } from '@/hooks/useLanguage';

import '@/assets/styles/global.scss';
import '@/assets/styles/fonts.scss';
import '@/assets/theme/root.scss';

const root = createRoot(document.getElementById('root')!);

(async function bootstrap() {
  const language = getBrowserLanguage();
  const initialPath = typeof window !== 'undefined' ? (window.location.pathname || '/') : '/';
  setInitialPath(initialPath);

  try {
    // Параллельно: данные + JS-чанк страницы входа → нет мелькания Suspense при первом рендере
    await Promise.all([
      prefetchInitData(queryClient, language, initialPath),
      import('@/pages/Home/HomePage'),
      import('@/pages/Login/LoginPage'),
    ]);
  } catch (error) {
    // Не блокируем первый рендер при временных сетевых ошибках bootstrap.
    console.error('[bootstrap] prefetch failed', error);
    if (typeof window !== 'undefined' && window.location.pathname !== '/500') {
      window.history.replaceState({}, '', '/500');
      setInitialPath('/500');
    }
  }

  root.render(
    <StrictMode>
      <Providers>
        <App />
      </Providers>
    </StrictMode>
  );
})();
