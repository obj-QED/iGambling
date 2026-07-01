import type { MantineTheme } from '@mantine/core';

import { buildCmfControlToken, resolveCmfScope } from '../cmf/cmfCascadeResolve';
import { toCmfControlSlug } from '../cmf/cmfControls';
import { resolveMantineComponentRadius } from './mantineRadiusVars';
import { resolveCmfRootVars } from './resolveCmfRootVars';

const CONTROL = toCmfControlSlug('TextInput');

type TextInputVarsProps = Record<string, unknown> & {
  radius?: unknown;
};

export function resolveTextInputRootVars(
  _theme: MantineTheme,
  props: TextInputVarsProps,
): Record<string, string> {
  const scope = resolveCmfScope(props);
  const base = resolveCmfRootVars(CONTROL, props, {
    '--input-height': { suffix: 'height', fallback: 'calc(2.625rem * var(--mantine-scale))' },
    '--input-fz': { suffix: 'fz', fallback: 'var(--mantine-font-size-sm)' },
    '--input-padding-x': { suffix: 'padding-x', fallback: 'var(--mantine-spacing-sm)' },
    '--input-color': { suffix: 'color', fallback: 'var(--mantine-color-text)' },
    '--input-placeholder-color': {
      suffix: 'placeholder-color',
      fallback: 'var(--mantine-color-placeholder)',
    },
    '--input-bg': { suffix: 'bg', fallback: 'var(--mantine-color-default)' },
    '--input-bd': {
      suffix: 'bd',
      fallback: 'calc(0.0625rem * var(--mantine-scale)) solid var(--mantine-color-default-border)',
    },
  });

  return {
    ...base,
    '--input-radius': resolveMantineComponentRadius(
      props.radius,
      buildCmfControlToken(CONTROL, 'radius', 'var(--mantine-radius-default)', scope),
    ),
  };
}
