type FullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null;
  mozFullScreenElement?: Element | null;
  msFullscreenElement?: Element | null;
};

type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
  mozRequestFullScreen?: () => Promise<void> | void;
  msRequestFullscreen?: () => Promise<void> | void;
};

export function getFullscreenElement(): Element | null {
  if (typeof document === 'undefined') return null;

  const doc = document as FullscreenDocument;

  return (
    doc.fullscreenElement ??
    doc.webkitFullscreenElement ??
    doc.mozFullScreenElement ??
    doc.msFullscreenElement ??
    null
  );
}

export function isDocumentFullscreen(): boolean {
  if (typeof document === 'undefined') return false;
  return getFullscreenElement() === document.documentElement;
}

export async function requestDocumentFullscreen(): Promise<boolean> {
  if (typeof document === 'undefined') return false;
  if (isDocumentFullscreen()) return true;

  const element = document.documentElement as FullscreenElement;

  try {
    if (typeof element.requestFullscreen === 'function') {
      await element.requestFullscreen();
      return isDocumentFullscreen();
    }

    if (typeof element.webkitRequestFullscreen === 'function') {
      await element.webkitRequestFullscreen();
      return isDocumentFullscreen();
    }

    if (typeof element.mozRequestFullScreen === 'function') {
      await element.mozRequestFullScreen();
      return isDocumentFullscreen();
    }

    if (typeof element.msRequestFullscreen === 'function') {
      await element.msRequestFullscreen();
      return isDocumentFullscreen();
    }
  } catch {
    return false;
  }

  return false;
}

export const FULLSCREEN_CHANGE_EVENTS = [
  'fullscreenchange',
  'webkitfullscreenchange',
  'mozfullscreenchange',
  'MSFullscreenChange',
] as const;

export function subscribeFullscreenChange(listener: () => void): () => void {
  if (typeof document === 'undefined') return () => undefined;

  for (const eventName of FULLSCREEN_CHANGE_EVENTS) {
    document.addEventListener(eventName, listener);
  }

  return () => {
    for (const eventName of FULLSCREEN_CHANGE_EVENTS) {
      document.removeEventListener(eventName, listener);
    }
  };
}
