var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = function (env) {

  var isProd = env && env.prod;

  return {
    devtool: 'source-map',
    entry: {
      vendor: [
        isProd ? 'webix/webix.js' : 'webix/webix_debug.js',
        'webix/skins/flat.css',
        './src/assets/theme.siberia.less'
      ],
      app: [
        './src/assets/app.less',
        './src/app.js'
      ]
    },
    output: {
      path: path.join(__dirname, 'build'),
      filename: '[name].js',
      chunkFilename: '[name].[chunkhash].js',
    },
    module: {
      loaders: [
        {test: /\.less$/, loader: 'style!css!less'},
        {test: /\.css$/, loader: 'style!css'},
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff&name=./assets/[hash].[ext]"
        },
        {test: /\.(ttf|eot|svg|png|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=./assets/[hash].[ext]"}

      ]
    },
    plugins: [
      new CleanWebpackPlugin(['build'], {
        verbose: true,
        dry: false
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      isProd ? new webpack.optimize.UglifyJsPlugin(
        {
          minimize: true,
          sourceMap: true,
          compress: {
            sequences: true,
            properties: true,
            drop_debugger: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true,
            drop_console: true,
            warnings: true
          }
        }) : null,
      new CopyWebpackPlugin([
        {context: path.join(__dirname, 'src'), from: '**/*.html'},
        {context: path.join(__dirname, 'src'), from: 'assets', to: 'assets', ignore: ['*.less']},
        {context: path.join(__dirname, 'src'), from: 'libs/webix', to: 'libs/webix'}
      ], {}),
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 4000,
        server: {baseDir: ['build']}
      })
    ].filter(a => a != null)

  };
};