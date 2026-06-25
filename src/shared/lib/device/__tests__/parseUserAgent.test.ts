import { describe, expect, it } from 'vitest';

import { parseUserAgent } from '../parseUserAgent';

describe('parseUserAgent', () => {
  it('detects iOS Safari', () => {
    const parsed = parseUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    );

    expect(parsed.isIOS).toBe(true);
    expect(parsed.isAndroid).toBe(false);
    expect(parsed.browser).toBe('safari');
    expect(parsed.deviceType).toBe('mobile');
  });

  it('detects Android Chrome', () => {
    const parsed = parseUserAgent(
      'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
    );

    expect(parsed.isIOS).toBe(false);
    expect(parsed.isAndroid).toBe(true);
    expect(parsed.browser).toBe('chrome');
    expect(parsed.deviceType).toBe('mobile');
  });
});
