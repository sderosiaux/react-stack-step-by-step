var express = require('express');
var webpack = require('webpack');
var path = require('path');

var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var webpackConfig = require('../webpack.config.js');

var app = express();

var compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(express.static('src'));

app.listen(3000);

