import { defineComponent, reactive, computed } from "vue";

import "./index.scss";

const FullScreenPlayerComponent = defineComponent({
  name: "FullScreenPlayerComponent",

  emits: ["handleShow"],

  props: {
    showPlay: {
      type: Boolean,
      default: false,
    },
    onHandleShow: {
      type: Function,
    },
  },

  setup(props, { emit }) {
    const state = reactive({
      value: 0,
    });

    const isShow = computed({
      get: () => props.showPlay,
      set: (val: boolean) => {
        val = props.showPlay;
      },
    });

    const renderIcon = (name: string, size = "8vw", color = "rgb(46, 48, 48)") => (
      <van-icon class="iconfont" class-prefix="icon" name={name} size={size} color={color} />
    );

    const renderPlayerHeader = () => (
      <van-nav-bar
        title="标题"
        border={false}
        v-slots={{
          left: <van-icon name="arrow-down" color="rgb(46, 48, 48)" size="24" />,
        }}
        onClickLeft={() => emit("handleShow")}
      />
    );

    const renderBgImg = () => (
      <van-image
        class="play-bg"
        width="100%"
        src={"http://p4.music.126.net/FJWZe1aQV2-iuYeq8gUR5A==/19022650672277889.jpg"}
        fit={"cover"}
        v-slots={{ loading: () => <van-loading type="spinner" size="10.667vw" /> }}
      />
    );

    const renderSongImg = () => (
      <div class="song-img">
        <van-image
          width="80%"
          round
          src={"http://p4.music.126.net/FJWZe1aQV2-iuYeq8gUR5A==/19022650672277889.jpg"}
          fit={"cover"}
          v-slots={{ loading: () => <van-loading type="spinner" size="10.667vw" /> }}
        />
      </div>
    );
    const renderProgress = () => (
      <div class="footer-progress">
        <p>00:00</p>
        <van-slider v-model={[state.value, "value"]} button-size="4.8vw" />
        <p>00:00</p>
      </div>
    );

    const renderControlList = () => (
      <ul class="control-list">
        <li>{renderIcon("shunxubofang")}</li>
        <li>{renderIcon("shangyiqu")}</li>
        <li>{renderIcon("bofangzhong")}</li>
        <li>{renderIcon("xiayiqu")}</li>
        <li>{renderIcon("bofangduilie")}</li>
      </ul>
    );

    const renderPlayFooter = () => (
      <div class="footer">
        {renderProgress()}
        {renderControlList()}
      </div>
    );

    const renderPlayer = () => (
      <div class="player">
        {renderBgImg()}
        {renderPlayerHeader()}
        {renderSongImg()}
        {renderPlayFooter()}
      </div>
    );

    return () => (
      <van-popup v-model={[isShow.value, "show"]} position="bottom" style={{ height: "100%" }}>
        {renderPlayer()}
      </van-popup>
    );
  },
});

export default FullScreenPlayerComponent;
