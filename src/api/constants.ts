/**
 * Эндпоинты из dist/:
 * - apiLobby.php — лобби, инициализация (initV2, getTranslation и т.д.)
 *
 * На сервере уже лежит apiLobby.php, proxy.php не используем.
 * В dev CORS обходим через Vite server.proxy → /apiLobby.php.
 */
export const API_LOBBY_PATH = 'apiLobby.php';
