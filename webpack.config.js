const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.ts',
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.ts', '.json'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
      // {
      //   test: /\.scss$/,
      //   use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      // },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     'style-loader',
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: 'css-loader',
      //       options: { sourceMap: true },
      //     },
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         sourceMap: true,
      //         config: { path: './postcss.config.js' },
      //       },
      //     },
      //     {
      //       loader: 'sass-loader',
      //       options: { sourceMap: true },
      //     },
      //   ],
      // },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: { path: './postcss.config.js' },
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        /* Exclude fonts while working with images, e.g. .svg can be both image or font. */
        exclude: path.resolve(__dirname, './src/img'),
        loader: 'file-loader',
        //  loader: 'file-loader?name=assets/[name].[hash].[ext]'
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        /* Exclude fonts while working with images, e.g. .svg can be both image or font. */
        exclude: path.resolve(__dirname, './src/fonts'),
        loader: 'file-loader',
        //  loader: 'file-loader?name=assets/[name].[hash].[ext]'
        options: {
          name: '[name].[ext]',
          outputPath: 'image/',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: './src/index.html',
      filename: 'index.html',
      title: 'Webpack Output',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/styles/font-awesome.min.css', to: 'styles' },
        { from: './src/styles/normalize.css', to: 'styles' },
        { from: './src/styles/style.min.css', to: 'styles' },
        {
          from: './src/image/*.*',
          // from: path.resolve(__dirname, 'src', 'image'),
          // from: '/image/',
          to: 'image/[name].[ext]',
        },
        { from: './src/fonts/*.*', to: 'fonts/[name].[ext]' },
        { from: './src/favicon/*.*', to: 'favicon/[name].[ext]' },
        { from: './src/audio/*.*', to: 'audio/[name].[ext]' },
        { from: './src/radio/*.*', to: 'radio/[name].[ext]' },
        { from: './src/video/', to: 'video' },
        // {
        //   from: '**/*',
        //   context: path.resolve(__dirname, 'src'),

        // }

      ],
    }),
  ],
  devServer: {
    overlay: true,
    contentBase: path.resolve(__dirname, 'dist'),
    // compress: true,
    port: 9000,
    // lazy: true,
    filename: 'script.js',
    historyApiFallback: true,
    open: true,
  },
};
