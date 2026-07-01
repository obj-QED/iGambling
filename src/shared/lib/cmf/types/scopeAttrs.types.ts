export type CmfScopeAttrsKey = string | undefined;

export type CmfScopeAttrs<TComponent extends string = string> = {
  'data-cmf-component': TComponent;
  'data-cmf-key'?: string;
};
