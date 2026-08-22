/** Freeze aside used width so late metrics cannot move chrome after first layout. */
export function lockSidebarWidth(root: HTMLElement | null): void {
  if (root === null) {
    return;
  }

  const aside = root.querySelector('[data-widget="sidebar"]');
  if (!(aside instanceof HTMLElement) || aside.dataset.shellBoxLock === 'true') {
    return;
  }

  const width = aside.getBoundingClientRect().width;
  if (width <= 0) {
    return;
  }

  aside.dataset.shellBoxLock = 'true';
  const widthPx = `${width}px`;
  aside.style.width = widthPx;
  aside.style.minWidth = widthPx;
  aside.style.maxWidth = widthPx;
}
