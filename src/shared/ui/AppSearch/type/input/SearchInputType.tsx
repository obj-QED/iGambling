import { memo } from 'react';

import { Text, Title } from '@mantine/core';

import { DATA_SEARCH, useSearchQuery } from '../../lib';

import styles from '../../styles/type/input.module.scss';

export type SearchInputTypeProps = {
  query?: string;
};

/** `type: input` — page-level results panel (swaps main outlet). */
function SearchInputTypeComponent({ query: queryProp }: SearchInputTypeProps) {
  const storeQuery = useSearchQuery();
  const query = (queryProp ?? storeQuery).trim();

  return (
    <div
      className={styles.root}
      {...DATA_SEARCH}
      data-cmf-component="search"
      data-cmf-key="results"
      data-search-type="input"
    >
      <Title order={2} className={styles.title}>
        Search
      </Title>
      <Text className={styles.body}>
        {query.length > 0
          ? `Results for “${query}” — placeholder. Wire API later.`
          : 'Enter a query in the search field.'}
      </Text>
    </div>
  );
}

export const SearchInputType = memo(SearchInputTypeComponent);
SearchInputType.displayName = 'SearchInputType';
