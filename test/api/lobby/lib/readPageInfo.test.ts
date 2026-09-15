import { describe, expect, it } from 'vitest';

import {
  hasPageInfo,
  pageDataMatchesPath,
  readPageInfoHtml,
  readPageInfoTitle,
  readPageUrl,
} from '@/api/lobby/lib/readPageInfo';

describe('readPageInfo', () => {
  it('reads sanitized-shaped info.content / title', () => {
    const page = {
      url: '/terms',
      info: {
        title: 'Terms',
        content: '<p>Hello</p>',
      },
    };
    expect(readPageInfoHtml(page)).toBe('<p>Hello</p>');
    expect(readPageInfoTitle(page)).toBe('Terms');
    expect(readPageUrl(page)).toBe('/terms');
  });

  it('returns undefined for missing or empty content', () => {
    expect(readPageInfoHtml(undefined)).toBeUndefined();
    expect(readPageInfoHtml({ info: { content: '  ' } })).toBeUndefined();
    expect(readPageInfoHtml({ info: { title: 'X' } })).toBeUndefined();
    expect(readPageUrl(undefined)).toBeUndefined();
    expect(readPageUrl({ url: '  ' })).toBeUndefined();
  });

  it('hasPageInfo requires non-empty title|description|name|content', () => {
    expect(hasPageInfo(undefined)).toBe(false);
    expect(hasPageInfo({})).toBe(false);
    expect(hasPageInfo({ info: {} })).toBe(false);
    expect(
      hasPageInfo({
        info: { title: '', description: '', name: '', content: '' },
      }),
    ).toBe(false);
    expect(
      hasPageInfo({
        info: { title: '  ', description: '', name: '', content: '' },
      }),
    ).toBe(false);
    expect(hasPageInfo({ info: { keywords: 'casino' } })).toBe(false);
    expect(hasPageInfo({ info: { title: 'Jackpots' } })).toBe(true);
    expect(hasPageInfo({ info: { name: 'GGG' } })).toBe(true);
    expect(hasPageInfo({ info: { description: 'Home' } })).toBe(true);
    expect(hasPageInfo({ info: { content: '<p>x</p>' } })).toBe(true);
  });

  it('readPageInfoTitle falls back to name', () => {
    expect(readPageInfoTitle({ info: { name: 'GGG.NET' } })).toBe('GGG.NET');
  });

  it('pageDataMatchesPath trusts missing url; rejects cross-path url', () => {
    expect(pageDataMatchesPath(undefined, '/jackpots')).toBe(false);
    expect(pageDataMatchesPath({ info: { title: 'X' } }, '/jackpots')).toBe(true);
    expect(pageDataMatchesPath({ url: '/home', info: { title: 'Home' } }, '/jackpots')).toBe(false);
    expect(pageDataMatchesPath({ url: '/jackpots' }, '/jackpots')).toBe(true);
  });
});
