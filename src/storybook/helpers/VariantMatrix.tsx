import type { ReactNode } from 'react';

import { Group, Stack, Text } from '@mantine/core';

type VariantMatrixProps<T extends string> = {
  items: readonly T[];
  columns?: number;
  renderItem: (item: T) => ReactNode;
  label?: (item: T) => string;
};

export function VariantMatrix<T extends string>({
  items,
  columns = 4,
  renderItem,
  label = (item) => item,
}: VariantMatrixProps<T>) {
  return (
    <Group gap="md" align="flex-start" wrap="wrap">
      {items.map((item) => (
        <Stack
          key={item}
          gap="xs"
          align="center"
          style={{ minWidth: `calc(${100 / columns}% - var(--spacing-md, 1rem))` }}
        >
          {renderItem(item)}
          <Text size="xs" c="var(--color-text-muted)" ta="center">
            {label(item)}
          </Text>
        </Stack>
      ))}
    </Group>
  );
}
