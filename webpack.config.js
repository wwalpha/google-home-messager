const path = require('path');
const webpack = require('webpack');

module.exports = {
  // mode: 'production',
  mode: 'development',
  target: 'node',
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ]
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.ts$/,
  //       exclude: /node_modules/,
  //       use: [
  //         {
  //           loader: 'ts-loader',
  //           options: {
  //             transpileOnly: true,
  //             happyPackMode: true
  //           }
  //         }
  //       ],
  //     }
  //   ]
  // },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: false,
    }),
  ],
  bail: true,
};

