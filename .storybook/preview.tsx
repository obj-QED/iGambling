import type { Preview } from '@storybook/react-vite';

import { MemoryRouter } from 'react-router-dom';

import { defaultColorScheme } from '@/assets/theme/mantine/mantineTheme';
import { withMantineColorScheme } from '@/storybook/decorators/withMantineColorScheme';

import '@mantine/core/styles.css';
import '@/assets/index.scss';

const preview: Preview = {
  globalTypes: {
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
  },
  decorators: [
    withMantineColorScheme,
    (Story) => (
      <MemoryRouter>
        <div
          style={{
            padding: 'var(--spacing-md, 1rem)',
            background: 'var(--color-bg-body, #0f172a)',
            minHeight: '100%',
          }}
        >
          <Story />
        </div>
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
        order: ['Elements', 'Widgets', '*'],
      },
    },
  },
};

export default preview;
