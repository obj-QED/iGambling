import type { ReactNode } from 'react';

import { Group, Stack, Text } from '@mantine/core';

type VariantMatrixProps<T extends string> = {
  items: readonly T[];
  columns?: number;
  renderItem: (item: T) => ReactNode;
  label?: (item: T) => string;
  /** Variants that need a contrasting surface (e.g. `white` on light shell). */
  contrastItems?: readonly T[];
};

export function VariantMatrix<T extends string>({
  items,
  columns = 4,
  renderItem,
  label = (item) => item,
  contrastItems = [],
}: VariantMatrixProps<T>) {
  const contrast = new Set(contrastItems);

  return (
    <Group gap="md" align="flex-start" wrap="wrap">
      {items.map((item) => {
        const needsContrast = contrast.has(item);
        return (
          <Stack
            key={item}
            gap="xs"
            align="center"
            style={{
              minWidth: `calc(${100 / columns}% - var(--spacing-md, 1rem))`,
              padding: needsContrast ? '0.75rem' : undefined,
              borderRadius: needsContrast ? 8 : undefined,
              background: needsContrast ? 'var(--mantine-color-dark-6)' : undefined,
              border: needsContrast ? '1px solid var(--color-border)' : undefined,
            }}
          >
            {renderItem(item)}
            <Text
              size="xs"
              c={needsContrast ? 'var(--mantine-color-gray-0)' : 'var(--color-text-muted)'}
              ta="center"
            >
              {label(item)}
            </Text>
          </Stack>
        );
      })}
    </Group>
  );
}
