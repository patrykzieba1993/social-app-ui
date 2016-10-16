const webpack = require('webpack');

module.exports = {
  output: {
    path: '/',
    publicPath: '/',
    filename: '[name].js'
  },
  cache: true,
  debug: true,
  devtool: 'source-map',
  entry: {
    'stack': [
      'webpack-hot-middleware/client',
      './src/indexStack.js'
    ],
    'non-authorized': [
      'webpack-hot-middleware/client',
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
      'styles': __dirname + '/src/**/styles',
      'mixins': __dirname + '/src/**/mixins',
      'components': __dirname + '/src/**/components/'
    }
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel-loader'
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
      loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
    }, {
      test: /\.(png|jpg|woff|woff2)$/,
      loader: 'url-loader?limit=8192'
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true
    })
  ]
}