webpack2.config.js

const path = require('path');
const webpack = require('webpack');

const settings = {
  entry: {
    bundle: [
      "react-hot-loader/patch",
      `${SRC_DIR}/app.jsx`
    ]
  },
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  resolve: {
    extensions: [".js", ".json", ".css", ".sass"]
  },
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.js?$/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: { presets: [ "es2015", "react" ]},
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: "[name]--[local]--[hash:base64:8]"
            }
          },
          "postcss-loader" // has separate config, see postcss.config.js nearby
        ]
      },
    ]
  },
  devServer: {
    contentBase: path.resolve("src/www"),
    publicPath: "http://localhost:8080/", // full URL is necessary for Hot Module Replacement if additional path will be added.
    quiet: false,
    hot: true,
    historyApiFallback: true,
    inline: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
  ],
};

module.exports = settings;