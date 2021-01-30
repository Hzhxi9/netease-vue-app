import { reactive, TransitionGroup, RendererElement, onBeforeMount } from "vue";
import { getRandomItem } from "@/utils";

import ListComponents from "@/components/ListComponent/index";

import * as ResTypes from "@/types/response";
import * as Api from "@/api/api";

import "./index.scss";
import "../../assets/styles/animate.scss";

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

    /**
     * 列表进入动画
     */
    const beforeEnter = (el: RendererElement) => {
      el.style.opacity = "0";
    };

    /**
     * 列表进入后动画
     */
    const enter = (el: RendererElement, done: () => void) => {
      const delay = el.dataset.index * 100;
      setTimeout(() => {
        el.style.transition = "opacity 0.4s ";
        el.style.opacity = 1;
        el.style.animation = "one-in 0.4s infinite";
        el.style["animation-iteration-count"] = 1;
        done();
      }, delay);
    };

    init();

    const renderSwipe = (
      <van-swipe class="banner-swipe" autoplay={3000} indicator-color="#d44439">
        {state.banners.length ? (
          state.banners.map((item) => (
            <van-swipe-item class="banner-item" key={item.encodeId}>
              <van-image
                width="100%"
                radius={"2.667vw"}
                src={item.imageUrl || "https://img.yzcdn.cn/vant/cat.jpeg"}
                fit={"cover"}
                v-slots={{ loading: () => <van-loading type="spinner" size="20" /> }}
              />
            </van-swipe-item>
          ))
        ) : (
          <van-swipe-item class="banner-item">
            <van-skeleton
              avatar
              avatar-size={"calc(100vw - 1.6vw * 2)"}
              avatar-shape={"square"}
              row={0}
            />
          </van-swipe-item>
        )}
      </van-swipe>
    );

    return () => (
      <div class="recommend">
        <div class="banner-box">{renderSwipe}</div>
        <div class="warp">
          <TransitionGroup
            name="more"
            appear
            css={false}
            onBeforeEnter={beforeEnter}
            onEnter={enter}>
            <ListComponents
              list={state.personalizedList}
              title={"推荐歌单"}
              data-index={1}
              key="1"
            />

            <ListComponents
              list={state.personalizedDJList}
              title={"推荐MV"}
              data-index={2}
              key="2"
            />

            <ListComponents
              list={state.personalizedNewSongsList}
              title={"新歌速递"}
              data-index={3}
              key="3"
            />
          </TransitionGroup>
        </div>
      </div>
    );
  },
};

export default Recommend;
