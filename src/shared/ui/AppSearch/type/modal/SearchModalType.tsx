import type { ContextModalProps } from '@mantine/modals';

import { memo, useCallback, useEffect, useRef } from 'react';

import { CloseButton, Text, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';

import { selectAppSearchQuery, setAppSearchQuery } from '@store/slices/contextSlice';

import { DATA_SEARCH } from '../../lib/searchDataAttrs';

import styles from '../../styles/type/modal.module.scss';

/** Body for `@mantine/modals` context modal `search`. */
function SearchModalContentComponent({ id, context }: ContextModalProps) {
  const dispatch = useDispatch();
  const query = useSelector(selectAppSearchQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasQuery = query.length > 0;

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [id]);

  const handleClear = useCallback(() => {
    dispatch(setAppSearchQuery(''));
    inputRef.current?.focus();
  }, [dispatch]);

  const cmfAttrs = {
    ...DATA_SEARCH,
    'data-cmf-component': 'modal',
    'data-cmf-key': 'search',
  } as const;

  return (
    <div
      className={styles.root}
      {...DATA_SEARCH}
      data-cmf-component="search"
      data-search-type="modal"
    >
      <TextInput
        ref={inputRef}
        placeholder="Search..."
        aria-label="Search"
        {...cmfAttrs}
        wrapperProps={{
          ...cmfAttrs,
          'data-search-part': 'field',
        }}
        leftSection={hasQuery ? undefined : <IconSearch size={18} stroke={1.75} aria-hidden />}
        rightSection={
          hasQuery ? (
            <CloseButton
              data-search-part="clear"
              aria-label="Clear search"
              size="sm"
              onClick={handleClear}
            />
          ) : undefined
        }
        rightSectionPointerEvents={hasQuery ? 'all' : 'none'}
        value={query ?? ''}
        onChange={(event) => {
          dispatch(setAppSearchQuery(event.currentTarget.value));
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            context.closeModal(id);
          }
        }}
      />
      <Text className={styles.body} component="div">
        {query.trim().length > 0
          ? `Results for “${query.trim()}” — placeholder. Wire API later.`
          : 'Type to search. Results will appear here.'}
      </Text>
    </div>
  );
}

export const SearchModalContent = memo(SearchModalContentComponent);
SearchModalContent.displayName = 'SearchModalContent';

/** Context modal registered in ModalsProvider (`modal: 'search'`). */
export const SearchModalContext = SearchModalContent;

/** @deprecated Prefer SearchModalContent — modal chrome is owned by @mantine/modals. */
export const SearchModalType = SearchModalContent;
