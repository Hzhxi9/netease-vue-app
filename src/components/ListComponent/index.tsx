import { defineComponent } from "vue";
import { formatPlayCount } from "@/utils";

import ListSkeletonComponent from "../ListSkeletonComponent/index";

import "./index.scss";

const ListComponents = defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  setup(props: any) {
    const renderTabsItem = (item: any) => (
      <div class="item">
        <div class="pic-box">
          <van-image
            width="32vw"
            radius={"2.667vw"}
            src={item.picUrl}
            fit={"cover"}
            v-slots={{ loading: () => <van-loading type="spinner" size="20" /> }}
          />
          {item.program?.adjustedPlayCount || item.playCount ? (
            <span>
              <van-icon name="play" />
              {formatPlayCount(
                item.playCount
                  ? item.playCount
                  : item.program?.adjustedPlayCount
                  ? item.program.adjustedPlayCount
                  : 0
              )}
            </span>
          ) : null}
        </div>
        <p class="van-multi-ellipsis--l2">{item.name}</p>
      </div>
    );

    return () => (
      <div class="content">
        <div class="title">
          <h3>{props.title}</h3>
          <van-button round plain size="mini">
            更多
          </van-button>
        </div>

        <van-tabs swipe-threshold={3} line-width={0}>
          {props.list.length
            ? props.list.map((item: any) => (
                <van-tab key={item.id} v-slots={{ title: () => renderTabsItem(item) }}></van-tab>
              ))
            : new Array(6)
                .fill("")
                .map((item) => (
                  <van-tab v-slots={{ title: () => <ListSkeletonComponent /> }}></van-tab>
                ))}
        </van-tabs>
      </div>
    );
  },
});

export default ListComponents;
