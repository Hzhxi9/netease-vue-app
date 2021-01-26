import httpHelper from "@/utils/request";

import * as ResTypes from "@/types/response";

/**
 * 轮播图
 */
export function getBanner(): any {
  return httpHelper.get("/banner");
}

/**
 * 推荐歌单
 */
export function personalized() {
  return httpHelper.get("/personalized");
}

/**
 * 推荐mv
 */
export function personalizedMV() {
  return httpHelper.get("/personalized/mv");
}

/**
 * 推荐新音乐
 */
export function personalizedNewSong() {
  return httpHelper.get("/personalized/newsong");
}

/**
 * 推荐电台
 */
export function personalizedDJ() {
  return httpHelper.get("/personalized/djprogram");
}

/**
 * 推荐节目
 */
export function personalizedProgram() {
  return httpHelper.get("/program/recommend");
}

/**
 * 歌手列表
 */
export function getSingerList(params: { initial: string }) {
  return httpHelper.get("/artist/list", params);
}
