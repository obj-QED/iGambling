/** Shared Motion timings — fast but noticeable (~180–220ms). */
export const PAGE_STAGE_TRANSITION = {
  duration: 0.2,
  ease: [0.22, 1, 0.36, 1] as const,
};

/**
 * Info CMS / search↔page wipe — Motion page-mask style (exit right←, enter ←right).
 * @see https://examples.motion.dev/ui/sections/page-mask-transitions
 */
export const INFO_CONTENT_MASK = {
  initial: { clipPath: 'inset(0 0 0 100%)' },
  animate: { clipPath: 'inset(0 0 0 0%)' },
  exit: { clipPath: 'inset(0 100% 0 0%)' },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
} as const;
