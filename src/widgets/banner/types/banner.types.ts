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
  className?: string;
};
