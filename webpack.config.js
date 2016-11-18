var path = require('path');

var config = {
  context: path.join(__dirname, 'client/src'),
  entry: [
    './index.js',
  ],
  output: {
    path: path.join(__dirname, 'client/www'),
    filename: 'bundle.js'
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
    ],
  },
  resolveLoader: {
    root: [
      path.join(__dirname, 'node_modules'),
    ],
  },
  resolve: {
    root: [
      path.join(__dirname, 'node_modules'),
    ]
  }
};

module.exports = config;
