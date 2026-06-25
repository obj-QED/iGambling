import type { DeviceEnv } from './deviceEnv.types';
import type { DeviceBrowserSlug } from './parseUserAgent';

import { readDeviceEnv } from './readDeviceEnv';

export const DEVICE_BODY_CLASSNAMES = {
  mobile: 'is-mobile',
  mobileOnly: 'is-mobile-only',
  tablet: 'is-tablet',
  ios: 'is-ios',
  android: 'is-android',
  fullscreen: 'is-fullscreen',
} as const;

export const DEVICE_BROWSER_CLASS_PREFIX = 'is-browser-';

const MANAGED_BROWSER_SLUGS: DeviceBrowserSlug[] = [
  'chrome',
  'safari',
  'firefox',
  'edge',
  'opera',
  'unknown',
];

export const MANAGED_DEVICE_BODY_CLASSES = [
  ...Object.values(DEVICE_BODY_CLASSNAMES),
  ...MANAGED_BROWSER_SLUGS.map((slug) => `${DEVICE_BROWSER_CLASS_PREFIX}${slug}`),
] as const;

export function buildDeviceBodyClassList(env: DeviceEnv): string[] {
  const classes: string[] = [];

  if (env.isMobile) classes.push(DEVICE_BODY_CLASSNAMES.mobile);
  if (env.isMobileOnly) classes.push(DEVICE_BODY_CLASSNAMES.mobileOnly);
  if (env.isTablet) classes.push(DEVICE_BODY_CLASSNAMES.tablet);
  if (env.isIOS) classes.push(DEVICE_BODY_CLASSNAMES.ios);
  if (env.isAndroid) classes.push(DEVICE_BODY_CLASSNAMES.android);
  if (env.isFullscreen) classes.push(DEVICE_BODY_CLASSNAMES.fullscreen);

  classes.push(`${DEVICE_BROWSER_CLASS_PREFIX}${env.browser}`);

  return classes;
}

export function syncDeviceBodyClasses(env: DeviceEnv): void {
  if (typeof document === 'undefined') return;

  document.body.classList.remove(...MANAGED_DEVICE_BODY_CLASSES);
  document.body.classList.add(...buildDeviceBodyClassList(env));
}

export function initDeviceBodyClasses(userAgent?: string): DeviceEnv {
  const env = readDeviceEnv(userAgent);
  syncDeviceBodyClasses(env);
  return env;
}
