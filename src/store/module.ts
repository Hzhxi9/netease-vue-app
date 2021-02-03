import { MusicMutation } from "./motation-type";

import { MusicType } from "../types/store";

const state: MusicType = {
  isMusicPlay: true,
};

const mutations = {
  [MusicMutation.CHANGEMUSICPLAY](state: MusicType, status: boolean) {
    state.isMusicPlay = status;
  },
};

export default { state, mutations };
