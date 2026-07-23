import type { DocsPlaygroundField, DocsPlaygroundOption } from './types';

import {
  CMF_ACTION_ICON_SIZES,
  CMF_ACTION_ICON_VARIANTS,
  CMF_BUTTON_SIZES,
  CMF_BUTTON_VARIANTS,
  MANTINE_ACTION_ICON_VARIANTS,
  MANTINE_BUTTON_VARIANTS,
} from '@/assets/theme';

import { MANTINE_RADIUS_OPTIONS, MANTINE_THEME_COLORS } from '../mantineArgTypes';

function titleCase(value: string): string {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function toOptions(values: readonly string[]): DocsPlaygroundOption[] {
  return values.map((value) => ({ value, label: titleCase(value) }));
}

/** Docs control — hero* only (`exception` is menu-key driven). */
const CMF_BUTTON_DOCS_VARIANTS = CMF_BUTTON_VARIANTS.filter((variant) => variant !== 'exception');

export const BUTTON_DOCS_PLAYGROUND_FIELDS: DocsPlaygroundField[] = [
  {
    type: 'variant',
    name: 'variant',
    label: 'Variant',
    groups: [
      { label: 'Mantine', options: toOptions(MANTINE_BUTTON_VARIANTS) },
      { label: 'CMF', options: toOptions(CMF_BUTTON_DOCS_VARIANTS) },
    ],
  },
  {
    type: 'color',
    name: 'color',
    label: 'Color',
    options: MANTINE_THEME_COLORS,
  },
  {
    type: 'segmented',
    name: 'size',
    label: 'Size',
    options: toOptions(CMF_BUTTON_SIZES),
  },
  {
    type: 'segmented',
    name: 'radius',
    label: 'Radius',
    options: toOptions(MANTINE_RADIUS_OPTIONS),
  },
  { type: 'text', name: 'children', label: 'Text' },
  { type: 'switch', name: 'disabled', label: 'Disabled' },
  { type: 'switch', name: 'loading', label: 'Loading' },
  { type: 'switch', name: 'fullWidth', label: 'Full width' },
];

export const ACTION_ICON_DOCS_PLAYGROUND_FIELDS: DocsPlaygroundField[] = [
  {
    type: 'variant',
    name: 'variant',
    label: 'Variant',
    groups: [
      { label: 'Mantine', options: toOptions(MANTINE_ACTION_ICON_VARIANTS) },
      { label: 'CMF', options: toOptions(CMF_ACTION_ICON_VARIANTS) },
    ],
  },
  {
    type: 'color',
    name: 'color',
    label: 'Color',
    options: MANTINE_THEME_COLORS,
  },
  {
    type: 'segmented',
    name: 'size',
    label: 'Size',
    options: toOptions(CMF_ACTION_ICON_SIZES),
  },
  {
    type: 'segmented',
    name: 'radius',
    label: 'Radius',
    options: toOptions(MANTINE_RADIUS_OPTIONS),
  },
  { type: 'text', name: 'aria-label', label: 'Aria label' },
  { type: 'switch', name: 'disabled', label: 'Disabled' },
  { type: 'switch', name: 'loading', label: 'Loading' },
];

/** Hide controls duplicated in the Mantine-style canvas panel. */
export const mantineDocsPlaygroundParameters = {
  layout: 'fullscreen' as const,
  controls: {
    hideNoControlsWarning: true,
    exclude: [
      'variant',
      'color',
      'size',
      'radius',
      'disabled',
      'loading',
      'fullWidth',
      'children',
      'aria-label',
    ],
  },
};

/** Interactive playground — canvas only (`useArgs` does not work in Docs embed). */
export const mantineCanvasPlaygroundParameters = {
  ...mantineDocsPlaygroundParameters,
  docs: {
    disable: true,
  },
};
