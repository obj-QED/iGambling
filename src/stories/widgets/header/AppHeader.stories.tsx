import type { HeaderConfig } from '@/widgets/header/types';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { HEADER_LAYOUT_KEYS, HEADER_TYPE_KEYS } from '@/shared/config/headerSettings';
import {
  mantineSelectArgType,
  omitStorybookNone,
  STORYBOOK_NONE,
} from '@/storybook/helpers/mantineArgTypes';
import { resolveStorybookHeaderProps } from '@/storybook/helpers/resolveStorybookHeaderProps';
import { AppHeader } from '@/widgets/header';

type AppHeaderStoryArgs = {
  layout?: string;
  type?: string;
  className?: string;
};

function renderAppHeader(args: AppHeaderStoryArgs) {
  const { menu, config } = resolveStorybookHeaderProps();
  const cleaned = omitStorybookNone(args as Record<string, unknown>);
  const patch: Partial<HeaderConfig> = {};
  if (typeof cleaned.layout === 'string') patch.layout = cleaned.layout;
  if (typeof cleaned.type === 'string') patch.type = cleaned.type;

  return (
    <AppHeader
      menu={menu}
      config={{ ...config, ...patch }}
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
          'Full header shell from API/fixture menu. Controls: layout / type (select or — none —). Toolbar **Header session** toggles auth mock.',
      },
    },
  },
  argTypes: {
    layout: mantineSelectArgType(HEADER_LAYOUT_KEYS, { category: 'Config', allowNone: true }),
    type: mantineSelectArgType(HEADER_TYPE_KEYS, { category: 'Config', allowNone: true }),
    className: { control: 'text', table: { category: 'DOM' } },
  },
  args: {
    layout: 'container',
    type: 'dropdown',
    className: STORYBOOK_NONE,
  },
  render: (args) => renderAppHeader(args),
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
  },
};
