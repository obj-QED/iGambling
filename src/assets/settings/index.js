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
      fullWidth: true, // * TODO: rename to fullscreen
    },
    header: {
      layout: 'container',
      type: 'default',
      /** `true` → header menu from `src/widgets/header/mocks` */
      mockMenu: true,
      /**
       * Per-type tunables. Omit a type key → pack defaults.
       * Legacy top-level `blockVariants` still works (nested wins).
       */
      blockVariants: {
        search: 'compact',
        wallet: 'compact',
      },

      tooltip: {
        enabled: true,
        position: 'bottom',
        delay: 200,
      },

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
          items: [{ key: 'color_scheme', label: 'Color scheme' }],
        },
      ],
    },

    aside: {
      width: 'calc(2.625rem * var(--mantine-scale) + 1.25rem)',
      type: 'default', // 'compact' | 'compact'
      layout: 'container',
      /** `true` → sidebar menu from `src/widgets/sidebar/mocks` */
      mockMenu: true,
      openedDropdowns: ['category', 'providers', 'live_games', 'casino', 'betting'],
      /**
       * Tooltip for aside (Mantine-compatible). Omit → pack default.
       * Cascade: pack → aside.tooltip → place override in AppTooltip.
       * Styles: --tooltip-sidebar-{item|search}-* → --tooltip-sidebar-* → --tooltip-bg|color|radius
       */
      tooltip: {
        enabled: true,
        position: 'right',
        delay: 200,
        multiline: true,
      },
      /** Global for aside (all types). Omit → pack defaults. */
      scrollArea: {
        scrollbarSize: 4,
        scrollHideDelay: 3000,
        type: 'auto',
        overscrollBehavior: 'contain',
        offsetScrollbars: true,
        verticalScrollbarPosition: 'left',
      },
      // Special blocks for header and footer, key: ['logo', 'search_leftmenu', 'wheel_mdl', 'timer']
      customBlocks: [
        // Into existing API section (creates section if missing — e.g. header/footer):
        //   { section: 'header', at: 'start' | 'end' | 0 | 1 | … }
        // New section at start/end of aside menu:
        //   { header: 'start' | 'end' }  — section key = customBlocks[].key
        {
          key: 'header',
          placement: { header: 'start' },
          items: [
            {
              url: '/profile',
              name: 'Developer',
              key: 'account',
              img: 'public/icons/tabler/user.svg',
              imgRadius: 'round',
              subtitle: 'developer@example.com',
              type: 'link',
              variant: 'transparent',
            },
          ],
        },
        {
          key: 'logo-rail',
          placement: { section: 'header', at: 'start' },
          items: [
            {
              img: 'https://999ggg.net/uploads/logo.png',
              key: 'logo',
              name: 'Logo',
              label:
                'Tooltip content can be hovered, for example to follow  <a href="https://mantine.dev" target="_blank">this link</a>',
              type: 'link',
              variant: 'transparent',
            },
          ],
        },
        {
          key: 'footer',
          placement: { section: 'footer', at: 'start' },
          items: [
            {
              url: '/account/switch',
              name: 'Change account',
              key: 'change_account',
              type: 'link',
              variant: 'transparent',
            },
            {
              url: '/logout',
              name: 'Logout',
              key: 'logout',
              type: 'button',
              variant: 'outline',
            },
          ],
        },
      ],
      /**
       * Per-type regions only (layout gates). Pack-specific blocks stay in Strategy / pack.blocks.
       * types.compact.regions.header = false → hide header chrome in Strategy.
       */
      // types: {
      //   compact: { regions: { header: true, main: true, footer: true } },
      // },
    },
  });
})();
