import type { TextInputProps } from '@mantine/core';

import { forwardRef, memo, type MouseEvent, useCallback } from 'react';

import { CloseButton, Code, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import clsx from 'clsx';

import { useOs } from '@hooks/device';

import { DATA_SEARCH } from '../../lib/searchDataAttrs';

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
 * Always emits global `data-search="true"` (see `DATA_SEARCH`).
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
    /* Always a string — slideout toggles overlay ↔ inline on the same TextInput. */
    const query = searchQuery ?? '';
    const hasQuery = isInlineInput && query.length > 0;

    const handleClear = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onSearchQueryChange?.('');
      },
      [onSearchQueryChange],
    );

    const handleChange = useCallback(
      (event: { currentTarget: { value: string } }) => {
        if (onSearchQueryChange === undefined) return;
        onSearchQueryChange(event.currentTarget.value);
      },
      [onSearchQueryChange],
    );

    const cmfAttrs = {
      ...DATA_SEARCH,
      ...(typeof cmfComponent === 'string' ? { 'data-cmf-component': cmfComponent } : {}),
      ...(typeof cmfKey === 'string' ? { 'data-cmf-key': cmfKey } : {}),
      ...(typeof cmfRole === 'string' ? { 'data-cmf-role': cmfRole } : {}),
    };

    const {
      wrapperProps: restWrapperProps,
      style: restStyle,
      value: _ignoredValue,
      defaultValue: _ignoredDefaultValue,
      ...restProps
    } = rest;

    const measureText = isInlineInput ? (hasQuery ? query : placeholder) : placeholder;
    const hotkeyText = showHotkeyBadge && !(isInlineInput && hasQuery) ? `${modKey}+K` : '';
    const contentCh = Math.max(measureText.length, 1);
    const codeCh = hotkeyText.length;

    const defaultLeft = leftSection ?? <IconSearch size={16} stroke={1.75} aria-hidden />;
    const hotkeyBadge = showHotkeyBadge ? (
      <Code data-search-part="code">{hotkeyText}</Code>
    ) : undefined;
    const clearButton = (
      <CloseButton
        data-search-part="clear"
        aria-label="Clear search"
        size="sm"
        onClick={handleClear}
      />
    );

    const { style: restWrapperStyle, ...restWrapperRest } = restWrapperProps ?? {};

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
        style={restStyle}
        /* Top-level: theme vars / hasCmfScope. Wrapper: shell skeleton host (hides icon/code). */
        {...cmfAttrs}
        {...(isOverlay ? { 'data-search-overlay': 'true' as const } : {})}
        wrapperProps={{
          ...cmfAttrs,
          ...(isOverlay ? { 'data-search-overlay': 'true' } : {}),
          'data-search-part': 'field',
          ...restWrapperRest,
          style: {
            ...(restWrapperStyle && typeof restWrapperStyle === 'object' ? restWrapperStyle : null),
            ['--cmf-search-content-ch' as string]: String(contentCh),
            ['--cmf-search-code-ch' as string]: String(codeCh),
            ...(codeCh > 0
              ? {
                  ['--input-right-section-width' as string]:
                    'calc(var(--cmf-search-code-ch) * 1ch + var(--mantine-spacing-md, 1rem))',
                }
              : {}),
          },
        }}
        {...restProps}
        /* Controlled props LAST — never let rest override with undefined. */
        readOnly={isOverlay}
        value={query}
        onChange={handleChange}
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
                  onSearchQueryChange(query);
                }
              : undefined
        }
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
