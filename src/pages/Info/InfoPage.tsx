import { memo, useMemo } from 'react';

import { Title } from '@mantine/core';
import { Navigate, useParams } from 'react-router-dom';

import {
  hasPageInfo,
  pageDataMatchesPath,
  readPageInfoHtml,
  readPageInfoTitle,
  readPageUrl,
} from '@api/lobby/lib/readPageInfo';
import { useGetPage } from '@api/lobby/queries/useGetPage';

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
 * Catch-all (`*`). Page existence is decided by lobby `init` / `getPage` for this
 * pathname — not by a client menu allowlist (menus are discovery only).
 */
function InfoPageComponent() {
  const { info } = useParams<{ info?: string }>();
  const pathname = usePathname();
  const { data, loading } = useGetPage();

  const page = pageDataMatchesPath(data, pathname) ? data : undefined;
  const html = useMemo(() => readPageInfoHtml(page) ?? '', [page]);
  const title = useMemo(() => readPageInfoTitle(page), [page]);
  const contentKey = useMemo(() => readPageUrl(page) ?? pathname, [page, pathname]);
  const infoPresent = hasPageInfo(page);

  if (loading) {
    return (
      <div
        className={styles.root}
        data-page-kind="loading"
        data-pathname={pathname}
        aria-busy="true"
      />
    );
  }

  if (infoPresent) {
    return (
      <article
        className={styles.root}
        data-info-slug={info}
        data-page-kind="info"
        data-pathname={pathname}
      >
        <InfoBody html={html} title={title} contentKey={contentKey} />
      </article>
    );
  }

  // Matching page payload without CMS info → lobby shell (e.g. /jackpots).
  if (page !== undefined) {
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

  // Settled with no matching page for this path (missing payload or request error).
  return <Navigate to="/404" replace />;
}

export const InfoPage = memo(InfoPageComponent);
InfoPage.displayName = 'InfoPage';
export default InfoPage;
