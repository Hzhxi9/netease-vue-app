import { defineComponent } from "vue";

import "./index.scss";

const RankingListComponent = defineComponent({
  name: "RankingListComponent",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },

  setup(props: any) {
    const renderTracksList = (list: any) => (
      <ul>
        {list.length
          ? list.map((item: any, index: number) => (
              <li key={index}>
                {index + 1} {item.first} - {item.second}
              </li>
            ))
          : null}
      </ul>
    );

    return () => (
      <div>
        {props.list.length &&
          props.list.map((e: any, i: number) => (
            <div class="offcal" key={i}>
              <div class="img-warp">
                <van-image
                  width="27.2vw"
                  radius={"2.667vw"}
                  src={e.coverImgUrl}
                  fit={"cover"}
                  v-slots={{ loading: () => <van-loading type="spinner" size="20" /> }}
                />
              </div>
              <div class="text-warp">{renderTracksList(e.tracks)}</div>
            </div>
          ))}
      </div>
    );
  },
});

export default RankingListComponent;
