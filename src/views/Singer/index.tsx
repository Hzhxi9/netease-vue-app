import { defineComponent, reactive, onBeforeMount, ref, nextTick } from "vue";
import { getSingerList } from "@/api/api";

import "./index.scss";

import * as ResTypes from "@/types/response";

const Singer = defineComponent({
  name: "Singer",

  setup() {
    const state = reactive({
      singerList: [] as ResTypes.SingerListData[],
      initIndex: "A",
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
    });

    /**
     * 获取容器元素节点
     */
    const singerElement = ref(null as HTMLDivElement | null);

    /**
     * 获取索引元素节点
     */
    const indexRefs = ref([] as HTMLDivElement[]);

    const handleNodes = (el: any) => {
      console.log("indexRefs", el.value);
      indexRefs.value && indexRefs.value.push(el);
    };

    // watch(
    //   () => state.letter,
    //   (newVal: any) => {
    //     console.log(wrapper);
    //     console.log("new", newVal);
    //   }
    // );

    const scroll = () => {
      // console.log(document.querySelector())
    };

    onBeforeMount(() => {
      singerElement.value && singerElement.value.addEventListener("scroll", scroll);
    });

    const initSingerList = () => {
      getSingerList({ initial: state.initIndex })
        .then((res) => {
          state.singerData[state.initIndex] = res.artists;
          console.log(state.singerData);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    initSingerList();

    const selectIndex = (index: string) => {
      state.initIndex = index;
      initSingerList();
    };

    const changeIndex = (index: string) => {
      state.initIndex = index;
      initSingerList();
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
      <van-index-bar onSelect={selectIndex} onChange={changeIndex}>
        {Object.keys(state.singerData).length
          ? Object.keys(state.singerData).map((element, index) => (
              <>
                <van-index-anchor key={index} index={element} ref={handleNodes} />
                {state.singerData[element].length
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
