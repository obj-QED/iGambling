import type { AppHeaderMenuItem, AppHeaderViewProps } from '../../../types/AppHeader.types';

import { memo, useMemo } from 'react';

import { getHeaderSettings } from '@/shared/config';
import { useMergeModuleClassKey } from '@/shared/lib';
import { MantineButtonsProvider } from '@/shared/ui';

import { LAYOUT_COMPONENTS, SKELETON_COMPONENTS } from '../../AppHeader';
import { AppHeaderGuestActions } from '../../blocks/AppHeaderGuestActions/AppHeaderGuestActions';
import { AppHeaderProvidersNav } from '../../blocks/AppHeaderProvidersNav/AppHeaderProvidersNav';
import { AppHeaderUserActions } from '../../blocks/AppHeaderUserActions/AppHeaderUserActions';

import baseStyles from '../../../styles/base/AppHeaderBase.module.scss';
import defaultStyles from '../../../styles/variants/AppHeaderDefault.module.scss';

function AppHeaderDefaultViewComponent({ params, data, loading, isAuthenticated }: AppHeaderViewProps) {
  const LayoutComponent = LAYOUT_COMPONENTS[params.layout];
  const SkeletonComponent = SKELETON_COMPONENTS[params.variant];
  /** `loading` from hook already accounts for pending/fetching and missing menuHeaderTop. */
  const showSkeleton = loading;

  const m = useMergeModuleClassKey(baseStyles, defaultStyles);

  const skeletonClassName = useMemo(
    () => `${baseStyles.root__skeleton}${showSkeleton ? ` ${baseStyles['root__skeleton--visible']}` : ''}`,
    [showSkeleton],
  );

  const providerItems = useMemo((): AppHeaderMenuItem[] => {
    const raw = getHeaderSettings().providers ?? [];
    return raw.map((p) => ({
      key: p.key,
      name: p.name,
      url: p.url,
      img: p.img ?? '',
      buttonVariant: p.buttonVariant,
      buttonColor: p.buttonColor,
      buttonSize: p.buttonSize,
      buttonRadius: p.buttonRadius,
    }));
  }, []);

  const guestActions = useMemo(() => {
    const menu = data?.menu ?? [];
    const isLoginItem = (item: AppHeaderMenuItem): boolean => {
      const key = item.key?.toLowerCase() ?? '';
      const name = item.name?.toLowerCase() ?? '';
      const url = item.url?.toLowerCase() ?? '';
      return (
        key.includes('login') ||
        key.includes('auth') ||
        name.includes('login') ||
        name.includes('вход') ||
        url.includes('/auth') ||
        url.includes('/login')
      );
    };

    const isRegisterItem = (item: AppHeaderMenuItem): boolean => {
      const key = item.key?.toLowerCase() ?? '';
      const name = item.name?.toLowerCase() ?? '';
      const url = item.url?.toLowerCase() ?? '';
      return (
        key.includes('register') ||
        key.includes('signup') ||
        key.includes('registration') ||
        name.includes('register') ||
        name.includes('регистрац') ||
        url.includes('/register') ||
        url.includes('/signup')
      );
    };

    return {
      loginItem: menu.find(isLoginItem),
      registerItem: menu.find(isRegisterItem),
    };
  }, [data?.menu]);

  return (
    <header className={m('root')}>
      <LayoutComponent>
        <div className={baseStyles.root__sections}>
          <div className={baseStyles.root__section}>
            {data?.menu?.map((item) => (
              <span key={item.key}>{item.name}</span>
            ))}
          </div>
          <div className={baseStyles.root__section}>
            <MantineButtonsProvider>
              <AppHeaderProvidersNav items={providerItems} />
            </MantineButtonsProvider>
          </div>
          <div className={baseStyles.root__section}>
            {isAuthenticated ? (
              <AppHeaderUserActions merge={m} classKey="root__userActions-item" />
            ) : (
              <MantineButtonsProvider>
                <AppHeaderGuestActions
                  loginItem={guestActions.loginItem}
                  registerItem={guestActions.registerItem}
                />
              </MantineButtonsProvider>
            )}
          </div>
        </div>
      </LayoutComponent>
      {showSkeleton ? (
        <div className={skeletonClassName} data-testid="app-header-skeleton">
          <SkeletonComponent />
        </div>
      ) : null}
    </header>
  );
}

export const AppHeaderDefaultView = memo(AppHeaderDefaultViewComponent);
AppHeaderDefaultView.displayName = 'AppHeaderDefaultView';
