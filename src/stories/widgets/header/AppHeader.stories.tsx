import type { HeaderConfig } from '@/widgets/header/types';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { resolveStorybookHeaderProps } from '@/storybook/helpers/resolveStorybookHeaderProps';
import { AppHeader } from '@/widgets/header';

type AppHeaderStoryArgs = {
  config?: Partial<HeaderConfig>;
  className?: string;
};

function renderAppHeader(partial: AppHeaderStoryArgs = {}) {
  const { menu, config } = resolveStorybookHeaderProps();

  return (
    <AppHeader
      menu={menu}
      config={{ ...config, ...partial.config }}
      className={partial.className}
    />
  );
}

const meta = {
  title: 'Widgets/Header/AppHeader',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full header shell from API/fixture menu. Toolbar **Mock on/off** toggles menu source. Special blocks and menu item primitives live in sibling stories.',
      },
    },
  },
  render: (args) => renderAppHeader(args),
  args: {},
} satisfies Meta<AppHeaderStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ContainerFluid: Story = {
  args: {
    config: { layout: 'container-fluid' },
  },
};
