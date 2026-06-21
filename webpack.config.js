const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

/** @type import("webpack").Configuration */
module.exports = {
  entry: {
    main: "./src/main.tsx",
  },
  output: {
    publicPath: "/",
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      inject: "body",
      template: "./src/index.html",
      favicon: "./assets/vite.svg",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "assets",
          to: "assets",
        },
      ],
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
  stats: "errors-only",
};
