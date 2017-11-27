const path = require('path');
const webpack = require('webpack');

const HTMLWebpackPlugin = require('html-webpack-plugin');

const SOURCE_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'dist');

const TEMPLATE_HTML = path.resolve(SOURCE_DIR, 'template.html');

module.exports = {
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      path.resolve(SOURCE_DIR, 'calen.js'),
    ],
  },
  output: {
    path: path.resolve(BUILD_DIR),
    filename: 'calen.min.js',
    library: 'Calen',
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: 'babel-loader?cacheDirectory',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: TEMPLATE_HTML,
      inject: true,
    }),
    // new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    new webpack.HotModuleReplacementPlugin()
  ],
};
