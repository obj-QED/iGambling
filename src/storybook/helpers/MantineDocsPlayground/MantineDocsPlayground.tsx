import type { DocsPlaygroundField, MantineDocsPlaygroundProps } from './types';
import type { CSSProperties, ReactNode } from 'react';

import { Button, Group, SegmentedControl, Switch, TextInput, UnstyledButton } from '@mantine/core';
import clsx from 'clsx';

import styles from './MantineDocsPlayground.module.scss';

function readArgValue(args: Record<string, unknown>, name: string): unknown {
  return args[name];
}

function renderField<T extends Record<string, unknown>>(
  field: DocsPlaygroundField,
  args: T,
  onChange: MantineDocsPlaygroundProps<T>['onChange'],
): ReactNode {
  const value = readArgValue(args, field.name);

  if (field.type === 'variant') {
    return (
      <div className={styles.variantGroup}>
        {field.options.map((option) => (
          <Button
            key={option.value}
            size="compact-sm"
            variant={value === option.value ? 'filled' : 'default'}
            onClick={() => {
              onChange({ [field.name]: option.value } as Partial<T>);
            }}
          >
            {option.label}
          </Button>
        ))}
      </div>
    );
  }

  if (field.type === 'segmented') {
    return (
      <SegmentedControl
        fullWidth
        size="xs"
        value={String(value ?? field.options[0]?.value ?? '')}
        onChange={(next) => {
          onChange({ [field.name]: next } as Partial<T>);
        }}
        data={field.options.map((option) => ({
          value: option.value,
          label: option.label,
        }))}
      />
    );
  }

  if (field.type === 'color') {
    const selected = String(value ?? 'brand');

    return (
      <div className={styles.colorGroup}>
        {field.options.map((color) => (
          <UnstyledButton
            key={color}
            type="button"
            aria-label={color}
            aria-pressed={selected === color}
            className={clsx(styles.colorSwatch, selected === color && styles.colorSwatchSelected)}
            style={{ '--swatch-color': `var(--mantine-color-${color}-6)` } as CSSProperties}
            onClick={() => {
              onChange({ [field.name]: color } as Partial<T>);
            }}
          />
        ))}
      </div>
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
