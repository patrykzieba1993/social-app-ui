const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const codeVersion = require('./package.json').version;

module.exports = {
  output: {
    publicPath: '/',
    path: 'dist/',
    filename: '[name].js'
  },
  debug: false,
  devtool: 'source-map',
  entry: {
    'stack': [
      './src/indexStack.js'
    ],
    'non-authorized': [
      './src/indexNonAuthorized.js'
    ],
  },
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'styles': __dirname + '/src/styles',
      'mixins': __dirname + '/src/mixins',
      'components': __dirname + '/src/components/'
    }
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.json/,
      exclude: /node_modules/,
      loader: 'json-loader'
    }, {
      test: /\.svg/,
      exclude: /node_modules/,
      loader: 'babel!svg-react'
    }, {
      test: /\.scss/,
      loader: ExtractTextPlugin.extract('css!postcss!sass')
    }, {
      test: /\.(png|jpg|woff|woff2)$/,
      loader: 'url-loader?limit=8192'
    }]
  },
  postcss: () => [ autoprefixer({ browsers: ['last 2 versions'] }) ],
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.BannerPlugin(`Social App UI v${codeVersion}`),
    new ExtractTextPlugin("styles.css"),
    new webpack.DefinePlugin({
      __DEV__: false,
      __VERSION__: JSON.stringify(codeVersion),
      'process.env': {
        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};
