import type { HeaderMenuModel, HeaderSection } from '@/widgets/header';

import { SIDEBAR_FOOTER_SECTION_KEY, SIDEBAR_HEADER_SECTION_KEY } from '../../config/sectionKeys';

export type SidebarLayoutModel = {
  headerSection: HeaderSection | null;
  mainMenu: HeaderMenuModel;
  footerSection: HeaderSection | null;
};

export function splitSidebarMenu(menu: HeaderMenuModel): SidebarLayoutModel {
  let headerSection: HeaderSection | null = null;
  let footerSection: HeaderSection | null = null;
  const mainSections: HeaderSection[] = [];

  for (const section of menu.sections) {
    if (section.key === SIDEBAR_HEADER_SECTION_KEY) {
      headerSection = section;
      continue;
    }

    if (section.key === SIDEBAR_FOOTER_SECTION_KEY) {
      footerSection = section;
      continue;
    }

    mainSections.push(section);
  }

  return {
    headerSection,
    mainMenu: { sections: mainSections },
    footerSection,
  };
}

export function hasSidebarLayoutContent(layout: SidebarLayoutModel): boolean {
  return (
    (layout.headerSection?.items.length ?? 0) > 0 ||
    layout.mainMenu.sections.length > 0 ||
    (layout.footerSection?.items.length ?? 0) > 0
  );
}
