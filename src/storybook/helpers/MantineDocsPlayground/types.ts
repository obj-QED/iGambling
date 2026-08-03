import type { ReactNode } from 'react';

export type DocsPlaygroundOption = {
  value: string;
  label: string;
};

export type DocsPlaygroundVariantGroup = {
  label: string;
  options: readonly DocsPlaygroundOption[];
};

export type DocsPlaygroundField =
  | {
      type: 'variant';
      name: string;
      label: string;
      options?: readonly DocsPlaygroundOption[];
      groups?: readonly DocsPlaygroundVariantGroup[];
      /** Default true — first option «— none —». */
      allowNone?: boolean;
    }
  | {
      type: 'segmented' | 'select';
      name: string;
      label: string;
      options: readonly DocsPlaygroundOption[];
      allowNone?: boolean;
    }
  | {
      type: 'color';
      name: string;
      label: string;
      options: readonly string[];
      allowNone?: boolean;
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
