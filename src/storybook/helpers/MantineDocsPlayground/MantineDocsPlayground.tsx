import type { DocsPlaygroundField, MantineDocsPlaygroundProps } from './types';
import type { ReactNode } from 'react';

import { Group, NativeSelect, Switch, TextInput } from '@mantine/core';
import clsx from 'clsx';

import { STORYBOOK_NONE, STORYBOOK_NONE_LABEL } from '../mantineArgTypes';

import styles from './MantineDocsPlayground.module.scss';

function readArgValue(args: Record<string, unknown>, name: string): unknown {
  return args[name];
}

function noneOption() {
  return { value: STORYBOOK_NONE, label: STORYBOOK_NONE_LABEL };
}

function renderField<T extends Record<string, unknown>>(
  field: DocsPlaygroundField,
  args: T,
  onChange: MantineDocsPlaygroundProps<T>['onChange'],
): ReactNode {
  const value = readArgValue(args, field.name);

  if (field.type === 'variant' || field.type === 'segmented' || field.type === 'select') {
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
        size="sm"
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

  if (field.type === 'color') {
    const allowNone = field.allowNone !== false;
    const data = [
      ...(allowNone ? [noneOption()] : []),
      ...field.options.map((color) => ({ value: color, label: color })),
    ];
    const current = value == null || value === STORYBOOK_NONE ? STORYBOOK_NONE : String(value);

    return (
      <NativeSelect
        size="sm"
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

  if (field.type === 'switch') {
    return (
      <Switch
        checked={Boolean(value)}
        onChange={(event) => {
          onChange({ [field.name]: event.currentTarget.checked } as Partial<T>);
        }}
        label={field.label}
      />
    );
  }

  return (
    <TextInput
      size="sm"
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

        {textFields.length > 0 ? (
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
        ) : null}

        {switchFields.length > 0 ? (
          <div className={styles.row}>
            <div className={styles.label}>State</div>
            <div className={clsx(styles.control, styles.switches)}>
              {switchFields.map((field) => (
                <div key={field.name}>{renderField(field, args, onChange)}</div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
