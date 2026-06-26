import type { ReactNode } from 'react';

export type DocsPlaygroundOption = {
  value: string;
  label: string;
};

export type DocsPlaygroundField =
  | {
      type: 'variant';
      name: string;
      label: string;
      options: readonly DocsPlaygroundOption[];
    }
  | {
      type: 'segmented';
      name: string;
      label: string;
      options: readonly DocsPlaygroundOption[];
    }
  | {
      type: 'color';
      name: string;
      label: string;
      options: readonly string[];
    }
  | {
      type: 'switch';
      name: string;
      label: string;
    }
  | {
      type: 'text';
      name: string;
      label: string;
    };

export type MantineDocsPlaygroundProps<T extends Record<string, unknown>> = {
  args: T;
  fields: readonly DocsPlaygroundField[];
  onChange: (patch: Partial<T>) => void;
  children: ReactNode;
};
