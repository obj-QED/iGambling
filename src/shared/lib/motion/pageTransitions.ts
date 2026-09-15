/** Shared Motion timings — fast but noticeable (~180–220ms). */
export const PAGE_STAGE_TRANSITION = {
  duration: 0.2,
  ease: [0.22, 1, 0.36, 1] as const,
};

/** Search: current exits left, next enters from the right. */
export const SEARCH_STAGE_SLIDE = {
  initial: { x: '28%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-28%', opacity: 0 },
  transition: PAGE_STAGE_TRANSITION,
} as const;

/**
 * Info CMS wipe — Motion page-mask style (exit right←, enter ←right).
 * @see https://examples.motion.dev/ui/sections/page-mask-transitions
 */
export const INFO_CONTENT_MASK = {
  initial: { clipPath: 'inset(0 0 0 100%)' },
  animate: { clipPath: 'inset(0 0 0 0%)' },
  exit: { clipPath: 'inset(0 100% 0 0%)' },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
} as const;
