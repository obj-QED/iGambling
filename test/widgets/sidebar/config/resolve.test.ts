import { describe, expect, it } from 'vitest';

import { DEFAULT_SIDEBAR_CONFIG, resolveSidebarConfig } from '@/widgets/sidebar/config';
import { resolveSidebarWidth, toSidebarWidthCss } from '@/widgets/sidebar/lib';
import { SIDEBAR_TYPE_TUNABLE_DEFAULTS } from '@/widgets/sidebar/ui/type/tunableDefaults';

describe('resolveSidebarConfig', () => {
  it('returns defaults when settings.aside is missing', () => {
    expect(resolveSidebarConfig({})).toEqual(DEFAULT_SIDEBAR_CONFIG);
  });

  it('fills scrollArea defaults when aside.scrollArea is missing or partial', () => {
    expect(resolveSidebarConfig({ aside: {} }).scrollArea).toEqual(
      DEFAULT_SIDEBAR_CONFIG.scrollArea,
    );

    expect(
      resolveSidebarConfig({
        aside: { scrollArea: { scrollbarSize: 4, type: 'hover' } },
      }).scrollArea,
    ).toEqual({
      ...DEFAULT_SIDEBAR_CONFIG.scrollArea,
      scrollbarSize: 4,
      type: 'hover',
    });
  });

  it('uses compact pack tooltip when aside.tooltip omitted', () => {
    expect(resolveSidebarConfig({ aside: { type: 'compact' } }).tooltip).toEqual(
      SIDEBAR_TYPE_TUNABLE_DEFAULTS.compact.tooltip,
    );
  });

  it('merges aside.tooltip over pack defaults', () => {
    expect(
      resolveSidebarConfig({
        aside: {
          type: 'compact',
          tooltip: { enabled: false, position: 'left', delay: 400 },
        },
      }).tooltip,
    ).toEqual({
      ...SIDEBAR_TYPE_TUNABLE_DEFAULTS.compact.tooltip,
      enabled: false,
      position: 'left',
      delay: 400,
    });
  });

  it('resolves regions from aside.types and defaults to all true', () => {
    expect(resolveSidebarConfig({ aside: { type: 'compact' } }).regions).toEqual({
      header: true,
      main: true,
      footer: true,
    });

    expect(
      resolveSidebarConfig({
        aside: {
          type: 'compact',
          types: { compact: { regions: { header: false } } },
        },
      }).regions,
    ).toEqual({
      header: false,
      main: true,
      footer: true,
    });
  });

  it('appends type customBlocks after global customBlocks', () => {
    const config = resolveSidebarConfig({
      aside: {
        type: 'default',
        customBlocks: [
          {
            key: 'header',
            placement: { header: 'start' },
            items: [{ key: 'account', name: 'A', url: '/a' }],
          },
        ],
        types: {
          default: {
            customBlocks: [
              {
                key: 'footer',
                placement: { header: 'end' },
                items: [{ key: 'help', name: 'Help', url: '/help' }],
              },
            ],
          },
        },
      },
    });

    expect(config.customBlocks?.map((block) => block.key)).toEqual(['header', 'footer']);
  });

  it('omits width when aside.width is missing or blank', () => {
    expect(resolveSidebarConfig({})).not.toHaveProperty('width');
    expect(resolveSidebarConfig({ aside: { width: '   ' } })).not.toHaveProperty('width');
  });

  it('keeps numeric and CSS string widths', () => {
    expect(resolveSidebarConfig({ aside: { width: 72 } }).width).toBe(72);
    expect(resolveSidebarConfig({ aside: { width: '30%' } }).width).toBe('30%');
    expect(resolveSidebarConfig({ aside: { width: ' 4.5rem ' } }).width).toBe('4.5rem');
  });

  it('resolves layout + compact type', () => {
    expect(
      resolveSidebarConfig({
        aside: {
          width: 72,
          layout: 'container-fluid',
          type: 'compact',
        },
      }),
    ).toMatchObject({
      width: 72,
      layout: 'container-fluid',
      type: 'compact',
    });
  });

  it('keeps arbitrary layout/type strings; empty falls back', () => {
    expect(
      resolveSidebarConfig({
        aside: {
          type: 'rail-v2',
          layout: 'wide',
        },
      }),
    ).toMatchObject({
      type: 'rail-v2',
      layout: 'wide',
      tooltip: SIDEBAR_TYPE_TUNABLE_DEFAULTS.default.tooltip,
    });

    expect(
      resolveSidebarConfig({
        aside: {
          type: '   ',
          layout: '',
        },
      }),
    ).toMatchObject({
      type: 'default',
      layout: 'container',
    });
  });
});

describe('sidebarWidth helpers', () => {
  it('resolveSidebarWidth rejects invalid values', () => {
    expect(resolveSidebarWidth(undefined)).toBeUndefined();
    expect(resolveSidebarWidth(Number.NaN)).toBeUndefined();
    expect(resolveSidebarWidth('')).toBeUndefined();
  });

  it('toSidebarWidthCss adds px only for numbers', () => {
    expect(toSidebarWidthCss(400)).toBe('400px');
    expect(toSidebarWidthCss('30%')).toBe('30%');
    expect(toSidebarWidthCss(undefined)).toBeNull();
    expect(toSidebarWidthCss('')).toBeNull();
  });
});
