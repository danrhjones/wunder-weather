const common = require('./webpack.common');
const {merge} = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', // 3. injects js styles into DOM
          'css-loader', // 2. turns css into js
          'sass-loader', // 1. turns scss into css
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    static: ['./src'],
  },
});

