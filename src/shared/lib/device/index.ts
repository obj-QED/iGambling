export {
  buildDeviceBodyClassList,
  DEVICE_BODY_CLASSNAMES,
  DEVICE_BROWSER_CLASS_PREFIX,
  initDeviceBodyClasses,
  MANAGED_DEVICE_BODY_CLASSES,
  syncDeviceBodyClasses,
} from './deviceBodyClasses';
export type { DeviceEnv } from './deviceEnv.types';
export {
  FULLSCREEN_CHANGE_EVENTS,
  getFullscreenElement,
  isDocumentFullscreen,
  requestDocumentFullscreen,
  subscribeFullscreenChange,
} from './fullscreen';
export {
  IS_MOBILE_MEDIA_QUERY,
  isMobileOnlyViewport,
  isMobileViewport,
  isTabletViewport,
  readIsMobileViewport,
} from './isMobileViewport';
export { type DeviceBrowserSlug, type ParsedUserAgent, parseUserAgent } from './parseUserAgent';
export { readDeviceEnv } from './readDeviceEnv';
export {
  SCROLL_FULLSCREEN_THRESHOLD_PX,
  shouldRequestScrollFullscreen,
  tryScrollFullscreen,
} from './scrollFullscreen';
