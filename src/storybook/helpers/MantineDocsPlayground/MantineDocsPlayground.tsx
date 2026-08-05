import type { DocsPlaygroundField, MantineDocsPlaygroundProps } from './types';
import type { ReactNode } from 'react';

import { CheckIcon, Group, NativeSelect, Slider, Switch, TextInput } from '@mantine/core';
import clsx from 'clsx';

import { STORYBOOK_NONE, STORYBOOK_NONE_LABEL } from '../mantineArgTypes';

import styles from './MantineDocsPlayground.module.scss';

function readArgValue(args: Record<string, unknown>, name: string): unknown {
  return args[name];
}

function noneOption() {
  return { value: STORYBOOK_NONE, label: STORYBOOK_NONE_LABEL };
}

function titleCase(value: string): string {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

const SIZE_SLIDER_KEYS = new Set(['size', 'radius']);

function renderSelectField<T extends Record<string, unknown>>(
  field: Extract<DocsPlaygroundField, { type: 'variant' | 'segmented' | 'select' }>,
  args: T,
  onChange: MantineDocsPlaygroundProps<T>['onChange'],
): ReactNode {
  const value = readArgValue(args, field.name);
  const groups =
    field.type === 'variant'
      ? (field.groups ??
        (field.options !== undefined ? [{ label: field.label, options: field.options }] : []))
      : null;

  const flatOptions =
    field.type === 'variant'
      ? (groups ?? []).flatMap((group) => [...group.options])
      : [...field.options];

  const allowNone = field.allowNone !== false;

  if (field.type === 'select' && SIZE_SLIDER_KEYS.has(field.name) && flatOptions.length >= 2) {
    const marks = flatOptions.map((option, index) => ({
      value: index,
      label: option.label,
    }));
    const fallback = flatOptions[0].value;
    const current = value == null || value === STORYBOOK_NONE ? fallback : String(value);
    const found = flatOptions.findIndex((option) => option.value === current);
    const index = found >= 0 ? found : 0;

    return (
      <Slider
        size="sm"
        min={0}
        max={flatOptions.length - 1}
        step={1}
        marks={marks}
        label={(mark) => flatOptions[mark]?.label ?? ''}
        value={index}
        onChange={(next) => {
          onChange({ [field.name]: flatOptions[next].value } as Partial<T>);
        }}
        styles={{ markLabel: { fontSize: 10 } }}
      />
    );
  }

  const data = [
    ...(allowNone ? [noneOption()] : []),
    ...flatOptions.map((option) => ({
      value: option.value,
      label:
        field.type === 'variant' && (groups?.length ?? 0) > 1
          ? `${groups?.find((g) => g.options.some((o) => o.value === option.value))?.label ?? ''}: ${option.label}`
          : option.label,
    })),
  ];

  const current = value == null || value === STORYBOOK_NONE ? STORYBOOK_NONE : String(value);

  return (
    <NativeSelect
      size="xs"
      data={data}
      value={current}
      onChange={(event) => {
        const next = event.currentTarget.value;
        onChange({
          [field.name]: next === STORYBOOK_NONE ? STORYBOOK_NONE : next,
        } as Partial<T>);
      }}
    />
  );
}

function renderColorField<T extends Record<string, unknown>>(
  field: Extract<DocsPlaygroundField, { type: 'color' }>,
  args: T,
  onChange: MantineDocsPlaygroundProps<T>['onChange'],
): ReactNode {
  const value = readArgValue(args, field.name);
  const allowNone = field.allowNone !== false;
  const current = value == null || value === STORYBOOK_NONE ? STORYBOOK_NONE : String(value);

  return (
    <div className={styles.colorGroup} role="group" aria-label={field.label}>
      {allowNone && (
        <button
          type="button"
          className={clsx(
            styles.colorSwatch,
            current === STORYBOOK_NONE && styles.colorSwatchSelected,
          )}
          style={{ ['--swatch-color' as string]: 'transparent', borderStyle: 'dashed' }}
          aria-label={STORYBOOK_NONE_LABEL}
          aria-pressed={current === STORYBOOK_NONE}
          onClick={() => {
            onChange({ [field.name]: STORYBOOK_NONE } as Partial<T>);
          }}
        />
      )}
      {field.options.map((color) => {
        const selected = current === color;
        return (
          <button
            key={color}
            type="button"
            className={clsx(styles.colorSwatch, selected && styles.colorSwatchSelected)}
            style={{
              ['--swatch-color' as string]: `var(--mantine-color-${color}-filled, var(--mantine-color-${color}-6))`,
            }}
            aria-label={titleCase(color)}
            aria-pressed={selected}
            onClick={() => {
              onChange({ [field.name]: color } as Partial<T>);
            }}
          >
            {selected && <CheckIcon size={10} color="#fff" />}
          </button>
        );
      })}
    </div>
  );
}

function renderField<T extends Record<string, unknown>>(
  field: DocsPlaygroundField,
  args: T,
  onChange: MantineDocsPlaygroundProps<T>['onChange'],
): ReactNode {
  if (field.type === 'variant' || field.type === 'segmented' || field.type === 'select') {
    return renderSelectField(field, args, onChange);
  }

  if (field.type === 'color') {
    return renderColorField(field, args, onChange);
  }

  if (field.type === 'switch') {
    const value = readArgValue(args, field.name);
    return (
      <Switch
        size="xs"
        checked={Boolean(value)}
        onChange={(event) => {
          onChange({ [field.name]: event.currentTarget.checked } as Partial<T>);
        }}
        label={field.label}
      />
    );
  }

  const value = readArgValue(args, field.name);
  return (
    <TextInput
      size="xs"
      value={String(value ?? '')}
      placeholder={STORYBOOK_NONE_LABEL}
      onChange={(event) => {
        onChange({ [field.name]: event.currentTarget.value } as Partial<T>);
      }}
    />
  );
}

export function MantineDocsPlayground<T extends Record<string, unknown>>({
  args,
  fields,
  onChange,
  children,
}: MantineDocsPlaygroundProps<T>) {
  const primaryFields = fields.filter((field) => field.type !== 'switch' && field.type !== 'text');
  const switchFields = fields.filter((field) => field.type === 'switch');
  const textFields = fields.filter((field) => field.type === 'text');

  return (
    <div className={styles.root}>
      <div className={styles.preview}>{children}</div>

      <div className={styles.controls}>
        {primaryFields.map((field) => (
          <div key={field.name} className={styles.row}>
            <div className={styles.label}>{field.label}</div>
            <div className={styles.control}>{renderField(field, args, onChange)}</div>
          </div>
        ))}

        {textFields.length > 0 && (
          <div className={styles.row}>
            <div className={styles.label}>Label</div>
            <div className={styles.control}>
              <Group grow>
                {textFields.map((field) => (
                  <div key={field.name}>{renderField(field, args, onChange)}</div>
                ))}
              </Group>
            </div>
          </div>
        )}

        {switchFields.length > 0 && (
          <div className={styles.row}>
            <div className={styles.label}>State</div>
            <div className={clsx(styles.control, styles.switches)}>
              {switchFields.map((field) => (
                <div key={field.name}>{renderField(field, args, onChange)}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
