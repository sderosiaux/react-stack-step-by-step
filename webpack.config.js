var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'src', 'App.js'),
  output: {
    path: path.join(__dirname, 'src'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: path.join(__dirname, 'src'),
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};
