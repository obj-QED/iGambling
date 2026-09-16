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
      /**
       * Global Mantine Modal defaults — any prop except opened/onClose/children.
       * @see https://mantine.dev/core/modal/?t=props
       * Paint tokens: `tokens/theme.scss` `--cmf-modal-*` (content/header/title/close/body/overlay).
       */
      modal: {
        centered: true,
      },
      /**
       * Global Mantine Drawer defaults — any prop except opened/onClose/children.
       * Cascade: `params.drawer` → place `defaults` (e.g. aside.drawer) → instance.
       * Used by AppDrawer / DrawerWrapper (incl. Home demos).
       * @see https://mantine.dev/core/drawer/?t=props
       * Paint tokens: `tokens/theme.scss` `--cmf-drawer-*`. Sidebar: data-cmf + layout tokens.
       */
      drawer: {},
      /**
       * Global Mantine Popover defaults — any prop except opened/onChange/children.
       * Cascade: `params.popover` → place `defaults` → instance.
       * @see https://mantine.dev/core/popover/?t=props
       * Paint tokens: `tokens/theme.scss` `--cmf-popover-*` (dropdown/arrow).
       */
      popover: {},
      /**
       * Global Mantine Menu defaults — any prop except opened/onChange/children.
       * Cascade: `params.menu` → `header.menu` → DeepPanel product defaults.
       * DeepPanel: bottom-right (`bottom-end`).
       * @see https://mantine.dev/core/menu/?t=props
       */
      menu: {
        position: 'bottom-end',
      },
      /**
       * Global Spotlight defaults — any prop except store/actions/children/filter.
       * Cascade: `params.spotlight` → AppSearch Spotlight instance.
       * @see https://mantine.dev/x/spotlight/?t=props
       */
      spotlight: {},
      /**
       * Global search — `shared/ui/AppSearch` split by:
       * - type/: modal | spotlight | input (hosts)
       * - style/: compact | icon | input (trigger chrome keys)
       * Header `search` + aside `search_leftmenu` → useAppSearchTrigger.
       * `modal` overrides cascade: `params.modal` → `params.search.modal`.
       */
      search: {
        type: 'spotlight',
        style: 'input', // compact | icon | input
        modal: {},
      },
      /**
       * Main page column inside AppLayout.
       * `container` → bounded Mantine Container; `container-fluid` → full width.
       * Omit → `container`.
       */
      outlet: {
        layout: 'container',
      },
    },
    header: {
      layout: 'container',
      type: 'dropdown', // omit / empty → 'dropdown'; 'default' | 'custom' | 'dropdown' | …
      /** `true` → header menu from `src/widgets/header/mocks` */
      mockMenu: false,
      active: {
        type: 'line', // type: 'line' | 'element'
        // dropdown type → left rail (tokens `--cmf-button-header-dropdown-active-*`)
        position: 'left', // position: 'bottom' | 'top' | 'left' | 'right'
      },
      /**
       * DeepPanel Menu — any Mantine Menu prop except opened/onChange/children.
       * Wins over `params.menu`. @see https://mantine.dev/core/menu/?t=props
       */
      menu: {},
      /**
       * Special-block adapters: `{ type, style }` (legacy string = style).
       * search: type → AppSearch behavior; style → trigger. Cascade: `params.search` → here.
       */
      blockVariants: {
        search: {
          type: 'spotlight', // modal | spotlight | input
          style: 'input', // compact | icon | input
        },
        wallet: {
          type: 'modal', // modal | dropdown | drawer
          style: 'compact', // compact | button | input(=full)
        },
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
      type: 'slideout', // 'default' | 'compact' | 'slideout'
      /**
       * Control width: `max` (hug / capped) | `fill` (full track, flat).
       * Tokens: compact + non-compact `[data-control-fit]` blocks separately.
       */
      /**
       * slideout — logo-trigger toggles width (4s). During compress: ellipsis labels.
       * After width ends (`data-aside-slideout-settled`): square rail, name initial (no img),
       * logo group centered, dropdown chevron under icon.
       */
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
       * Per special-block override (`search_leftmenu` → search adapters).
       * Same `{ type, style }` as header; falls back to `params.search`.
       * search type → AppSearch behavior; style → trigger (compact|icon|input → icon|row).
       * Note: `type: compact|slideout` always forces search/promo chrome to `icon`
       * (row TextInput does not fit the rail).
       */
      blockVariants: {
        search_leftmenu: {
          type: 'input', // modal | spotlight | input (behavior)
          style: 'icon', // compact|icon|input — ignored for compact/slideout chrome (forced icon)
        },
      },
      /**
       * Active route chrome. Omit → `element` (CSS `::after` via tokens, e.g. left bar).
       * `type: 'line'` → DOM `CmfActiveLine` (same contract as `header.active`).
       */
      // active: { type: 'line', position: 'left' },
      /**
       * Tooltip for aside (Mantine-compatible). Omit → pack default.
       * Cascade: pack → aside.tooltip → place override in AppTooltip.
       * Styles (CSS cascade on floating, tokens on :root):
       * --cmf-tooltip-sidebar-{item|search}-max-width|bg|… → --cmf-tooltip-sidebar-* → --cmf-tooltip-*
       */

      /**
       * Aside AppDrawer — any Mantine Drawer prop except opened/onClose/children.
       * Cascade: `params.drawer` → `aside.drawer` → AppLayoutChrome instance.
       * Size omit → `var(--app-layout-sidebar-width)` (theme tokens).
       * @see https://mantine.dev/core/drawer/?t=props
       */
      drawer: {},

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
        /** Padding only while content overflows (not always-on gutter). */
        offsetScrollbars: 'present',
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
              label: 'Your account',
              name: 'Harriette Spoonlicker',
              key: 'account',
              img: '/images/misc/default/header/icon_user.webp',
              imgRadius: 'round',
              subtitle: 'hspoonlicker@outlook.com',
              type: 'link',
              variant: 'gradient',
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
              url: '/',
            },
          ],
        },
        {
          key: 'footer',
          placement: { section: 'footer', at: 'start' },
          items: [
            {
              label: 'Change account',
              url: '/account/switch',
              name: 'Change account',
              key: 'change_account',
              type: 'link',
              variant: 'default',
            },
            {
              label: 'Logout account',
              url: '/logout',
              name: 'Logout',
              key: 'logout',
              type: 'button',
              variant: 'white',
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
