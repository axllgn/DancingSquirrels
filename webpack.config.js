// var path = require('path');
// var rootPath = path.join(__dirname, '../', '../');
// var webpack = require('webpack');
// var SRC_DIR = path.join(__dirname, '/client/src');
// var DIST_DIR = path.join(__dirname, '/client/dist');

// // const ExtractTextPlugin = require("extract-text-webpack-plugin");

// // const extractSass = new ExtractTextPlugin({
// //     filename: "[name].[contenthash].css",
// //     disable: process.env.NODE_ENV === "development"
// // });


// module.exports = {

//   entry: `${SRC_DIR}/app.jsx`,

//   output: {
//     filename: 'bundle.js',
//     path: DIST_DIR
//   },

//   resolve: {
//     extensions: ['.js', '.jsx', '.json', '.css', '.sass' ],
//   },


//   module: {

//     rules: [

//             {
//               test: /\.jsx?/,
//               include: SRC_DIR,
//               loader: 'babel-loader',
//               query: { presets: ['react', 'es2015'] }
//             },

//             {
//               test: /\.(css$|scss$)/,
//               use: extractSass.extract({
//                   use: [
//                           { loader: "css-loader" }, 
//                           { loader: "sass-loader" }
//                         ],
//                   // use style-loader in development
//                   fallback: "style-loader"
//               })
//             }

//           ]

//   },
//   plugins: [ extractSass ],
//   devtool: 'source-map'
// };



var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/app.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  devtool: 'source-map'
};