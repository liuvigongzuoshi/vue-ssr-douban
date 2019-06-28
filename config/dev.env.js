var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_ENV: '"client"',
  PORT: 8100,
  VUE_APP_BASE_URL: '"/"'
});
