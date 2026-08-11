import axios from 'axios';

import { assertSafeRequestUrl, redactSecrets } from '@api/security';

const baseURL = import.meta.env.VITE_APP_URL ?? '';
// Lobby: relative URL — same origin (prod) or Vite proxy (dev). Enables httpOnly cookies.
const lobbyBaseURL = '';

export class ServerError extends Error {
  status: number;
  constructor(status: number) {
    super(`Server error: ${status}`);
    this.name = 'ServerError';
    this.status = status;
  }
}

function getRequestId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `req_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function attachSecurityInterceptors(
  client: ReturnType<typeof axios.create>,
  defaultBaseURL: string,
) {
  client.interceptors.request.use((config) => {
    const resolvedBase = config.baseURL ?? defaultBaseURL;
    const path = typeof config.url === 'string' ? config.url : undefined;
    assertSafeRequestUrl(path, resolvedBase);
    if (resolvedBase) assertSafeRequestUrl(resolvedBase);

    config.headers['X-Request-Id'] = getRequestId();
    // Mitigate casual CSRF from foreign sites: browser sends Origin; backend must verify.
    if (typeof window !== 'undefined' && window.location.origin) {
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
    }
    return config;
  });

  client.interceptors.response.use(
    (r) => r,
    (err) => {
      if (err?.config) {
        // Prevent tokens leaking into console / error reporters via axios config.
        err.config = redactSecrets(err.config);
      }
      if (err?.response?.data) {
        err.response.data = redactSecrets(err.response.data);
      }
      if (err.response?.status >= 500) {
        return Promise.reject(new ServerError(err.response.status));
      }
      return Promise.reject(err);
    },
  );
}

/** Client for api.php (terminal / session / core). Cookies: withCredentials. */
export const baseApi = axios.create({
  baseURL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
});

attachSecurityInterceptors(baseApi, baseURL);

/** Client for /apiLobby.php. Root-absolute path → same-site cookies; no cross-site credentialed calls. */
export const lobbyApiClient = axios.create({
  baseURL: lobbyBaseURL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
});

attachSecurityInterceptors(lobbyApiClient, lobbyBaseURL);
