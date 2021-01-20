// eslint-disable-next-line
const path = require("path");

module.exports = {
  productionSourceMap: false,

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${path.join(__dirname, "./src/assets/styles/vant-theme.less")}";`,
        },
      },
    },
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: "./src/assets/styles/variables.scss",
    },
  },
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
};
