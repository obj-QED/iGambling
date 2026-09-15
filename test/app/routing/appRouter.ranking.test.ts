import { createElement } from 'react';

import { matchRoutes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import {
  DEFAULT_PAGE_LAYOUT_HANDLE,
  INFO_PAGE_LAYOUT_HANDLE,
} from '@/app/layouts/lib/resolvePageLayout';

/**
 * Mirrors `appRouter` leaf ranking without mounting AppLayout / lazy pages.
 * Menu catch-all `*` owns unknown segments; static auth/home win.
 */
const rankingRoutes = [
  {
    path: '/',
    element: createElement('div'),
    children: [
      {
        element: createElement('div'),
        handle: DEFAULT_PAGE_LAYOUT_HANDLE,
        children: [
          { path: '/', element: createElement('div', { 'data-leaf': 'home' }) },
          { path: '/auth', element: createElement('div', { 'data-leaf': 'auth' }) },
          { path: '*', element: createElement('div', { 'data-leaf': 'app-page' }) },
        ],
      },
      {
        element: createElement('div'),
        handle: INFO_PAGE_LAYOUT_HANDLE,
        children: [
          {
            path: '/profile/activation',
            element: createElement('div', { 'data-leaf': 'activation' }),
          },
        ],
      },
    ],
  },
];

function leafFor(pathname: string): string | undefined {
  const matches = matchRoutes(rankingRoutes, pathname);
  const leaf = matches?.[matches.length - 1]?.route.element;
  if (leaf == null || typeof leaf !== 'object' || !('props' in leaf)) return undefined;
  return (leaf.props as { 'data-leaf'?: string })['data-leaf'];
}

describe('appRouter ranking', () => {
  it('routes menu paths through app-page catch-all', () => {
    expect(leafFor('/terms')).toBe('app-page');
    expect(leafFor('/jackpots')).toBe('app-page');
    expect(leafFor('/tag/top')).toBe('app-page');
  });

  it('keeps static auth and home', () => {
    expect(leafFor('/auth')).toBe('auth');
    expect(leafFor('/')).toBe('home');
  });

  it('keeps profile activation under info layout', () => {
    expect(leafFor('/profile/activation')).toBe('activation');
  });
});
