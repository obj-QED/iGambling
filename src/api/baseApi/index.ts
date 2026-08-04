import axios from 'axios';

const baseURL = import.meta.env.VITE_APP_URL ?? '';
// Для lobby используем относительный URL:
// - в dev: /apiLobby.php → Vite server.proxy → {VITE_APP_URL}/apiLobby.php (обход CORS)
// - в prod: /apiLobby.php на том же домене, что и фронт
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

/** Клиент для api.php (терминал, сессия, core) */
export const baseApi = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

baseApi.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status >= 500) {
      return Promise.reject(new ServerError(err.response.status));
    }
    return Promise.reject(err);
  },
);

baseApi.interceptors.request.use((config) => {
  config.headers['X-Request-Id'] = getRequestId();
  return config;
});

/** Клиент для apiLobby.php (лобби, initV2). URL из VITE_LOBBY_API_URL (.env). */
export const lobbyApiClient = axios.create({
  baseURL: lobbyBaseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

lobbyApiClient.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status >= 500) {
      return Promise.reject(new ServerError(err.response.status));
    }
    return Promise.reject(err);
  },
);

lobbyApiClient.interceptors.request.use((config) => {
  config.headers['X-Request-Id'] = getRequestId();
  return config;
});
