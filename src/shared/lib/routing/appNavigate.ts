type AppNavigateFn = (to: string) => void | Promise<void>;

let navigateImpl: AppNavigateFn | null = null;

/** Bind SPA navigate (data router) — call once from app bootstrap. */
export function bindAppNavigate(navigate: AppNavigateFn): void {
  navigateImpl = navigate;
}

/**
 * Imperative internal navigation without React Router context.
 * Avoids `useNavigate()` re-rendering every menu control on route change.
 */
export function navigateAppHref(to: string): void {
  if (navigateImpl) {
    void navigateImpl(to);
    return;
  }

  if (typeof window === 'undefined') return;
  window.history.pushState(null, '', to);
}
