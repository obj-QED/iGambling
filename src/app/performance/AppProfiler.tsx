import type { ReactNode } from 'react';

import { Profiler } from 'react';

import { isAppProfilerEnabled } from './isAppProfilerEnabled';
import { reportRender } from './reportRender';

type AppProfilerProps = {
  id: string;
  children: ReactNode;
};

export function AppProfiler({ id, children }: AppProfilerProps) {
  if (!isAppProfilerEnabled()) {
    return children;
  }

  return (
    <Profiler id={id} onRender={reportRender}>
      {children}
    </Profiler>
  );
}

AppProfiler.displayName = 'AppProfiler';
