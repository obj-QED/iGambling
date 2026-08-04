import type { BannerSchema } from './schema.types';

export type AppBannerSlide = {
  background?: string;
  text?: string;
  url?: string;
};

export type AppBannerModel = {
  slides: AppBannerSlide[];
};

export type AppBannerProps = {
  banner: AppBannerModel;
  schema: BannerSchema;
  className?: string;
};
