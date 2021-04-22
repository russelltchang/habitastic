const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: "/client/src/index.js",
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "./client/public", to: "client/public" }],
    }),
    new HtmlWebPackPlugin({
      template: "client/src/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  externals: {
    cheerio: "window",
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": true,
  },
};
