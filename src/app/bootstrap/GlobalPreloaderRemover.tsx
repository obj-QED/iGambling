import { useLayoutEffect } from 'react';

const PRELOADER_ID = 'global-preloader';
const HIDDEN_CLASS = 'global-preloader--hidden';

/**
 * Скрывает глобальный прелоадер после монтирования приложения.
 * Прелоадер рендерится в index.html и стилизуется из base.css — показывается до загрузки JS.
 */
export function GlobalPreloaderRemover() {
  /** `useLayoutEffect` runs before paint so header/skeleton in `#root` is not hidden behind the HTML preloader for an extra frame. */
  useLayoutEffect(() => {
    const el = document.getElementById(PRELOADER_ID);
    if (!el) return;
    el.classList.add(HIDDEN_CLASS);
    el.setAttribute('aria-hidden', 'true');
    const t = setTimeout(() => el.remove(), 220);
    return () => clearTimeout(t);
  }, []);
  return null;
}

GlobalPreloaderRemover.displayName = 'GlobalPreloaderRemover';
