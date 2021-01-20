import { reactive, onMounted } from "vue";

import { getRandomItem } from "@/utils";

import ListComponents from "@/components/ListComponent/index";

import * as ResTypes from "@/types/response";
import * as Api from "@/api/api";

import "./index.scss";

const Recommend = {
  name: "Recommend",

  setup() {
    const state = reactive({
      banners: [] as ResTypes.BannerItemData[],
      personalizedList: [] as ResTypes.PersonalizedItemData[],
      personalizedDJList: [] as ResTypes.PersonalizedDJItemData[],
      personalizedNewSongsList: [] as ResTypes.PersonalizedNewSongItemData[],
    });

    const init = () => {
      try {
        /**
         * 轮播图
         */
        Api.getBanner().then((res) => {
          res.code === 200 && (state.banners = res.banners);
        });
        /**
         * 推荐歌单
         */
        Api.personalized().then((res) => {
          let result = [];
          res.code === 200 && (result = getRandomItem(res.result, 6));
          state.personalizedList = result;
        });
        /**
         * 推荐MV
         */
        Api.personalizedDJ().then((res) => {
          res.code === 200 && (state.personalizedDJList = res.result);
        });
        /**
         * 推荐新音乐
         */
        Api.personalizedNewSong().then((res) => {
          let result = [];
          res.code === 200 && (result = getRandomItem(res.result, 6));
          state.personalizedNewSongsList = result;
        });
      } catch (error) {
        console.log(error);
      }
    };

    init();

    const renderSwipe = (
      <van-swipe class="banner-swipe" autoplay={3000} indicator-color="#d44439">
        {state.banners.length
          ? state.banners.map((item) => (
              <van-swipe-item class="banner-item" key={item.encodeId}>
                <van-image
                  width="100%"
                  radius={"2.667vw"}
                  src={item.imageUrl}
                  fit={"cover"}
                  v-slots={{ loading: () => <van-loading type="spinner" size="20" /> }}
                />
              </van-swipe-item>
            ))
          : null}
      </van-swipe>
    );

    return () => (
      <div class="recommend">
        <div class="banner-box">{renderSwipe}</div>
        <div class="warp">
          <ListComponents list={state.personalizedList} title={"推荐歌单"}></ListComponents>
          <ListComponents list={state.personalizedDJList} title={"推荐MV"}></ListComponents>
          <ListComponents
            list={state.personalizedNewSongsList}
            title={"推荐新音乐"}></ListComponents>
        </div>
      </div>
    );
  },
};

export default Recommend;
