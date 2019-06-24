import path from 'path';
import webpack from 'webpack';
import devServer from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const isDev = process.env.NODE_ENV === 'development';

const serverConfig: devServer.Configuration = {
  contentBase: path.resolve(__dirname, 'build'),
  port: 3030,
};

const config: webpack.Configuration = {
  mode: isDev ? 'development' : 'production',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev ? true : false,
            },
          },
        ],
      },
      {
        test: /\.(gif|tiff|png|jpe?g|svg|eot|wof|woff|woff2|ttf)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  performance: {
    hints: false,
  },
  stats: 'minimal',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/favicon.ico',
    }),
    new CopyWebpackPlugin([
      {
        from: 'assets',
        to: './',
        toType: 'dir',
      },
    ]),
    new MiniCssExtractPlugin(),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: 'service-worker.js',
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  devtool: isDev ? 'source-map' : false,
  devServer: serverConfig,
};

export default config;
