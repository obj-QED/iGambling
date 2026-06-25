/** Entry path for the first visit: initV2 once; navigations use getPage. */
let initialPath = '/';

export function setInitialPath(path: string): void {
  initialPath = path.length > 0 ? path : '/';
}

export function getInitialPath(): string {
  return initialPath;
}
