import { Toast } from "vant";
import { defineComponent, reactive, computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { formatMinSecond } from "../../utils/index";
import { MusicMutation } from "../../store/motation-type";

import IconFontComponent from "../IconFontComponent/index";
import PlayListActionComponent from "../PlayListActionComponent/index";

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
      showList: false,

      current: 0,
      duration: 0,
      modeIndex: 0,

      mode: Object.freeze({
        0: {
          mode: "shunxubofang",
          name: "顺序播放",
        },
        1: {
          mode: "liebiaoxunhuan",
          name: "列表循环",
        },
        2: {
          mode: "danquxunhuan",
          name: "单曲循环",
        },
        3: {
          mode: "suijibofang",
          name: "随机播放",
        },
      }) as { [key: number]: { mode: string; name: string } },
    });

    const audioElementRef = ref<HTMLAudioElement | null>(null);

    const store = useStore();

    const isMusicPlay = computed(() => store.state.music.isMusicPlay);

    const currentVal = computed(() => {
      let result = 0;
      audioElementRef.value && (result = (state.current / state.duration) * 100);
      return result;
    });

    const isShow = computed({
      get: () => props.showPlay,
      set: (val: boolean) => {
        val = props.showPlay;
      },
    });

    onMounted(() => {
      const audioElementValue = audioElementRef.value;
      if (audioElementValue)
        isMusicPlay.value ? audioElementValue.play() : audioElementValue.pause();
    });

    const selectMode = () => {
      state.modeIndex++;
      if (state.modeIndex === 4) state.modeIndex = 0;
      Toast(state.mode[state.modeIndex].name);
    };

    const handlePlay = () => {
      store.commit(MusicMutation.CHANGEMUSICPLAY, !isMusicPlay.value);
      const audioElementValue = audioElementRef.value;
      if (audioElementValue)
        isMusicPlay.value ? audioElementValue.play() : audioElementValue.pause();
    };

    const timeUpDate = (e: any) => {
      state.current = e.target && e.target.currentTime;
      if (state.current === state.duration) store.commit(MusicMutation.CHANGEMUSICPLAY, false);
    };

    const changTime = (value: number) => {
      if (audioElementRef.value) {
        if (value === 100) {
          store.commit(MusicMutation.CHANGEMUSICPLAY, false);
        } else {
          if (!isMusicPlay.value) store.commit(MusicMutation.CHANGEMUSICPLAY, true);
        }
        audioElementRef.value.currentTime = Math.floor((state.duration * value) / 100);
        state.current = audioElementRef.value.currentTime;
      }
    };

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
          class={[!isMusicPlay.value && "paused", "ro-active"]}
          src={"http://p4.music.126.net/FJWZe1aQV2-iuYeq8gUR5A==/19022650672277889.jpg"}
          fit={"cover"}
          v-slots={{ loading: () => <van-loading type="spinner" size="10.667vw" /> }}
        />
      </div>
    );
    const renderProgress = () => (
      <div class="footer-progress">
        <p>{formatMinSecond(state.current)}</p>
        <van-slider
          v-model={[currentVal.value, "modelValue"]}
          button-size="4.8vw"
          active-color="rgb(212, 68, 57)"
          onChange={changTime}
        />
        <p>{formatMinSecond(state.duration)}</p>
      </div>
    );

    const renderControlList = () => (
      <ul class="control-list">
        <li onClick={selectMode}>
          <IconFontComponent name={state.mode[state.modeIndex].mode} size="8vw" color="#fff" />
        </li>
        <li>
          <IconFontComponent name="shangyiqu" size="8vw" color="#fff" />
        </li>
        <li onClick={handlePlay}>
          <IconFontComponent
            name={isMusicPlay.value ? "bofangzhong" : "zanting"}
            size="8vw"
            color="#fff"
          />
        </li>
        <li>
          <IconFontComponent name="xiayiqu" size="8vw" color="#fff" />
        </li>
        <li
          onClick={() => {
            state.showList = !state.showList;
          }}>
          <IconFontComponent name="bofangduilie" size="8vw" color="#fff" />
        </li>
      </ul>
    );

    const renderPlayFooter = () => (
      <div class="footer">
        {renderProgress()}
        {renderControlList()}
      </div>
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

    const renderPlayer = () => (
      <div class="player">
        {renderBgImg()}
        {renderPlayerHeader()}
        {renderSongImg()}
        {renderPlayFooter()}
        {renderAudio()}
        <PlayListActionComponent
          isShow={state.showList}
          onClose={() => {
            state.showList = false;
          }}
        />
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
