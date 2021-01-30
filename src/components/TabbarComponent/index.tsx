import { defineComponent, reactive, ref } from "vue";

import PlayComponent from "../PlayComponent/index";

const TabbarComponent = defineComponent({
  name: "TabbarComponent",

  setup() {
    const state = reactive({
      active: 0,
    });

    const tabbarList = Object.freeze([
      {
        name: "发现",
        path: "/",
        icon: "musiccloud",
      },
      {
        name: "播客",
        path: "/dj",
        icon: "diantai",
      },
      {
        name: "我的",
        path: "/mine",
        icon: "icon",
      },
      {
        name: "会员",
        path: "/vip",
        icon: "huiyuanzhuanxiang",
      },
    ]);

    const renderTabBar = () => (
      <van-tabbar active-color={"#ee0a24"} v-model={[state.active, "modelValue"]}>
        {tabbarList.length
          ? tabbarList.map((item, index) => (
              <van-tabbar-item
                key={index}
                v-slots={{
                  icon: () => (
                    <van-icon class="iconfont" class-prefix="icon" name={item.icon} size="20" />
                  ),
                }}
                to={item.path}>
                {item.name}
              </van-tabbar-item>
            ))
          : null}
      </van-tabbar>
    );

    return () => (
      <>
        {<PlayComponent />}
        {renderTabBar()}
      </>
    );
  },
});

export default TabbarComponent;
