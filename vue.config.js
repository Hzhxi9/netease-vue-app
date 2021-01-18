// eslint-disable-next-line
const path = require("path");
const vantTheme = path.resolve(__dirname, "./src/assets/styles/vant-theme.less");

module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // javascriptEnabled: true,
          modifyVars: {
            hack: `true; @import "${vantTheme}";`,
          },
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

function resolve(dir) {
  return path.join(__dirname, dir);
}
