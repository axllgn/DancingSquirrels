var path = require('path');
var webpack = require('webpack');
var rootPath = path.join(__dirname, '../', '../');

var config = module.exports = {
  // the base path which will be used to resolve entry points
  context: path.join(rootPath, 'frontend'),
  // the main entry point for our application's frontend JS
  entry: './javascripts/bootstrap-app',
};

config.output = {
  // this is our app/assets/javascripts directory, which is part of the Sprockets pipeline
  path: path.join(rootPath, 'app', 'assets', 'javascripts'),
  // the filename of the compiled bundle, e.g. app/assets/javascripts/bundle.js
  filename: 'bundle.js',
  // if the webpack code-splitting feature is enabled, this is the path it'll use to download bundles
  publicPath: '/assets',
  // this all related to source maps
  devtoolModuleFilenameTemplate: '[resourcePath]',
  devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]',
};

config.resolve = {
  // tell webpack which extensions to auto search when it resolves modules. With this,
  // you'll be able to do `require('./utils')` instead of `require('./utils.js')`
  extensions: ['', '.js', '.coffee', '.js.coffee', '.jsx'],
  root: rootPath,
  modulesDirectories: ['node_modules'],
  alias: {
    app: path.join(rootPath, 'frontend', 'javascripts'),
    components: path.join(rootPath, 'frontend', 'javascripts', 'components'),
    flux: path.join(rootPath, 'frontend', 'javascripts', 'flux'),
  }
};

config.resolveLoader = {
  root: path.join(rootPath, "node_modules")
};

config.plugins = [

];

// use jQuery from the rails gem
config.externals = {
  jquery: 'var jQuery'
};

config.module = {
  loaders: [
    { test: /\.coffee$/, loader: 'coffee-loader' },
    { test: /\.es6$/, loader: 'babel-loader' },
    { test: /\.jsx$/, loader: 'babel-loader'},
    // handle stylesheets required from node packages
    { test: /\.css$/, loader: 'style-loader!css-loader'},
    // need to load all react-infinte modules via babel since it contains es6
    { test: /\.js$/, include: path.join(rootPath, 'node_modules', 'react-infinite'), loader: 'babel-loader' },
    // expose flux instance globally as $flux... must use coffe-loader if coffee-script
    { test: path.join(rootPath, 'frontend', 'javascripts', 'flux'), loader: 'expose?$flux!coffee-loader'},
  ],
};