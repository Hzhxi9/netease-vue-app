import { defineComponent, onMounted, reactive, ref, Transition, computed } from "vue";

import FullScreenPlayerComponent from "../FullScreenPlayerComponent/index";

import "./index.scss";

const PlayComponent = defineComponent({
  name: "PlayComponent",

  setup() {
    const state = reactive({
      isPlay: true,
      showMiniPlay: false,
      showPlayList: false,
      showPlay: false,

      currentRate: 0,
    });

    const audioElementRef = ref<HTMLAudioElement | null>(null);

    const currentTimeVal = computed({
      get: () => state.currentRate,
      set: (val) => {
        if (audioElementRef.value) {
          val = (state.currentRate / audioElementRef.value.duration) * 100;
        }
      },
    });

    onMounted(() => {
      setTimeout(() => {
        state.showMiniPlay = true;
      }, 500);
    });

    const handlePlayClick = () => {
      state.isPlay = !state.isPlay;
      const audioElementValue = audioElementRef.value;

      if (audioElementValue) state.isPlay ? audioElementValue.play() : audioElementValue.pause();
    };

    const timeUpDate = (e: any) => {
      state.currentRate = e.target && parseInt(e.target.currentTime);
    };

    const renderSongIcon = () => (
      <van-image
        class="song-icon"
        width="10.667vw"
        round
        src={"http://p4.music.126.net/FJWZe1aQV2-iuYeq8gUR5A==/19022650672277889.jpg"}
        fit={"cover"}
        v-slots={{ loading: () => <van-loading type="spinner" size="10.667vw" /> }}
        onClick={() => {
          state.showPlay = !state.showPlay;
        }}
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
          v-model={[currentTimeVal.value, "currentRate"]}
          color="rgb(212, 68, 57)"
          layer-color="#999"
          size={"8vw"}
          v-slots={{
            default: state.isPlay ? renderIcon("zantingtingzhi") : renderIcon("bofang"),
          }}
          onClick={handlePlayClick}
        />
        <div
          onClick={() => {
            state.showPlayList = !state.showPlayList;
          }}>
          {renderIcon("bofangliebiao", "6.667vw")}
        </div>
      </>
    );

    const renderPlayList = () => (
      <ul class="play-list">
        <li>
          <van-cell
            center
            title="单元格"
            v-slots={{
              icon: <div class="play-icon">{renderIcon("ziyuanldpi-copy")}</div>,
              "right-icon": <van-icon name="cross" color="#333" />,
              title: (
                <p class="play-song">
                  1111<span class="play-singer">22222</span>
                </p>
              ),
            }}
          />
        </li>
      </ul>
    );

    const renderPlayListAction = () => (
      <van-action-sheet
        v-model={[state.showPlayList, "show"]}
        title="播放列表"
        cancel-text="取消"
        closeable={false}>
        {renderPlayList()}
      </van-action-sheet>
    );

    const renderAudio = () => (
      <audio
        id="audio"
        src={"http://localhost:8081/media/test.39faa86d.mp3"}
        ref={audioElementRef}
        autoplay
        onTimeupdate={(e) => timeUpDate(e)}
      />
    );

    return () => (
      <>
        <Transition name="van-slide-up">
          <div class="mini-play" v-show={state.showMiniPlay}>
            <div class="icon">{renderSongIcon()}</div>
            <div class="name">{renderName()}</div>
            <div class="control">{renderControl()}</div>
            {renderAudio()}
            {renderPlayListAction()}
            <FullScreenPlayerComponent
              showPlay={state.showPlay}
              onHandleShow={() => (state.showPlay = !state.showPlay)}
            />
          </div>
        </Transition>
      </>
    );
  },
});

export default PlayComponent;
