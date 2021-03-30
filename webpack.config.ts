import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import path from 'path';

const isDev = process.env.NODE_ENV === 'development';

const config: Configuration = {
  mode: isDev ? 'development' : 'production',
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  entry: './src/main.tsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '',
    filename: 'app.js',
    assetModuleFilename: 'fonts/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: isDev },
          },
        ],
      },
      {
        test: /\.(ico|gif|jpe?g|png|svg)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(ttf|eot|woff?2?)$/,
        type: isDev ? 'asset/inline' : 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.ico',
      filename: 'index.html',
      minify: !isDev,
      inject: 'body',
      scriptLoading: 'defer',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'assets', to: '.' }],
    }),
    new MiniCssExtractPlugin(),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: 'service-worker.js',
      skipWaiting: true,
      clientsClaim: true,
      inlineWorkboxRuntime: true,
    }),
  ],
  stats: 'errors-only',
  performance: { hints: false },
  devtool: isDev ? 'inline-source-map' : undefined,
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 8888,
    open: false,
  },
};

export default config;
