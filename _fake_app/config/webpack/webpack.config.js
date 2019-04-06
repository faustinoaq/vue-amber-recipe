var path = require('path');
var { VueLoaderPlugin } = require('vue-loader');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../../src/assets/javascripts/app.js'),
  mode: process.env.NODE_ENV,
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, '../../public/dist'),
    publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=/images/[name].[ext]'
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        loader: 'pug-plain-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'main.bundle.css'
    })
  ]
};
