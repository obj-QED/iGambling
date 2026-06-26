/** Inline preview on component Docs page (first story). */
export const elementDocsPreviewParameters = {
  docs: {
    story: {
      inline: true,
    },
  },
} as const;

/** Interactive playground — Canvas only (`useArgs` does not work in Docs embed). */
export const elementPlaygroundParameters = {
  layout: 'fullscreen' as const,
  controls: {
    hideNoControlsWarning: true,
  },
  docs: {
    disable: true,
  },
} as const;
