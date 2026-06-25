import UAParser from 'ua-parser-js';

export type DeviceBrowserSlug = 'chrome' | 'safari' | 'firefox' | 'edge' | 'opera' | 'unknown';

export type ParsedUserAgent = {
  isIOS: boolean;
  isAndroid: boolean;
  browser: DeviceBrowserSlug;
  browserName: string;
  deviceType: 'mobile' | 'tablet' | 'desktop' | 'unknown';
};

function slugifyBrowser(name: string | undefined): DeviceBrowserSlug {
  const normalized = (name ?? '').toLowerCase();

  if (normalized.includes('edge')) return 'edge';
  if (normalized.includes('opr') || normalized.includes('opera')) return 'opera';
  if (normalized.includes('firefox')) return 'firefox';
  if (normalized.includes('chrome')) return 'chrome';
  if (normalized.includes('safari')) return 'safari';

  return 'unknown';
}

function resolveDeviceType(type: string | undefined): ParsedUserAgent['deviceType'] {
  if (type === 'mobile') return 'mobile';
  if (type === 'tablet') return 'tablet';
  if (type === undefined) return 'desktop';

  return 'unknown';
}

/** Parses UA via `ua-parser-js` (OS, browser, device type). */
export function parseUserAgent(userAgent?: string): ParsedUserAgent {
  const parser = new UAParser(userAgent);
  const osName = (parser.getOS().name ?? '').toLowerCase();
  const browserName = parser.getBrowser().name ?? 'unknown';

  return {
    isIOS: osName === 'ios',
    isAndroid: osName === 'android',
    browser: slugifyBrowser(parser.getBrowser().name),
    browserName,
    deviceType: resolveDeviceType(parser.getDevice().type),
  };
}
