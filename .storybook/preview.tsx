/* CSS layers first — before `@/assets/theme` (import sort). */
import type { Preview } from '@storybook/react-vite';

import { MemoryRouter } from 'react-router-dom';

import { defaultColorScheme } from '@/assets/theme';
import { withAppSettings } from '@/storybook/decorators/withAppSettings';
import { withMantineColorScheme } from '@/storybook/decorators/withMantineColorScheme';
import {
  STORYBOOK_APP_SETTINGS_GLOBAL_TYPES,
  STORYBOOK_THEME_GLOBAL_TYPES,
} from '@/storybook/settings';

import '@/assets/styles-bootstrap';

const preview: Preview = {
  globalTypes: {
    ...STORYBOOK_THEME_GLOBAL_TYPES,
    ...STORYBOOK_APP_SETTINGS_GLOBAL_TYPES,
    colorScheme: {
      name: 'Color scheme',
      description:
        'Light / Dark — sets data-theme + color-scheme on document (brand palette + readable shell)',
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
    layout: 'padded',
    backgrounds: {
      disable: true,
    },
    controls: {
      expanded: true,
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
          'Guide',
          ['How to use'],
          'Lab',
          ['App Settings', ['Overview', 'Header', 'Sidebar']],
          'Theme',
          ['Palette'],
          'Elements',
          ['Button', ['Default', 'With Icon', 'Icon Cascade', 'All Variants', 'Playground']],
          [
            'ActionIcon',
            ['Default', 'With Cmf Icon', 'Icon Cascade', 'All Variants', 'Playground'],
          ],
          'Widgets',
          [
            'Header',
            [
              'AppHeader',
              ['Menu Items', ['Overview', 'Icon Cascade', 'Playground']],
              [
                'Special Blocks',
                [
                  'Overview',
                  'Search',
                  'Wallet',
                  'Logo',
                  'Notification',
                  'Color Scheme',
                  'Bonus Box',
                ],
              ],
            ],
          ],
          [
            'Sidebar',
            ['AppSidebar', ['Special Blocks', ['Overview', 'Logo', 'Search', 'Timer', 'Wheel']]],
          ],
          'Develop',
          [
            'Theme and Styles',
            'Architecture',
            'Project Map',
            'Widgets',
            'State and API',
            'Security',
            'AI Review Brief',
          ],
          '*',
        ],
      },
    },
  },
};

export default preview;
