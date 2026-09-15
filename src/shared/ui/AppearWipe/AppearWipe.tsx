import type { AppearWipeProps } from './types';

import { memo } from 'react';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';

import { INFO_CONTENT_MASK } from '@/shared/lib/motion';

import styles from './styles.module.scss';

export type { AppearWipeProps } from './types';

/**
 * Appear wipe on mount / when {@link AppearWipeProps.contentKey} changes.
 * Same motion as Info CMS body — reuse for text/blocks that should animate in.
 *
 * @example
 * ```tsx
 * <AppearWipe contentKey={title}>
 *   <Title>{title}</Title>
 * </AppearWipe>
 * ```
 */
export const AppearWipe = memo(function AppearWipe({
  children,
  contentKey,
  className,
  panelClassName,
}: AppearWipeProps) {
  return (
    <div className={clsx(styles.root, className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={contentKey}
          className={clsx(styles.panel, panelClassName)}
          initial={INFO_CONTENT_MASK.initial}
          animate={INFO_CONTENT_MASK.animate}
          exit={INFO_CONTENT_MASK.exit}
          transition={INFO_CONTENT_MASK.transition}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
});
AppearWipe.displayName = 'AppearWipe';
