/** React `<Profiler>` — on only when `.env.local` has `PROFILER_ENABLED=true` (dev). */
export function isAppProfilerEnabled(
  flag: unknown = import.meta.env.PROFILER_ENABLED,
  isDev: boolean = import.meta.env.DEV,
): boolean {
  return isDev === true && flag === true;
}
