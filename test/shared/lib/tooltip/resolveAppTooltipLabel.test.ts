import { isValidElement } from 'react';

import { describe, expect, it } from 'vitest';

import { hasTooltipLabel, resolveAppTooltipLabel, toTooltipHtmlLabel } from '@/shared/lib/tooltip';

function htmlFromTooltipLabel(node: ReturnType<typeof resolveAppTooltipLabel>): string | undefined {
  if (!isValidElement(node)) return undefined;
  const props = node.props as { dangerouslySetInnerHTML?: { __html?: string } };
  return props.dangerouslySetInnerHTML?.__html;
}

describe('toTooltipHtmlLabel', () => {
  it('wraps string as HTML node', () => {
    const node = toTooltipHtmlLabel('<b>Home</b>');
    expect(isValidElement(node)).toBe(true);
    expect(htmlFromTooltipLabel(node)).toBe('<b>Home</b>');
  });
});

describe('resolveAppTooltipLabel', () => {
  it('prefers label over name and renders HTML', () => {
    expect(htmlFromTooltipLabel(resolveAppTooltipLabel('Home', 'Ignored'))).toBe('Home');
    expect(htmlFromTooltipLabel(resolveAppTooltipLabel('  Home  ', 'Name'))).toBe('Home');
    expect(htmlFromTooltipLabel(resolveAppTooltipLabel('<b>Home</b>', 'Name'))).toBe('<b>Home</b>');
  });

  it('falls back to name when label is empty', () => {
    expect(htmlFromTooltipLabel(resolveAppTooltipLabel(undefined, 'Jackpots'))).toBe('Jackpots');
    expect(htmlFromTooltipLabel(resolveAppTooltipLabel('', 'Jackpots'))).toBe('Jackpots');
    expect(htmlFromTooltipLabel(resolveAppTooltipLabel('   ', 'Jackpots'))).toBe('Jackpots');
    expect(htmlFromTooltipLabel(resolveAppTooltipLabel(undefined, 'A<br>B'))).toBe('A<br>B');
  });

  it('returns undefined when both are empty', () => {
    expect(resolveAppTooltipLabel(undefined, undefined)).toBeUndefined();
    expect(resolveAppTooltipLabel('', '  ')).toBeUndefined();
  });

  it('passes through non-string React nodes', () => {
    const node = toTooltipHtmlLabel('<i>x</i>');
    expect(resolveAppTooltipLabel(node)).toBe(node);
  });
});

describe('hasTooltipLabel', () => {
  it('rejects empty strings', () => {
    expect(hasTooltipLabel('')).toBe(false);
    expect(hasTooltipLabel('  ')).toBe(false);
    expect(hasTooltipLabel('Ok')).toBe(true);
  });
});
