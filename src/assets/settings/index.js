/**
 * Настройки приложения. На сервере можно переопределить dist/settings.js
 * Сборка: всё из src/assets/settings/ объединяется в dist/settings.js (конкатенация по алфавиту имён).
 */
(function () {
  window.__SETTINGS__ = window.__SETTINGS__ || {};
  Object.assign(window.__SETTINGS__, {
    appName: 'iGambling',
    version: '1.0.0',
    header: {
      layout: 'container',
      type: 'default',
      providers: [{
        name: 'casino',
        icon: '/uploads/providers/casino.png',
        url: '/category/slots',
      }, {
        name: 'sport',
        icon: '/provider/sport',
        url: '/game/sport:sport_betting.',
      }, {
        name: 'live',
        icon: '/uploads/providers/live.png',
        url: '/live',
      }]
    },
  });
})();
