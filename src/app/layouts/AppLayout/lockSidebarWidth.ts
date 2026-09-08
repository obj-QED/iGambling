/** Freeze aside used width so late metrics cannot move chrome after first layout. */
export function lockSidebarWidth(root: HTMLElement | null): void {
  if (root === null) {
    return;
  }

  const aside = root.querySelector('[data-widget="sidebar"]');
  if (!(aside instanceof HTMLElement) || aside.dataset.shellBoxLock === 'true') {
    return;
  }

  // Slideout owns animated width — freezing would kill expand/collapse.
  if (aside.getAttribute('data-type') === 'slideout') {
    return;
  }

  const width = aside.getBoundingClientRect().width;
  if (width <= 0) {
    return;
  }

  aside.dataset.shellBoxLock = 'true';
  // Prefer the CSS token SoT — do not stamp width/min/max px (blocks token edits / HMR).
  aside.style.setProperty('--app-layout-sidebar-width', `${width}px`);
}

/** Clear shell width freeze so `--app-layout-sidebar-width` from theme/settings owns layout. */
export function unlockSidebarWidth(root: HTMLElement | null): void {
  if (root === null) {
    return;
  }

  const aside = root.querySelector('[data-widget="sidebar"]');
  if (!(aside instanceof HTMLElement) || aside.dataset.shellBoxLock !== 'true') {
    return;
  }

  delete aside.dataset.shellBoxLock;
  aside.style.removeProperty('--app-layout-sidebar-width');
  aside.style.removeProperty('width');
  aside.style.removeProperty('min-width');
  aside.style.removeProperty('max-width');
}
