const webpackMiddleWare = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

module.exports = webpackMiddleWare(webpack(webpackConfig))