# iGambling

Приложение на **React 19**, **Vite**, **TypeScript**.

## Стек

- React 19, Vite, TypeScript
- React Router 6
- Структура по FDD: `docs/new-project/architecture.md`, `docs/new-project/rules-new-project.md`

## Переменные окружения

- **Локалка (`yarn dev`)**: Vite проксирует `/apiLobby.php` и `/api.php` на `VITE_APP_URL`.
- **Прод (`yarn build`)**: фронт обращается к `apiLobby.php` относительно текущего origin.

| Переменная     | Назначение                                                                 |
| -------------- | -------------------------------------------------------------------------- |
| `VITE_APP_URL` | Базовый URL для dev-proxy (`server.proxy`) и `baseApi` клиента (`api.php`) |

`proxy.php` в текущей схеме не используется.

## Запуск

```bash
yarn install
yarn dev      # режим разработки (http://localhost:5173)
yarn test     # unit/integration тесты (Vitest)
yarn lint     # eslint
yarn build    # production-сборка
yarn build:analyze # сборка + отчёт размеров bundle (dist/stats.html)
yarn preview  # просмотр production-сборки
```

## Структура src/

- `app/` — bootstrap, providers, роутинг
- `pages/` — страницы (роуты)
- `components/` — feature-компоненты (FDD)
- `elements/` — UI-примитивы
- `ui/` — общий UI-kit
- `api/` — baseApi, queries, mutations
- `store/` — Redux Toolkit (slices)
- `shared/` — utils, стили (tokens, mixins)
- `schemas/` — валидация
- `hooks/` — общие хуки

Правила и архитектура: см. `docs/new-project/` и `.cursor/rules/devcasi-rules.mdc`.

## AppHeader (default variant)

Источники данных:

- `title` и `logo` приходят из `useCurrentPageDataState(...)` (payload текущей страницы).
- `providers` берутся из `window.__SETTINGS__.header.providers` (`src/assets/settings/index.js`).

Текущая композиция default-варианта:

- `ui/variants/default/AppHeaderDefaultView.tsx` — orchestration рендера.
- `ui/blocks/AppHeaderDefaultLayout/` — 3 секции шапки (left / center / right).
- `ui/blocks/AppHeaderLogo/` — лого (URL) или fallback `IG`.
- `ui/blocks/AppHeaderProvidersNav/` — список провайдеров.
- `ui/blocks/AppHeaderPageTitle/` — заголовок страницы.
- `ui/blocks/AppHeaderGuestActions/` и `ui/blocks/AppHeaderUserActions/` — правая колонка по auth-состоянию.

Если передать `sections` в `AppHeader`, используются override-слоты.
