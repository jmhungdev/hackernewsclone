const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
// const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
// const htmlTemplate = require('./html.config');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
  mode: 'production',

  context: path.resolve(__dirname, '..', 'src'),

  entry: {
    app: path.resolve(__dirname, '..', 'src/index.js')
  },

  output: {
    path: path.resolve(__dirname, '..', 'build'),
    publicPath: './',
    filename: '[name].[hash:4].js',
    chunkFilename: '[name].[chunkhash:4].js',
    globalObject: 'this',
    pathinfo: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, '..', 'node_modules'),
        include: path.resolve(__dirname, '..', 'src'),
        use: [{
          loader: 'babel-loader',
          options: {
            // This is a feature of `babel-loader` for Webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
            // When set, each Babel transform output will be compressed with Gzip.
            // If you want to opt-out of cache compression, set it to false --
            // your project may benefit from this if it transpiles thousands of files.
            cacheCompression: true
          }
        }]
      }
    ]
  },

  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },

    splitChunks: {
      hidePathInfo: true,
      chunks: 'all',
      minChunks: 1,
      minSize: 10000,
      maxSize: 0,
      maxAsyncRequests: 7,
      maxInitialRequests: 5,
      automaticNameDelimiter: '~',
      name: false,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/](react|react-dom|core-js|react-hot-loader)[\\/]/,
          // test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'all',
          // filename: '[name].vendor-bundle.js',
          enforce: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },

    namedModules: false,
    namedChunks: false,
    nodeEnv: 'production',
    flagIncludedChunks: true,
    occurrenceOrder: true,
    sideEffects: true,

    providedExports: true,
    usedExports: true,
    concatenateModules: true,

    noEmitOnErrors: true,
    minimize: true,
    checkWasmTypes: true
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      meta: {
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        ['My App']: 'Barebones foundation to quickly start building your web applications'

      },
      minify: false,
      // minify: {
      //   collapseWhitespace: true,
      //   removeComments: true,
      //   removeRedundantAttributes: true,
      //   removeScriptTypeAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   useShortDoctype: true
      // },
      inject: true,
      hash: true,
      cache: true,
      showErrors: true,
      chunksSortMode: 'dependency'
    }),
    // new InlineManifestWebpackPlugin('manifest'),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new TerserPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,        // Must be set to true if using source-maps in production
      extractComments: false, // Pairs with output:{ comments: false } -> change to 'true' to see LICENSEs
      terserOptions: {        // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        ecma: undefined,
        warnings: false,
        parse: {},
        compress: {           // https://github.com/terser-js/terser#compress-options
          drop_console: true,
          drop_debugger: true
        },
        mangle: true,         // Note `mangle.properties` is `false` by default.
        module: false,
        output: {
          comments: false,
        },
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_classnames: undefined,
        keep_fnames: false,
        safari10: false,
      }
    }),

    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['vendor.js']
    })
  ],

  performance: {
    hints: 'warning'
  },

  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
    extensions: ['.js', '.json'],
    enforceExtension: false,
    modules: [
      path.resolve(__dirname, '..', 'src'),
      'node_modules'
    ]
  }
};

