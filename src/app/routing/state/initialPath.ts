/** Путь первого захода: для init (один раз), при переходах — getPage */
let initialPath = '/';

export function setInitialPath(path: string): void {
  initialPath = path || '/';
}

export function getInitialPath(): string {
  return initialPath;
}
