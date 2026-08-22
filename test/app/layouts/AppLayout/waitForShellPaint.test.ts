import { describe, expect, it } from 'vitest';

import {
  waitForCmfInlineSvgs,
  waitForHtmlImages,
  waitForLayoutStable,
  waitForShellPaint,
} from '@/app/layouts/AppLayout/waitForShellPaint';

describe('waitForHtmlImages', () => {
  it('resolves when there are no images', async () => {
    const root = document.createElement('div');
    await expect(waitForHtmlImages(root)).resolves.toBeUndefined();
    await expect(waitForHtmlImages(null)).resolves.toBeUndefined();
  });

  it('resolves for a complete image', async () => {
    const root = document.createElement('div');
    const img = document.createElement('img');
    Object.defineProperty(img, 'complete', { value: true });
    root.append(img);
    await expect(waitForHtmlImages(root)).resolves.toBeUndefined();
  });
});

describe('waitForCmfInlineSvgs', () => {
  it('resolves when the inline svg is already present', async () => {
    const root = document.createElement('div');
    const host = document.createElement('span');
    host.setAttribute('data-cmf-icon-src', '/icon.svg');
    host.append(document.createElement('svg'));
    root.append(host);
    await expect(waitForCmfInlineSvgs(root)).resolves.toBeUndefined();
  });

  it('resolves after the inline svg is injected', async () => {
    const root = document.createElement('div');
    const host = document.createElement('span');
    host.setAttribute('data-cmf-icon-src', '/icon.svg');
    root.append(host);

    const pending = waitForCmfInlineSvgs(root);
    host.append(document.createElement('svg'));
    await expect(pending).resolves.toBeUndefined();
  });
});

describe('waitForLayoutStable', () => {
  it('resolves after two unchanged frames', async () => {
    const root = document.createElement('div');
    document.body.append(root);
    await expect(waitForLayoutStable(root)).resolves.toBeUndefined();
    root.remove();
  });
});

describe('waitForShellPaint', () => {
  it('resolves for an empty shell', async () => {
    const root = document.createElement('div');
    document.body.append(root);
    await expect(waitForShellPaint(root)).resolves.toBeUndefined();
    root.remove();
  });
});
