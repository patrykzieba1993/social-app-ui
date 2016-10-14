require('dotenv')
  .load({ silent: true });
const express = require('express');
const consolidate = require('consolidate');

const notFound = (req, res, next) => {
  const err = new Error('Resource not found');
  err.statusCode = 404;
  next(err);
};

const errorHandler = (err, req, res, next) => {
  res.sendStatus(err.statusCode || 500);
};

const basicConfig = (app) => {
  const port = process.env.PORT || 8080;
  app.set('port', port);
  app.locals.API_URI = process.env.API_URL || '';

  let expressCompression = require('compression');
  app.use(expressCompression({ threshold: 1024 }));
  
  app.set('views', `${__dirname}/src/views`);
  app.engine('hjs', consolidate.handlebars);
  app.set('view engine', 'hjs');
};

const setupStatic = (app) => {
  const PUBLIC_DIR = `${__dirname}/src`;
  app.use(express.static(PUBLIC_DIR));
  app.locals.staticFile = (opts) => opts.fn(opts);
};

const setupRoutes = (app) => {
  app.get('/login*', (req, res) => res.render('login'));
  
  app.get('/*', (req, res) => res.render('index'));
  app.use(notFound);
  app.use(errorHandler);
};

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
};

const start = () => {
  const app = express();
  
  basicConfig(app);
  setupWebpack(app);
  setupStatic(app);
  setupRoutes(app);
  
  app.listen(process.env.PORT, () => console.log(`App listening on ${process.env.PORT} port`));
};

start();