import { isValidAppHref } from './resolveAppHref';

export type AppButtonHrefState = {
  /** Set only when `url` is non-empty and passes {@link isValidAppHref}. */
  href: string | undefined;
  /**
   * `true` only when a string href was provided but is missing/invalid.
   * Omitted `href` (`undefined`) and `native` controls stay enabled
   * (dropdown parents with `url: '#'` must not disable).
   */
  disabledForHref: boolean;
};

/** Resolve href + disabled for AppButton / AppActionIcon. */
export function resolveAppButtonHrefState(
  href: string | undefined,
  native: boolean,
): AppButtonHrefState {
  // Toggle / native button — never navigate, never disable from URL.
  if (native) {
    return { href: undefined, disabledForHref: false };
  }

  // Caller omitted href intentionally (plain button / dropdown parent).
  if (href === undefined) {
    return { href: undefined, disabledForHref: false };
  }

  // Explicit empty or invalid string (e.g. `#`) → non-navigating + disabled.
  if (href.length === 0 || !isValidAppHref(href)) {
    return { href: undefined, disabledForHref: true };
  }

  return { href, disabledForHref: false };
}
