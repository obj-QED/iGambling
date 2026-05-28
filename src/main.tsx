import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/app/bootstrap/App';
import { Providers } from '@/app/providers/Providers';
import { setInitialPath } from '@/app/routing/state/initialPath';

import { prefetchInitData, setLobbySessionDevToken } from '@api/lobby';
import { queryClient } from '@api/queryClient';
import { getBrowserLanguage } from '@hooks/useLanguage';

import '@/assets/styles/base.css';
import '@/assets/styles/global.scss';
import '@/assets/styles/fonts.scss';
import '@/assets/theme/root.scss';

import '@/assets/settings/index.js';

const root = createRoot(document.getElementById('root')!);

(async function bootstrap() {
  const language = getBrowserLanguage();
  const initialPath = typeof window !== 'undefined' ? (window.location.pathname || '/') : '/';
  setInitialPath(initialPath);

  if (import.meta.env.DEV) {
    const devLobbyToken = import.meta.env.VITE_DEV_LOBBY_TOKEN;
    if (typeof devLobbyToken === 'string' && devLobbyToken.trim()) {
      setLobbySessionDevToken(devLobbyToken);
    }
    if (typeof window !== 'undefined') {
      window.__DEV_SET_LOBBY_TOKEN__ = (t) => {
        setLobbySessionDevToken(t);
      };
    }
  }

  void prefetchInitData(queryClient, language, initialPath).catch((error) => {
    console.error('[bootstrap] prefetch failed', error);
  });

  try {
    await import('@pages/Login/LoginPage');
  } catch (error) {
    console.error('[bootstrap] chunk load failed', error);
  }

  root.render(
    <StrictMode>
      <Providers>
        <App />
      </Providers>
    </StrictMode>,
  );
})();
