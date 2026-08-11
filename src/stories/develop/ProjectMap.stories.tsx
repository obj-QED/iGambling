import type { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from '@mantine/core';

import { DEVELOP_IMPORT_RULE, DEVELOP_SRC_TREE } from './content';
import { DevelopCode, DevelopDocPage, DevelopKvTable } from './ui/DevelopDocPage';

const meta = {
  title: 'Develop/Project Map',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        component: 'Folder map of src/ and layer responsibilities for FSD review.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const LAYER_ROWS: readonly [string, string][] = [
  ['app/', 'Providers, routes, layout data hooks — menu fetch lives here'],
  ['pages/', 'Route composition only — no heavy logic / API'],
  ['widgets/', 'Shell composition (header, aside, banner, footer)'],
  ['features/', 'User workflows — public.ts boundary'],
  ['entities/', 'Domain content + mapping — no overlays/layout'],
  ['shared/', 'UI kit (AppButton, AppLink, CmfIcon, overlays), config, lib — no domain'],
  ['api/', 'Axios + TanStack Query keys / queries / mutations'],
  ['store/', 'Redux auth/session/flags only'],
  ['assets/', 'Theme tokens SoT + settings stub + global SCSS'],
];

export const Overview: Story = {
  render: () => (
    <DevelopDocPage
      title="Project map"
      subtitle="Physical layout of the SPA. Import rule is downward only. Tests mirror this tree under test/."
      badges={['FSD', 'public.ts', 'test/ mirror']}
      sections={[
        {
          id: 'tree',
          title: 'src/ tree',
          body: <DevelopCode>{DEVELOP_SRC_TREE}</DevelopCode>,
        },
        {
          id: 'layers',
          title: 'Layer responsibilities',
          body: <DevelopKvTable rows={LAYER_ROWS} columns={['Folder', 'Responsibility']} />,
        },
        {
          id: 'imports',
          title: 'Import rule',
          body: <DevelopCode>{DEVELOP_IMPORT_RULE}</DevelopCode>,
        },
        {
          id: 'shared-vs-widget',
          title: 'shared vs widget',
          body: (
            <>
              <Text size="sm" mb="sm">
                Put primitives used in ≥2 widgets in <code>shared/ui</code> (AppLink, CmfIcon,
                overlays). Widget folders own menu orchestration, registries, and schema resolve.
              </Text>
              <DevelopKvTable
                rows={[
                  ['shared/ui', 'AppButton, AppLink, CmfIcon, overlays — zero menu/domain'],
                  ['widgets/*', 'Knows menu keys, blocks, layout shell; menu + schema props'],
                ]}
                columns={['Place', 'Rule']}
              />
            </>
          ),
        },
      ]}
    />
  ),
};
