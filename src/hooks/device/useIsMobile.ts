import { useDeviceEnv } from './useDeviceEnv';

/** Viewport ≤ tablet breakpoint — layout chrome (sidebar, etc.). */
export function useIsMobile(): boolean {
  return useDeviceEnv().isMobile;
}
