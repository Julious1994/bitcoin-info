var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
var path = require("path");

var isProduction = process.env.NODE_ENV === 'production';
var productionPluginDefine = isProduction ? [
  new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}})
] : [];
var clientLoaders = isProduction ? productionPluginDefine.concat([
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, sourceMap: false })
]) : [];

var commonLoaders = [
  {
    test: /\.json$/,
    loader: 'json-loader'
  }
];

module.exports = [
  {
    entry: './src/server.js',
    output: {
      path: './dist',
      filename: 'server.js',
      libraryTarget: 'commonjs2',
      publicPath: '/'
    },
    target: 'node',
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false
    },
    externals: nodeExternals(),
    plugins: productionPluginDefine,
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel'
        }
      ].concat(commonLoaders)
    }
  },
  {
    entry: './src/app/browser.js',
    output: {
      path: './dist/assets',
      publicPath: '/',
      filename: 'bundle.js'
    },
    plugins: clientLoaders.concat([
      new ExtractTextPlugin({
        filename: 'css/[name].css',
        allChunks: true
      })
    ]),
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel'
        }
      ],
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
                      use: [{
                            loader: "css-loader"
                          }, {
                            loader: "sass-loader"
                        }],
                      // use style-loader in development
                      fallback: "style-loader"
                  }),
          exclude: /node_modules/,
          include:path.resolve(__dirname, '/app/css')
        }
      ]
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  }
];
