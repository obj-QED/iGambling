import type { HeaderConfig } from '@/widgets/header/types';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { HEADER_LAYOUT_KEYS, HEADER_TYPE_KEYS } from '@/shared/config/headerSettings';
import {
  mantineSelectArgType,
  omitStorybookNone,
  STORYBOOK_NONE,
} from '@/storybook/helpers/mantineArgTypes';
import { resolveStorybookHeaderProps } from '@/storybook/helpers/resolveStorybookHeaderProps';
import { StoryLabFrame } from '@/storybook/helpers/StoryLabFrame';
import { AppHeader } from '@/widgets/header';
import { SEARCH_VARIANT_REGISTRY } from '@/widgets/header/ui/blocks/SearchBlock/registry';
import { WALLET_VARIANT_REGISTRY } from '@/widgets/header/ui/blocks/WalletBlock/registry';

const SEARCH_VARIANTS = Object.keys(SEARCH_VARIANT_REGISTRY);
const WALLET_VARIANTS = Object.keys(WALLET_VARIANT_REGISTRY);

type AppHeaderStoryArgs = {
  layout?: string;
  type?: string;
  searchVariant?: string;
  walletVariant?: string;
  className?: string;
};

function renderAppHeader(args: AppHeaderStoryArgs) {
  const { menu, config } = resolveStorybookHeaderProps();
  const cleaned = omitStorybookNone(args as Record<string, unknown>);
  const patch: Partial<HeaderConfig> = {
    blockVariants: { ...config.blockVariants },
  };
  if (typeof cleaned.layout === 'string') patch.layout = cleaned.layout;
  if (typeof cleaned.type === 'string') patch.type = cleaned.type;
  if (typeof cleaned.searchVariant === 'string') {
    patch.blockVariants = { ...patch.blockVariants, search: cleaned.searchVariant };
  }
  if (typeof cleaned.walletVariant === 'string') {
    patch.blockVariants = { ...patch.blockVariants, wallet: cleaned.walletVariant };
  }

  return (
    <AppHeader
      menu={menu}
      config={{ ...config, ...patch, blockVariants: patch.blockVariants ?? config.blockVariants }}
      className={typeof cleaned.className === 'string' ? cleaned.className : undefined}
    />
  );
}

const meta = {
  title: 'Widgets/Header/AppHeader',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Full header shell. Controls: layout / type / search+wallet adapters (select or — none —). Toolbar: session, primary color, color scheme.',
      },
    },
  },
  argTypes: {
    layout: mantineSelectArgType(HEADER_LAYOUT_KEYS, { category: 'Config', allowNone: true }),
    type: mantineSelectArgType(HEADER_TYPE_KEYS, { category: 'Config', allowNone: true }),
    searchVariant: mantineSelectArgType(SEARCH_VARIANTS, {
      category: 'blockVariants',
      allowNone: true,
    }),
    walletVariant: mantineSelectArgType(WALLET_VARIANTS, {
      category: 'blockVariants',
      allowNone: true,
    }),
    className: { control: 'text', table: { category: 'DOM' } },
  },
  args: {
    layout: 'container',
    type: 'dropdown',
    searchVariant: STORYBOOK_NONE,
    walletVariant: STORYBOOK_NONE,
    className: STORYBOOK_NONE,
  },
  render: (args) => (
    <StoryLabFrame
      title="AppHeader"
      summary="Shell preview. Use Controls + toolbar to change layout, adapters, session and theme."
      howTo="Controls → layout / type / searchVariant / walletVariant. Toolbar → Header session, Primary color, Color scheme."
    >
      {renderAppHeader(args)}
    </StoryLabFrame>
  ),
} satisfies Meta<AppHeaderStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ContainerFluid: Story = {
  args: {
    layout: 'container-fluid',
  },
};

export const Playground: Story = {
  args: {
    layout: STORYBOOK_NONE,
    type: STORYBOOK_NONE,
    searchVariant: STORYBOOK_NONE,
    walletVariant: STORYBOOK_NONE,
  },
};
