import type { SidebarConfig } from '@/widgets/sidebar/types';
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  ASIDE_LAYOUT_KEYS,
  ASIDE_SCROLL_AREA_OVERSCROLL,
  ASIDE_SCROLL_AREA_TYPES,
  ASIDE_TYPE_KEYS,
} from '@/shared/config/asideSettings';
import {
  mantineBooleanArgType,
  mantineSelectArgType,
  omitStorybookNone,
  STORYBOOK_NONE,
} from '@/storybook/helpers/mantineArgTypes';
import { resolveStorybookSidebarProps } from '@/storybook/helpers/resolveStorybookSidebarProps';
import { AppSidebar } from '@/widgets/sidebar';

type AppSidebarStoryArgs = {
  layout?: string;
  type?: string;
  width?: string;
  regionHeader?: boolean;
  regionMain?: boolean;
  regionFooter?: boolean;
  scrollAreaType?: string;
  overscrollBehavior?: string;
  className?: string;
};

function renderAppSidebar(args: AppSidebarStoryArgs) {
  const { menu, config } = resolveStorybookSidebarProps();
  const cleaned = omitStorybookNone(args as Record<string, unknown>);
  const patch: Partial<SidebarConfig> = {
    regions: {
      header: args.regionHeader !== false,
      main: args.regionMain !== false,
      footer: args.regionFooter !== false,
    },
  };

  if (typeof cleaned.layout === 'string') patch.layout = cleaned.layout;
  if (typeof cleaned.type === 'string') patch.type = cleaned.type;
  if (typeof cleaned.width === 'string' && cleaned.width.trim().length > 0) {
    const asNumber = Number(cleaned.width);
    patch.width = Number.isFinite(asNumber) ? asNumber : cleaned.width;
  }

  const scrollPatch: Partial<SidebarConfig['scrollArea']> = {};
  if (typeof cleaned.scrollAreaType === 'string') {
    scrollPatch.type = cleaned.scrollAreaType as SidebarConfig['scrollArea']['type'];
  }
  if (typeof cleaned.overscrollBehavior === 'string') {
    scrollPatch.overscrollBehavior =
      cleaned.overscrollBehavior as SidebarConfig['scrollArea']['overscrollBehavior'];
  }
  if (Object.keys(scrollPatch).length > 0) {
    patch.scrollArea = { ...config.scrollArea, ...scrollPatch };
  }

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
        config={{ ...config, ...patch }}
        className={typeof cleaned.className === 'string' ? cleaned.className : undefined}
      />
    </div>
  );
}

const meta = {
  title: 'Widgets/Sidebar/AppSidebar',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Left aside shell. All config knobs are select / boolean controls (— none — omits override).',
      },
    },
  },
  argTypes: {
    layout: mantineSelectArgType(ASIDE_LAYOUT_KEYS, { category: 'Config', allowNone: true }),
    type: mantineSelectArgType(ASIDE_TYPE_KEYS, { category: 'Config', allowNone: true }),
    width: mantineSelectArgType(['72', '320', '400', '480'], {
      category: 'Config',
      allowNone: true,
    }),
    regionHeader: mantineBooleanArgType('Regions'),
    regionMain: mantineBooleanArgType('Regions'),
    regionFooter: mantineBooleanArgType('Regions'),
    scrollAreaType: mantineSelectArgType(ASIDE_SCROLL_AREA_TYPES, {
      category: 'ScrollArea',
      allowNone: true,
    }),
    overscrollBehavior: mantineSelectArgType(ASIDE_SCROLL_AREA_OVERSCROLL, {
      category: 'ScrollArea',
      allowNone: true,
    }),
    className: { control: 'text', table: { category: 'DOM' } },
  },
  args: {
    layout: 'container',
    type: 'default',
    width: STORYBOOK_NONE,
    regionHeader: true,
    regionMain: true,
    regionFooter: true,
    scrollAreaType: STORYBOOK_NONE,
    overscrollBehavior: STORYBOOK_NONE,
    className: STORYBOOK_NONE,
  },
  render: (args) => renderAppSidebar(args),
} satisfies Meta<AppSidebarStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Narrow: Story = {
  args: {
    width: '320',
  },
};

export const Wide: Story = {
  args: {
    width: '480',
  },
};

export const Compact: Story = {
  args: {
    type: 'compact',
    width: '72',
  },
  render: (args) => {
    const { menu, config } = resolveStorybookSidebarProps();
    const cleaned = omitStorybookNone(args as Record<string, unknown>);
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
          config={{
            ...config,
            type: 'compact',
            width: 72,
            // One open group so compact dropdown+chevron is readable (not every section).
            openedDropdowns: ['casino'],
            regions: {
              header: args.regionHeader !== false,
              main: args.regionMain !== false,
              footer: args.regionFooter !== false,
            },
            ...(typeof cleaned.layout === 'string' ? { layout: cleaned.layout } : {}),
          }}
        />
      </div>
    );
  },
};

export const Playground: Story = {
  args: {
    layout: STORYBOOK_NONE,
    type: STORYBOOK_NONE,
    width: STORYBOOK_NONE,
    scrollAreaType: STORYBOOK_NONE,
    overscrollBehavior: STORYBOOK_NONE,
  },
};
