type PathnameListener = () => void;

let pathname =
  typeof window !== 'undefined' && window.location.pathname.length > 0
    ? window.location.pathname
    : '/';

const listeners = new Set<PathnameListener>();

export function getPathname(): string {
  return pathname;
}

export function subscribePathname(listener: PathnameListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Notify subscribers only when pathname actually changes. */
export function setPathname(next: string): void {
  const normalized = next.length > 0 ? next : '/';
  if (normalized === pathname) return;
  pathname = normalized;
  listeners.forEach((listener) => {
    listener();
  });
}

type RouterWithLocation = {
  state: { location: { pathname: string } };
  subscribe: (fn: (state: { location: { pathname: string } }) => void) => () => void;
};

/** Bind a Data Router (createBrowserRouter) to the shared pathname store. */
export function bindPathnameStoreToRouter(router: RouterWithLocation): () => void {
  setPathname(router.state.location.pathname);
  return router.subscribe((state) => {
    setPathname(state.location.pathname);
  });
}
