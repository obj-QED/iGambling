function isAborted(signal?: AbortSignal): boolean {
  return signal?.aborted === true;
}

function waitForImage(img: HTMLImageElement): Promise<void> {
  if (img.complete) {
    if (typeof img.decode === 'function') {
      return img.decode().then(
        () => undefined,
        () => undefined,
      );
    }
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    img.addEventListener(
      'load',
      () => {
        resolve();
      },
      { once: true },
    );
    img.addEventListener(
      'error',
      () => {
        resolve();
      },
      { once: true },
    );
  });
}

/** Decode in-tree images so skeleton lifts on the final intrinsic size. */
export function waitForHtmlImages(root: ParentNode | null): Promise<void> {
  if (root === null) {
    return Promise.resolve();
  }
  const images = [...root.querySelectorAll('img')];
  if (images.length === 0) {
    return Promise.resolve();
  }
  return Promise.all(images.map(waitForImage)).then(() => undefined);
}

export function waitForDocumentFonts(): Promise<void> {
  if (typeof document === 'undefined' || document.fonts == null) {
    return Promise.resolve();
  }
  return document.fonts.ready.then(() => undefined);
}

function waitForInlineSvgHost(host: Element, signal?: AbortSignal): Promise<void> {
  if (host.querySelector('svg') !== null || host.classList.contains('hidden')) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    if (isAborted(signal)) {
      resolve();
      return;
    }

    const observer = new MutationObserver(() => {
      if (host.querySelector('svg') !== null || host.classList.contains('hidden')) {
        finish();
      }
    });

    const finish = (): void => {
      signal?.removeEventListener('abort', finish);
      observer.disconnect();
      resolve();
    };

    observer.observe(host, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });
    signal?.addEventListener('abort', finish, { once: true });
  });
}

/** Inline SVG icons (react-inlinesvg) swap size after fetch — not covered by `img`. */
export function waitForCmfInlineSvgs(root: ParentNode | null, signal?: AbortSignal): Promise<void> {
  if (root === null) {
    return Promise.resolve();
  }
  const hosts = [...root.querySelectorAll('span[data-cmf-icon-src]')];
  if (hosts.length === 0) {
    return Promise.resolve();
  }
  return Promise.all(hosts.map((host) => waitForInlineSvgHost(host, signal))).then(() => undefined);
}

const STABLE_FRAMES = 2;

/** Header / sidebar / footer / banner only — never wait on `main` page content. */
const CHROME_WIDGET_SELECTOR =
  '[data-widget="header"], [data-widget="sidebar"], [data-widget="footer"], [data-widget="banner"]';

function chromeNodes(root: ParentNode | null): Element[] {
  if (root === null) {
    return [];
  }
  return [...root.querySelectorAll(CHROME_WIDGET_SELECTOR)];
}

function chromeLayoutFingerprint(root: Element): string {
  return chromeNodes(root)
    .map((node) => {
      const box = node.getBoundingClientRect();
      return `${box.width},${box.height},${box.top},${box.left}`;
    })
    .join('|');
}

export function waitForLayoutStable(element: Element | null, signal?: AbortSignal): Promise<void> {
  if (element === null || typeof requestAnimationFrame !== 'function') {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    let lastFingerprint = '';
    let stableFrames = 0;
    let frame = 0;
    let settled = false;

    const stop = (): void => {
      if (settled) {
        return;
      }
      settled = true;
      cancelAnimationFrame(frame);
      signal?.removeEventListener('abort', stop);
      resolve();
    };

    const step = (): void => {
      if (isAborted(signal)) {
        stop();
        return;
      }
      const fingerprint = chromeLayoutFingerprint(element);
      if (fingerprint === lastFingerprint) {
        stableFrames += 1;
        if (stableFrames >= STABLE_FRAMES) {
          stop();
          return;
        }
      } else {
        stableFrames = 0;
        lastFingerprint = fingerprint;
      }
      frame = requestAnimationFrame(step);
    };

    signal?.addEventListener('abort', stop, { once: true });
    frame = requestAnimationFrame(step);
  });
}

function waitForChromeMedia(root: Element | null, signal?: AbortSignal): Promise<void> {
  const nodes = chromeNodes(root);
  if (nodes.length === 0) {
    return Promise.resolve();
  }
  return Promise.all(
    nodes.flatMap((node) => [waitForHtmlImages(node), waitForCmfInlineSvgs(node, signal)]),
  ).then(() => undefined);
}

/** Fonts + chrome media only, then two frames of unchanged chrome boxes. */
export async function waitForShellPaint(root: Element | null, signal?: AbortSignal): Promise<void> {
  if (root === null || isAborted(signal)) {
    return;
  }
  await waitForDocumentFonts();
  if (isAborted(signal)) {
    return;
  }
  await waitForChromeMedia(root, signal);
  if (isAborted(signal)) {
    return;
  }
  await waitForLayoutStable(root, signal);
}
