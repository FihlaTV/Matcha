const path = require('path');
const webpack = require('webpack');
const config = require('./config/client');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = () => nodeEnv === 'production';
const isDev = () => nodeEnv === 'development';
const ifProd = (plugin) => isProd() ? plugin : null;
const ifDev = (plugin) => isDev() ? plugin : null;
const compact = (data = []) => data.filter(x => Boolean(x));

const webpackConfig = {
  devtool: config.devtool,
  devServer: config.devServer || {},
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build'),
    publicPath: '/build/',
  },
  entry: ['babel-polyfill', 'universal-fetch', './src/client/index.js'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader?cacheDirectory'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
  },
  plugins: compact([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
    ifDev(new webpack.HotModuleReplacementPlugin()),
  ]),
  performance: {
    hints: false,
  },
  stats: {
    assets: false,
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    colors: false,
    depth: false,
    entrypoints: false,
    errors: false,
    errorDetails: false,
    hash: false,
    maxModules: 0,
    modules: false,
    performance: false,
    providedExports: false,
    publicPath: false,
    reasons: false,
    source: false,
    timings: false,
    usedExports: false,
    version: false,
    warnings: false,
  },
};

module.exports = webpackConfig;
