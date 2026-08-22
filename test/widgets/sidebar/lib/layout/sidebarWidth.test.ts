import { describe, expect, it } from 'vitest';

import {
  resolveSidebarWidth,
  toSidebarRootWidthStyle,
  toSidebarWidthCss,
} from '@/widgets/sidebar/lib';

describe('toSidebarRootWidthStyle', () => {
  it('uses settings width as a fixed shell contract', () => {
    expect(toSidebarRootWidthStyle(320, 'default')).toEqual({
      '--app-layout-sidebar-width': '320px',
    });
  });

  it('keeps compact chrome at the settings width', () => {
    expect(toSidebarRootWidthStyle('4.5rem', 'compact')).toEqual({
      '--app-layout-sidebar-width': '4.5rem',
    });
  });

  it('omits style when width is missing', () => {
    expect(toSidebarRootWidthStyle(undefined, 'default')).toBeUndefined();
    expect(toSidebarWidthCss(resolveSidebarWidth('   '))).toBeNull();
  });
});
