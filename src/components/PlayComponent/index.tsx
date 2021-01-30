import { defineComponent, onMounted, reactive, ref, Transition } from "vue";

import "./index.scss";

const PlayComponent = defineComponent({
  name: "PlayComponent",

  setup() {
    const state = reactive({
      isPlay: true,
      isShow: false,
    });

    const currentRate = ref(0);

    onMounted(() => {
      setTimeout(() => {
        state.isShow = true;
      }, 1000);
    });

    const renderSongIcon = () => (
      <van-image
        width="10.667vw"
        round
        src={"http://p4.music.126.net/FJWZe1aQV2-iuYeq8gUR5A==/19022650672277889.jpg"}
        fit={"cover"}
        v-slots={{ loading: () => <van-loading type="spinner" size="10.667vw" /> }}
      />
    );

    const renderName = () => (
      <>
        <h3 class="van-ellipsis">11</h3>
        <p class="van-ellipsis">222</p>
      </>
    );

    const renderIcon = (name: string, size = "4vw", color = "rgb(212, 68, 57)") => (
      <van-icon class="iconfont" class-prefix="icon" name={name} size={size} color={color} />
    );

    const renderControl = () => (
      <>
        <van-circle
          v-model={[currentRate, "currentRate"]}
          color="rgb(212, 68, 57)"
          size={"8vw"}
          v-slots={{
            default: state.isPlay ? renderIcon("zantingtingzhi") : renderIcon("bofang"),
          }}
          onClick={() => (state.isPlay = !state.isPlay)}
        />
        <div>{renderIcon("bofangliebiao", "6.667vw")}</div>
      </>
    );

    return () => (
      <Transition name="van-slide-left">
        <div class="mini-play" v-show={state.isShow}>
          <div class="icon">{renderSongIcon()}</div>
          <div class="name">{renderName()}</div>
          <div class="control">{renderControl()}</div>
        </div>
      </Transition>
    );
  },
});

export default PlayComponent;
