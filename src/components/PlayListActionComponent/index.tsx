import { defineComponent, reactive } from "vue";

import IconFontComponent from "../IconFontComponent/index";

const PlayListActionComponent = defineComponent({
  name: "PlayListActionComponent",
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    onClose: {
      type: Function,
    },
  },

  setup(props, { emit }) {
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

    return () => (
      <van-action-sheet
        v-model={[props.isShow, "show"]}
        title="播放列表"
        cancel-text="取消"
        closeable={false}
        onClickOverlay={() => {
          emit("close");
        }}
        onCancel={() => {
          emit("close");
        }}>
        {renderPlayList()}
      </van-action-sheet>
    );
  },
});

export default PlayListActionComponent;
