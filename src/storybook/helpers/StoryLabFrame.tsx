import type { ReactNode } from 'react';

import { Code, Stack, Text, Title } from '@mantine/core';

type StoryLabFrameProps = {
  title: string;
  /** Short “what you can change” blurb. */
  summary: string;
  /** Optional capability bullets shown under the summary. */
  capabilities?: readonly string[];
  /** Hint for Controls / toolbar — keep one line. */
  howTo?: string;
  children: ReactNode;
};

/**
 * Consistent Storybook canvas chrome: title → how to use → live preview.
 * Does not own controls — use Storybook Controls panel (select / boolean).
 */
export function StoryLabFrame({
  title,
  summary,
  capabilities,
  howTo = 'Use the Controls panel (dropdowns) and the toolbar (theme / settings) — preview updates live.',
  children,
}: StoryLabFrameProps) {
  return (
    <Stack gap="md" maw={960}>
      <Stack gap={6}>
        <Title order={3} c="var(--color-text)">
          {title}
        </Title>
        <Text size="sm" c="var(--color-text-muted)">
          {summary}
        </Text>
        {howTo ? (
          <Text
            size="xs"
            style={{
              color: 'var(--color-text)',
              background: 'var(--color-bg-body)',
              border: '1px solid var(--color-border)',
              borderRadius: 8,
              padding: '8px 10px',
            }}
          >
            {howTo}
          </Text>
        ) : null}
      </Stack>
      {capabilities !== undefined && capabilities.length > 0 ? (
        <Code block style={{ whiteSpace: 'pre-wrap' }}>
          {capabilities.map((line) => `• ${line}`).join('\n')}
        </Code>
      ) : null}
      <div data-story-lab-preview="">{children}</div>
    </Stack>
  );
}
