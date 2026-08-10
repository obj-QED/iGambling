export type CmfActiveLineControl = 'button' | 'ai';

export type CmfActiveLineProps = {
  /** Runtime CSS var prefix: Button → `--button-active-*`, ActionIcon → `--ai-active-*`. */
  control?: CmfActiveLineControl;
  className?: string;
};
