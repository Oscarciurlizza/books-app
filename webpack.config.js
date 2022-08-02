//Especifica donde esta el codigo origen del archivo del frontend
const path = require('path');

//Minificar el html
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//Constante para verificar si esta en desarrollo
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {

  entry: './frontend/app.js',
  output: {
    path: path.join(__dirname, 'backend/public'),
    filename: 'js/bundle.js'
  },

  mode: 'production',
  
  module: {
    rules: [
      {
        test: /\.css/,
        use : [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader, //Si esta en produccion convierte archivos en su propio css
          'css-loader' 
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './frontend/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/bundle.css'
    })
  ],
  devtool: 'source-map'

};