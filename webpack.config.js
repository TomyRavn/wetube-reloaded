const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const BASE_JS = "./src/client/js/";

module.exports = {
  entry: {
    main: BASE_JS + "main.js",
    videoPlayer: BASE_JS + "videoPlayer.js",
    recorder: BASE_JS + "recorder.js",
    commentSection: BASE_JS + "commentSection.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"), //path.resolve => add path with separator
    clean: true,
    // path: "./assets/js",     //error : not absolute path
    //console.log(__dirname);   //this directory path
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        //마지막 동작하는 loader부터(웹팩의 loader는 역순으로 동작)
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        //1. sass-loader : scss->css
        //2. css-loader : translate @import,url()
        //3. style-loader : css->DOM =======> MiniCssExtractPlugin : create file parted
      },
    ],
  },
};
