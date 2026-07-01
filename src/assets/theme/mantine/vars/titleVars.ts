import type { MantineTheme } from '@mantine/core';

import { toCmfControlSlug } from '../cmf/cmfControls';
import { resolveCmfRootVars } from './resolveCmfRootVars';

const CONTROL = toCmfControlSlug('Title');

type TitleVarsProps = Record<string, unknown>;

export function resolveTitleRootVars(
  _theme: MantineTheme,
  props: TitleVarsProps,
): Record<string, string> {
  return resolveCmfRootVars(CONTROL, props, {
    '--title-fw': { suffix: 'fw', fallback: 'var(--heading-font-weight)' },
    '--title-lh': { suffix: 'lh', fallback: 'var(--heading-line-height)' },
    '--title-fz': { suffix: 'fz', fallback: 'inherit' },
  });
}
