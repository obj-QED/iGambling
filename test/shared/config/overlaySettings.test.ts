import { afterEach, describe, expect, it } from 'vitest';

import {
  getDrawerDefaultProps,
  getModalDefaultProps,
  getPopoverDefaultProps,
  mergeOverlayDefaultProps,
} from '@/shared/config/overlaySettings';

describe('overlaySettings', () => {
  afterEach(() => {
    delete (globalThis as unknown as Window).__SETTINGS__;
  });

  it('reads params.modal / drawer / popover and strips runtime keys', () => {
    (globalThis as unknown as Window).__SETTINGS__ = {
      params: {
        modal: {
          centered: true,
          size: 'lg',
          opened: true,
          onClose: () => undefined,
          children: 'x',
        },
        drawer: {
          position: 'left',
          offset: 8,
          opened: false,
        },
        popover: {
          position: 'bottom',
          withArrow: true,
          width: 200,
          trapFocus: true,
          onClose: () => undefined,
          opened: true,
          onChange: () => undefined,
        },
      },
    };

    expect(getModalDefaultProps()).toEqual({ centered: true, size: 'lg' });
    expect(getDrawerDefaultProps()).toEqual({ position: 'left', offset: 8 });
    expect(getPopoverDefaultProps()).toEqual({
      position: 'bottom',
      withArrow: true,
      width: 200,
      trapFocus: true,
      onClose: expect.any(Function),
    });
  });

  it('merges nested overlayProps with instance winning', () => {
    const merged = mergeOverlayDefaultProps(
      {
        centered: true,
        overlayProps: { backgroundOpacity: 0.2, blur: 2 },
      },
      {
        size: 'md',
        overlayProps: { blur: 8 },
      },
    );

    expect(merged).toEqual({
      centered: true,
      size: 'md',
      overlayProps: { backgroundOpacity: 0.2, blur: 8 },
    });
  });
});
