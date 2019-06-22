const webpack = require('webpack');
const path = require('path');
const packageConfig = require('./package.json');

function toCamelCase(str) {
  return str.replace(/-([a-z])/ig, (s, p1) => p1.toUpperCase());
}

module.exports = function (env = {}) {
  return {
    mode: env.production ? 'production' : 'none',
    entry: {
      app: './src/index.js',
      'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
      'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
      'css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
      'html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
      'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker',
    },
    output: {
      globalObject: 'self',
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      publicPath: '/js/',
      library: [toCamelCase(packageConfig.name)],
      libraryTarget: 'umd',
      libraryExport: 'default',
    },
    // resolve: {
    //
    // },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules\/.*/,
          use: {
            loader: 'babel-loader',
            options: {babelrc: true},
          },
        }, {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],

      /* Advanced module configuration (click to show) */
    },

    externals: {

    },
    // Don't follow/bundle these modules, but request them at runtime from the environment

    stats: 'errors-only',
    // lets you precisely control what bundle information gets displayed

    devServer: {
      contentBase: path.join(__dirname, env.server || '.'),
      compress: true,
      port: 3000,
      hot: true,
      // ...
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true,
      }),
    ],
    // list of additional plugins

    /* Advanced configuration (click to show) */
  };
};
