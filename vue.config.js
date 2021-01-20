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
  devServer: {
    proxy: {
      //配置跨域
      ["/banner"]: {
        target: "http://127.0.0.1:3000/", //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true, //允许跨域
        pathRewrite: {
          ["^/banner"]: "",
        },
      },
    },
  },
};
