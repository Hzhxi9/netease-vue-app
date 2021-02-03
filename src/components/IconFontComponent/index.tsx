import { defineComponent } from "vue";

const IconFontComponent = defineComponent({
  name: "IconFontComponent",

  props: {
    name: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "4vw",
    },
    color: {
      type: String,
      default: "rgb(212, 68, 57)",
    },
  },

  setup(props) {
    return () => (
      <van-icon
        class="iconfont"
        class-prefix="icon"
        name={props.name}
        size={props.size}
        color={props.color}
      />
    );
  },
});

export default IconFontComponent;
