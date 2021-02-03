import { MusicType } from "../types/store";

const getters = {
  isMusicPlay: (state: MusicType) => state.isMusicPlay,
};
export default getters;
