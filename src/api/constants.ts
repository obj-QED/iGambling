/**
 * Эндпоинты из dist/:
 * - /apiLobby.php — лобби, инициализация (initV2, getTranslation и т.д.)
 *
 * Leading `/` is required: relative `apiLobby.php` breaks on SPA deep links
 * (e.g. `/profile/activation` → browser requests `/profile/apiLobby.php`).
 *
 * На сервере уже лежит apiLobby.php, proxy.php не используем.
 * В dev CORS обходим через Vite server.proxy → /apiLobby.php.
 */
export const API_LOBBY_PATH = '/apiLobby.php';
