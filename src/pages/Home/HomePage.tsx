import { memo } from 'react';

import {
  ActionIcon,
  Box,
  Button,
  Code,
  Group,
  Stack,
  Text,
  Title,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';

import { AppButton } from '@/elements';
import { getAppHrefKind } from '@/shared/lib';
import { AppLink } from '@/shared/ui';

const HEADING_ORDERS = [1, 2, 3, 4, 5, 6] as const;

const BUTTON_VARIANTS = [
  'filled',
  'outline',
  'light',
  'subtle',
  'default',
  'transparent',
  'white',
  'gradient',
] as const;

const BUTTON_STATE_VARIANTS = ['filled', 'outline', 'gradient'] as const;

const BUTTON_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

const ACTION_ICON_VARIANTS = [
  'filled',
  'outline',
  'light',
  'subtle',
  'default',
  'transparent',
  'white',
  'gradient',
] as const;

const ACTION_ICON_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

const VALID_LINK_SAMPLES = [
  { href: '/', label: 'internal-home' },
  { href: '/auth', label: 'internal' },
  { href: 'https://example.com', label: 'external' },
  { href: '#promo', label: 'hash' },
] as const;

const INVALID_LINK_SAMPLES = [
  { href: '', label: 'empty' },
  { href: 'relative-no-slash', label: 'relative' },
  { href: '#', label: 'hash-only' },
  { href: '//evil.example', label: 'protocol-relative' },
  { href: '/#', label: 'root-hash' },
] as const;

const BRAND_SHADE_INDICES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

function DemoIconGlyph() {
  return <>+</>;
}

function BrandPaletteDemo() {
  return (
    <Group gap={4} wrap="nowrap">
      {BRAND_SHADE_INDICES.map((index) => (
        <Box
          key={index}
          w={36}
          h={36}
          style={{
            borderRadius: 6,
            background: `var(--brand-color-${index}, var(--mantine-color-brand-${index}))`,
            border: '1px solid var(--color-border)',
          }}
          title={`brand-${index}`}
        />
      ))}
    </Group>
  );
}

function ThemeToggleBlock() {
  const { toggleColorScheme } = useMantineColorScheme();
  const computedScheme = useComputedColorScheme('dark');

  return (
    <Stack gap="xs">
      <Group gap="sm">
        <Button variant="filled" onClick={toggleColorScheme}>
          Тема: {computedScheme === 'light' ? 'light' : 'dark'}
        </Button>
        <Text size="sm" c="dimmed">
          Палитра из theme.scss → --brand-color-* / --mantine-color-brand-*
        </Text>
      </Group>
      <BrandPaletteDemo />
      <Group gap="sm" mt="xs">
        <Button variant="filled">filled</Button>
        <Button variant="outline">outline</Button>
        <Button variant="light">light</Button>
        <Button variant="gradient">gradient</Button>
      </Group>
    </Stack>
  );
}

function LinkDemoRow({ href, label }: { href: string; label: string }) {
  const kind = getAppHrefKind(href);
  const hrefLabel = href === '' ? '(empty)' : href;

  return (
    <Group gap="sm" align="center" wrap="nowrap">
      <Code w={120}>{label}</Code>
      <Code w={90}>{kind}</Code>
      <Code flex={1} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {hrefLabel}
      </Code>
      <AppLink href={href}>
        <Text size="sm" td={kind === 'invalid' ? 'line-through' : undefined}>
          AppLink
        </Text>
      </AppLink>
    </Group>
  );
}

function HomePageComponent() {
  return (
    <>
      <Stack gap="xs" className={'container'}>
        {HEADING_ORDERS.map((order) => (
          <Title key={order} order={order}>
            Заголовок h{order}
          </Title>
        ))}
      </Stack>

      <Stack gap="md" mt="lg">
        <Title order={3}>Тема и бренд</Title>
        <ThemeToggleBlock />
      </Stack>

      <Stack gap="md" mt="lg">
        <Title order={3}>Кнопки</Title>

        <Stack gap="xs">
          <Title order={5}>Дефолт (tokens/theme.scss)</Title>
          <Group gap="sm">
            {BUTTON_VARIANTS.map((variant) => (
              <Button key={variant} variant={variant}>
                {variant}
              </Button>
            ))}
          </Group>
        </Stack>

        <Stack gap="xs">
          <Title order={5}>Hero / button-link (custom variants)</Title>
          <Group gap="sm">
            <Button variant="hero">hero default</Button>
            <Button variant="hero-light">hero light</Button>
            <Button variant="hero-outline">hero outline</Button>
            <Button variant="button-link">button-link</Button>
          </Group>
        </Stack>

        <Stack gap="xs">
          <Title order={5}>Размеры</Title>
          <Group gap="sm" align="flex-end">
            {BUTTON_SIZES.map((size) => (
              <Button key={size} size={size} variant="filled">
                {size}
              </Button>
            ))}
          </Group>
        </Stack>

        <Stack gap="sm">
          <Title order={5}>Состояния (default / disabled / loading / fullscreen)</Title>
          {BUTTON_STATE_VARIANTS.map((variant) => (
            <Stack key={variant} gap="xs">
              <Text size="sm" fw={600}>
                {variant}
              </Text>
              <Group gap="sm">
                <Button variant={variant}>default</Button>
                <Button variant={variant} disabled>
                  disabled
                </Button>
                <Button variant={variant} loading>
                  loading
                </Button>
                <Button variant={variant} disabled loading>
                  disabled+loading
                </Button>
              </Group>
              <AppButton variant={variant} fullscreen label="fullscreen" />
            </Stack>
          ))}
        </Stack>
      </Stack>

      <Stack gap="md" mt="lg">
        <Title order={3}>ActionIcon</Title>

        <Stack gap="xs">
          <Title order={5}>Дефолт (tokens/theme.scss)</Title>
          <Group gap="sm">
            {ACTION_ICON_VARIANTS.map((variant) => (
              <ActionIcon key={variant} variant={variant} aria-label={variant}>
                <DemoIconGlyph />
              </ActionIcon>
            ))}
          </Group>
        </Stack>

        <Stack gap="xs">
          <Title order={5}>Размеры</Title>
          <Group gap="sm" align="flex-end">
            {ACTION_ICON_SIZES.map((size) => (
              <ActionIcon key={size} size={size} variant="filled" aria-label={size}>
                <DemoIconGlyph />
              </ActionIcon>
            ))}
          </Group>
        </Stack>

        <Stack gap="sm">
          <Title order={5}>Состояния (default / disabled / loading)</Title>
          {(['filled', 'outline', 'gradient'] as const).map((variant) => (
            <Stack key={variant} gap="xs">
              <Text size="sm" fw={600}>
                {variant}
              </Text>
              <Group gap="sm">
                <ActionIcon variant={variant} aria-label={`${variant} default`}>
                  <DemoIconGlyph />
                </ActionIcon>
                <ActionIcon variant={variant} disabled aria-label={`${variant} disabled`}>
                  <DemoIconGlyph />
                </ActionIcon>
                <ActionIcon variant={variant} loading aria-label={`${variant} loading`}>
                  <DemoIconGlyph />
                </ActionIcon>
              </Group>
            </Stack>
          ))}
        </Stack>
      </Stack>

      <Stack gap="md" mt="xl">
        <Title order={3}>Ссылки (AppLink)</Title>
        <Text size="sm" c="dimmed">
          {
            'Mantine Anchor + RR Link / external <a>. Internal URL → data-active / aria-current. Невалидные → <span data-invalid-href>.'
          }
        </Text>

        <Stack gap="xs">
          <Title order={5}>Валидные</Title>
          {VALID_LINK_SAMPLES.map((sample) => (
            <LinkDemoRow key={sample.label} href={sample.href} label={sample.label} />
          ))}
        </Stack>

        <Stack gap="xs">
          <Title order={5}>Невалидные</Title>
          {INVALID_LINK_SAMPLES.map((sample) => (
            <LinkDemoRow key={sample.label} href={sample.href} label={sample.label} />
          ))}
        </Stack>
      </Stack>

      <p>Минимальная сборка: прокси + авторизация + bootstrap.</p>
    </>
  );
}

export const HomePage = memo(HomePageComponent);
HomePage.displayName = 'HomePage';
