import { onBeforeMount, reactive } from "vue";
import { useRouter } from "vue-router";

import "./index.scss";

const Home = {
  name: "Home",
  setup() {
    //
    const state = reactive({
      list: [],
      active: 0,
      showMenu: false,
    });

    const router = useRouter();

    const tabList = Object.freeze([
      { title: "推荐", id: 0, path: "/recommend" },
      { title: "歌手", id: 1, path: "/singer" },
      { title: "排行", id: 2, path: "/ranking" },
    ]);

    const handleSearch = () => {
      console.log("搜索");
    };

    const changeTabs = (name: string) => {
      const path = tabList.find((item) => item.title === name)?.path;
      path && router.push(path);
    };

    onBeforeMount(() => {
      router.push(tabList[state.active].path);
    });

    const renderNavRight = <van-icon name="search" size="18" color="#fff" onClick={handleSearch} />;

    const renderNavLeft = (
      <van-icon
        name="wap-nav"
        size="18"
        color="#fff"
        onClick={() => {
          state.showMenu = !state.showMenu;
        }}
      />
    );

    const renderTabBar = (
      <van-tabs onClick={changeTabs} background="#d44439" v-model={[state.active, "active"]}>
        {tabList.map((item) => (
          <van-tab title={item.title} name={item.title} key={item.id}></van-tab>
        ))}
      </van-tabs>
    );

    return () => (
      <div class="home">
        <van-nav-bar
          title="标题"
          border={false}
          v-slots={{
            right: () => renderNavRight,
            left: () => renderNavLeft,
          }}></van-nav-bar>
        {renderTabBar}

        <van-popup
          v-model={[state.showMenu, "show"]}
          position={"left"}
          class="menu-popup"></van-popup>

        <div class="wrap">
          <router-view />
        </div>
      </div>
    );
  },
};

export default Home;
