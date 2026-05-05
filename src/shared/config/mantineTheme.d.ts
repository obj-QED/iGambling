import '@mantine/core';

declare module '@mantine/core' {
  export interface MantineThemeOther {
    size: {
      mobile: {
        min: number;
        max: number;
        media: string;
      };
    };
  }
}
