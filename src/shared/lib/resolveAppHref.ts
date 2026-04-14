/**
 * Классификация строковых href для клиентского роутера и внешних ссылок.
 * Для рендера: внешний → `<a target="_blank" rel="noopener noreferrer">`, внутренний → `react-router` `Link`, невалидный → `<span data-invalid-href>`.
 */
export type AppHrefKind = 'external' | 'internal' | 'invalid';

export function getAppHrefKind(href: string): AppHrefKind {
  if (!href) return 'invalid';
  if (/^https?:\/\//i.test(href)) return 'external';
  if (href.startsWith('/')) return 'internal';
  return 'invalid';
}
