export type ApiEnvelope<TContent> = Record<string, unknown> & {
  content: TContent;
};
