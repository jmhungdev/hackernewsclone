const webpack = require('webpack');
const path = require('path');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');


module.exports = {
  context: path.resolve(__dirname, '..', 'src'),
  devtool: 'eval-source-map',

  entry: {
    app: [ './index.js' ]
  },

  output: {
    path: path.resolve(__dirname, '..', 'build'),
    publicPath: './',
    filename: '[name].[hash:4].js',
    chunkFilename: '[name].[chunkhash:4].js',
    globalObject: 'this',
    pathinfo: true
  },

  devServer: {
    https: false,
    host: 'localhost',
    port: 8000,

    open: false,                  // Open the page in browser
    contentBase: path.resolve(__dirname, '..', 'src'), // Content not from webpack is served from here

    historyApiFallback: true,
    compress: true,

    hot: true,

    // Don't refresh if hot loading fails. Good while
    // implementing the client interface.
    hotOnly: true,
    inline: true,

    //capturing compilation related warnings and errors
    overlay: true,

    publicPath: '/',
    // --progress - [assets, children, chunks, colors, errors, hash, timings, version, warnings]
    stats: {
      assets: true,

      // Add build date and time information
      builtAt: true,

      // Add information about cached (not built) modules
      cached: true,

      // Show cached assets (setting this to `false` only shows emitted files)
      cachedAssets: true,

      children: true,
      chunks: false,
      colors: true,

      // Display the distance from the entry point for each module
      depth: false,
      // Display the entry points with the corresponding bundles
      entrypoints: false,

      errors: true,
      errorDetails: true, //depends on {errors: true}
      hash: true,
      modules: false,
      moduleTrace: true,
      performance: true,
      providedExports: true,
      publicPath: true,
      reasons: true,
      source: true,
      usedExports: false,
      timings: true,
      version: true,
      warnings: true
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '..', 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              // This is a feature of `babel-loader` for Webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, '..', 'src'),
        use: [
          {
            loader: ExtractCssChunks.loader,
            options: {
              hot: true, // if you want HMR - we try to automatically inject hot reloading but if it's not working, add it to the config
              reloadAll: true // when desperation kicks in - this is a brute force HMR flag
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]',
              sourceMap: true,
              importLoaders: 1,
              import: true,
              url: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              souremap: true,
              ident: 'postcss',
              plugins: () => ([
                // require('postcss-import')({
                //   root: path.resolve(__dirname, '..', 'src'),
                //   path: ['assets', 'src'],
                //   skipDuplicates: true
                // })
                require('postcss-preset-env')({
                  stage: 3,
                  browsers: 'last 2 versions',
                  autoprefixer: { grid: true },
                  features: {
                    'nesting-rules': true
                  }
                })
                // require('precss')({
              ])
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg)$/,
        include: path.resolve(__dirname, '..', 'src/assets/images'),
        use: [{
          loader: 'url-loader',
          options: {
            // Limit at 25Kb. Above that it emits separate files
            limit: 25000,
            name: './images/[name].[hash:4].[ext]'
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
    new HtmlWebpackPlugin({
      title: 'react ❤ webpack',
      template: 'index.html',
      // favicon: '',
      // meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      // minify: {Boolean|Object}
      inject: true,
      hash: true,
      cache: true,
      showErrors: true,
      chunksSortMode: 'dependency'
    }),

    new ExtractCssChunks(
      {
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
        orderWarning: true // Disable to remove warnings about conflicting order between imports
      }
    ),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 5,
      minChunkSize: 1000
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),

    // Enable the plugin to let webpack communicate changes
    // to WDS. --hot sets this automatically!
    // Enable multi-pass compilation for enhanced performance
    // in larger projects. Good default.
    new webpack.HotModuleReplacementPlugin({
      multiStep: false
    }),

    new ErrorOverlayPlugin(),
    new CaseSensitivePathsPlugin({
      debug: false
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NamedChunksPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['vendor.js']
    }),

    //see webpack.EnvironmentPlugin(["NODE_ENV"])
    new webpack.DefinePlugin({
      'HOLA': JSON.stringify('hola desde el base-config')
    })
  ],

  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
      Images: path.resolve(__dirname, '..', `src/assets/images`),
      Styles: path.resolve(__dirname, '..', `src/assets/styles`)
    },
    extensions: ['.js', '.json'],
    enforceExtension: false,
    modules: [
      path.resolve(__dirname, '..', 'src'),
      'node_modules'
    ]
  }
};
