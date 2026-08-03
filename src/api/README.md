# API слой

Структура по доменам: в каждом домене — сырые запросы, ключи, queries (useQuery) и mutations (useMutation / инвалидация).

## Структура

```
api/
├── baseApi/           # axios-клиенты (baseApi, lobbyApiClient)
├── constants.ts       # пути эндпоинтов (apiLobby.php, api.php)
├── queryClient.ts     # TanStack Query client
├── index.ts           # публичный экспорт
└── <domain>/          # домен (lobby, auth, games, wallet, …)
    ├── types.ts       # типы домена (ответы/параметры)
    ├── mappers.ts     # маппинг ответов в payload/формат UI
    ├── requests.ts    # сырые вызовы (initV2, getTranslation, …)
    ├── queryKeys.ts   # ключи для TanStack Query
    ├── queries.ts     # useQuery-хуки (получение данных)
    ├── mutations.ts   # useMutation или инвалидация (обновить при наличии данных)
    └── index.ts       # публичный API домена
```

## Правила

- **Queries** — получение данных (useQuery). Ключ: `['domain', 'action', ...params]`.
- **Mutations** — изменение или «обновить уже загруженное»: useMutation (POST/PUT) или invalidateQueries/refetch.
- useQuery/useMutation вызывать только в hooks компонентов или в api; в ui — только props.
- Импорт снаружи — из `@/api` или `@/api/lobby`, `@/api/auth` и т.д., не из внутренних файлов домена.
