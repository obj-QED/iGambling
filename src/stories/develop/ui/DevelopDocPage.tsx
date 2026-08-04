import type { ReactNode } from 'react';

import {
  Anchor,
  Badge,
  Code,
  Divider,
  Group,
  List,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';

export type DevelopSection = {
  id: string;
  title: string;
  body: ReactNode;
};

type DevelopDocPageProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  badges?: readonly string[];
  sections: readonly DevelopSection[];
};

/** Shared chrome for Develop/* stories — public architecture brief for AI + human review. */
export function DevelopDocPage({
  eyebrow = 'Develop',
  title,
  subtitle,
  badges = [],
  sections,
}: DevelopDocPageProps) {
  return (
    <Stack
      gap="xl"
      maw={920}
      p="md"
      data-storybook-develop="doc"
      style={{ color: 'var(--color-text)' }}
    >
      <Stack gap={6}>
        <Text size="xs" tt="uppercase" fw={700} c="var(--color-text-muted)" lts={0.6}>
          {eyebrow}
        </Text>
        <Title order={2} c="var(--color-text)">
          {title}
        </Title>
        <Text size="sm" c="var(--color-text-muted)">
          {subtitle}
        </Text>
        {badges.length > 0 ? (
          <Group gap={6} mt={4}>
            {badges.map((label) => (
              <Badge key={label} variant="light" size="sm">
                {label}
              </Badge>
            ))}
          </Group>
        ) : null}
      </Stack>

      {sections.map((section, index) => (
        <Stack key={section.id} gap="sm" id={section.id}>
          {index > 0 ? <Divider /> : null}
          <Title order={3} c="var(--color-text)">
            {section.title}
          </Title>
          {section.body}
        </Stack>
      ))}
    </Stack>
  );
}

export function DevelopCode({ children }: { children: string }) {
  return (
    <Code block style={{ whiteSpace: 'pre-wrap', fontSize: 12, lineHeight: 1.45 }}>
      {children}
    </Code>
  );
}

export function DevelopBulletList({ items }: { items: readonly (string | ReactNode)[] }) {
  return (
    <List size="sm" spacing={6} c="var(--color-text)">
      {items.map((item, index) => (
        <List.Item key={typeof item === 'string' ? item : `item-${index}`}>{item}</List.Item>
      ))}
    </List>
  );
}

export function DevelopExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Anchor href={href} target="_blank" rel="noopener noreferrer" size="sm" underline="hover">
      {children}
    </Anchor>
  );
}

export function DevelopKvTable({
  rows,
  columns = ['Key', 'Value'],
}: {
  rows: readonly [string, string][];
  columns?: readonly [string, string];
}) {
  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders fz="sm">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>{columns[0]}</Table.Th>
          <Table.Th>{columns[1]}</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {rows.map(([k, v]) => (
          <Table.Tr key={k}>
            <Table.Td>
              <Code>{k}</Code>
            </Table.Td>
            <Table.Td>{v}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
