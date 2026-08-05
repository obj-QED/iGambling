import type { ReactNode } from 'react';

import { Code, List, Stack, Text, Title } from '@mantine/core';

type StoryLabFrameProps = {
  title: string;
  /** Short “what this story is”. */
  summary: string;
  /** Optional capability bullets. */
  capabilities?: readonly string[];
  /** How to change settings — keep scannable. */
  howTo?: string;
  children: ReactNode;
};

/**
 * Compact Storybook canvas chrome: title → how-to → preview.
 * Prefer toolbar globals / Controls over dumping JSON.
 */
export function StoryLabFrame({
  title,
  summary,
  capabilities,
  howTo = 'Toolbar (top) + Controls (bottom) update the preview live.',
  children,
}: StoryLabFrameProps) {
  return (
    <Stack gap="sm" maw={960} style={{ color: 'var(--color-text)' }}>
      <Stack gap={4}>
        <Title order={3} c="var(--color-text)">
          {title}
        </Title>
        <Text size="sm" c="var(--color-text-muted)">
          {summary}
        </Text>
        {howTo && (
          <Text
            size="xs"
            fw={500}
            style={{
              color: 'var(--color-text)',
              background: 'var(--color-bg-elevated, var(--mantine-color-default))',
              border: '1px solid var(--color-border)',
              borderRadius: 8,
              padding: '8px 10px',
              lineHeight: 1.45,
            }}
          >
            {howTo}
          </Text>
        )}
      </Stack>
      {capabilities !== undefined && capabilities.length > 0 && (
        <List size="xs" spacing={2} c="var(--color-text)">
          {capabilities.map((line) => (
            <List.Item key={line}>{line}</List.Item>
          ))}
        </List>
      )}
      <div data-story-lab-preview="">{children}</div>
    </Stack>
  );
}

/** Compact key=value chip row for active toolbar globals. */
export function StoryLabMeta({
  items,
}: {
  items: ReadonlyArray<{ label: string; value: string }>;
}) {
  return (
    <Text
      size="xs"
      c="var(--color-text-muted)"
      style={{ fontFamily: 'var(--mantine-font-family-monospace)' }}
    >
      {items.map((item, index) => (
        <span key={item.label}>
          {index > 0 ? ' · ' : null}
          {item.label}=<Code style={{ fontSize: 'inherit' }}>{item.value}</Code>
        </span>
      ))}
    </Text>
  );
}
