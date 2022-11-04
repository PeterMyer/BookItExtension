require('dotenv').config();
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  return {
    mode: process.env.DEV ? 'development' : 'production',
    entry: {
      popup: __dirname + '/client/popup/index.js',
    },
    output: {
      path: __dirname,
      filename: './public/[name].js',
    },
    // plugins: [
    //   new Dotenv({
    //     path: `./environments/.env${env.file ? `.${env.file}` : ''}`,
    //   }),
    // ],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devtool: 'source-map',
    watchOptions: {
      ignored: /node_modules/,
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
};
