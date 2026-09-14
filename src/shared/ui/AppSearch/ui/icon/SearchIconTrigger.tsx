import type { AppActionIconProps } from '@/shared/ui/AppActionIcon';
import type { MouseEventHandler, ReactNode } from 'react';

import { forwardRef, memo, useMemo } from 'react';

import { IconSearch } from '@tabler/icons-react';
import clsx from 'clsx';

import { AppActionIcon } from '@/shared/ui/AppActionIcon';

import styles from '../../styles/ui/icon.module.scss';

export type SearchIconTriggerProps = Omit<AppActionIconProps, 'children' | 'onClick'> & {
  /** Overlay trigger — opens modal/spotlight. */
  onActivate?: () => void;
  /** Inline `type: input` — icon opens page-results flow. */
  onSearchQueryChange?: (query: string) => void;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
};

/**
 * Shared search ActionIcon trigger.
 * Schema keys: `style: icon` | `style: compact`. Widget paint: header/aside styles.
 */
const SearchIconTriggerBase = forwardRef<HTMLButtonElement, SearchIconTriggerProps>(
  function SearchIconTrigger(
    { onActivate, onSearchQueryChange, onClick, children, native, className, ...rest },
    ref,
  ) {
    const isOverlay = onActivate !== undefined;
    const isAction =
      onActivate !== undefined || onSearchQueryChange !== undefined || onClick !== undefined;

    const handleClick = useMemo((): MouseEventHandler<HTMLButtonElement> | undefined => {
      if (onClick !== undefined) return onClick;
      if (onActivate !== undefined) {
        return (event) => {
          event.preventDefault();
          onActivate();
        };
      }
      if (onSearchQueryChange !== undefined) {
        return (event) => {
          event.preventDefault();
          onSearchQueryChange('');
        };
      }
      return undefined;
    }, [onActivate, onClick, onSearchQueryChange]);

    return (
      <AppActionIcon
        ref={ref}
        className={clsx(className, isOverlay && styles.overlay)}
        native={native ?? isAction}
        onClick={handleClick}
        {...rest}
      >
        {children ?? <IconSearch size={18} stroke={1.75} aria-hidden />}
      </AppActionIcon>
    );
  },
);

export const SearchIconTrigger = memo(SearchIconTriggerBase);
SearchIconTrigger.displayName = 'SearchIconTrigger';
