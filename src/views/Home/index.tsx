import {} from "vue";

const Home = {
  name: "Home",
  setup() {
    //

    return () => (
      <div class="home">
        <van-nav-bar title="标题" left-text="返回" right-text="按钮" left-arrow />
      </div>
    );
  },
};

export default Home;
