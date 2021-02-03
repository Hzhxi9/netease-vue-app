import { defineComponent, onMounted, reactive, ref, Transition, computed } from "vue";
import { useStore } from "vuex";

import FullScreenPlayerComponent from "../FullScreenPlayerComponent/index";
import IconFontComponent from "../IconFontComponent/index";

import { MusicMutation } from "../../store/motation-type";

import "./index.scss";

const PlayComponent = defineComponent({
  name: "PlayComponent",

  setup() {
    const state = reactive({
      showMiniPlay: false,
      showPlayList: false,
      showPlay: false,

      currentRate: 0,
      duration: 0,
    });

    const audioElementRef = ref<HTMLAudioElement | null>(null);

    const store = useStore();

    const currentTimeVal = computed(() => {
      let result = 0;
      audioElementRef.value && (result = (state.currentRate / state.duration) * 100);
      return result;
    });

    const isMusicPlay = computed(() => store.state.music.isMusicPlay);

    onMounted(() => {
      const audioElementValue = audioElementRef.value;
      if (audioElementValue)
        isMusicPlay.value ? audioElementValue.play() : audioElementValue.pause();
      setTimeout(() => {
        state.showMiniPlay = true;
      }, 500);
    });

    const handlePlayClick = () => {
      store.commit(MusicMutation.CHANGEMUSICPLAY, !isMusicPlay.value);

      const audioElementValue = audioElementRef.value;
      if (audioElementValue)
        isMusicPlay.value ? audioElementValue.play() : audioElementValue.pause();
    };

    const timeUpDate = (e: any) => {
      state.currentRate = e.target && parseInt(e.target.currentTime);
    };

    const renderSongIcon = () => (
      <van-image
        class={[isMusicPlay.value ? "" : "paused", "song-icon"]}
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

    const renderControl = () => (
      <>
        <van-circle
          v-model={[currentTimeVal.value, "currentRate"]}
          color="rgb(212, 68, 57)"
          layer-color="#999"
          size={"8vw"}
          v-slots={{
            default: isMusicPlay.value ? (
              <IconFontComponent name={"zantingtingzhi"} />
            ) : (
              <IconFontComponent name={"bofang"} />
            ),
          }}
          onClick={handlePlayClick}
        />
        <div
          onClick={() => {
            state.showPlayList = !state.showPlayList;
          }}>
          <IconFontComponent name="bofangliebiao" size="6.667vw" />
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
              icon: (
                <div class="play-icon">
                  <IconFontComponent name="ziyuanldpi-copy" />
                </div>
              ),
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
        src={"http://localhost:8082/media/test.39faa86d.mp3"}
        ref={audioElementRef}
        onTimeupdate={(e) => timeUpDate(e)}
        onPlay={(e: any) => {
          state.duration = e.target?.duration;
        }}
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
