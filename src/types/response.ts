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

export interface PersonalizedData {
  category: number;
  code: number;
  hasTaste: boolean;
  result: PersonalizedItemData[];
}

export interface PersonalizedItemData {
  alg: string;
  canDislike: boolean;
  copywriter: string;
  highQuality: boolean;
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
  trackCount: number;
  trackNumberUpdateTime: string;
  type: number;
}

export interface PersonalizedDJData {
  category: number;
  code: number;
  result: PersonalizedDJItemData[];
}
export interface PersonalizedDJItemData {
  alg: string;
  canDislike: boolean;
  copywriter: string;
  id: number;
  name: string;
  picUrl: string;
  trackNumberUpdateTime: string;
  type: number;
  program: ProgramData;
}

export interface ProgramData {
  adjustedPlayCount: number;
  auditStatus: number;
  bdAuditStatus: number;
  blurCoverUrl: string;
  buyed: boolean;
  canReward: boolean;
  channels: string[];
  commentThreadId: string;
  coverId: number;
  coverUrl: string;
  createTime: string;
  description: string;
  duration: number;
  h5Links: any[];
  id: number;
  isPublish: boolean;
  listenerCount: number;
  mainSong: any;
  mainTrackId: number;
  name: string;
  programDesc: null;
  programFeeType: number;
  pubStatus: number;
  publish: boolean;
  radio: any;
  reward: boolean;
  serialNum: number;
  songs: null;
  subscribedCount: number;
  titbitImages: null;
  titbits: null;
  trackCount: number;
  userId: number;
}

export interface PersonalizedNewSongData {
  category: number;
  code: number;
  result: PersonalizedNewSongItemData[];
}
export interface PersonalizedNewSongItemData {
  alg: string;
  canDislike: boolean;
  copywriter: string;
  id: number;
  name: string;
  picUrl: string;
  song: any;
  trackNumberUpdateTime: null;
  type: number;
}
