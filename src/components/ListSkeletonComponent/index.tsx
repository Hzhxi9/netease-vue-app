import { defineComponent } from "vue";

import "./index.scss";

const ListSkeletonComponent = defineComponent({
  name: "ListSkeletonComponent",

  setup() {
    return () => (
      <van-skeleton
        avatar
        avatar-size={"32vw"}
        row-width={"32vw"}
        avatar-shape={"square"}
        row={1}
      />
    );
  },
});

export default ListSkeletonComponent;
