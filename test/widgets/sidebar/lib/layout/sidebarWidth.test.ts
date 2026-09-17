import { describe, expect, it } from 'vitest';

import {
  resolveSidebarWidth,
  toSidebarRootWidthStyle,
  toSidebarWidthCss,
} from '@/widgets/sidebar/lib';

describe('sidebar width normalization', () => {
  it('keeps an arbitrary settings width in the runtime cascade token', () => {
    expect(toSidebarRootWidthStyle(320)).toEqual({ '--app-layout-sidebar-width': '320px' });
  });

  it('maps slideout settings width to expanded token only (phase can switch rail)', () => {
    expect(toSidebarRootWidthStyle(320, { type: 'slideout' })).toEqual({
      '--aside-slideout-expanded-width': '320px',
    });
  });

  it('omits an invalid width and preserves the theme token', () => {
    expect(toSidebarWidthCss(resolveSidebarWidth('   '))).toBeNull();
  });
});
