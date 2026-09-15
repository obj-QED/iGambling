import { describe, expect, it } from 'vitest';

import {
  collectKnownMenuPaths,
  collectKnownMenuPathsFromInitContent,
  normalizeMenuRoutePath,
} from '@/api/lobby/lib/collectKnownMenuPaths';

const samplePage = {
  url: '/',
  blocks: [
    {
      type: 'menuHeaderTop',
      menu: [
        {
          key: 'block3',
          items: [
            { url: '/', key: 'logo', type: 'link' },
            { url: 'search', key: 'search', type: 'link' },
          ],
        },
        {
          key: 'main',
          items: [
            { url: '/signIn', key: 'sign_in', type: 'button' },
            { url: '/signUp', key: 'sign_up', type: 'button' },
          ],
        },
      ],
    },
    {
      type: 'menuHeader',
      menu: [
        { url: '/', key: 'home', type: 'link' },
        { url: '/tag/top', key: 'top', type: 'link' },
        { url: '/tag/new', key: 'new', type: 'link' },
        { url: '/games/favorites', key: 'favorites', type: 'link' },
      ],
    },
    {
      type: 'footer',
      blocks: [
        {
          type: 'footer_menu',
          menu: [
            {
              key: 'information',
              items: [
                { url: '/payments', key: 'payments', type: 'link' },
                { url: '/faq', key: 'faq', type: 'link' },
              ],
            },
            {
              key: 'resources',
              items: [
                { url: '/terms', key: 'terms', type: 'link' },
                { url: '/about', key: 'about', type: 'link' },
              ],
            },
          ],
        },
        {
          type: 'footer_list',
          list: [{ type: 'link', url: '/', img: '/logo.png' }],
        },
      ],
    },
  ],
  menu: [
    {
      key: 'gamesMenu',
      items: [
        {
          key: 'all_games',
          url: '/category/slots',
          items: [
            { url: 'tag/new', key: 'new', type: 'link' },
            { url: 'provider/3oaks', key: '3oaks', type: 'link' },
          ],
        },
      ],
    },
    {
      key: 'left',
      items: [
        { url: '/jackpots', key: 'jackpots', type: 'link' },
        { url: '/tournaments', key: 'tournaments', type: 'link' },
        { url: 'provider/3oaks/jackpot', key: 'jackpot', type: 'link' },
        {
          key: 'casino',
          url: '#',
          items: [
            { url: 'category/slots', key: 'slots', type: 'link' },
            { url: '/tag/crash', key: 'crash', type: 'link' },
          ],
        },
      ],
    },
  ],
};

describe('collectKnownMenuPaths', () => {
  it('normalizes relative and absolute menu urls', () => {
    expect(normalizeMenuRoutePath('/terms')).toBe('/terms');
    expect(normalizeMenuRoutePath('provider/3oaks/jackpot')).toBe('/provider/3oaks/jackpot');
    expect(normalizeMenuRoutePath('tag/new')).toBe('/tag/new');
    expect(normalizeMenuRoutePath('#')).toBeNull();
    expect(normalizeMenuRoutePath('search')).toBeNull();
    expect(normalizeMenuRoutePath('/profile?tab=deposit')).toBe('/profile');
  });

  it('collects links from menuHeaderTop, menuHeader, footer, and page.menu', () => {
    const paths = collectKnownMenuPaths(samplePage);
    expect(paths.has('/')).toBe(true);
    expect(paths.has('/signIn')).toBe(true);
    expect(paths.has('/signUp')).toBe(true);
    expect(paths.has('/tag/top')).toBe(true);
    expect(paths.has('/tag/new')).toBe(true);
    expect(paths.has('/games/favorites')).toBe(true);
    expect(paths.has('/payments')).toBe(true);
    expect(paths.has('/faq')).toBe(true);
    expect(paths.has('/terms')).toBe(true);
    expect(paths.has('/about')).toBe(true);
    expect(paths.has('/category/slots')).toBe(true);
    expect(paths.has('/provider/3oaks')).toBe(true);
    expect(paths.has('/jackpots')).toBe(true);
    expect(paths.has('/tournaments')).toBe(true);
    expect(paths.has('/provider/3oaks/jackpot')).toBe(true);
    expect(paths.has('/tag/crash')).toBe(true);
    expect(paths.has('/not-in-menu')).toBe(false);
  });

  it('reads page from init content envelope', () => {
    const paths = collectKnownMenuPathsFromInitContent({ page: samplePage });
    expect(paths.has('/jackpots')).toBe(true);
    expect(paths.has('/terms')).toBe(true);
  });
});
