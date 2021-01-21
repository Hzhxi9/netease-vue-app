import request from "@/utils/request";

import * as ResTypes from "@/types/response";

/**
 * 轮播图
 */
export function getBanner(): Promise<ResTypes.BannerData> {
  return request({
    url: "/banner",
    method: "GET",
  });
}

/**
 * 推荐歌单
 */
export function personalized(): Promise<ResTypes.PersonalizedData> {
  return request({
    url: "/personalized",
    method: "GET",
  });
}

/**
 * 推荐mv
 */
export function personalizedMV(): Promise<ResTypes.PersonalizedDJData> {
  return request({
    url: "/personalized/mv",
    method: "GET",
  });
}

/**
 * 推荐新音乐
 */
export function personalizedNewSong(): Promise<ResTypes.PersonalizedNewSongData> {
  return request({
    url: "/personalized/newsong",
    method: "GET",
  });
}

/**
 * 推荐电台
 */
export function personalizedDJ() {
  return request({
    url: "/personalized/djprogram",
    method: "GET",
  });
}

/**
 * 推荐节目
 */
export function personalizedProgram() {
  return request({
    url: "/program/recommend",
    method: "GET",
  });
}

/**
 * 歌手列表
 */
export function getSingerList(params: {
  initial: string;
}): Promise<{ artists: ResTypes.SingerListData[] }> {
  return request({
    url: "/artist/list",
    method: "GET",
    params,
  });
}
