import type { HeaderConfig } from '../types';

import { createContext } from 'react';

export const ConfigContext = createContext<HeaderConfig | null>(null);
