export type ApiEnvelope<TContent> = {
  content: TContent;
  error?: unknown;
  meta?: unknown;
  mt?: unknown;
};
