import '@mantine/core';

declare module '@mantine/core' {
  export interface MantineThemeSizesOverride {
    sizes: Record<'xxs', string>;
  }
}
