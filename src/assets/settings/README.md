# Settings

Files from this folder are concatenated into **dist/settings.js** during build (alphabetical by filename).

- Only `.js` files are supported.
- Concatenation is "as-is" — write code so merged output remains valid JS (e.g., first file initializes `window.__SETTINGS__`, next files extend via `Object.assign`).
- On the server, you can replace or edit `dist/settings.js` to override settings without rebuilding.
