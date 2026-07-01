import { describe, expect, it } from 'vitest';

import {
  CMF_EXCLUDED_MANTINE_COMPONENTS,
  CMF_MANTINE_CONTROL_SLUGS,
  toCmfControlSlug,
} from './cmfControls';

describe('cmfControls', () => {
  it('excludes Container from CMF', () => {
    expect(CMF_EXCLUDED_MANTINE_COMPONENTS).toContain('container');
  });

  it('maps Mantine names to CMF slugs', () => {
    expect(toCmfControlSlug('TextInput')).toBe('text-input');
    expect(toCmfControlSlug('ActionIcon')).toBe('action-icon');
    expect(CMF_MANTINE_CONTROL_SLUGS.Title).toBe('title');
  });
});
