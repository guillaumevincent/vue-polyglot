const path = require('path');
const webpack = require('webpack');

const production = process.env.NODE_ENV === 'production' || false;

module.exports = {
  entry: './src/polyglot.js',
  output: {
    filename: production ? 'polyglot.min.js' : 'polyglot.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'Polyglot',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  }
};
