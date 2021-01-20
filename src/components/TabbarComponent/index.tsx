import { defineComponent, reactive, ref } from "vue";

const TabbarComponent = defineComponent({
  name: "TabbarComponent",

  setup() {
    const state = reactive({
      tabbarActive: 0,
    });

    const active = ref(0);

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

    const changeTabbar = (index: number) => {
      state.tabbarActive = index;
    };

    const renderTabBar = () => (
      <van-tabbar active-color={"#d44439"} route v-model={[state.tabbarActive, "active"]}>
        {tabbarList.length
          ? tabbarList.map((item, index) => (
              <van-tabbar-item
                key={index}
                onClick={() => changeTabbar(index)}
                v-slots={{
                  icon: () => (
                    <van-icon
                      class="iconfont"
                      class-prefix="icon"
                      name={item.icon}
                      color={state.tabbarActive ? "#d44439" : "#7d7e80"}
                    />
                  ),
                }}>
                {item.name}
              </van-tabbar-item>
            ))
          : null}
      </van-tabbar>
    );

    return () => renderTabBar();
  },
});

export default TabbarComponent;
