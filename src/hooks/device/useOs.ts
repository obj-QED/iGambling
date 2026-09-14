import { useEffect, useState } from 'react';

import { UAParser } from 'ua-parser-js';

/** Same contract as `@mantine/hooks` `useOs` — for hotkey badges / OS chrome. */
export type DeviceOs = 'undetermined' | 'macos' | 'ios' | 'windows' | 'android' | 'linux';

function readOs(userAgent?: string): DeviceOs {
  const result = UAParser(userAgent);
  const name = (result.os.name ?? '').toLowerCase();

  if (name === 'mac os' || name === 'macos') return 'macos';
  if (name === 'ios') return 'ios';
  if (name === 'android') return 'android';
  if (name === 'windows') return 'windows';
  if (name.includes('linux') || name === 'ubuntu' || name === 'debian') return 'linux';

  return 'undetermined';
}

/**
 * Client OS for UI chrome (e.g. `⌘` vs `Ctrl` hotkey badge).
 * Lives in `hooks/device` — uses `ua-parser-js` (same stack as `useDeviceEnv`).
 */
export function useOs(): DeviceOs {
  const [os, setOs] = useState<DeviceOs>('undetermined');

  useEffect(() => {
    setOs(readOs());
  }, []);

  return os;
}
