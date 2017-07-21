const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js'
  },
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