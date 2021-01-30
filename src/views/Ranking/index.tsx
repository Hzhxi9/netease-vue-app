import RankingListComponent from "@/components/RankingListComponent/index";

import { onMounted, reactive, ref } from "vue";
import { getToplist } from "@/api/api";

import "./index.scss";

const Ranking = {
  name: "Ranking",

  setup() {
    const state = reactive({
      officialList: [],
      globalList: [],
    });

    const getToplistData = async () => {
      try {
        const res = await getToplist();
        const officialName = ["飙升榜", "新歌榜", "原创榜", "热歌榜"];

        const globalList = res.list.filter(
          (item: any) => !officialName.includes(item.name) && item.name !== "云音乐民谣榜"
        );

        const officialList = res.list.filter((item: any) => officialName.includes(item.name));

        Object.assign(state, { globalList, officialList });
      } catch (error) {
        console.log(error);
      }
    };

    getToplistData();

    const renderOfficial = () => (
      <>
        <van-sticky offset-top={90}>
          <h3>官方榜</h3>
        </van-sticky>
        <RankingListComponent list={state.officialList} />
      </>
    );

    const renderGlobal = () => (
      <>
        <van-sticky offset-top={90}>
          <h3>全球榜</h3>
        </van-sticky>
        <ul class="img-container">
          {state.globalList.length &&
            state.globalList.map((item: any, index) => (
              <li key={index}>
                <van-image
                  radius={"2.667vw"}
                  src={item.coverImgUrl}
                  fit={"cover"}
                  v-slots={{ loading: () => <van-loading type="spinner" size="20" /> }}
                />
              </li>
            ))}
        </ul>
      </>
    );

    return () => (
      <div class="ranking">
        <div class="container">{renderOfficial()}</div>
        <div class="container">{renderGlobal()}</div>
      </div>
    );
  },
};

export default Ranking;
