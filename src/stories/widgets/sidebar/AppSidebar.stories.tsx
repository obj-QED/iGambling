import type { SidebarConfig } from '@/widgets/sidebar/types';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { resolveStorybookSidebarProps } from '@/storybook/helpers/resolveStorybookSidebarProps';
import { AppSidebar } from '@/widgets/sidebar';

type AppSidebarStoryArgs = {
  config?: Partial<SidebarConfig>;
  className?: string;
};

function renderAppSidebar(partial: AppSidebarStoryArgs = {}) {
  const { menu, config } = resolveStorybookSidebarProps();

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--color-bg-body, #0f172a)',
      }}
    >
      <AppSidebar
        menu={menu}
        config={{ ...config, ...partial.config }}
        className={partial.className}
      />
    </div>
  );
}

const meta = {
  title: 'Widgets/Sidebar/AppSidebar',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Left aside shell with scrollable menu. Toolbar **Aside mock menu** and **Aside width** map to `window.__SETTINGS__.aside`. Icon media: `--cmf-button-sidebar-icon-{scale|aspect|width|height}` in `sidebar/tokens.scss`.',
      },
    },
  },
  render: (args) => renderAppSidebar(args),
  args: {},
} satisfies Meta<AppSidebarStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Narrow: Story = {
  args: {
    config: { width: 320 },
  },
};

export const Wide: Story = {
  args: {
    config: { width: 480 },
  },
};
