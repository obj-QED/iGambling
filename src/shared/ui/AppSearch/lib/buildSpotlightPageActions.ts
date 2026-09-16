import type { SpotlightActionData } from '@mantine/spotlight';

import {
  getKnownAppPathLabelsSnapshot,
  getKnownAppPathsSnapshot,
} from '@api/lobby/lib/knownAppPathsStore';

/** Empty Spotlight query — show these when present in the known-path allowlist. */
export const SPOTLIGHT_FEATURED_PAGES = [
  { path: '/', label: 'Home' },
  { path: '/profile', label: 'Profile' },
  { path: '/bonuses', label: 'Bonuses' },
  { path: '/jackpots', label: 'Jackpots' },
  { path: '/notifications', label: 'Notifications' },
] as const;

const FEATURED_PATH_SET = new Set<string>(SPOTLIGHT_FEATURED_PAGES.map((entry) => entry.path));

function humanizePath(path: string): string {
  if (path === '/') return 'Home';
  const segment =
    path
      .split('/')
      .filter((part) => part.length > 0)
      .pop() ?? path;
  if (segment.length === 0) return path;
  return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/[-_]/g, ' ');
}

export function resolveKnownAppPathLabel(
  path: string,
  labels: ReadonlyMap<string, string> = getKnownAppPathLabelsSnapshot(),
): string {
  const fromMenu = labels.get(path);
  if (fromMenu !== undefined && fromMenu.trim().length > 0) return fromMenu.trim();
  const featured = SPOTLIGHT_FEATURED_PAGES.find((entry) => entry.path === path);
  if (featured !== undefined) return featured.label;
  return humanizePath(path);
}

function toAction(
  path: string,
  label: string,
  navigate: (to: string) => void,
): SpotlightActionData {
  return {
    id: path === '/' ? 'page-home' : `page-${path}`,
    label,
    description: path,
    keywords: [path, label],
    onClick: () => {
      void navigate(path);
    },
  };
}

/**
 * Spotlight page actions from the lobby allowlist.
 * Empty query → featured pages that exist; otherwise every known path (filterable).
 */
export function buildSpotlightPageActions(params: {
  query: string;
  navigate: (to: string) => void;
  knownPaths?: ReadonlySet<string>;
  labels?: ReadonlyMap<string, string>;
}): SpotlightActionData[] {
  const known = params.knownPaths ?? getKnownAppPathsSnapshot();
  const labels = params.labels ?? getKnownAppPathLabelsSnapshot();
  const trimmed = params.query.trim();

  if (trimmed.length === 0) {
    return SPOTLIGHT_FEATURED_PAGES.filter((entry) => known.has(entry.path)).map((entry) =>
      toAction(entry.path, resolveKnownAppPathLabel(entry.path, labels), params.navigate),
    );
  }

  const featured: SpotlightActionData[] = [];
  const rest: SpotlightActionData[] = [];

  for (const path of known) {
    const label = resolveKnownAppPathLabel(path, labels);
    const action = toAction(path, label, params.navigate);
    if (FEATURED_PATH_SET.has(path)) {
      featured.push(action);
    } else {
      rest.push(action);
    }
  }

  featured.sort(
    (a, b) =>
      SPOTLIGHT_FEATURED_PAGES.findIndex((entry) => entry.path === a.description) -
      SPOTLIGHT_FEATURED_PAGES.findIndex((entry) => entry.path === b.description),
  );
  rest.sort((a, b) => (a.label ?? '').localeCompare(b.label ?? ''));

  return [...featured, ...rest];
}
