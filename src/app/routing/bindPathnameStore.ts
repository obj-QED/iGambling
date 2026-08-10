import { appRouter } from '@/app/routing/appRouter';

import { bindAppNavigate, bindPathnameStoreToRouter } from '@/shared/lib/routing';

/**
 * Keep shared routing helpers in sync with the data router:
 * - pathname store → `useNavActive` (only active flips re-render)
 * - app navigate → button/href clicks without `useNavigate` context thrash
 */
export function bindPathnameStore(): () => void {
  bindAppNavigate((to) => {
    void appRouter.navigate(to);
  });
  return bindPathnameStoreToRouter(appRouter);
}
