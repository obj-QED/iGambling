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
  /** Первый URL захода (включая прямой переход на /profile, /auth и т.д.) — не «только главная». */
  const initialPath = typeof window !== 'undefined' ? (window.location.pathname || '/') : '/';
  setInitialPath(initialPath);

  // Prefetch init/translation для этого же initialPath; не ждём до render — скелетон хедера видит pending/fetching.
  void prefetchInitData(queryClient, language, initialPath).catch((error) => {
    console.error('[bootstrap] prefetch failed', error);
  });

  try {
    // Прогрев частых страниц; маршрут при заходе не с Home всё равно подгрузит свой lazy-чанк из routes.
    await Promise.all([import('@/pages/Home/HomePage'), import('@/pages/Login/LoginPage')]);
  } catch (error) {
    console.error('[bootstrap] chunk load failed', error);
  }

  root.render(
    <StrictMode>
      <Providers>
        <App />
      </Providers>
    </StrictMode>
  );
})();
