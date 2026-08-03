import { useDeviceEnv } from '@hooks/useDeviceEnv';

/** Subscribes to device env and keeps `<body>` classes synced after hydration. */
export function DeviceBodySync() {
  useDeviceEnv();
  return null;
}

DeviceBodySync.displayName = 'DeviceBodySync';
