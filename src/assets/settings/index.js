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
      fullscreen: true,
      preloader: {
        /** Global: false → no skeleton on shell/adapters/page. true / omit → on. */
        skeleton: false,
      },
    },
    header: {
      layout: 'container',
      type: 'dropdown', // omit / empty → 'dropdown'; 'default' | 'custom' | 'dropdown' | …
      /** `true` → header menu from `src/widgets/header/mocks` */
      mockMenu: true,
      active: {
        type: 'line', // type: 'line' | 'element'
        position: 'bottom', // position: 'bottom' | 'top' | 'left' | 'right'
      },
      /**
       * Global adapter variants for special blocks — apply wherever they render
       * (default bar, dropdown outside row, …). Per-type override: `types.<type>.blockVariants`.
       * Values are open strings: use a key registered on that block’s variant registry
       * (e.g. search: compact|icon|input|modal, wallet: compact|full|drawer).
       * Unknown / omitted → `compact`.
       */
      blockVariants: {
        search: 'compact', // compact | icon | input | modal
        wallet: 'compact', // compact | full | drawer
      },

      tooltip: {
        enabled: true,
        position: 'bottom',
        delay: 200,
        closeDelay: 100,
      },

      customBlocks: [
        // Into existing API section row (no new section):
        //   { section: 'block3', at: 'start' | 'end' | 0 | 1 | … }
        // New section in header layout:
        //   { header: 'start' | 'end' }
        //   { beforeSection: 'block1' } | { afterSection: 'block3' }
        // Legacy: 'prepend' | 'append' | { sectionKey, position }
        {
          view: 'mobile',
          key: 'block_menu_toggle',
          placement: { section: 'block3', at: 'start' },
          items: [{ key: 'menu_toggle', name: 'Menu' }],
        },
        {
          key: 'block3-tools',
          placement: { section: 'block3', at: 'end' },
          items: [{ key: 'color_scheme', label: 'Color scheme' }],
        },
      ],
    },

    aside: {
      /** Shell width is fixed — do not pair a compact calc with `type: 'default'` (labels need room). */
      width: '15rem',
      type: 'default', // 'default' | 'compact'
      layout: 'aside',
      /** `true` → sidebar menu from `src/widgets/sidebar/mocks` */
      mockMenu: false,
      openedDropdowns: ['category', 'providers', 'live_games', 'casino', 'betting'],
      /**
       * Menu keys with dedicated block UI (not default row / HeaderLink).
       * Omit → widget defaults. Component map stays in `ui/Block` switch.
       */
      specialBlockKeys: ['search_leftmenu', 'timer', 'wheel_mdl', 'aside_header_logo'],
      /**
       * Active route chrome. Omit → `element` (CSS `::after` via tokens, e.g. left bar).
       * `type: 'line'` → DOM `CmfActiveLine` (same contract as `header.active`).
       */
      // active: { type: 'line', position: 'left' },
      /**
       * Tooltip for aside (Mantine-compatible). Omit → pack default.
       * Cascade: pack → aside.tooltip → place override in AppTooltip.
       * Styles (CSS cascade on floating, tokens on :root):
       * --tooltip-sidebar-{item|search}-max-width|bg|… → --tooltip-sidebar-* → --tooltip-*
       */
      tooltip: {
        enabled: true,
        position: 'right',
        delay: 200,
        closeDelay: 100,
        multiline: true,
      },
      /** Global for aside (all types). Omit → pack defaults. Any Mantine ScrollArea prop allowed. */
      scrollArea: {
        scrollbarSize: 4,
        scrollHideDelay: 3000,
        type: 'auto',
        overscrollBehavior: 'contain',
        offsetScrollbars: true,
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
              name: 'Harriette Spoonlicker',
              key: 'account',
              img: '/images/misc/default/header/icon_user.webp',
              imgRadius: 'round',
              subtitle: 'hspoonlicker@outlook.com',
              type: 'link',
            },
          ],
        },
        {
          key: 'logo-rail',
          placement: { section: 'header', at: 'start' },
          items: [
            {
              menuIcon: true,
              img: import.meta.env.VITE_APP_URL + '/uploads/logo.png',
              key: 'aside_header_logo',
              name: 'Logo',
              label:
                'Tooltip content can be hovered, for example to follow <a href="/" target="_blank">this link</a>',
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
