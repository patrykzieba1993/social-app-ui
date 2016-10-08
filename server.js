require('dotenv')
  .load({ silent: true });
const express = require('express');

const setupWebpack = (app) => {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  const compiler = webpack(webpackConfig);

  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {colors: true},
    historyApiFallback: true
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log
  }));
}

const start = () => {
  const app = express();
  setupWebpack(app);
  app.listen(process.env.PORT, () => console.log(`App listening on ${process.env.PORT} port`));
}

start();