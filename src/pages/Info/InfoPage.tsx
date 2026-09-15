import { memo, useEffect, useMemo, useSyncExternalStore } from 'react';

import { Title } from '@mantine/core';
import { Navigate, useParams } from 'react-router-dom';

import {
  getKnownAppPathsVersion,
  isKnownAppPath,
  subscribeKnownAppPaths,
} from '@api/lobby/lib/knownAppPathsStore';
import {
  hasPageInfo,
  pageDataMatchesPath,
  readPageInfoHtml,
  readPageInfoTitle,
  readPageUrl,
} from '@api/lobby/lib/readPageInfo';
import { useCurrentPageDataState } from '@api/lobby/queries/useCurrentPageData';
import { useLanguage } from '@hooks/useLanguage';

import { usePathname } from '@/shared/hooks';
import { AppearWipe } from '@/shared/ui';

import styles from './InfoPage.module.scss';

type InfoBodyProps = {
  html: string;
  title: string | undefined;
  contentKey: string;
};

const InfoBody = memo(function InfoBody({ html, title, contentKey }: InfoBodyProps) {
  return (
    <AppearWipe contentKey={contentKey}>
      {title !== undefined && (
        <Title order={1} className={styles.title}>
          {title}
        </Title>
      )}
      {html.length > 0 && (
        <div className={styles.body} dangerouslySetInnerHTML={{ __html: html }} />
      )}
    </AppearWipe>
  );
});
InfoBody.displayName = 'InfoBody';

/**
 * Catch-all (`*`). UI is a pure read of getPage/init mutation state — no display refs.
 */
function InfoPageComponent() {
  const { info } = useParams<{ info?: string }>();
  const language = useLanguage();
  const pathname = usePathname();
  const { data, loading, isFetching, isPlaceholderData, isSettled } = useCurrentPageDataState(
    language,
    pathname,
  );

  useSyncExternalStore(subscribeKnownAppPaths, getKnownAppPathsVersion, getKnownAppPathsVersion);

  const known = isKnownAppPath(pathname);
  const page = pageDataMatchesPath(data, pathname) ? data : undefined;
  const html = useMemo(() => readPageInfoHtml(page) ?? '', [page]);
  const title = useMemo(() => readPageInfoTitle(page), [page]);
  const contentKey = useMemo(() => readPageUrl(page) ?? pathname, [page, pathname]);
  const infoPresent = hasPageInfo(page);

  useEffect(() => {
    if (title !== undefined && title.length > 0) {
      document.title = title;
    }
  }, [title, contentKey]);

  if (isSettled && !isPlaceholderData && !known) {
    return <Navigate to="/404" replace />;
  }

  if (infoPresent) {
    return (
      <article
        className={styles.root}
        data-info-slug={info}
        data-page-kind="info"
        aria-busy={isFetching || undefined}
      >
        <InfoBody html={html} title={title} contentKey={contentKey} />
      </article>
    );
  }

  if (!isSettled || isPlaceholderData || loading || isFetching) {
    return (
      <div
        className={styles.root}
        data-page-kind="loading"
        data-pathname={pathname}
        aria-busy="true"
      />
    );
  }

  return (
    <div
      className={styles.root}
      data-info-slug={info}
      data-page-kind="lobby"
      data-pathname={pathname}
    >
      {title !== undefined && (
        <Title order={1} className={styles.title}>
          {title}
        </Title>
      )}
    </div>
  );
}

export const InfoPage = memo(InfoPageComponent);
InfoPage.displayName = 'InfoPage';
export default InfoPage;
