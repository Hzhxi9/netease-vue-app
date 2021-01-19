export interface BannerData {
  code: number;
  banners: BannerItemData[];
}

export interface BannerItemData {
  imageUrl: string;
  url: string;
  typeTitle: string;
  encodeId: string;
  targetId: number;
  titleColor: string;
  targetType: number;
  scm: string;
}
