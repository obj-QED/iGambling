export type CmfScopeAttrsKey = string | undefined;

export type CmfScopeAttrsRole = string | undefined;

/** Positional helper legacy shape — prefer {@link CmfControlAttrs}. */
export type CmfScopeAttrs<TComponent extends string = string> = {
  'data-cmf-component': TComponent;
  'data-cmf-key'?: string;
  'data-cmf-role'?: string;
};

/** Input for {@link cmfControlAttrs} — only non-empty fields become DOM attrs. */
export type CmfControlAttrsInput = {
  component?: string;
  key?: string;
  role?: string;
};

export type CmfControlAttrs = {
  'data-cmf-component'?: string;
  'data-cmf-key'?: string;
  'data-cmf-role'?: string;
};
