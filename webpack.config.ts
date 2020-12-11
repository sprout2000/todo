import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import CssMinimizeWebpackPlugin from 'css-minimizer-webpack-plugin';

import path from 'path';

const isDev = process.env.NODE_ENV === 'development';

const config: Configuration = {
  mode: isDev ? 'development' : 'production',
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  entry: './src/main.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'app.js',
    assetModuleFilename: 'images/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.(bmp|gif|png|jpe?g|svg|ttf|eot|woff?2?)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: isDev
    ? [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          favicon: './src/favicon.ico',
          filename: 'index.html',
          inject: 'body',
          scriptLoading: 'blocking',
          minify: false,
        }),
        new CopyWebpackPlugin({
          patterns: [{ from: 'assets', to: '.' }],
        }),
      ]
    : [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          favicon: './src/favicon.ico',
          filename: 'index.html',
          inject: 'body',
          scriptLoading: 'blocking',
          minify: true,
        }),
        new CopyWebpackPlugin({
          patterns: [{ from: 'assets', to: '.' }],
        }),
        new MiniCssExtractPlugin(),
        new WorkboxWebpackPlugin.GenerateSW({
          swDest: 'service-worker.js',
          skipWaiting: true,
          clientsClaim: true,
        }),
      ],
  optimization: {
    minimizer: [new TerserWebpackPlugin(), new CssMinimizeWebpackPlugin()],
  },
  performance: {
    hints: false,
  },
  devtool: isDev ? 'inline-source-map' : false,
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 8888,
    open: true,
  },
};

export default config;
