/** Inline preview on component Docs page (first story) — hug content, no viewport stretch. */
export const elementDocsPreviewParameters = {
  layout: 'padded' as const,
  docs: {
    story: {
      inline: true,
      height: 'auto',
      autoplay: false,
    },
  },
} as const;

/** Interactive playground — Canvas only (`useArgs` does not work in Docs embed). */
export const elementPlaygroundParameters = {
  layout: 'padded' as const,
  controls: {
    hideNoControlsWarning: true,
  },
  docs: {
    disable: true,
  },
} as const;
