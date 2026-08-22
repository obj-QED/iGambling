import { isAppProfilerEnabled } from './isAppProfilerEnabled';

export type RenderSample = {
  id: string;
  phase: string;
  actualDuration: number;
  baseDuration: number;
  startTime: number;
  commitTime: number;
};

const MAX_SAMPLES = 50;

declare global {
  interface Window {
    __APP_PROFILER_SAMPLES__?: readonly RenderSample[];
  }
}

export function reportRender(
  id: string,
  phase: string,
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number,
): void {
  if (!isAppProfilerEnabled()) {
    return;
  }

  const previous = window.__APP_PROFILER_SAMPLES__;
  const history = previous === undefined ? [] : previous;
  window.__APP_PROFILER_SAMPLES__ = [
    ...history,
    {
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
    },
  ].slice(-MAX_SAMPLES);
}

export function getProfilerSamples(): readonly RenderSample[] {
  if (!isAppProfilerEnabled()) {
    return [];
  }
  const samples = window.__APP_PROFILER_SAMPLES__;
  if (samples === undefined) {
    return [];
  }
  return samples;
}
