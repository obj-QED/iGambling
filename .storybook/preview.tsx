/* CSS layers first — before `@/assets/theme` (import sort). */
import type { Preview } from '@storybook/react-vite';

import { MemoryRouter } from 'react-router-dom';

import { defaultColorScheme } from '@/assets/theme';
import { withAppSettings } from '@/storybook/decorators/withAppSettings';
import { withMantineColorScheme } from '@/storybook/decorators/withMantineColorScheme';
import { STORYBOOK_APP_SETTINGS_GLOBAL_TYPES } from '@/storybook/settings';

import '@/assets/styles-bootstrap';

const preview: Preview = {
  globalTypes: {
    ...STORYBOOK_APP_SETTINGS_GLOBAL_TYPES,
    colorScheme: {
      name: 'Color scheme',
      description: 'Mantine color scheme',
      defaultValue: defaultColorScheme,
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  } as Preview['globalTypes'],
  decorators: [
    withAppSettings,
    withMantineColorScheme,
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    options: {
      storySort: {
        order: [
          'Settings',
          ['App', ['Overview', 'HeaderPreview', 'SidebarPreview']],
          'Elements',
          ['Button', ['Default', 'With Icon', 'Icon Cascade', 'All Variants', 'Playground']],
          [
            'ActionIcon',
            ['Default', 'With Cmf Icon', 'Icon Cascade', 'All Variants', 'Playground'],
          ],
          'Widgets',
          ['Header', ['AppHeader', 'Special Blocks', ['Menu Items', ['Overview', 'Icon Cascade']]]],
          ['Sidebar', ['AppSidebar']],
          '*',
        ],
      },
    },
  },
};

export default preview;
