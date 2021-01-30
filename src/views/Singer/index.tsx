import { defineComponent, reactive, onMounted, ref, nextTick, onUnmounted } from "vue";
import { getSingerList } from "@/api/api";
import { isElementNotInViewport } from "@/utils";

import "./index.scss";

import * as ResTypes from "@/types/response";

import Storage from "@/utils/storage";

const Singer = defineComponent({
  name: "Singer",

  setup() {
    const state = reactive({
      singerList: [] as ResTypes.SingerListData[],
      singerData: {
        A: [],
        B: [],
        C: [],
        D: [],
        E: [],
        F: [],
        G: [],
        H: [],
        I: [],
        J: [],
        K: [],
        L: [],
        M: [],
        N: [],
        O: [],
        P: [],
        Q: [],
        R: [],
        S: [],
        T: [],
        U: [],
        V: [],
        W: [],
        X: [],
        Y: [],
        Z: [],
      } as { [key: string]: ResTypes.SingerListData[] },

      initIndex: "A",
      storage: new Storage(),
    });

    /**
     * 获取容器元素节点
     */
    const singerElement = ref<HTMLDivElement | null>(null);

    /**
     * 本地缓存歌手数据
     */
    const initSingerCache: { [key: string]: ResTypes.SingerListData[] } = {
      A: [],
      B: [],
      C: [],
      D: [],
      E: [],
      F: [],
      G: [],
      H: [],
      I: [],
      J: [],
      K: [],
      L: [],
      M: [],
      N: [],
      O: [],
      P: [],
      Q: [],
      R: [],
      S: [],
      T: [],
      U: [],
      V: [],
      W: [],
      X: [],
      Y: [],
      Z: [],
    };

    const singerCache = state.storage.get("singer");

    !singerCache && state.storage.set("singer", initSingerCache);

    const initSingerList = () => {
      state.singerData[state.initIndex] = singerCache[state.initIndex] || [];
      getSingerList({ initial: state.initIndex })
        .then((res) => {
          if (Array.isArray(res.artists) && res.artists.length) {
            state.singerData[state.initIndex] = res.artists;
            singerCache[state.initIndex] = res.artists;
            state.storage.set("singer", singerCache);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    };

    const scroll = () => {
      nextTick(() => {
        const anchorElement = (document.querySelectorAll(
          ".anchor-index"
        ) as unknown) as HTMLDivElement[];
        const singerElement = document.querySelector(".singer") as HTMLDivElement;

        anchorElement.forEach((e, i) => {
          if (isElementNotInViewport(e, singerElement)) {
            if (
              Array.isArray(Object.values(state.singerData)[i]) &&
              !Object.values(state.singerData)[i].length
            ) {
              state.initIndex = Object.keys(state.singerData)[i];
              initSingerList();
            }
          }
        });
      });
    };

    onMounted(() => {
      initSingerList();
      singerElement.value && singerElement.value.addEventListener("scroll", scroll);
    });

    onUnmounted(() => {
      singerElement.value && singerElement.value.removeEventListener("scroll", scroll, false);
    });

    const selectIndex = (index: string) => {
      state.initIndex = index;
      if (!state.singerData[index].length) initSingerList();
    };

    const renderSingerCell = (element: ResTypes.SingerListData) => (
      <van-cell
        center
        value-class="name"
        key={element.id}
        v-slots={{
          icon: () => (
            <van-image
              width="13.333vw"
              height="13.333vw"
              radius={"2.667vw"}
              src={element.img1v1Url}
              fit={"cover"}
              v-slots={{ loading: () => <van-loading type="spinner" size="20" /> }}
            />
          ),
        }}
        value={element.name}
      />
    );

    const renderIndexBar = () => (
      <van-index-bar onSelect={selectIndex}>
        {Object.keys(state.singerData) && Object.keys(state.singerData).length
          ? Object.keys(state.singerData).map((element, index) => (
              <>
                <van-index-anchor key={index} index={element} class={`anchor-index`} />
                {state.singerData[element] && state.singerData[element].length
                  ? state.singerData[element].map((e) => renderSingerCell(e))
                  : null}
              </>
            ))
          : null}
      </van-index-bar>
    );

    return () => (
      <div class="singer" ref={singerElement}>
        {renderIndexBar()}
      </div>
    );
  },
});

export default Singer;
