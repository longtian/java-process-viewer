const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: [
          path.join(__dirname, 'src')
        ],
        loader: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};