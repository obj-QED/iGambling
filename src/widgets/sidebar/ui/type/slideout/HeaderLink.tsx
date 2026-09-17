import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { useMediaState } from '@/shared/hooks';

import { useSidebarSlideout } from '../../../context';
import { resolveItemLabel, resolveSidebarRailMedia } from '../../../lib';
import { SidebarHeaderLink } from '../../blocks/SidebarHeader/HeaderLink';
import { ItemRailMark } from '../../items/ItemRailMark/ItemRailMark';

import headerStyles from '../../../styles/blocks/SidebarHeader.module.scss';

/**
 * Header rows for slideout — rail glyph/initial only when settled collapsed.
 * ItemMedia stays mounted in HeaderLink (parked) so SVG/img never refetch.
 */
function SlideoutHeaderLinkComponent({ item }: BlockProps) {
  const { phase } = useSidebarSlideout();
  const { showItemImg, onImgError } = useMediaState(item);
  const rail = phase === 'collapsed';
  const railKind = resolveSidebarRailMedia(item, showItemImg);
  const label = resolveItemLabel(item);
  const railNonImg = rail && railKind !== 'img';

  return (
    <SidebarHeaderLink
      item={item}
      hideRightSection={rail}
      railIconOnly={rail}
      parkItemMedia={railNonImg}
      leftSection={
        railNonImg ? (
          <ItemRailMark
            item={item}
            kind={railKind}
            alt={label}
            onImgError={onImgError}
            imgClassName={headerStyles.mainLinkIcon}
            className={headerStyles.mainLinkIcon}
            glyphSize={22}
          />
        ) : undefined
      }
    />
  );
}

export const SlideoutHeaderLink = memo(SlideoutHeaderLinkComponent);
SlideoutHeaderLink.displayName = 'SidebarSlideoutHeaderLink';
