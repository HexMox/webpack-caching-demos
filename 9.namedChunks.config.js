const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: {
    a: './src/pages/a.js',
    b: './src/pages/b.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist/namedChunks')
  },
  optimization: {
    moduleIds: 'hashed',
    chunkIds: 'named',
    runtimeChunk: true,
    splitChunks: {
      minSize: 1, // 为了cacheGroups.common可拆包成功
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'all',
          name: 'vendor',
          priority: 2,
        },
        common: {
          test: /\.js$/,
          chunks: 'initial',
          minChunks: 2,
          name: 'common',
          priority: 1,
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.NamedChunksPlugin((chunk) => {
      if (chunk.name) { 
        return chunk.name; 
      } 
      return [...chunk._modules].map(m => path.relative(m.context, m.request)).join("_"); 
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
  ]
};
