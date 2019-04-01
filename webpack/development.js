const path = require('path');
const webpack = require('webpack');

const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');


module.exports = {
  mode: 'development',

  context: path.resolve(__dirname, '..', 'src'),
  cache: true,
  devtool: false,

  devServer: {
    https: false,

    // content not from webpack is served from here
    // gzips and serves everything from our src/ directory in the project root
    contentBase: [
      path.resolve(__dirname, '..', 'src'),
      path.resolve(__dirname, '..', 'src', 'assets')
    ],
    host: 'localhost',
    port: 8000,

    // open the page in browser
    open: false,
    compress: true,

    historyApiFallback: true,
    hot: true,

    // don't refresh if hot loading fails. Good while
    // implementing the client interface.
    hotOnly: true,
    inline: true,

    index: path.resolve(__dirname, '..', 'src/index.html'),

    // display compilation related warnings and errors
    overlay: { warnings: true, errors: true },

    // https://webpack.js.org/configuration/dev-server/#devserverproxy
    // proxy: {}

    publicPath: '/',
    quiet: false,

    // https://webpack.js.org/configuration/stats/
    // --progress - [assets, children, chunks, colors, errors, hash, timings, version, warnings]
    stats: {
      assets: true,

      // https://webpack.js.org/configuration/stats/#sorting-fields
      // [id, name, size, chunks, errors, warnings, failed, cacheable, built, prefetched, optional, identifier, index, index2, profile, issuer, issuerId, issuerName, issuerPath]
      assetsSort: 'name',

      // Add build date and time information
      builtAt: true,

      // Add information about cached (not built) modules
      cached: true,

      // Show cached assets (setting this to `false` only shows emitted files)
      cachedAssets: true,

      children: true,
      chunks: false,
      chunkGroups: true,
      chunkModules: true,
      chunkOrigins: true,
      chunksSort: 'name',     // see assetsSort above
      colors: true,

      // Display the distance from the entry point for each module
      depth: true,
      // Display the entry points with the corresponding bundles
      entrypoints: true,
      env: true,

      errors: true,
      errorDetails: true,   //depends on {errors: true}
      hash: true,
      modules: false,       // similar to chunks
      modulesSort: 'name',  // see assetsSorts above
      moduleTrace: true,
      performance: true,
      providedExports: true,
      publicPath: true,
      reasons: true,
      source: true,
      timings: true,
      usedExports: false,
      version: true,
      warnings: true
    }
  },

  entry: {
    app: path.resolve(__dirname, '..', 'src/index.js')
  },

  output: {
    path: path.resolve(__dirname, '..', 'build'),
    publicPath: '/',
    // filename: '[name].[hash:4].js',
    filename: 'bundle.js',
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
    splitChunks: {
      hidePathInfo: false,
      minSize: 10000,
      maxAsyncRequests: Infinity,
      maxInitialRequests: Infinity
    },

    namedModules: true,
    namedChunks: true,
    nodeEnv: 'development',       // sets `process.env.NODE_ENV`in the app
    flagIncludedChunks: false,
    occurrenceOrder: false,
    sideEffects: false,           // https://github.com/webpack/webpack/blob/master/examples/side-effects/README.md

    providedExports: false,
    usedExports: false,
    concatenateModules: false,

    noEmitOnErrors: true,
    minimize: false,             // Tell webpack to minimize the bundle using the TerserPlugin.
    checkWasmTypes: false
  },
  performance: {
    hints: false
  },

  plugins: [
    new ErrorOverlayPlugin(),
    new CaseSensitivePathsPlugin({
      debug: false
    }),

    new webpack.NamedModulesPlugin(),
    new webpack.NamedChunksPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),

    // Enable the plugin to let webpack communicate changes
    // to WDS. --hot sets this automatically!
    // Enable multi-pass compilation for enhanced performance
    // in larger projects. Good default.
    new webpack.HotModuleReplacementPlugin({
      multiStep: false
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['vendor.js']
    }),

    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 5,
      minChunkSize: 1000
    })
  ],

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
