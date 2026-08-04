/** Supported schema majors. Unknown → fallback to defaults. */
export const SCHEMA_VERSIONS = [1, 2] as const;

export type SchemaVersion = (typeof SCHEMA_VERSIONS)[number];

export const WRAPPER_MODES = ['popover', 'drawer', 'tooltip', 'modal', 'none'] as const;

export type WrapperMode = (typeof WRAPPER_MODES)[number];

/** Common shell behavior flags (settings, not theme). */
export type BehaviorFlags = {
  sticky?: boolean;
  transparent?: boolean;
  hideOnScroll?: boolean;
};

/**
 * Inheritance layers for schema resolution.
 * Order applied: defaults → global → brand → page → props.
 * Absent layers are skipped.
 */
export type SchemaLayers<T> = {
  global?: Partial<T>;
  brand?: Partial<T>;
  page?: Partial<T>;
  props?: Partial<T>;
};

/** Base fields every widget schema must resolve. */
export type BaseWidgetSchema = {
  version: SchemaVersion;
  capabilities: Record<string, boolean>;
};

export type ResolveSchemaOptions<TResolved> = {
  /** Coerce/normalize after merge (unions, defaults fill). */
  coerce?: (merged: TResolved) => TResolved;
  /** Supported majors; default SCHEMA_VERSIONS. */
  supportedVersions?: readonly SchemaVersion[];
  /** Called in DEV when major is unsupported. */
  onUnsupportedVersion?: (version: unknown) => void;
};
