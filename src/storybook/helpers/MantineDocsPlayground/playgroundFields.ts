import type { DocsPlaygroundField, DocsPlaygroundOption } from './types';

import {
  CMF_ACTION_ICON_SIZES,
  CMF_BUTTON_SIZES,
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

export const BUTTON_DOCS_PLAYGROUND_FIELDS: DocsPlaygroundField[] = [
  {
    type: 'variant',
    name: 'variant',
    label: 'Variant',
    allowNone: true,
    groups: [{ label: 'Mantine', options: toOptions(MANTINE_BUTTON_VARIANTS) }],
  },
  {
    type: 'color',
    name: 'color',
    label: 'Color',
    options: MANTINE_THEME_COLORS,
    allowNone: true,
  },
  {
    type: 'select',
    name: 'size',
    label: 'Size',
    options: toOptions(CMF_BUTTON_SIZES),
    allowNone: false,
  },
  {
    type: 'select',
    name: 'radius',
    label: 'Radius',
    options: toOptions(MANTINE_RADIUS_OPTIONS),
    allowNone: false,
  },
  { type: 'text', name: 'children', label: 'Text' },
  {
    type: 'select',
    name: 'iconScale',
    label: 'Icon scale',
    allowNone: true,
    options: [
      { value: '0.5', label: '0.5' },
      { value: '0.7', label: '0.7' },
      { value: '1', label: '1' },
    ],
  },
  {
    type: 'select',
    name: 'iconAspect',
    label: 'Icon aspect',
    allowNone: true,
    options: [
      { value: '1', label: '1' },
      { value: '1.5', label: '1.5' },
      { value: '2', label: '2' },
    ],
  },
  { type: 'switch', name: 'disabled', label: 'Disabled' },
  { type: 'switch', name: 'loading', label: 'Loading' },
  { type: 'switch', name: 'fullscreen', label: 'Fullscreen width' },
];

export const ACTION_ICON_DOCS_PLAYGROUND_FIELDS: DocsPlaygroundField[] = [
  {
    type: 'variant',
    name: 'variant',
    label: 'Variant',
    allowNone: true,
    groups: [{ label: 'Mantine', options: toOptions(MANTINE_ACTION_ICON_VARIANTS) }],
  },
  {
    type: 'color',
    name: 'color',
    label: 'Color',
    options: MANTINE_THEME_COLORS,
    allowNone: true,
  },
  {
    type: 'select',
    name: 'size',
    label: 'Size',
    options: toOptions(CMF_ACTION_ICON_SIZES),
    allowNone: false,
  },
  {
    type: 'select',
    name: 'radius',
    label: 'Radius',
    options: toOptions(MANTINE_RADIUS_OPTIONS),
    allowNone: false,
  },
  { type: 'text', name: 'aria-label', label: 'Aria label' },
  {
    type: 'select',
    name: 'iconScale',
    label: 'Icon scale',
    allowNone: true,
    options: [
      { value: '0.5', label: '0.5' },
      { value: '0.7', label: '0.7' },
      { value: '1', label: '1' },
    ],
  },
  {
    type: 'select',
    name: 'iconAspect',
    label: 'Icon aspect',
    allowNone: true,
    options: [
      { value: '1', label: '1' },
      { value: '1.5', label: '1.5' },
      { value: '2', label: '2' },
    ],
  },
  { type: 'switch', name: 'disabled', label: 'Disabled' },
  { type: 'switch', name: 'loading', label: 'Loading' },
];

/** Hide controls duplicated in the Mantine-style canvas panel. */
export const mantineDocsPlaygroundParameters = {
  layout: 'padded' as const,
  controls: {
    hideNoControlsWarning: true,
    exclude: [
      'variant',
      'color',
      'size',
      'radius',
      'disabled',
      'loading',
      'fullscreen',
      'children',
      'aria-label',
      'iconScale',
      'iconAspect',
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
