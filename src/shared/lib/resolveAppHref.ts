/**
 * Classifies string href values for client routing and external links.
 * Rendering: external -> `<a target="_blank" rel="noopener noreferrer">`, internal -> `react-router` `Link`, invalid -> `<span data-invalid-href>`.
 */
export type AppHrefKind = 'external' | 'internal' | 'invalid';

export function getAppHrefKind(href: string): AppHrefKind {
  if (!href) return 'invalid';
  if (/^https?:\/\//i.test(href)) return 'external';
  if (href.startsWith('/')) return 'internal';
  return 'invalid';
}
