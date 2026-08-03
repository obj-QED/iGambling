import { isValidAppHref } from './resolveAppHref';

export type AppButtonHrefState = {
  /** Set only when `url` is non-empty and passes {@link isValidAppHref}. */
  href: string | undefined;
  /** `true` when navigation was expected (`native=false`) but href is missing or invalid. */
  disabledForHref: boolean;
};

/** Resolve href + disabled for AppButton / AppActionIcon (non-native controls only). */
export function resolveAppButtonHrefState(
  href: string | undefined,
  native: boolean,
): AppButtonHrefState {
  if (native) {
    return { href: undefined, disabledForHref: false };
  }

  if (href === undefined || href.length === 0 || !isValidAppHref(href)) {
    return { href: undefined, disabledForHref: true };
  }

  return { href, disabledForHref: false };
}
