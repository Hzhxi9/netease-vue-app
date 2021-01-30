import httpHelper from "@/utils/request";

import * as ResTypes from "@/types/response";

/**
 * 轮播图
 */
export function getBanner(): Promise<ResTypes.BannerData> {
  return httpHelper.get("/banner");
}

/**
 * 推荐歌单
 */
export function personalized(): Promise<ResTypes.PersonalizedDJData> {
  return httpHelper.get("/personalized");
}

/**
 * 推荐mv
 */
export function personalizedMV(): Promise<ResTypes.PersonalizedData> {
  return httpHelper.get("/personalized/mv");
}

/**
 * 推荐新音乐
 */
export function personalizedNewSong(): Promise<ResTypes.PersonalizedNewSongData> {
  return httpHelper.get("/personalized/newsong");
}

/**
 * 推荐电台
 */
export function personalizedDJ(): Promise<ResTypes.PersonalizedDJData> {
  return httpHelper.get("/personalized/djprogram");
}

/**
 * 推荐节目
 */
export function personalizedProgram(): Promise<ResTypes.ProgramData> {
  return httpHelper.get("/program/recommend");
}

/**
 * 歌手列表
 */
export function getSingerList(params: {
  initial: string;
}): Promise<{ artists: ResTypes.SingerListData[] }> {
  return httpHelper.get("/artist/list", params);
}

/**
 * 所有榜单内容摘要
 */
export function getToplist() {
  return httpHelper.get("/toplist/detail");
}
