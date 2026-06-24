import '@mantine/core';

declare module '@mantine/core' {
  export type ActionIconVariant =
    | 'filled'
    | 'light'
    | 'outline'
    | 'transparent'
    | 'white'
    | 'subtle'
    | 'default'
    | 'gradient'
    | 'hero'
    | 'hero-light'
    | 'hero-outline';
}
