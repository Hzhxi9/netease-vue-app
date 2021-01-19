import { defineComponent } from "vue";

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
    const renderTabsItem = (
      <div class="item">
        <van-image
          width="32vw"
          radius={"2.667vw"}
          src={"https://p2.music.126.net/eWYX5xDNMNF_B-Rdji3KQw==/109951165641427874.jpg"}
          fit={"cover"}
        />
        <p class="van-multi-ellipsis--l2">青春回忆丨带你进入世纪交替的欧美时光</p>
      </div>
    );

    return () => (
      <div class="content">
        <div class="title">
          <h3>{props.title}</h3>
          <van-button round plain size="mini">
            更多&gt;
          </van-button>
        </div>
        <van-tabs swipe-threshold={3} line-width={0}>
          <van-tab v-slots={{ title: () => renderTabsItem }}></van-tab>
          <van-tab v-slots={{ title: () => renderTabsItem }}></van-tab>
          <van-tab v-slots={{ title: () => renderTabsItem }}></van-tab>
          <van-tab v-slots={{ title: () => renderTabsItem }}></van-tab>
          <van-tab v-slots={{ title: () => renderTabsItem }}></van-tab>
        </van-tabs>
      </div>
    );
  },
});

export default ListComponents;
