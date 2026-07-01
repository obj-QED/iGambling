import '@mantine/core';

declare module '@mantine/core' {
  export type ButtonVariant =
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
