import type { TextInputProps } from '@mantine/core';

import { forwardRef, memo, type MouseEvent, useCallback } from 'react';

import { CloseButton, Code, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import clsx from 'clsx';

import { useOs } from '@hooks/device';

import styles from '../../styles/ui/input.module.scss';

export type SearchInputTriggerProps = Omit<
  TextInputProps,
  'value' | 'onChange' | 'readOnly' | 'onClick' | 'onFocus' | 'rightSection'
> & {
  /** Overlay trigger — opens modal/spotlight on click/focus. */
  onActivate?: () => void;
  /** Inline `type: input` — page results mode. */
  onSearchQueryChange?: (query: string) => void;
  searchQuery?: string;
  showHotkeyBadge?: boolean;
  leftSection?: TextInputProps['leftSection'];
  'data-cmf-component'?: string;
  'data-cmf-key'?: string;
  'data-cmf-role'?: string;
  'data-search-overlay'?: string;
};

/**
 * Shared search TextInput trigger + OS hotkey badge (`⌘+K` / `Ctrl+K`).
 * Inline mode: typing hides left search icon and shows a clear (×) on the right.
 * Schema key: `style: input`. Widget paint: header/aside `styles/blocks/*`.
 */
const SearchInputTriggerBase = forwardRef<HTMLInputElement, SearchInputTriggerProps>(
  function SearchInputTrigger(
    {
      onActivate,
      onSearchQueryChange,
      searchQuery,
      showHotkeyBadge,
      leftSection,
      placeholder = 'Search',
      'aria-label': ariaLabel,
      className,
      size = 'md',
      'data-cmf-component': cmfComponent,
      'data-cmf-key': cmfKey,
      'data-cmf-role': cmfRole,
      ...rest
    },
    ref,
  ) {
    const os = useOs();
    const isOverlay = onActivate !== undefined;
    const isInlineInput = onSearchQueryChange !== undefined;
    const modKey = os === 'macos' || os === 'ios' ? '⌘' : 'Ctrl';
    const query = isInlineInput ? (searchQuery ?? '') : '';
    const hasQuery = query.length > 0;

    const handleClear = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onSearchQueryChange?.('');
      },
      [onSearchQueryChange],
    );

    const cmfAttrs = {
      ...(typeof cmfComponent === 'string' ? { 'data-cmf-component': cmfComponent } : {}),
      ...(typeof cmfKey === 'string' ? { 'data-cmf-key': cmfKey } : {}),
      ...(typeof cmfRole === 'string' ? { 'data-cmf-role': cmfRole } : {}),
    };

    const { wrapperProps: restWrapperProps, ...restProps } = rest;

    const defaultLeft = leftSection ?? <IconSearch size={16} stroke={1.75} aria-hidden />;
    const hotkeyBadge = showHotkeyBadge ? (
      <Code data-search-part="code">{`${modKey}+K`}</Code>
    ) : undefined;
    const clearButton = (
      <CloseButton
        data-search-part="clear"
        aria-label="Clear search"
        size="sm"
        onClick={handleClear}
      />
    );

    return (
      <TextInput
        ref={ref}
        className={clsx(className, isOverlay && styles.overlay)}
        size={size}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        leftSection={isInlineInput && hasQuery ? undefined : defaultLeft}
        rightSection={isInlineInput && hasQuery ? clearButton : hotkeyBadge}
        rightSectionPointerEvents={isInlineInput && hasQuery ? 'all' : 'none'}
        readOnly={isOverlay}
        value={isInlineInput ? query : undefined}
        onChange={
          isInlineInput
            ? (event) => {
                onSearchQueryChange(event.currentTarget.value);
              }
            : undefined
        }
        onClick={
          isOverlay
            ? () => {
                onActivate();
              }
            : undefined
        }
        onFocus={
          isOverlay
            ? (event) => {
                event.currentTarget.blur();
                onActivate();
              }
            : isInlineInput
              ? () => {
                  onSearchQueryChange(searchQuery ?? '');
                }
              : undefined
        }
        /* Top-level: theme vars / hasCmfScope. Wrapper: shell skeleton host (hides icon/code). */
        {...cmfAttrs}
        {...(isOverlay ? { 'data-search-overlay': 'true' as const } : {})}
        wrapperProps={{
          ...cmfAttrs,
          ...(isOverlay ? { 'data-search-overlay': 'true' } : {}),
          'data-search-part': 'field',
          ...restWrapperProps,
        }}
        {...restProps}
      />
    );
  },
);

export const SearchInputTrigger = memo(SearchInputTriggerBase);
SearchInputTrigger.displayName = 'SearchInputTrigger';

/** @deprecated Prefer SearchInputTrigger */
export const SearchInputStyle = SearchInputTrigger;
/** @deprecated Prefer SearchInputTriggerProps */
export type SearchInputStyleProps = SearchInputTriggerProps;
