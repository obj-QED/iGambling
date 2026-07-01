/**
 * App settings. Server-side builds may override `dist/settings.js`.
 * Build merges everything under `src/assets/settings/` into `dist/settings.js` (sorted by filename).
 */
(function () {
  window.__SETTINGS__ = window.__SETTINGS__ || {};
  Object.assign(window.__SETTINGS__, {
    appName: 'iGambling',
    version: '1.0.0',
    params: {
      /** Mobile/tablet: enter browser fullscreen on first scroll. Set `false` to disable. */
      fullWidth: true,
    },
    header: {
      layout: 'container',
      type: 'default',
      /** `true` → header menu from `src/widgets/header/mocks` */
      mockMenu: true,
      customBlocks: [
        // Into existing API section row (no new section):
        //   { section: 'block3', at: 'start' | 'end' | 0 | 1 | … }
        // New section in header layout:
        //   { header: 'start' | 'end' }
        //   { beforeSection: 'block1' } | { afterSection: 'block3' }
        // Legacy: 'prepend' | 'append' | { sectionKey, position }
        {
          key: 'block3-tools',
          placement: { section: 'block3', at: 'end' },
          items: [{ key: 'color_scheme', url: '', name: '' }],
        },
      ],
    },

    aside: {
      width: 400,
      type: 'default',
      /** `true` → sidebar menu from `src/widgets/sidebar/mocks` */
      mockMenu: true,
      openedDropdowns: ['category', 'providers', 'live_games', 'casino', 'betting'],
      scrollArea: {
        scrollbarSize: 4,
        scrollHideDelay: 3000,
        type: 'auto',
        overscrollBehavior: 'contain',
      },
      customBlocks: [
        // Into existing API section row (no new section):
        //   { section: 'block3', at: 'start' | 'end' | 0 | 1 | … }
        // New section in header layout:
        //   { header: 'start' | 'end' }
      ],
    },
  });
})();
