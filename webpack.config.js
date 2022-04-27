const webpack = require('webpack');
const path    = require('path');

const MiniCssExtractPlugin  = require("mini-css-extract-plugin");
const CopyWebpackPlugin     = require('copy-webpack-plugin');
const autoprefixer          = require('autoprefixer');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd  = nodeEnv === 'production';

const source_path = path.join(__dirname, '/source/assets');

const css_loaders = [
  {
    loader: 'css-loader?sourceMap'
  },
  {
    loader: 'postcss-loader?sourceMap'
  },
  {
    loader: 'sass-loader?sourceMap',
    options: {
      precision: '8',
      outputStyle: 'compressed'
    }
  }
];

const plugins = [
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
  }),
  new MiniCssExtractPlugin(),
  new CopyWebpackPlugin([{ from: source_path }])
];

if (isProd) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.TersePlugin({
    })
  );
};

module.exports = {
  devtool: isProd ? 'hidden-source-map' : 'inline-source-map',
  performance: {
    hints: isProd ? "warning" : false
  },
  plugins,
  entry: {
    app: [`${source_path}/stylesheets/app.css.sass`, `${source_path}/javascripts/app.js`]
  },

  output: {
    path: path.join(__dirname,'/.tmp/dist/assets/javascripts/'),
    filename: '[name].js'
  },

  resolve: {
    modules: [
      'node_modules',
      `${source_path}/javascripts`,
      `${source_path}/stylesheets`
    ]
  },

  module: {
    rules: [{
      test: /\.(html|js)$/,
      exclude: /node_modules/,
      include: __dirname,
      use: 'babel-loader'
    },
    {
      test: /\.sass$/,
      exclude: /node_modules/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: () => [
                require('autoprefixer')
              ]
            },
            sourceMap: true
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ],
    },
    {
      test: /\.(html|svelte)$/,
      exclude: /node_modules/,
      use: 'svelte-loader'
    }]
  },
};
