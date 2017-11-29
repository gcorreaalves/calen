const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const SOURCE_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'dist');
const TEMPLATE_HTML = path.resolve(SOURCE_DIR, 'template.html');

const IS_PROD = process.env.NODE_ENV === 'production';
const CONFIG = {
  entry: 'index.jsx',
  plugins: [],
};

if (IS_PROD) {
  CONFIG.entry = path.join(SOURCE_DIR, 'components', 'Calen.jsx');
  CONFIG.plugins.push(new UglifyJSPlugin());
} else {
  CONFIG.entry = {
    app: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      path.resolve(SOURCE_DIR, 'index.jsx'),
    ],
  };
  CONFIG.plugins.push(new HTMLWebpackPlugin({
    template: TEMPLATE_HTML,
    inject: true,
  }));
  CONFIG.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
  entry: CONFIG.entry,
  output: {
    path: path.resolve(BUILD_DIR),
    filename: 'index.js',
    library: 'Calen',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
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
        exclude: /node_modules/,
        use: 'babel-loader?cacheDirectory',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: CONFIG.plugins,
};
