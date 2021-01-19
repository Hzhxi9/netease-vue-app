import { reactive, onMounted } from "vue";
import { getBanner } from "@/api/api";

import ListComponents from "@/components/ListComponents/index";

import * as ResTypes from "@/types/response";

import "./index.scss";

const Recommend = {
  name: "Recommend",

  setup() {
    const state = reactive({
      banners: [] as ResTypes.BannerItemData[],
    });

    const init = () => {
      try {
        getBanner().then((res) => {
          res.code === 200 && (state.banners = res.banners);
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
                <van-image width="100%" radius={"2.667vw"} src={item.imageUrl} fit={"cover"} />
              </van-swipe-item>
            ))
          : null}
      </van-swipe>
    );

    return () => (
      <div class="recommend">
        <div class="banner-box">{renderSwipe}</div>
        <div class="warp">
          <ListComponents title={"jjj"}></ListComponents>
        </div>
      </div>
    );
  },
};

export default Recommend;
